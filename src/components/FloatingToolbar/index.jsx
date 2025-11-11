import { cloneElement, useCallback, useEffect, useState } from 'react'
import ConversationCard from '../ConversationCard'
import PropTypes from 'prop-types'
import { config as toolsConfig } from '../../content-script/selection-tools'
import { getClientPosition, isMobile, setElementPositionInViewport } from '../../utils'
import Draggable from 'react-draggable'
import { useClampWindowSize } from '../../hooks/use-clamp-window-size'
import { useTranslation } from 'react-i18next'
import { useConfig } from '../../hooks/use-config.mjs'
import {
  createSession,
  deleteSession,
  getSessions,
  resetSessions,
  getSession,
} from '../../services/local-session.mjs'
import ConfirmButton from '../ConfirmButton'
import DeleteButton from '../DeleteButton'
import Browser from 'webextension-polyfill'
import FileSaver from 'file-saver'

// const logo = Browser.runtime.getURL('logo.png')

function FloatingToolbar(props) {
  const { t } = useTranslation()
  const [selection, setSelection] = useState(props.selection)
  const [prompt, setPrompt] = useState(props.prompt)
  const [triggered, setTriggered] = useState(props.triggered)
  const [render, setRender] = useState(false)
  const [closeable, setCloseable] = useState(props.closeable)
  const [position, setPosition] = useState(getClientPosition(props.container))
  const [virtualPosition, setVirtualPosition] = useState({ x: 0, y: 0 })
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [sessions, setSessions] = useState([])
  const [currentSessionId, setCurrentSessionId] = useState(null)
  const [currentSession, setCurrentSession] = useState(null)
  const windowSize = useClampWindowSize([750, 1500], [0, Infinity])
  const config = useConfig(() => {
    setRender(true)
    if (!triggered && selection) {
      props.container.style.position = 'absolute'
      setTimeout(() => {
        const left = Math.min(
          Math.max(0, window.innerWidth - props.container.offsetWidth - 30),
          Math.max(0, position.x),
        )
        props.container.style.left = left + 'px'
      })
    }
  })

  useEffect(() => {
    if (isMobile()) {
      const selectionListener = () => {
        const currentSelection = window.getSelection()?.toString()
        if (currentSelection) setSelection(currentSelection)
      }
      document.addEventListener('selectionchange', selectionListener)
      return () => {
        document.removeEventListener('selectionchange', selectionListener)
      }
    }
  }, [])

  useEffect(() => {
    // Initialize sidebar visibility from config
    if (config.floatingWindowSidebarVisible !== undefined) {
      setSidebarVisible(config.floatingWindowSidebarVisible)
    }
  }, [config.floatingWindowSidebarVisible])

  useEffect(() => {
    // Initialize sessions for floating window
    if (render) {
      getSessions().then((sessions) => {
        setSessions(sessions)
        if (sessions.length > 0 && !currentSessionId) {
          setCurrentSessionId(sessions[0].sessionId)
          setCurrentSession(sessions[0])
        }
      })
    }
  }, [render, currentSessionId])

  const toggleSidebarVisibility = async () => {
    const newVisibility = !sidebarVisible
    setSidebarVisible(newVisibility)
    await Browser.storage.local.set({ floatingWindowSidebarVisible: newVisibility })
  }

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const createNewChat = async () => {
    const { session, currentSessions } = await createSession()
    setSessions(currentSessions)
    setCurrentSessionId(session.sessionId)
    setCurrentSession(session)
  }

  const exportConversations = async () => {
    const sessions = await getSessions()
    const blob = new Blob([JSON.stringify(sessions, null, 2)], { type: 'text/json;charset=utf-8' })
    FileSaver.saveAs(blob, 'conversations.json')
  }

  const clearConversations = async () => {
    const sessions = await resetSessions()
    setSessions(sessions)
    setCurrentSessionId(sessions[0].sessionId)
    setCurrentSession(sessions[0])
  }

  const switchSession = async (sessionId) => {
    setCurrentSessionId(sessionId)
    const { session } = await getSession(sessionId)
    setCurrentSession(session)
  }

  const deleteSessionHandler = async (sessionId) => {
    const sessions = await deleteSession(sessionId)
    setSessions(sessions)
    if (currentSessionId === sessionId && sessions.length > 0) {
      setCurrentSessionId(sessions[0].sessionId)
      setCurrentSession(sessions[0])
    }
  }

  if (!render) return <div />

  if (triggered || (prompt && !selection)) {
    const updatePosition = () => {
      const newPosition = setElementPositionInViewport(props.container, position.x, position.y)
      if (position.x !== newPosition.x || position.y !== newPosition.y) setPosition(newPosition) // clear extra virtual position offset
    }

    const dragEvent = {
      onDrag: (e, ui) => {
        setVirtualPosition({ x: virtualPosition.x + ui.deltaX, y: virtualPosition.y + ui.deltaY })
      },
      onStop: () => {
        setPosition({ x: position.x + virtualPosition.x, y: position.y + virtualPosition.y })
        setVirtualPosition({ x: 0, y: 0 })
      },
    }

    if (virtualPosition.x === 0 && virtualPosition.y === 0) {
      updatePosition() // avoid jitter
    }

    const onClose = useCallback(() => {
      props.container.remove()
    }, [])

    const onDock = useCallback(() => {
      props.container.className = 'chatgptbox-toolbar-container-not-queryable'
      setCloseable(true)
    }, [])

    const onUpdate = useCallback(() => {
      updatePosition()
    }, [position])

    if (config.alwaysPinWindow) onDock()

    return (
      <div data-theme={config.themeMode}>
        <Draggable
          handle=".draggable"
          onDrag={dragEvent.onDrag}
          onStop={dragEvent.onStop}
          position={virtualPosition}
        >
          <div
            className="chatgptbox-selection-window"
            style={{
              width: sidebarVisible ? windowSize[0] * 0.6 + 'px' : windowSize[0] * 0.4 + 'px',
              display: 'flex',
              minHeight: '500px',
            }}
          >
            {sidebarVisible && (
              <div
                className={`chat-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}
                style={{
                  width: sidebarCollapsed ? '60px' : '250px',
                  minWidth: sidebarCollapsed ? '60px' : '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'var(--theme-color)',
                  border: '1px solid var(--theme-border-color)',
                  transition: 'width 0.3s, min-width 0.3s',
                }}
              >
                <div
                  className="chat-sidebar-button-group"
                  style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                  <button
                    className="normal-button"
                    onClick={toggleSidebarCollapse}
                    title={sidebarCollapsed ? t('Pin') : t('Unpin')}
                  >
                    {sidebarCollapsed ? t('Pin') : t('Unpin')}
                  </button>
                  <button className="normal-button" onClick={createNewChat} title={t('New Chat')}>
                    {t('New Chat')}
                  </button>
                  <button
                    className="normal-button"
                    onClick={exportConversations}
                    title={t('Export')}
                  >
                    {t('Export')}
                  </button>
                  <button
                    className="normal-button"
                    onClick={toggleSidebarVisibility}
                    title={t('Hide Sidebar')}
                  >
                    {t('Hide')}
                  </button>
                </div>
                <hr style={{ margin: '0 10px' }} />
                <div
                  className="chat-list"
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '0 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {sessions.map((session, index) => (
                    <button
                      key={index}
                      className={`normal-button ${
                        currentSessionId === session.sessionId ? 'active' : ''
                      }`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        padding: '8px',
                        fontSize: sidebarCollapsed ? '10px' : '14px',
                      }}
                      onClick={() => switchSession(session.sessionId)}
                    >
                      <span
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {sidebarCollapsed ? `${index + 1}` : session.sessionName}
                      </span>
                      {!sidebarCollapsed && (
                        <span className="gpt-util-group">
                          <DeleteButton
                            size={14}
                            text={t('Delete Conversation')}
                            onConfirm={() => deleteSessionHandler(session.sessionId)}
                          />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <hr style={{ margin: '0 10px' }} />
                <div
                  className="chat-sidebar-button-group"
                  style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                  <ConfirmButton text={t('Clear conversations')} onConfirm={clearConversations} />
                  <button
                    className="normal-button"
                    onClick={() => {
                      Browser.runtime.getURL('popup.html')
                      window.open(Browser.runtime.getURL('popup.html'))
                    }}
                  >
                    {t('Settings')}
                  </button>
                </div>
              </div>
            )}
            <div
              className="chatgptbox-container"
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {!sidebarVisible && (
                <div className="chatgptbox-hidden-sidebar-banner">
                  <button
                    className="normal-button chatgptbox-sidebar-toggle-button"
                    type="button"
                    onClick={toggleSidebarVisibility}
                    title={t('Show Sidebar')}
                  >
                    {t('Show Sidebar')}
                  </button>
                </div>
              )}
              <ConversationCard
                session={currentSession || props.session}
                question={prompt}
                draggable={true}
                closeable={closeable}
                onClose={onClose}
                dockable={props.dockable}
                onDock={onDock}
                onUpdate={onUpdate}
                waitForTrigger={prompt && !triggered && !selection}
              />
            </div>
          </div>
        </Draggable>
      </div>
    )
  } else {
    if (
      config.activeSelectionTools.length === 0 &&
      config.customSelectionTools.reduce((count, tool) => count + (tool.active ? 1 : 0), 0) === 0
    )
      return <div />

    const tools = []
    const pushTool = (iconKey, name, genPrompt) => {
      tools.push(
        cloneElement(toolsConfig[iconKey].icon, {
          size: 24,
          className: 'chatgptbox-selection-toolbar-button',
          title: name,
          onClick: async () => {
            const p = getClientPosition(props.container)
            props.container.style.position = 'fixed'
            setPosition(p)
            setPrompt(await genPrompt(selection))
            setTriggered(true)
          },
        }),
      )
    }

    for (const key in toolsConfig) {
      if (config.activeSelectionTools.includes(key)) {
        const toolConfig = toolsConfig[key]
        pushTool(key, t(toolConfig.label), toolConfig.genPrompt)
      }
    }
    for (const tool of config.customSelectionTools) {
      if (tool.active) {
        pushTool(tool.iconKey, tool.name, async (selection) => {
          return tool.prompt.replace('{{selection}}', selection)
        })
      }
    }

    return (
      <div data-theme={config.themeMode}>
        <div className="chatgptbox-selection-toolbar">{tools}</div>
      </div>
    )
  }
}

FloatingToolbar.propTypes = {
  session: PropTypes.object.isRequired,
  selection: PropTypes.string.isRequired,
  container: PropTypes.object.isRequired,
  triggered: PropTypes.bool,
  closeable: PropTypes.bool,
  dockable: PropTypes.bool,
  prompt: PropTypes.string,
}

export default FloatingToolbar
