import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import hash from '../utils/hash'
import { tableClass } from '../styles'
import SimpleTable from './SimpleTable'

class Table extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      colgroup: null,
    }
  }

  renderSimple() {
    const { columns, children, data } = this.props
    const { colgroup } = this.state

    return (
      <SimpleTable
        columns={columns}
        colgroup={colgroup}
        data={data}
      >
        {children}
      </SimpleTable>
    )
  }

  render() {
    const {
      style, striped, bordered, size, hover,
    } = this.props
    const className = classnames(
      tableClass(
        '_',
        size,
        hover && !striped && 'hover',
        striped && 'striped',
        bordered && 'bordered',
      ),
      this.props.className,
    )

    return (
      <div className={className} style={style}>
        { this.renderSimple() }
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
  hover: PropTypes.bool,
  loading: PropTypes.bool,
  striped: PropTypes.bool,
}

Table.defaultProps = {
  ...defaultProps,
  hover: true,
}

const handleColumns = T => ({ columns, ...props }) => {
  if (!columns) return <T {...props} />
  const cols = columns.map((c) => {
    if (c.key) return c
    return Object.assign({}, c, { key: hash(c) })
  })
  return <T columns={cols} {...props} />
}

export default handleColumns(Table)
