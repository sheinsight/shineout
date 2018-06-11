import React, { Children, PureComponent, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps } from '../utils/proptypes'

import { buttonClass } from '../styles'

class ButtonGroup extends PureComponent {
  render() {
    const {
      children, outline, size, type,
    } = this.props
    const className = classnames(
      buttonClass('group'),
      this.props.className,
    )

    return (
      <div className={className}>
        {
          Children.toArray(children)
            .map(child => cloneElement(child, {
              size,
              outline: child.props.outline || outline,
              type: type || child.props.type,
            }))
        }
      </div>
    )
  }
}

ButtonGroup.propTypes = {
  ...getProps(PropTypes, 'size', 'type'),
  children: PropTypes.any.isRequired,
  outline: PropTypes.bool,
}

ButtonGroup.defaultProps = {
  outline: undefined,
}

export default ButtonGroup
