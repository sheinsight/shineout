import React, { PureComponent } from 'react'
import { tableClass } from './styles'
import { ColumnOrder, SorterProps } from './Props'

class Sorter<DataItem, Value> extends PureComponent<SorterProps<DataItem, Value>> {
  constructor(props: SorterProps<DataItem, Value>) {
    super(props)
    this.handleAsc = this.handleAsc.bind(this)
    this.handleDesc = this.handleDesc.bind(this)
  }

  componentDidMount() {
    this.defaultSorterOrder()
  }

  componentDidUpdate() {
    this.defaultSorterOrder()
  }

  defaultSorterOrder() {
    const { defaultOrder, current = [], keyStr } = this.props
    if (current.length !== 1) return
    const item = current[0]
    const changed = keyStr === item.key && defaultOrder === item.order
    if (defaultOrder && !changed && !item.manual) this.handleChange(defaultOrder, false)
  }

  handleChange(order: ColumnOrder, manual = true) {
    const { sorter, keyStr, onChange, current = [] } = this.props
    const item = current.find(v => v.key === keyStr)
    const isCancel = !!item && order === item.order
    const finalOrder = isCancel ? undefined : order
    onChange(finalOrder, sorter, keyStr, order, manual)
  }

  handleAsc() {
    this.handleChange('asc')
  }

  handleDesc() {
    this.handleChange('desc')
  }

  render() {
    const { current = [], keyStr, renderSorter } = this.props
    const item = current.find(v => v.key === keyStr)
    const active = !!item
    const isCustomRender = renderSorter && typeof renderSorter === 'function'

    return (
      <div className={tableClass('sorter-container')}>
        {isCustomRender ? (
          renderSorter({
            status: active ? item.order : undefined,
            triggerAsc: this.handleAsc,
            triggerDesc: this.handleDesc,
          })
        ) : (
          <>
            <a
              key="asc"
              className={tableClass(active && item.order === 'asc' && 'sorter-active', 'sorter-asc')}
              onClick={this.handleAsc}
            >
              &nbsp;
            </a>
            <a
              key="desc"
              className={tableClass(active && item.order === 'desc' && 'sorter-active', 'sorter-desc')}
              onClick={this.handleDesc}
            >
              &nbsp;
            </a>
          </>
        )}
      </div>
    )
  }
}

export default Sorter
