import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { dividerClass } from './styles'
import { DividerProps } from './interface'

const DefaultProps = {
  mode: 'horizontal',
}

type Props = DividerProps & Required<Pick<DividerProps, keyof typeof DefaultProps>>

class Divider extends PureComponent<Props> {
  static defaultProps = DefaultProps
  
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

export default Divider as React.ComponentClass<DividerProps>
