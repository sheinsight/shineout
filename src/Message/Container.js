import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import PureComponent from '../PureComponent'
import Alert from '../Alert'
import { messageClass } from '../styles'
import { getUidStr } from '../utils/uid'

class Container extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
    }
  }

  addMessage(msg) {
    const id = getUidStr()
    this.setState(immer((state) => {
      state.messages.push(Object.assign({ id }, msg))
    }))

    if (msg.duration > 0) {
      setTimeout(() => {
        this.setState(immer((state) => {
          state.messages.forEach((m) => {
            if (m.id === id) {
              m.dismiss = true
            }
          })
        }))
      }, msg.duration * 1000)
    }
  }

  removeMessage(id) {
    let callback
    const messages = this.state.messages.filter((m) => {
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

  closeEvent(id, duration) {
    if (duration === 0) {
      return this.removeMessage.bind(this, id)
    }

    return undefined
  }

  render() {
    const { messages } = this.state
    return [messages.map(({
      id, type, content, dismiss, title,
    }) => (
      <div key={id} className={messageClass('item')}>
        <Alert
          className={messageClass('msg')}
          dismiss={dismiss}
          onClose={this.removeMessage.bind(this, id)}
          icon
          iconSize={title ? 20 : 14}
          type={type}
        >
          {title && <h3>{title}</h3>}
          {content}
        </Alert>
      </div>
    ))]
  }
}

Container.propTypes = {
  onDestory: PropTypes.func.isRequired,
}

Container.displayName = 'ShineoutMessage'

export default Container
