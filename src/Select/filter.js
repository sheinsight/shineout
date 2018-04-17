import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default Origin => class extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    filterDelay: PropTypes.number,
    filter: PropTypes.func,
  }

  static defaultProps = {
    data: [],
    filterDelay: 400,
  }

  constructor(props) {
    super(props)
    this.state = {
      innerFilter: undefined,
    }
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(text) {
    const { filterDelay, filter } = this.props

    // not filter
    if (!text || !filter) {
      this.setState({ innerFilter: undefined })
      return
    }

    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const fn = filter(text)
      if (typeof fn === 'function') {
        this.setState({ innerFilter: fn })
      }
    }, filterDelay)
  }

  render() {
    const { data, filter, ...other } = this.props
    const { innerFilter } = this.state
    let newData = data
    if (innerFilter) {
      newData = data.filter(d => innerFilter(d))
    }

    return (
      <Origin
        {...other}
        data={newData}
        onFilter={filter ? this.handleFilter : undefined}
      />
    )
  }
}
