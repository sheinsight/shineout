import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
    this.setState({
      messages: [...this.state.messages, Object.assign({ id }, msg)],
    })

    if (msg.duration > 0) {
      setTimeout(() => {
        this.setState({
          messages: this.state.messages.map((m) => {
            if (m.id !== id) return m
            return Object.assign({}, m, { dismiss: true })
          }),
        })
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
      id, type, content, dismiss,
    }) => (
      <div key={id} className={messageClass('item')}>
        <Alert
          className={messageClass('msg')}
          dismiss={dismiss}
          onClose={this.removeMessage.bind(this, id)}
          icon
          type={type}
        >
          {content}
        </Alert>
      </div>
    ))]
  }
}

Container.propTypes = {
  onDestory: PropTypes.func.isRequired,
}

export default Container
