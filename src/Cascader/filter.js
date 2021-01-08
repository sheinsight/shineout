import React from 'react'
import PropTypes from 'prop-types'
import { getKey } from '../utils/uid'
import { Component } from '../component'
import { getFilterTree } from '../utils/tree'

export default Origin =>
  class extends Component {
    static propTypes = {
      onFilter: PropTypes.func,
      filterDelay: PropTypes.number,
      data: PropTypes.array,
      childrenKey: PropTypes.string,
      keygen: PropTypes.any,
    }

    static defaultProps = {
      filterDelay: 400,
    }

    constructor(props) {
      super(props)
      this.handleFilter = this.handleFilter.bind(this)
      this.state = {
        filterText: '',
      }
    }

    getData() {
      const { data, childrenKey, onFilter, keygen } = this.props
      const { filterText } = this.state
      if (!filterText) return data
      const filterFunc = onFilter(filterText)
      if (!filterFunc) return data
      return getFilterTree(data, filterFunc, undefined, node => getKey(node, keygen), childrenKey, true)
    }

    handleFilter(filterText) {
      const { filterDelay } = this.props
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.setState({ filterText })
      }, filterDelay)
    }

    render() {
      const { onFilter } = this.props
      const { filterText } = this.state
      if (!onFilter) return <Origin {...this.props} />
      return <Origin {...this.props} data={this.getData()} filterText={filterText} onFilter={this.handleFilter} />
    }
  }
