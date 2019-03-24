import React from 'react'
import PropTypes from 'prop-types'
import { Component } from '../component'
import { IS_NOT_MATCHED_VALUE } from './Result'
import { getKey } from '../utils/uid'

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
      console.log('filter : ', text)
      // const { filterDelay, onFilter } = this.props
      //
      // // not filter
      // if (!text) {
      //   this.setState({ filterText: '', innerFilter: undefined, innerData: undefined })
      //   if (this.timer) clearTimeout(this.timer)
      //   if (onFilter) onFilter(text)
      //   return
      // }
      //
      // if (onCreate) {
      //   const innerData = this.handleCreate(text)
      //   this.setState({ innerData })
      // }
      //
      // if (!onFilter) return
      //
      // this.setState({ filterText: text })
      //
      // if (this.timer) clearTimeout(this.timer)
      // this.timer = setTimeout(() => {
      //   const fn = onFilter(text)
      //   if (typeof fn === 'function') {
      //     this.setState({ innerFilter: fn })
      //   }
      // }, filterDelay)
    }

    render() {
      const { data, onFilter, ...other } = this.props
      const { innerFilter, innerData, filterText } = this.state
      const filterFn = onFilter ? this.handleFilter : undefined

      let newData = data
      if (innerFilter) newData = data.filter(d => innerFilter(d))
      if (innerData) {
        const newKey = getKey(innerData, other.keygen, innerData)
        newData = [innerData, ...newData.filter(d => getKey(d, other.keygen, d) !== newKey)]
      }

      return (
        <Origin
          {...other}
          filterText={filterText}
          result={this.getResultByValues()}
          data={newData}
          onFilter={filterFn}
        />
      )
    }
  }
