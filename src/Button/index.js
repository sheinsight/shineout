import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { buttonClass } from '../styles'

class Button extends PureComponent {
  render() {
    const { children, type } = this.props
    const className = classnames(
      buttonClass('_', type),
      this.props.className,
    )

    return (
      <button className={className}>{children}</button>
    )
  }
}

Button.propTypes = {
  ...getProps('size', 'type'),
  submit: PropTypes.bool,
  children: PropTypes.any.isRequired,
}

Button.defaultProps = {
  ...defaultProps,
  type: 'default',
}

export default Button
