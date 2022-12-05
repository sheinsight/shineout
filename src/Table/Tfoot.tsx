import React, { ReactNode } from 'react'
import { tableClass } from './styles'
import { isArray } from '../utils/is'
import { TfootProps, SummaryItem } from './Props'
import { ObjectType } from '../@types/common'

class Tfoot<DataItem, Value> extends React.PureComponent<TfootProps<DataItem, Value>> {
  getTrs() {
    let { summary = [] } = this.props
    if (!isArray(summary[0])) {
      summary = [summary as SummaryItem[]]
    }
    const summarys = summary as SummaryItem[][]
    const trs = []
    for (let i = 0; i < summarys.length; i++) {
      const row = summarys[i]
      trs[i] = [] as ReactNode[]
      let index = 0
      for (let j = 0; j < row.length; j++) {
        const item = row[j]
        const nextIndex = index + (item.colSpan || 1)
        trs[i].push(this.renderTd(item, index))
        index = nextIndex
      }
    }
    return trs
  }

  renderTd(item: SummaryItem, index: number) {
    const { render, colSpan = 1 } = item
    const { columns } = this.props
    const content = render()
    const fixed: ObjectType = {}
    const isLast = index + colSpan - 1 >= columns.length - 1
    for (let i = 0; i < colSpan; i++) {
      const col = columns[index + i] || {}
      if (col.fixed) {
        fixed[`fixed-${col.fixed}`] = true
      }
      if (col.firstFixed) {
        fixed['fixed-first'] = true
      }
      if (col.lastFixed) {
        fixed['fixed-last'] = true
      }
    }

    return (
      <td key={index} colSpan={colSpan} className={tableClass(...Object.keys(fixed), isLast && 'ignore-right-border')}>
        {content}
      </td>
    )
  }

  render() {
    const trs = this.getTrs()
    return (
      <tfoot>
        {trs.map((tr, index) => (
          <tr key={index} className={tableClass('normal')}>
            {tr}
          </tr>
        ))}
      </tfoot>
    )
  }
}

export default Tfoot
