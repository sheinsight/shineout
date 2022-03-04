import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { tableClass } from './styles'

class Sorter extends PureComponent {
  constructor(props) {
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
    const { defaultOrder, current, index } = this.props
    if (current.length !== 1) return
    const item = current[0]
    const changed = index === item.index && defaultOrder === item.order
    if (defaultOrder && !changed && !item.manual) this.handleChange(defaultOrder, false)
  }

  handleChange(order, manual = true) {
    const { sorter, index, onChange, current } = this.props
    const item = current.find(v => v.index === index)
    const isCancel = !!item && order === item.order
    const finalOrder = isCancel ? undefined : order
    onChange(finalOrder, sorter, index, order, manual)
  }

  handleAsc() {
    this.handleChange('asc')
  }

  handleDesc() {
    this.handleChange('desc')
  }

  render() {
    const { current, index, renderSorter } = this.props
    const item = current.find(v => v.index === index)
    const active = !!item
    const isCustomRender = renderSorter && typeof renderSorter === 'function'

    return (
      <div className={tableClass('sorter-container')}>
        {isCustomRender ? (
          renderSorter({
            status: active && item.order,
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

Sorter.propTypes = {
  current: PropTypes.array,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  sorter: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]).isRequired,
  defaultOrder: PropTypes.oneOf(['desc', 'asc']),
  renderSorter: PropTypes.func,
}

export default Sorter
