import React, { PureComponent, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getGrid } from './utils'

export default class Grid extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    offset: PropTypes.number,
    responsive: PropTypes.string,
    stretch: PropTypes.bool,
    style: PropTypes.object,
    width: PropTypes.number,
  }

  static isGrid = true

  render() {
    const {
      width = 1, offset, responsive, style, stretch, children, ...other
    } = this.props

    let autoCount = 0
    let settleWidth = 0
    Children.toArray(children).forEach((child) => {
      if (child.type && child.type.isGrid) {
        if (child.props.width) settleWidth += child.props.width
        else autoCount += 1
      }
    })

    const autoWidth = autoCount > 0 ? (1 - settleWidth) / autoCount : 0

    const className = classnames(
      this.className,
      getGrid({ width, offset, responsive }),
    )

    return (
      <div style={style} className={className} {...other}>
        {
          Children.toArray(children).map((child) => {
            if (child.type && child.type.isGrid) {
              if (child.props.width && !stretch) return child

              const pps = {}
              if (!child.props.width) pps.width = autoWidth
              if (stretch) pps.style = { ...child.props.style, minHeight: '100%', height: '100%' }

              return cloneElement(child, pps)
            }
            return child
          })
        }
      </div>
    )
  }
}
