import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { getProps } from '../utils/proptypes'
import { getKey } from '../utils/uid'
import Tr from './Tr'

function format(columns, data, nextRow, index) {
  const row = columns.map((col, i) => {
    const cell = { index, data }
    cell.colSpan = typeof col.colSpan === 'function' ? col.colSpan(data, index) : 1
    if (cell.colSpan < 1) cell.colSpan = 1

    const { rowSpan } = col
    if (rowSpan && nextRow) {
      cell.content = typeof col.render === 'string'
        ? data[col.render]
        : col.render(data, index)
      const isEqual = rowSpan === true
        ? cell.content === nextRow[i].content
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


class Tbody extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      expand: {},
    }

    this.bindBody = this.bindBody.bind(this)
    this.renderTr = this.renderTr.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
  }

  componentDidMount() {
    this.bodyRender()
  }

  componentDidUpdate(prevProps) {
    if (!this.colgroupSetted || this.props.columns.length !== prevProps.columns.length) {
      this.bodyRender()
    }
  }

  bodyRender() {
    const { onBodyRender } = this.props
    if (!onBodyRender || !this.body) return
    const tr = this.body.querySelector('tr')
    if (!tr) return
    this.colgroupSetted = true
    onBodyRender(tr.querySelectorAll('td'))
  }

  bindBody(el) {
    this.body = el
  }

  handleExpand(key, render) {
    this.setState(immer((draft) => {
      if (render) draft.expand[key] = render
      else delete draft.expand[key]
    }))
  }

  renderTr(row, i) {
    const {
      columns, keygen, data, sorter, index, ...other
    } = this.props

    let key = getKey(data[i], keygen, row.index)
    if (sorter && sorter.order) {
      key = `${key}-${sorter.index}-${sorter.order}`
    }

    return (
      <Tr
        {...other}
        index={i + index}
        key={key}
        data={row}
        columns={columns}
        rowKey={key}
        onExpand={this.handleExpand}
        expandRender={this.state.expand[key]}
      />
    )
  }

  render() {
    const { index, data, columns } = this.props
    const rows = []
    for (let i = data.length - 1; i >= 0; i--) {
      const d = data[i]
      rows.unshift(format(columns, d, rows[0], index + i).map((col) => {
        delete col.content
        return col
      }))
    }

    return (
      <tbody ref={this.bindBody}>
        {rows.map(this.renderTr)}
      </tbody>
    )
  }
}

Tbody.propTypes = {
  ...getProps(PropTypes, 'keygen'),
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
