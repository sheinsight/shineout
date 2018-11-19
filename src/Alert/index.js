import React from 'react'
import PropTypes from 'prop-types'
import PureComponent from '../PureComponent'
import { capitalize } from '../utils/strings'
import { getProps, defaultProps } from '../utils/proptypes'
import { alertClass } from '../styles'
import icons from '../icons'

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

  componentDidUpdate(prevProps) {
    if (this.props.dismiss !== prevProps.dismiss && this.props.dismiss) {
      this.handleClose()
    }
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
    const { type, iconSize } = this.props
    if (typeof icon === 'boolean') {
      icon = icons[capitalize(type)]
    }

    if (!icon) return null
    const style = { width: iconSize, height: iconSize, marginRight: iconSize / 2 }

    return <div className={alertClass('icon')} style={style}>{icon}</div>
  }

  render() {
    const { dismiss } = this.state
    if (dismiss === 2) return null

    const {
      children, className, type, onClose,
    } = this.props
    const icon = this.renderIcon()

    const { style } = this.props
    let wrapClassName = alertClass(
      '_',
      type,
      dismiss === 1 && 'dismissed',
      onClose && 'with-close',
      icon && 'with-icon',
    )
    if (className) wrapClassName += ` ${className}`

    return (
      <div ref={this.bindRef} className={wrapClassName} style={style}>
        {
          onClose &&
          <a
            href="javascript:;"
            className={alertClass('close')}
            onClick={this.handleClose}
          >
            {icons.Close}
          </a>
        }
        { icon }
        <div className={alertClass('content')}>
          {children}
        </div>
      </div>
    )
  }
}

Alert.propTypes = {
  ...getProps(PropTypes, 'type'),
  children: PropTypes.any,
  dismiss: PropTypes.bool,
  duration: PropTypes.number,
  icon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.element,
  ]),
  iconSize: PropTypes.number,
  onClose: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
}

Alert.defaultProps = {
  ...defaultProps,
  duration: 216,
  iconSize: 14,
  type: 'warning',
}

Alert.displayName = 'ShineoutAlert'

export default Alert
