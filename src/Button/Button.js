import React, { PureComponent, Children, isValidElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import Spin from '../Spin'
import { buttonClass } from '../styles'

class Button extends PureComponent {
  getChildren() {
    const { children, loading } = this.props
    if (!loading) return children
    const filtered = Children.toArray(children).filter(child => {
      const validElement = isValidElement(child) && child !== null
      if (validElement && child.type.isShineoutIcon) return false
      return true
    })
    return filtered
  }

  render() {
    const { outline, type, size, href, htmlType, loading, disabled, onRef, shape, ...others } = this.props
    const className = classnames(
      buttonClass('_', shape, type, outline && 'outline', {
        large: size === 'large',
        small: size === 'small',
        disabled,
      }),
      this.props.className
    )

    if (href) {
      return (
        <a href={href} {...others} className={className}>
          {this.props.children}
        </a>
      )
    }

    const children = this.getChildren()
    return (
      // eslint-disable-next-line
      <button {...others} ref={onRef} disabled={disabled || loading} type={htmlType} className={className}>
        {loading && (
          <span className={buttonClass('spin')}>
            <Spin size={12} name="ring" color="#fff" />
          </span>
        )}
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  ...getProps(PropTypes, 'disabled', 'size', 'type'),
  children: PropTypes.any,
  href: PropTypes.string,
  htmlType: PropTypes.string,
  loading: PropTypes.bool,
  onRef: PropTypes.func,
  shape: PropTypes.oneOf(['round', 'circle']),
  outline: PropTypes.bool,
}

Button.defaultProps = {
  ...defaultProps,
  htmlType: 'button',
  outline: false,
  type: 'default',
}

export default Button
