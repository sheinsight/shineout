import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps } from '../utils/proptypes'
import { gapClass } from './styles'
import support from './support'

const flexGapSupport = support()
class Gap extends PureComponent {
  getStyle() {
    const { row, column, style } = this.props
    const extendStyle = flexGapSupport ? { rowGap: row, columnGap: column } : { marginBottom: -row }
    return Object.assign({}, style, extendStyle)
  }

  getItemStyle(index) {
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
            !!child && (
              <div className={gapClass('item')} style={this.getItemStyle(index)}>
                {child}
              </div>
            )
        )}
      </div>
    )
  }
}

Gap.propTypes = {
  ...getProps(PropTypes),
  row: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  column: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  itemStyle: PropTypes.object,
}

Gap.defaultProps = {
  row: 8,
  column: 8,
}

export default Gap
