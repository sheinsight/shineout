import React, { Children, PureComponent, cloneElement } from 'react'
import classnames from 'classnames'

import { buttonClass } from './styles'
import { isRTL } from '../config'
import { ButtonGroupProps } from './interface'

class ButtonGroup extends PureComponent<ButtonGroupProps> {
  static defaultProps = {
    outline: false,
    type: 'default',
  }

  render() {
    const { children, outline, size, type, style } = this.props

    const typeSetted = type !== 'default'
    const className = classnames(
      buttonClass('group', (outline || !typeSetted) && 'outline', isRTL() && 'group-rtl'),
      this.props.className
    )

    return (
      <div className={className} style={style}>
        {Children.toArray(children).map((child: React.ReactElement) =>
          cloneElement(child, { size, outline, type: typeSetted ? type : child.props.type })
        )}
      </div>
    )
  }
}

export default ButtonGroup
