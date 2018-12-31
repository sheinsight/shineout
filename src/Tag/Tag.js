import React from 'react'
import PropTypes from 'prop-types'
import PureComponent from '../PureComponent'
import { getProps, defaultProps } from '../utils/proptypes'
import { tagClass } from '../styles'

class Tag extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      dismiss: 0,
    }

    this.dismiss = this.dismiss.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.renderClose = this.renderClose.bind(this)
  }

  dismiss() {
    const { onClose } = this.props
    this.setState({ dismiss: 2 })
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  handleClick() {
    const { onClick, disabled } = this.props
    if (disabled) return
    if (typeof onClick === 'function') onClick()
  }

  handleClose() {
    const { disabled } = this.props
    if (this.state.dismiss > 0 || disabled) return
    this.dismiss()
  }

  renderClose() {
    const { onClose } = this.props
    if (!onClose) return null
    const closeClass = tagClass('close-icon')
    return (
      <div
        className={closeClass}
        onClick={this.handleClose}
      >
        &times;
      </div>
    )
  }

  render() {
    const { dismiss } = this.state
    if (dismiss === 2) return null

    const {
      children, className, type, backgroundColor, onClose,
      disabled,
    } = this.props

    const { style } = this.props

    let tagClassName = tagClass(
      '_',
      disabled && 'disabled',
      type,
    )
    const inlineClassName = tagClass('inline')
    let tagStyle = style || {}

    if (className) tagClassName += ` ${className}`
    if (backgroundColor) {
      tagStyle = {
        color: '#fff',
        backgroundColor,
        borderColor: 'transparent',
        ...style,
      }
    }
    return (
      <div className={tagClassName} style={tagStyle} onClick={this.handleClick}>
        {
           onClose
           ? <div className={inlineClassName}>{children}</div>
           : children
        }
        {this.renderClose()}
      </div>
    )
  }
}

Tag.propTypes = {
  ...getProps(PropTypes, 'type'),
  children: PropTypes.any,
  onClose: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  backgroundColor: PropTypes.string,
}

Tag.defaultProps = {
  ...defaultProps,
  type: 'default',
}


export default Tag
