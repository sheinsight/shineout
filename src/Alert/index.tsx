import React, { ReactNode, PureComponent, CSSProperties } from 'react'
import icons from '../icons'
import { isRTL } from '../config'
import { alertClass } from './styles'
import { capitalize } from '../utils/strings'
import { defaultProps, defaultProptypes } from '../utils/proptypes'

export interface AlertProps {
  children?: any
  duration: number
  dismiss?: boolean
  iconSize?: number
  hideClose?: boolean
  outAnimation?: boolean
  icon?: boolean | ReactNode
  onClose?: Function | boolean
  closeItem?: ReactNode
  type?: 'success' | 'info' | 'warning' | 'danger' | 'error' | 'confirm'
}

interface AlertDefaultProps extends defaultProptypes {
  type: string
  duration: number
  iconSize: number
}

interface AlertState {
  dismiss: number
}

class Alert extends PureComponent<AlertProps & Required<AlertDefaultProps>, AlertState> {
  static defaultProps = {
    ...defaultProps,

    iconSize: 16,
    duration: 200,
    type: 'warning',
  }

  static displayName: string

  constructor(props: AlertProps & Required<AlertDefaultProps>) {
    super(props)

    this.state = {
      dismiss: 0,
    }

    this.bindRef = this.bindRef.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.renderClose = this.renderClose.bind(this)
  }

  componentDidUpdate(prevProps: AlertProps) {
    if (this.props.dismiss !== prevProps.dismiss && this.props.dismiss) {
      this.handleClose()
    }
  }

  element: HTMLDivElement

  bindRef(el: HTMLDivElement) {
    this.element = el
  }

  dismiss() {
    const { onClose } = this.props
    this.setState({ dismiss: 2 })
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  handleClose() {
    if (this.state.dismiss > 0) return
    const { duration, outAnimation, onClose } = this.props

    // outer animation
    if (outAnimation) {
      if (typeof onClose === 'function') {
        onClose(duration, this.element.offsetHeight)
      }
      return
    }

    if (duration > 0) {
      this.setState({ dismiss: 1 }, () => {
        setTimeout(this.dismiss, duration)
      })
    } else {
      this.dismiss()
    }
  }

  renderIcon() {
    let { icon } = this.props
    const { type, iconSize } = this.props
    if (typeof icon === 'boolean' && icon) {
      icon = icons[capitalize(type)]
    }

    if (!icon) return null
    const style: CSSProperties = { width: iconSize, height: iconSize, marginRight: iconSize / 2 }
    if (isRTL()) {
      style.marginLeft = style.marginRight
      delete style.marginRight
    }

    return (
      <div className={alertClass('icon')} style={style}>
        {icon}
      </div>
    )
  }

  renderClose() {
    const { closeItem } = this.props
    if (React.isValidElement(closeItem)) return React.cloneElement(closeItem, { onClick: this.handleClose })
    return (
      <a className={alertClass('close')} onClick={this.handleClose}>
        {closeItem || icons.Close}
      </a>
    )
  }

  render() {
    const { dismiss } = this.state
    if (dismiss === 2) return null

    const { children, className, type, onClose, outAnimation, hideClose } = this.props
    const icon = this.renderIcon()

    const { style } = this.props
    const showClose = onClose && !hideClose
    let wrapClassName = alertClass(
      '_',
      type,
      !outAnimation && dismiss === 1 && 'dismissed',
      showClose && 'with-close',
      icon && 'with-icon',
      isRTL() && 'rtl'
    )
    if (className) wrapClassName += ` ${className}`

    return (
      <div ref={this.bindRef} className={wrapClassName} style={style}>
        {showClose && this.renderClose()}
        {icon}
        <div className={alertClass('content')}>{children}</div>
      </div>
    )
  }
}
Alert.displayName = 'ShineoutAlert'

export default Alert