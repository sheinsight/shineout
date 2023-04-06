import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { gapClass } from './styles'
import support from './support'
import { GapProps } from './Props'

const flexGapSupport = support()
const DefaultProps = {
  row: 8,
  column: 8,
}
type Props = GapProps & Required<Pick<GapProps, keyof typeof DefaultProps>>

class Gap extends PureComponent<Props> {
  static defaultProps = DefaultProps

  getStyle() {
    const { row, column, style } = this.props
    const extendStyle = flexGapSupport ? { rowGap: row, columnGap: column } : { marginBottom: -Number(row) }
    return Object.assign({}, style, extendStyle)
  }

  getItemStyle(index: number) {
    const { row, column, itemStyle, children } = this.props
    if (flexGapSupport) return itemStyle
    const isLast = React.Children.count(children) - 1 === index
    return Object.assign({}, itemStyle, { marginBottom: row }, !isLast && { marginRight: column })
  }

  render() {
    const { children } = this.props
    const className = classnames(gapClass('_'), this.props.className)

    return (
      <div className={className} style={this.getStyle()}>
        {React.Children.map(
          children,
          (child, index) =>
            child && (
              <div className={gapClass('item')} style={this.getItemStyle(index)}>
                {child}
              </div>
            )
        )}
      </div>
    )
  }
}

export default Gap as React.ComponentType<GapProps>
