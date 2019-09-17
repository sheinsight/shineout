import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { PureComponent } from '../component'
import { getProps } from '../utils/proptypes'
import { compareColumns } from '../utils/shallowEqual'
import { getKey } from '../utils/uid'
import Tr from './Tr'

export const RENDER_COL_GROUP_EVENT = 'RENDER_COL_GROUP_EVENT'

function ignoreBorderRight(rows) {
  rows.forEach(row => {
    const lastColumn = row[row.length - 1]
    if (lastColumn) {
      lastColumn.ignoreBorderRight = true
    }
  })
}

function ignoreBorderBottom(rows) {
  const emptyColumn = {}
  const lastLine = rows[rows.length - 1]
  if (!lastLine) return
  lastLine.forEach((column, index) => {
    if (column === null) {
      emptyColumn[index] = true
    }
  })
  if (Object.keys(emptyColumn).length === 0) return
  for (let i = rows.length - 2; i >= 0; i--) {
    const row = rows[i]
    Object.keys(emptyColumn).forEach(emptyIndex => {
      const index = parseInt(emptyIndex, 10)
      if (row[index]) {
        row[index].ignoreBorderBottom = true
        delete emptyColumn[emptyIndex]
      }
    })
    if (row.indexOf(null) === -1) break
  }
}

function format(columns, data, nextRow, index, expandKeys) {
  const row = columns.map((col, i) => {
    const cell = { index, data, expandKeys }
    cell.colSpan = typeof col.colSpan === 'function' ? col.colSpan(data, index) : 1
    if (cell.colSpan < 1) cell.colSpan = 1

    const { rowSpan } = col
    if (rowSpan && nextRow) {
      if (col.type !== 'checkbox') {
        cell.content = typeof col.render === 'string' ? data[col.render] : col.render(data, index)
      }
      const isEqual =
        rowSpan === true
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

    this.bodyRender = this.bodyRender.bind(this)
    this.bindBody = this.bindBody.bind(this)
    this.renderTr = this.renderTr.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
    this.findExpandFunc = this.findExpandFunc.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    this.bodyRender()
  }

  componentDidUpdate(prevProps) {
    if (!this.colgroupSetted || !compareColumns(prevProps.columns, this.props.columns)) {
      setTimeout(() => {
        this.bodyRender()
      })
    }
  }

  bodyRender() {
    const { onBodyRender, datum } = this.props
    if (!onBodyRender || !this.body) return
    datum.unsubscribe(RENDER_COL_GROUP_EVENT, this.bodyRender)
    if (this.body.clientHeight === 0) {
      datum.subscribe(RENDER_COL_GROUP_EVENT, this.bodyRender)
      return
    }
    const tr = this.body.querySelector('tr')
    if (!tr) return
    this.colgroupSetted = true
    onBodyRender(tr.querySelectorAll('td'))
  }

  bindBody(el) {
    this.body = el
  }

  handleExpand(key, render) {
    this.setState(
      immer(draft => {
        if (render) draft.expand[key] = render
        else delete draft.expand[key]
      })
    )
  }

  findExpandFunc(key, index) {
    const { columns, expandKeys, data } = this.props
    if (expandKeys) {
      const expanded = expandKeys.find(k => k === key)
      const expandObj = expanded ? columns.find(c => c.type === 'expand' || c.type === 'row-expand') : {}
      return expandObj.render ? expandObj.render(data[index]) : undefined
    }
    return this.state.expand[key]
  }

  renderTr(row, i) {
    const { columns, keygen, data, sorter, index, expandKeys, ...other } = this.props

    let key = getKey(data[i], keygen, index + i)
    const originKey = key
    if (sorter && sorter.order) {
      key = `${key}-${sorter.index}-${sorter.order}`
    }
    return (
      <Tr
        {...other}
        index={i + index}
        key={key}
        originKey={originKey}
        data={row}
        rowData={data[i]}
        columns={columns}
        rowKey={key}
        onExpand={this.handleExpand}
        expandRender={this.findExpandFunc(key, i)}
      />
    )
  }

  render() {
    const { index, data, columns, expandKeys, bordered } = this.props
    const rows = []
    for (let i = data.length - 1; i >= 0; i--) {
      const d = data[i]
      rows.unshift(
        format(columns, d, rows[0], index + i, expandKeys).map(col => {
          delete col.content
          return col
        })
      )
    }

    if (rows.length > 0 && bordered) {
      ignoreBorderBottom(rows)
      ignoreBorderRight(rows)
    }

    return <tbody ref={this.bindBody}>{rows.map(this.renderTr)}</tbody>
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
  dataUpdated: PropTypes.bool,
  bordered: PropTypes.bool,
}

Tbody.defaultProps = {
  onBodyRender: undefined,
}

export default Tbody
