import React, { Component } from 'react'
import PropTypes from 'prop-types'
import deepEqual from 'deep-eql'
import { getProps } from '../utils/proptypes'
import { getKey } from '../utils/uid'
import Tr from './Tr'

function format(columns, data, nextRow, index) {
  const row = columns.map((col, i) => {
    let content
    if (col.type !== 'checkbox') {
      content = typeof col.render === 'string'
        ? data[col.render]
        : col.render(data, index)
    }

    const cell = { content, index, data }
    cell.colSpan = typeof col.colSpan === 'function' ? col.colSpan(data, index) : 1
    if (cell.colSpan < 1) cell.colSpan = 1

    const { rowSpan } = col
    if (rowSpan && nextRow) {
      const isEqual = rowSpan === true
        ? content === nextRow[i].content
        : typeof rowSpan === 'function' && rowSpan(data, nextRow[i].data)

      const nextTd = nextRow[i]
      if (isEqual && nextTd.colSpan === cell.colSpan) {
        cell.rowSpan = (nextTd.rowSpan || 1) + 1
        let j = cell.colSpan || 1
        while (j) {
          j -= 1
          nextRow[i + j] = null
        }
      }
    }

    return cell
  })

  return row
}


class Tbody extends Component {
  constructor(props) {
    super(props)

    this.bindBody = this.bindBody.bind(this)
    this.renderTr = this.renderTr.bind(this)
  }

  componentDidMount() {
    const { onBodyRender } = this.props
    if (onBodyRender) {
      const tds = this.body.querySelector('tr').querySelectorAll('td')
      onBodyRender(tds)
    }
  }

  shouldComponentUpdate(nextProps) {
    const { loading } = nextProps
    if (loading) return false

    return !(
      deepEqual(this.props.data, nextProps.data)
      && deepEqual(this.props.columns, nextProps.columns)
    )
  }

  bindBody(el) {
    this.body = el
  }

  renderTr(row, index) {
    const {
      columns, keygen, data, sorter, ...other
    } = this.props

    let key = getKey(data[index], keygen, row.index)
    if (sorter && sorter.order) {
      key = `${key}-${sorter.index}-${sorter.order}`
    }

    return (
      <Tr
        {...other}
        key={key}
        data={row}
        columns={columns}
      />
    )
  }

  render() {
    const { index, data, columns } = this.props
    // const rows = formatRows(index, data, columns)
    const rows = []
    for (let i = data.length - 1; i >= 0; i--) {
      const d = data[i]
      rows.unshift(format(columns, d, rows[0], index + i))
    }

    return (
      <tbody ref={this.bindBody}>
        {rows.map(this.renderTr)}
      </tbody>
    )
  }
}

Tbody.propTypes = {
  ...getProps('keygen'),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  offsetLeft: PropTypes.number,
  offsetRight: PropTypes.number,
  onBodyRender: PropTypes.func,
  values: PropTypes.object,
}

Tbody.defaultProps = {
  onBodyRender: undefined,
}

export default Tbody
