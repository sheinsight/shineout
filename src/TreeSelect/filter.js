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
      showHitDescendants: PropTypes.bool,
      renderUnmatched: PropTypes.func,
      onAdvancedFilter: PropTypes.bool,
    }

    static defaultProps = {
      data: [],
      filterDelay: 300,
      showHitDescendants: false,
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

    getResultByValues() {
      const { datum, noCache, renderUnmatched } = this.props
      let value = datum.getValue() || []
      if (renderUnmatched) {
        value = value.concat([].concat(this.props.value).filter(v => v && value.indexOf(v) === -1))
      }
      const result = []
      value.forEach(v => {
        let res = noCache ? undefined : this.resultCache.get(v)
        if (!res) {
          res = datum.getDataById(v)
          if (res && !noCache && !res[IS_NOT_MATCHED_VALUE]) this.resultCache.set(v, res)
        }
        if (res) {
          result.push(res)
        }
      })
      return result
    }

    handleFilter(text, from = 'edit') {
      const { filterDelay, onFilter } = this.props

      // not filter
      if (!text) {
        this.setState({ filterText: '', innerFilter: undefined, innerData: undefined })
        if (this.timer) clearTimeout(this.timer)
        if (onFilter) onFilter(text, from)
        return
      }

      if (!onFilter) return

      this.setState({ filterText: text })

      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const fn = onFilter(text, from)
        if (typeof fn === 'function') {
          this.setState({ innerFilter: fn })
        }
      }, filterDelay)
    }

    render() {
      const { data, onFilter, expanded, showHitDescendants, ...other } = this.props
      const { innerFilter, filterText } = this.state
      const filterFn = onFilter ? this.handleFilter : undefined
      let newData = data
      let newExpanded = expanded
      if (innerFilter) {
        const filterExpandedKeys = []
        newData = getFilterTree(
          data,
          innerFilter,
          filterExpandedKeys,
          node => this.props.datum.getKey(node),
          other.childrenKey,
          showHitDescendants,
          undefined,
          { advanced: other.onAdvancedFilter }
        )
        newExpanded = filterExpandedKeys
      }

      return (
        <Origin
          {...other}
          filterText={filterText}
          result={this.getResultByValues()}
          data={newData}
          rawData={data}
          onFilter={filterFn}
          expanded={newExpanded}
        />
      )
    }
  }
