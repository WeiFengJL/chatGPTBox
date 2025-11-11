import { LightBulbIcon, SearchIcon, XLgIcon } from '@primer/octicons-react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ConversationCard from '../ConversationCard'
import { getPossibleElementByQuerySelector, endsWithQuestionMark } from '../../utils'
import { useTranslation } from 'react-i18next'
import { useConfig } from '../../hooks/use-config.mjs'
import Browser from 'webextension-polyfill'

function DecisionCard(props) {
  const { t } = useTranslation()
  const [triggered, setTriggered] = useState(false)
  const [render, setRender] = useState(false)
  const [visible, setVisible] = useState(true)
  const config = useConfig(() => {
    setRender(true)
  })

  const question = props.question

  const updatePosition = () => {
    if (!render) return

    const container = props.container
    const siteConfig = props.siteConfig
    container.classList.remove('chatgptbox-sidebar-free')

    if (config.appendQuery) {
      const appendContainer = getPossibleElementByQuerySelector([config.appendQuery])
      if (appendContainer) {
        appendContainer.appendChild(container)
        return
      }
    }

    if (config.prependQuery) {
      const prependContainer = getPossibleElementByQuerySelector([config.prependQuery])
      if (prependContainer) {
        prependContainer.prepend(container)
        return
      }
    }

    if (!siteConfig) return

    if (config.insertAtTop) {
      const resultsContainerQuery = getPossibleElementByQuerySelector(
        siteConfig.resultsContainerQuery,
      )
      if (resultsContainerQuery) resultsContainerQuery.prepend(container)
    } else {
      const sidebarContainer = getPossibleElementByQuerySelector(siteConfig.sidebarContainerQuery)
      if (sidebarContainer) {
        sidebarContainer.prepend(container)
      } else {
        const appendContainer = getPossibleElementByQuerySelector(siteConfig.appendContainerQuery)
        if (appendContainer) {
          container.classList.add('chatgptbox-sidebar-free')
          appendContainer.appendChild(container)
        } else {
          const resultsContainerQuery = getPossibleElementByQuerySelector(
            siteConfig.resultsContainerQuery,
          )
          if (resultsContainerQuery) resultsContainerQuery.prepend(container)
        }
      }
    }
  }

  useEffect(() => updatePosition(), [config])

  useEffect(() => {
    // Initialize visibility from config
    if (config.siteSidebarVisible !== undefined) {
      setVisible(config.siteSidebarVisible)
    }
  }, [config.siteSidebarVisible])

  const toggleVisibility = async () => {
    const newVisibility = !visible
    setVisible(newVisibility)
    await Browser.storage.local.set({ siteSidebarVisible: newVisibility })
  }

  return (
    render && (
      <div data-theme={config.themeMode} style={{ position: 'relative' }}>
        {!visible && (
          <div
            className="show-chatgptbox-button"
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 10000,
              backgroundColor: 'var(--theme-color)',
              border: '1px solid var(--theme-border-color)',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
              color: 'var(--font-color)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
            onClick={toggleVisibility}
            title={t('Show Sidebar')}
          >
            <LightBulbIcon size={16} />
            {t('Show Sidebar')}
          </div>
        )}
        {visible && (
          <div style={{ position: 'relative' }}>
            <button
              className="hide-chatgptbox-button"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1000,
                backgroundColor: 'var(--theme-color)',
                border: '1px solid var(--theme-border-color)',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                color: 'var(--font-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
              }}
              onClick={toggleVisibility}
              title={t('Hide Sidebar')}
            >
              <XLgIcon size={12} />
            </button>
            {(() => {
              if (question)
                switch (config.triggerMode) {
                  case 'always':
                    return <ConversationCard session={props.session} question={question} />
                  case 'manually':
                    if (triggered) {
                      return <ConversationCard session={props.session} question={question} />
                    }
                    return (
                      <p className="gpt-inner manual-btn" onClick={() => setTriggered(true)}>
                        <span className="icon-and-text">
                          <SearchIcon size="small" /> {t('Ask ChatGPT')}
                        </span>
                      </p>
                    )
                  case 'questionMark':
                    if (endsWithQuestionMark(question.trim())) {
                      return <ConversationCard session={props.session} question={question} />
                    }
                    if (triggered) {
                      return <ConversationCard session={props.session} question={question} />
                    }
                    return (
                      <p className="gpt-inner manual-btn" onClick={() => setTriggered(true)}>
                        <span className="icon-and-text">
                          <SearchIcon size="small" /> {t('Ask ChatGPT')}
                        </span>
                      </p>
                    )
                }
              else
                return (
                  <p className="gpt-inner">
                    <span className="icon-and-text">
                      <LightBulbIcon size="small" /> {t('No Input Found')}
                    </span>
                  </p>
                )
            })()}
          </div>
        )}
      </div>
    )
  )
}

DecisionCard.propTypes = {
  session: PropTypes.object.isRequired,
  question: PropTypes.string.isRequired,
  siteConfig: PropTypes.object.isRequired,
  container: PropTypes.object.isRequired,
}

export default DecisionCard
