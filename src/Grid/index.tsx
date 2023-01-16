import React, { PureComponent, Children, cloneElement } from 'react'
import classnames from 'classnames'
import { getGrid } from './utils'
import { GridProps } from './Props'

export default class Grid extends PureComponent<GridProps> {
  static isGrid = true

  static displayName = 'ShineoutGrid'

  render() {
    const { width = 1, offset, responsive, stretch, children, gutter, ...other } = this.props

    let autoCount = 0
    let settleWidth = 0
    Children.toArray(children).forEach((child: React.ReactElement<GridProps, any>) => {
      if (child.type && child.type.isGrid) {
        if (child.props.width) settleWidth += child.props.width
        else autoCount += 1
      }
    })

    const autoWidth = autoCount > 0 ? (1 - settleWidth) / autoCount : 0

    const className = classnames(this.props.className, getGrid({ width, offset, responsive }))

    const style = Object.assign({}, this.props.style)
    if (gutter && gutter > 0) {
      style.width = 'auto'
      style.display = 'block'
      style.marginLeft = `${0 - gutter / 2}px`
      style.marginRight = `${0 - gutter / 2}px`
    }

    return (
      <div {...other} style={style} className={className}>
        {Children.toArray(children).map((child: React.ReactElement<GridProps, any>) => {
          if (child.type && child.type.isGrid) {
            const pps: { style: React.CSSProperties; width?: number } = { style: Object.assign({}, child.props.style) }
            if (!child.props.width) pps.width = autoWidth
            if (stretch) pps.style = { ...pps.style, minHeight: '100%', height: '100%' }
            if (gutter && gutter > 0) {
              pps.style = { ...pps.style, paddingLeft: gutter / 2, paddingRight: gutter / 2 }
            }

            return cloneElement(child, pps)
          }
          return child
        })}
      </div>
    )
  }
}
