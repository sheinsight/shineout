import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { tableClass } from '../styles'

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
    const changed = index === current.index && defaultOrder === current.order
    if (defaultOrder && !changed && !current.manual) this.handleChange(defaultOrder, false)
  }

  handleChange(order, manual = true) {
    const { sorter, index, onChange, current } = this.props
    const isCancel = index === current.index && order === current.order
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
    const { current, index } = this.props
    const active = current.index === index

    return (
      <div className={tableClass('sorter-container')}>
        <a
          key="asc"
          className={tableClass(active && current.order === 'asc' && 'sorter-active', 'sorter-asc')}
          onClick={this.handleAsc}
        >
          &nbsp;
        </a>
        <a
          key="desc"
          className={tableClass(active && current.order === 'desc' && 'sorter-active', 'sorter-desc')}
          onClick={this.handleDesc}
        >
          &nbsp;
        </a>
      </div>
    )
  }
}

Sorter.propTypes = {
  current: PropTypes.object,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  sorter: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  defaultOrder: PropTypes.oneOf(['desc', 'asc']),
}

Sorter.defaultProps = {
  current: {},
}

export default Sorter
