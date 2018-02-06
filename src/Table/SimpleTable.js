import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getProps, defaultProps } from '../utils/proptypes'
import Colgroup from './Colgroup'
import Thead from './Thead'
import Tbody from './Tbody'

class Table extends PureComponent {
  render() {
    const {
      children, columns, colgroup, data, width,
    } = this.props

    if (!columns) {
      return <table style={{ width }}>{children}</table>
    }

    return (
      <table style={{ width }}>
        <Colgroup columns={columns} colgroup={colgroup} />
        <Thead columns={columns} />
        { data && <Tbody columns={columns} data={data} /> }
        {children}
      </table>
    )
  }
}

Table.propTypes = {
  ...getProps('size', 'type', 'kengen'),
  children: PropTypes.any,
  colgroup: PropTypes.array,
  columns: PropTypes.array,
  data: PropTypes.array,
  width: PropTypes.number,
}

Table.defaultProps = {
  ...defaultProps,
}

export default Table

