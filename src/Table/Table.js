import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getLocale } from '../locale'
import { getProps, defaultProps } from '../utils/proptypes'
import { tableClass } from '../styles'
import Datum from '../Datum'
import Spin from '../Spin'
import SimpleTable from './SimpleTable'
import SeperateTable from './SeperateTable'

class Table extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      scrollLeft: 0,
      scrollRight: 0,
    }

    this.bindTable = this.bindTable.bind(this)
  }

  bindTable(el) {
    this.table = el
  }

  render() {
    const {
      striped, bordered, size, hover, height, columns, value, children, empty,
      data, style, fixed, width, loading, verticalAlign, ...others
    } = this.props

    const { scrollLeft, scrollRight } = this.state

    const className = classnames(
      tableClass(
        '_',
        size,
        hover && !striped && 'hover',
        bordered && 'bordered',
        fixed && 'fixed',
        scrollLeft > 0 && 'left-float',
        scrollRight < 0 && 'right-float',
        `vertical-${verticalAlign}`,
      ),
      this.props.className,
    )

    const props = {
      ...others,
      children,
      fixed,
      loading,
      height,
      width,
      data,
      columns,
      scrollLeft,
      striped,
    }

    const RenderTable = fixed ? SeperateTable : SimpleTable
    let newStyle = style
    if (height) newStyle = Object.assign({}, style, { height })

    return (
      <div className={className} ref={this.bindTable} style={newStyle}>
        <RenderTable {...props} />
        {
          loading &&
          <div className={tableClass('loading')}>
            {typeof loading === 'boolean' ? <Spin size={40} /> : loading}
          </div>
        }
        {
          (!data || data.length === 0) && !children &&
          <div className={tableClass('empty')}>{empty || getLocale('noData')}</div>
        }
      </div>
    )
  }
}

Table.propTypes = {
  ...getProps(PropTypes, 'size', 'type', 'keygen'),
  bordered: PropTypes.bool,
  children: PropTypes.any,
  columns: PropTypes.array,
  data: PropTypes.array,
  empty: PropTypes.any,
  fixed: PropTypes.oneOf(['x', 'y', 'both']),
  height: PropTypes.number,
  hover: PropTypes.bool,
  loading: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  rowsInView: PropTypes.number,
  striped: PropTypes.bool,
  verticalAlign: PropTypes.oneOf(['top', 'middle']),
  width: PropTypes.number,
}

Table.defaultProps = {
  ...defaultProps,
  hover: true,
  rowsInView: 20,
  verticalAlign: 'top',
}

export default Datum.hoc({ bindProps: ['disabled', 'format', 'prediction'] }, Table)
