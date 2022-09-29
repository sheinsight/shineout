import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { dividerClass } from './styles'
import { DividerProps } from './interface'

class Divider extends PureComponent<DividerProps> {
  static defaultProps = {
    mode: 'horizontal',
  }

  showText() {
    const { children, mode } = this.props
    return children && mode === 'horizontal'
  }

  render() {
    const { className, children, mode, orientation, ...restProps } = this.props
    const mc = classnames(
      dividerClass('_', mode, children && 'with-text', orientation && `with-text-${orientation}`),
      className
    )
    return (
      <div {...restProps} className={mc}>
        {this.showText() && <span className={dividerClass('inner-text')}>{children}</span>}
      </div>
    )
  }
}


export default Divider
