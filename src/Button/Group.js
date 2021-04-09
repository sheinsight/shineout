import React, { Children, PureComponent, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps } from '../utils/proptypes'

import { buttonClass } from '../styles'

class ButtonGroup extends PureComponent {
  render() {
    const { children, outline, size, type } = this.props

    const typeSetted = type !== 'default'
    const className = classnames(buttonClass('group', (outline || !typeSetted) && 'outline'), this.props.className)

    return (
      <div className={className}>
        {Children.toArray(children).map(child =>
          cloneElement(child, { size, outline, type: typeSetted ? type : child.props.type })
        )}
      </div>
    )
  }
}

ButtonGroup.propTypes = {
  ...getProps(PropTypes, 'size'),
  children: PropTypes.any.isRequired,
  outline: PropTypes.bool,
  type: PropTypes.string,
}

ButtonGroup.defaultProps = {
  outline: false,
  type: 'default',
}

export default ButtonGroup
