import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { buttonClass } from '../styles'

class Button extends PureComponent {
  render() {
    const {
      children, outline, type, size, href, htmlType, ...others
    } = this.props
    const className = classnames(
      buttonClass('_', type, outline && 'outline', {
        large: size === 'large',
        small: size === 'small',
      }),
      this.props.className,
    )

    if (href) {
      return (
        <a href={href} {...others} className={className}>{children}</a>
      )
    }
    return (
      <button {...others} type={htmlType} className={className}>{children}</button>
    )
  }
}

Button.propTypes = {
  ...getProps('disabled', 'size', 'type'),
  href: PropTypes.string,
  htmlType: PropTypes.string,
  outline: PropTypes.bool,
  children: PropTypes.any,
}

Button.defaultProps = {
  ...defaultProps,
  htmlType: 'button',
  outline: false,
  type: 'default',
}

export default Button
