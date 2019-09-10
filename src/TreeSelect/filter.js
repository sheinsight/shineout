import React from 'react'
import PropTypes from 'prop-types'
import { Component } from '../component'
import { getFilterTree } from '../utils/tree'
import { IS_NOT_MATCHED_VALUE } from './Result'

export default Origin =>
  class extends Component {
    static propTypes = {
      datum: PropTypes.object,
      data: PropTypes.array,
      filterDelay: PropTypes.number,
      keygen: PropTypes.any,
      onFilter: PropTypes.func,
      value: PropTypes.any,
      noCache: PropTypes.bool,
      expanded: PropTypes.arrayOf(PropTypes.string),
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
        filterText: '',
      }
      this.handleFilter = this.handleFilter.bind(this)
      this.getResultByValues = this.getResultByValues.bind(this)

      this.resultCache = new Map()
    }

    componentDidUpdate(prevProps) {
      if (prevProps.data !== this.props.data) this.datumPathMap = null
    }

    getResultByValues() {
      const { datum, noCache } = this.props
      const value = datum.getValue() || []
      const result = []
      value.forEach(v => {
        let res = noCache ? undefined : this.resultCache.get(v)
        if (!res) {
          res = datum.getDataById(v)
          if (res && !noCache) this.resultCache.set(v, res)
          else if (!res) res = { [IS_NOT_MATCHED_VALUE]: true, value: v }
        }
        if (res) {
          result.push(res)
        }
      })
      return result
    }

    handleFilter(text) {
      const { filterDelay, onFilter, datum } = this.props

      if (!this.datumPathMap && datum.pathMap.size > 0) {
        this.datumPathMap = datum.pathMap
        datum.setFilterPathMap(this.datumPathMap)
      }

      // not filter
      if (!text) {
        this.setState({ filterText: '', innerFilter: undefined, innerData: undefined })
        if (this.timer) clearTimeout(this.timer)
        if (onFilter) onFilter(text)
        return
      }

      if (!onFilter) return

      this.setState({ filterText: text })

      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const fn = onFilter(text)
        if (typeof fn === 'function') {
          this.setState({ innerFilter: fn })
        }
      }, filterDelay)
    }

    render() {
      const { data, onFilter, expanded, ...other } = this.props
      const { innerFilter, filterText } = this.state
      const filterFn = onFilter ? this.handleFilter : undefined

      let newData = data
      let newExpanded = expanded
      if (innerFilter) {
        const filterExpandedKeys = []
        newData = getFilterTree(data, innerFilter, filterExpandedKeys, node => this.props.datum.getKey(node))
        newExpanded = filterExpandedKeys
      }

      return (
        <Origin
          {...other}
          filterText={filterText}
          result={this.getResultByValues()}
          data={newData}
          onFilter={filterFn}
          expanded={newExpanded}
        />
      )
    }
  }
