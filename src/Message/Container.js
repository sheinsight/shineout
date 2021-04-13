import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { PureComponent } from '../component'
import Alert from '../Alert'
import { messageClass } from '../styles'
import { getUidStr } from '../utils/uid'

class Container extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
    }

    this.removeMessage = this.removeMessage.bind(this)

    this.handleClassName = (position = 'top', closeMsg) =>
      messageClass('item', `item-${closeMsg ? 'dismissed' : 'show'}-${position}`)

    this.handleStyle = (closeMsg, h, position) => {
      if (!closeMsg || h == null) {
        return null
      }
      let styles = {}
      // if bottom, switch left or right
      switch (position) {
        case 'bottom-right':
        case 'bottom-left':
          break
        default:
          styles = {
            zIndex: -1,
            opacity: 0,
            marginTop: -h,
          }
          break
      }

      return styles
    }
  }

  addMessage(msg) {
    const id = getUidStr()
    this.setState(
      immer(state => {
        state.messages.push(Object.assign({ id }, msg))
      })
    )

    if (msg.duration > 0) {
      setTimeout(() => {
        this.setState(
          immer(state => {
            state.messages.forEach(m => {
              if (m.id === id) {
                m.dismiss = true
              }
            })
          })
        )
      }, msg.duration * 1000)
    }
    return this.closeMessageForAnimation.bind(this, id, 200, 200)
  }

  removeMessage(id) {
    let callback
    const messages = this.state.messages.filter(m => {
      if (m.id !== id) return true
      if (m.onClose) {
        callback = m.onClose
      }
      return false
    })

    if (messages.length === 0) {
      this.props.onDestory()
    } else {
      this.setState({ messages })
    }

    if (callback) callback()
  }

  closeMessageForAnimation(...args) {
    const [id, duration, msgHeight] = args
    if (!duration) {
      this.removeMessage(id)
      return
    }

    // duration animation duration time
    this.setState(
      immer(state => {
        state.messages.forEach(m => {
          if (m.id === id) {
            m.dismiss = true
            m.h = msgHeight + 20 // messageHeight + messageMargin
          }
        })
      })
    )
    setTimeout(() => {
      this.removeMessage(id)
    }, duration)
  }

  closeEvent(id, duration) {
    if (duration === 0) {
      return this.removeMessage.bind(this, id)
    }

    return undefined
  }

  render() {
    const { messages } = this.state
    return [
      messages.map(({ id, type, content, dismiss, h, title, top, className, position, hideClose }) => (
        <div
          key={id}
          className={`${this.handleClassName(position, dismiss)} ${className}`}
          style={this.handleStyle(dismiss, h, position)}
        >
          <Alert
            outAnimation
            className={messageClass('msg')}
            dismiss={dismiss}
            hideClose={hideClose}
            onClose={this.closeMessageForAnimation.bind(this, id)}
            icon
            iconSize={title ? 20 : 14}
            style={{ top }}
            type={type}
          >
            {title && <h3>{title}</h3>}
            {content}
          </Alert>
        </div>
      )),
    ]
  }
}

Container.propTypes = {
  onDestory: PropTypes.func.isRequired,
}

Container.displayName = 'ShineoutMessage'

export default Container
