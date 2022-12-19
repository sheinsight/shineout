import React from 'react'
import Popover from './Panel'
import Button from '../Button'
import Alert from '../Alert'
import { Component } from '../component'
import { popoverClass } from './styles'
import { getLocale } from '../locale'
import { PopoverConfirmProps } from './Props'

interface ConfirmState {
  ok: boolean
  cancel: boolean
}

const DefaultProps: any = {
  type: 'confirmwarning',
  icon: true,
  okType: 'danger',
}
export default class Confirm extends Component<PopoverConfirmProps, ConfirmState> {
  static defaultProps = DefaultProps

  handleCancel: (close: Function) => void

  handleOk: (close: Function) => void

  constructor(props: PopoverConfirmProps) {
    super(props)
    this.state = {
      ok: false,
      cancel: false,
    }

    this.handleCancel = this.handleClick.bind(this, 'cancel')
    this.handleOk = this.handleClick.bind(this, 'ok')
  }

  handleClick(type: 'cancel' | 'ok', close: Function) {
    const { onOk, onCancel } = this.props
    const fn = type === 'ok' ? onOk : onCancel
    let callback: Promise<any> | void
    if (fn) callback = fn()
    if (callback && typeof callback.then === 'function') {
      this.setState({ [type]: true }, () => {
        ;(callback as Promise<any>).then(() => {
          close()
          this.setState({ [type]: false })
        })
      })
    } else {
      close()
    }
  }

  render() {
    const { children, type = DefaultProps.type, text, onOk, okType, onCancel, icon, ...other } = this.props
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
