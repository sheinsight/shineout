import React from 'react'
import PropTypes from 'prop-types'
import Popover from './Panel'
import Button from '../Button'
import Alert from '../Alert'
import { Component } from '../component'
import { popoverClass } from './styles'
import { getProps } from '../utils/proptypes'
import { getLocale } from '../locale'

export default class Confirm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ok: false,
      cancel: false,
    }

    this.handleCancel = this.handleClick.bind(this, 'cancel')
    this.handleOk = this.handleClick.bind(this, 'ok')
  }

  handleClick(type, close) {
    const { onOk, onCancel } = this.props
    const fn = type === 'ok' ? onOk : onCancel
    let callback
    if (fn) callback = fn()
    if (callback && typeof callback.then === 'function') {
      this.setState({ [type]: true }, () => {
        callback.then(() => {
          close()
          this.setState({ [type]: false })
        })
      })
    } else {
      close()
    }
  }

  render() {
    const { children, type, text, onOk, okType, onCancel, icon, ...other } = this.props
    const { ok, cancel } = this.state
    return (
      <Popover {...other} trigger="click">
        {close => (
          <div className={popoverClass('confirm')}>
            <div className={popoverClass('mention')}>
              <Alert type={type} icon={icon} className={popoverClass('alert')}>
                {children}
              </Alert>
            </div>

            <div className={popoverClass('footer')}>
              <Button loading={cancel} size="small" onClick={() => this.handleCancel(close)}>
                {getLocale('cancel', text)}
              </Button>
              <Button loading={ok} size="small" type={okType} onClick={() => this.handleOk(close)}>
                {getLocale('ok', text)}
              </Button>
            </div>
          </div>
        )}
      </Popover>
    )
  }
}

Confirm.propTypes = {
  ...getProps(PropTypes, 'type'),
  type: PropTypes.oneOf(['success', 'info', 'warning', 'danger', 'confirmwarning']),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  text: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okType: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
}

Confirm.defaultProps = {
  type: 'confirmwarning',
  icon: true,
  okType: 'danger',
}
