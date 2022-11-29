import React, { ReactNode } from 'react'
import immer from 'immer'
import { PureComponent } from '../component'
import { compareColumns } from '../utils/shallowEqual'
import { getKey } from '../utils/uid'
import Tr from './Tr'
import { tableClass } from './styles'
import { TbodyProps, ColumnItemWithFixed, Row } from './Props'
import { keyType } from '../@types/common'
import { isFunc } from '../utils/is'

export const RENDER_COL_GROUP_EVENT = 'RENDER_COL_GROUP_EVENT'

function ignoreBorderRight<DataItem>(rows: RowData<DataItem>[][]) {
  rows.forEach(row => {
    const lastColumn = row[row.length - 1]
    if (lastColumn) {
      lastColumn.ignoreBorderRight = true
    }
  })
}

interface RowData<DataItem> extends Row<DataItem> {
  ignoreBorderRight: boolean
  content?: ReactNode
}

function format<DataItem, Value>(
  columns: TbodyProps<DataItem, Value>['columns'],
  data: DataItem,
  nextRow: (RowData<DataItem> | null)[],
  index: number,
  expandKeys?: keyType[]
) {
  const row = columns.map((col, i) => {
    const cell = { index, data, expandKeys } as RowData<DataItem>
    cell.colSpan = typeof col.colSpan === 'function' ? col.colSpan(data, index) : 1
    if (cell.colSpan < 1) cell.colSpan = 1

    const { rowSpan } = col
    if (rowSpan && nextRow && nextRow[i]) {
      if (col.type !== 'checkbox') {
        if (typeof col.render === 'string') {
          cell.content = data[col.render]
        } else if (isFunc(col.render)) {
          cell.content = col.render(data, index)
        }
      }
      const isEqual =
        rowSpan === true
          ? nextRow[i] && cell.content === nextRow[i]!.content
          : nextRow[i] && typeof rowSpan === 'function' && rowSpan(data, nextRow[i]!.data)

      const nextTd = nextRow[i]
      if (isEqual && nextTd && nextTd.colSpan === cell.colSpan) {
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

interface TbodyState {
  expand: Record<string, boolean>
}
class Tbody<DataItem, Value> extends PureComponent<TbodyProps<DataItem, Value>, TbodyState> {
  colgroupSetted: boolean

  keys: Record<string, boolean>

  body: HTMLTableSectionElement

  constructor(props: TbodyProps<DataItem, Value>) {
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

  componentDidUpdate(prevProps: TbodyProps<DataItem, Value>) {
    const { onScrollTop, data } = this.props
    if (onScrollTop && prevProps.data.length && data.length === 0) onScrollTop()
    if (this.props.resize || !this.colgroupSetted || !compareColumns(prevProps.columns, this.props.columns)) {
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

  bindBody(el: HTMLTableSectionElement) {
    this.body = el
  }

  handleExpand(key: keyType, render: ReactNode) {
    this.setState(
      immer(draft => {
        if (render) draft.expand[key] = render
        else delete draft.expand[key]
      })
    )
  }

  findExpandFunc(key: keyType, i: number) {
    //
    // (rowData: DataItem, index?: number) => ReactNode
    const { columns, expandKeys, data, externalExpandRender, index } = this.props
    const expandableObj =
      columns.find(c => c.type === 'expand' || c.type === 'row-expand') || ({} as ColumnItemWithFixed<DataItem>)
    const idx = i + index
    if (expandKeys) {
      const expanded = expandKeys.find(k => k === key)
      if (externalExpandRender) return expanded !== undefined ? externalExpandRender(data[i], idx) : undefined
      const expandObj = expanded !== undefined ? expandableObj : ({} as ColumnItemWithFixed<DataItem>)
      const { render } = expandObj
      return render && isFunc(render) ? render(data[i], idx) : undefined
    }
    if (this.state.expand[key]) {
      const { render } = expandableObj
      if (externalExpandRender) return externalExpandRender(data[i], idx)
      return render && isFunc(render) ? render(data[i], idx) : undefined
    }
    return undefined
  }

  renderTr(row: Row<DataItem>[], i: number) {
    const { columns, keygen, data, sorter, index, expandKeys, colgroup, ...other } = this.props

    let key = getKey(data[i], keygen, index + i)
    if (this.keys[key]) {
      const converted = `${key}-${index + i}`
      console.warn(
        `Tr has same key: (${key}). Already converted with (${converted}), Please check the 'keygen' property.`
      )
      key = converted
    }
    this.keys[key] = true
    const originKey = key
    // seems to be useless code
    // if (sorter && sorter.order) {
    //   key = `${key}-${sorter.index}-${sorter.order}`
    // }
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
        expandRender={this.findExpandFunc(originKey, i)}
      />
    )
  }

  renderPlaceholderTr() {
    const { columns, data } = this.props
    return (
      <tr className={tableClass('placeholder-tr')} key={`so-placeholder-${new Date().getTime()}`}>
        {columns.map((v, i) => {
          if (!v) return <td key={i} />
          if (v.minWidth) {
            return (
              <td key={i} style={{ padding: 0, border: 'none' }}>
                <div style={{ width: v.minWidth }}>
                  {v.title && typeof v.title === 'function' ? v.title(data) : v.title}
                </div>
              </td>
            )
          }
          if (v.title) {
            return (
              <td key={i}>
                <div>{typeof v.title === 'function' ? v.title(data) : v.title}</div>
              </td>
            )
          }
          if (v.type === 'checkbox' || v.type === 'expand' || v.type === 'row-expand') {
            return <td key={i} className={tableClass('placeholder-checkbox')} />
          }
          return <td key={i} />
        })}
      </tr>
    )
  }

  renderTrs(rows: RowData<DataItem>[][]) {
    const { columns, colgroup } = this.props
    const minWidthSup = columns.find(d => d.minWidth)
    const trs = rows.map(this.renderTr)
    if (!minWidthSup || colgroup) return trs
    return [this.renderPlaceholderTr()].concat(trs)
  }

  render() {
    const { index, data, columns, expandKeys, bordered } = this.props
    const rows: RowData<DataItem>[][] = []
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
      ignoreBorderRight(rows)
    }
    this.keys = {}
    return <tbody ref={this.bindBody}>{this.renderTrs(rows)}</tbody>
  }
}

export default Tbody
