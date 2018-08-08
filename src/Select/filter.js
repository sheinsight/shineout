import React from 'react'
import PropTypes from 'prop-types'
import PureComponent from '../PureComponent'

export default Origin => class extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    filterDelay: PropTypes.number,
    onFilter: PropTypes.func,
    onCreate: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool,
    ]),
  }

  static defaultProps = {
    data: [],
    filterDelay: 300,
  }

  constructor(props) {
    super(props)
    this.state = {
      innerFilter: undefined,
      innerData: undefined,
    }
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(text) {
    const { filterDelay, onFilter, onCreate } = this.props

    // not filter
    if (!text) {
      this.setState({ innerFilter: undefined, innerData: undefined })
      if (this.timer) clearTimeout(this.timer)
      if (onFilter) onFilter(text)
      return
    }

    if (onCreate) {
      const createFn = typeof onCreate === 'boolean' ? (t => t) : onCreate
      const innerData = createFn(text)
      this.setState({ innerData })
    }

    if (!onFilter) return

    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const fn = onFilter(text)
      if (typeof fn === 'function') {
        this.setState({ innerFilter: fn })
      }
    }, filterDelay)
  }

  render() {
    const {
      data, onFilter, onCreate, ...other
    } = this.props
    const { innerFilter, innerData } = this.state
    const filterFn = onFilter || onCreate ? this.handleFilter : undefined

    let newData = data
    if (innerFilter) newData = data.filter(d => innerFilter(d))
    if (innerData) newData = [innerData, ...newData]

    return <Origin {...other} inputable={!!onCreate} data={newData} onFilter={filterFn} />
  }
}
