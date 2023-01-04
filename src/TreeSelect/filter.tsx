import React from 'react'
import { Component } from '../component'
import { getFilterTree } from '../utils/tree'
import { IS_NOT_MATCHED_VALUE } from './Result'
import { keyType } from '../@types/common'
import { FilterProps, GetFilterProps, ResultValue, UnMatchedValue } from './Props'

const DefaultValue = {
  data: [],
  filterDelay: 300,
  showHitDescendants: false,
}

interface FilterState<Item> {
  innerFilter?: (data: Item) => boolean
  innerData?: Item[]
  filterText: string
}

export default <Item, Value>(Origin: React.ComponentType<GetFilterProps<FilterProps<Item, Value>, Item, Value>>) =>
  class Filter extends Component<FilterProps<Item, Value>, FilterState<Item>> {
    static defaultProps = DefaultValue

    resultCache: Map<keyType, ResultValue<Value>>

    timer: NodeJS.Timer

    constructor(props: FilterProps<Item, Value>) {
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
        value = value.concat([].concat(this.props.value as any).filter(v => v && value.indexOf(v) === -1))
      }
      const result: ResultValue<Value>[] = []
      value.forEach(v => {
        let res = noCache ? undefined : this.resultCache.get(v)
        if (!res) {
          res = (datum.getDataById(v) as unknown) as ResultValue<Value>
          if (res && !noCache && !(res as UnMatchedValue<Value>)[IS_NOT_MATCHED_VALUE]) this.resultCache.set(v, res)
          else if (!res) res = { [IS_NOT_MATCHED_VALUE]: true, value: (v as unknown) as Value }
        }
        if (res) {
          result.push(res)
        }
      })
      return result
    }

    handleFilter(text: string, from = 'edit') {
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
      const {
        data = DefaultValue.data,
        onFilter,
        expanded,
        showHitDescendants = DefaultValue.showHitDescendants,
        ...other
      } = this.props
      const { innerFilter, filterText } = this.state
      const filterFn = onFilter ? this.handleFilter : undefined
      let newData = data
      let newExpanded = expanded
      if (innerFilter) {
        const filterExpandedKeys: string[] = []
        newData = getFilterTree(
          data,
          innerFilter,
          filterExpandedKeys,
          (node: Item) => this.props.datum.getKey(node),
          other.childrenKey,
          showHitDescendants,
          undefined,
          { advanced: other.onAdvancedFilter }
        ) as Item[]
        newExpanded = filterExpandedKeys as any
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
