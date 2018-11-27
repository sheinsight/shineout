import React from 'react'
import PropTypes from 'prop-types'
import PureComponent from '../PureComponent'
import { getKey } from '../utils/uid'

export default Origin => class extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    datum: PropTypes.object,
    filterDelay: PropTypes.number,
    keygen: PropTypes.any,
    onFilter: PropTypes.func,
    onCreate: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool,
    ]),
    value: PropTypes.any,
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
    this.handleCreate = this.handleCreate.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.getResultByValues = this.getResultByValues.bind(this)

    this.resultCache = new Map()
  }

  getResult(value) {
    const { data, datum, onCreate } = this.props
    if (onCreate) return this.handleCreate(value)

    const prediction = datum.prediction || ((v, d) => v === datum.format(d))
    for (let i = 0, count = data.length; i < count; i++) {
      const d = data[i]
      if (prediction(value, d)) return d
    }

    return undefined
  }

  getResultByValues() {
    const { datum, value } = this.props
    if (value === undefined) return []

    const values = [...datum.values]

    const result = []
    values.forEach((v) => {
      let res = this.resultCache.get(v)
      if (!res) {
        res = this.getResult(v)
        this.resultCache.set(v, res)
      }
      if (res) { result.push(res) }
    })

    return result
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
      const innerData = this.handleCreate(text)
      this.setState({ innerData })
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

  handleCreate(text) {
    const { onCreate } = this.props
    const createFn = typeof onCreate === 'boolean' ? (t => t) : onCreate
    return createFn(text)
  }

  render() {
    const {
      data, onFilter, onCreate, ...other
    } = this.props
    const { innerFilter, innerData, filterText } = this.state
    const filterFn = onFilter || onCreate ? this.handleFilter : undefined

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
        inputable={!!onCreate}
        onCreate={onCreate ? this.handleCreate : undefined}
        data={newData}
        onFilter={filterFn}
      />
    )
  }
}
