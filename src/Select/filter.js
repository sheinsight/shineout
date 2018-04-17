import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default Origin => class extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    filter: PropTypes.func,
  }

  static defaultProps = {
    data: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      innerFilter: undefined,
    }
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(text) {
    const { filter } = this.props
    // console.log('text', text, !text, JSON.stringify(text), text.length)
    if (!text || !filter) {
      this.setState({ innerFilter: undefined })
      return
    }

    const fn = filter(text)
    if (typeof fn === 'function') {
      this.setState({ innerFilter: fn })
    }
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
