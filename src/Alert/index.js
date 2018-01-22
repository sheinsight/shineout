import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classGenaration from '../utils/classname'
import { styleProps, defaultStyleProps } from '../utils/proptypes'
import icons from '../icons'

const clsAlert = classGenaration(require('../styles/alert.less'), 'alert')

class Alert extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      dismiss: 0,
    }

    this.bindRef = this.bindRef.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  bindRef(el) {
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
    const { duration } = this.props

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
    const { type } = this.props
    if (typeof icon === 'boolean') {
      icon = icons[type]
    }

    if (!icon) return null

    return <div className={clsAlert('icon')}>{icon}</div>
  }

  render() {
    const { dismiss } = this.state
    if (dismiss === 2) return null

    const {
      children, className, type, style, onClose,
    } = this.props

    const icon = this.renderIcon()

    let wrapClassName = clsAlert(
      '_',
      type,
      dismiss === 1 && 'dismissed',
      icon && 'with-icon',
    )
    if (className) wrapClassName += ` ${className}`

    return (
      <div ref={this.bindRef} className={wrapClassName} style={style}>
        {
          onClose &&
          <a
            href="javascript:;"
            className={clsAlert('close')}
            onClick={this.handleClose}
          >
            {icons.close}
          </a>
        }
        { icon }
        {children}
      </div>
    )
  }
}

Alert.propTypes = {
  children: PropTypes.any,
  duration: PropTypes.number,
  icon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.element,
  ]),
  onClose: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'danger']),
  ...styleProps,
}

Alert.defaultProps = {
  children: undefined,
  duration: 216,
  type: 'warning',
  ...defaultStyleProps,
}

export default Alert
