import React from 'react'
import PropTypes from 'prop-types'
import { tableClass } from './styles/index'
import { isArray } from '../utils/is'

class Tfoot extends React.PureComponent {
  getTrs() {
    let { foots = [] } = this.props
    if (!isArray(foots[0])) {
      foots = [foots]
    }
    const trs = []
    for (let i = 0; i < foots.length; i++) {
      const row = foots[i]
      trs[i] = []
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

  renderTd(item, index) {
    const { render, colSpan = 1 } = item
    const { columns } = this.props
    const content = render()
    const fixed = {}
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

Tfoot.propTypes = {
  foots: PropTypes.array,
  columns: PropTypes.array,
}

export default Tfoot
