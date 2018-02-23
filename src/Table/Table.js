import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { tableClass } from '../styles'
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

  renderSimple() {
    const { columns, children, data } = this.props

    return (
      <SimpleTable
        columns={columns}
        data={data}
      >
        {children}
      </SimpleTable>
    )
  }

  render() {
    const {
      striped, bordered, size, hover, height, columns, children,
      data, style, fixed, width, loading, ...others
    } = this.props

    const { scrollLeft, scrollRight } = this.state

    const className = classnames(
      tableClass(
        '_',
        size,
        hover && !striped && 'hover',
        striped && 'striped',
        bordered && 'bordered',
        fixed && 'fixed',
        scrollLeft > 0 && 'left-float',
        scrollRight < 0 && 'right-float',
      ),
      this.props.className,
    )

    const props = {
      ...others,
      fixed,
      height,
      width,
      data,
      columns,
      scrollLeft,
    }

    return (
      <div className={className} ref={this.bindTable} style={style}>
        {
          fixed
          ? <SeperateTable {...props} />
          : <SimpleTable {...props}>{children}</SimpleTable>
        }
        {
          loading &&
          <div className={tableClass('loading')}>
            {typeof loading === 'boolean' ? <Spin size={40} /> : loading}
          </div>
        }
      </div>
    )
  }
}

Table.propTypes = {
  ...getProps('size', 'type', 'keygen'),
  bordered: PropTypes.bool,
  children: PropTypes.any,
  columns: PropTypes.array,
  data: PropTypes.array,
  fixed: PropTypes.oneOf(['x', 'y', 'both']),
  height: PropTypes.number,
  hover: PropTypes.bool,
  loading: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  rowsInView: PropTypes.number,
  striped: PropTypes.bool,
  width: PropTypes.number,
}

Table.defaultProps = {
  ...defaultProps,
  hover: true,
  rowsInView: 20,
}

export default Table
