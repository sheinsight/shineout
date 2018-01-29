import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { buttonClass } from '../styles'

class Button extends PureComponent {
  render() {
    const {
      children, disabled, outline, type, size,
    } = this.props
    const className = classnames(
      buttonClass('_', type, outline && 'outline', {
        large: size === 'large',
        small: size === 'small',
      }),
      this.props.className,
    )

    return (
      <button disabled={disabled} className={className}>{children}</button>
    )
  }
}

Button.propTypes = {
  ...getProps('disabled', 'size', 'type'),
  outline: PropTypes.bool,
  submit: PropTypes.bool,
  children: PropTypes.any.isRequired,
}

Button.defaultProps = {
  ...defaultProps,
  outline: false,
  type: 'default',
}

export default Button
