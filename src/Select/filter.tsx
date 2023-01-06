import React from 'react'
import { getKey } from '../utils/uid'
import { getFilterTree } from '../utils/tree'
import { IS_NOT_MATCHED_VALUE } from './Result'
import { ResultValue, FilterProps } from './Props'

interface FilterState {
  innerFilter: any
  innerData: any
  filterText: string
  text: string
}

export default <Props extends FilterProps<Item, Value>, Item, Value>(Origin: React.ComponentType<Props>) =>
  class Filter extends React.Component<Props, FilterState> {
    static defaultProps = {
      data: [],
      filterDelay: 300,
      showHitDescendants: false,
    }

    resultCache: Map<Value, Item>

    timer: NodeJS.Timer

    constructor(props: Props) {
      super(props)
      this.state = {
        innerFilter: undefined,
        innerData: undefined,
        filterText: '',
        text: '',
      }
      this.handleCreate = this.handleCreate.bind(this)
      this.handleFilter = this.handleFilter.bind(this)
      this.getResultByValues = this.getResultByValues.bind(this)

      this.resultCache = new Map()
    }

    componentDidUpdate(prevProps: Props) {
      const { datum, multiple } = this.props
      if (prevProps.multiple !== multiple) {
        datum.limit = multiple ? 0 : 1
      }
    }

    getTreeResult(value: Value, prediction: (value: Value, data: Item) => boolean) {
      const { treeData, childrenKey = 'children' } = this.props
      let finded: Item | undefined
      const treeNode = (children?: Item[]) => {
        if (finded) return false
        if (!children || children.length === 0) return false
        for (let i = 0; i < children.length; i++) {
          const d = children[i]
          if (prediction(value, d)) finded = d
          // @ts-ignore
          treeNode(d[childrenKey])
        }
        return false
      }
      treeNode(treeData)
      return finded
    }

    getResult(value: Value) {
      const { data, treeData, datum, onCreate } = this.props

      const prediction = datum.prediction || ((v, d) => v === datum.format(d))
      if (treeData) return this.getTreeResult(value, prediction as (value: Value, data: Item) => boolean)

      for (let i = 0, count = data!.length; i < count; i++) {
        const d = data![i]
        if (prediction(value as any, d)) return d
      }

      if (onCreate) return this.handleCreate((value as unknown) as string) as Item

      return undefined
    }

    getResultByValues() {
      const { datum, noCache } = this.props
      const { values = [] }: { values: Value[] } = datum
      const result: (Item | ResultValue<Value>)[] = []
      values.forEach(v => {
        let res: Item | ResultValue<Value> | undefined = noCache ? undefined : this.resultCache.get(v)
        if (!res) {
          res = this.getResult(v)
          if (res !== undefined && !noCache) this.resultCache.set(v, res)
          else if (res === undefined) res = { [IS_NOT_MATCHED_VALUE]: true, value: v }
        }
        if (res !== undefined) {
          result.push(res)
        }
      })

      return result
    }

    handleFilter(text: string, from = 'edit') {
      const { filterDelay, onFilter, onCreate } = this.props

      this.setState({ text })
      // not filter
      if (!text) {
        this.setState({ filterText: '', innerFilter: undefined, innerData: undefined })
        if (this.timer) clearTimeout(this.timer)
        if (onFilter) onFilter(text, from)
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
        const fn = onFilter(text, from)
        if (typeof fn === 'function') {
          this.setState({ innerFilter: fn })
        }
      }, filterDelay)
    }

    handleCreate(text: string) {
      const { onCreate } = this.props
      const createFn = typeof onCreate === 'boolean' ? (t: string) => t : onCreate
      return (createFn as Function)(text)
    }

    filterTreeData() {
      const { treeData, expanded, showHitDescendants, onAdvancedFilter, ...other } = this.props
      const { innerFilter } = this.state
      let filterExpandedKeys: any = expanded
      let newData: (Item | null)[] | undefined = treeData
      if (innerFilter) {
        filterExpandedKeys = []
        newData = getFilterTree(
          treeData,
          innerFilter,
          filterExpandedKeys,
          (node: Item) => getKey(node, other.keygen),
          other.childrenKey as keyof Item,
          showHitDescendants!,
          undefined,
          { advanced: onAdvancedFilter }
        )
      }
      return {
        treeData: newData,
        expanded: filterExpandedKeys,
        rawData: treeData,
      }
    }

    filterData() {
      const { data, hideCreateOption, ...other } = this.props
      const { innerFilter, innerData } = this.state
      let newData = data
      if (innerFilter) newData = data!.filter(d => innerFilter(d))
      if (innerData && !hideCreateOption) {
        const newKey = getKey(innerData, other.keygen, innerData)
        if (!newData!.find(d => getKey(d, other.keygen, d as any) === newKey)) {
          newData = [innerData, ...newData!]
        }
      }
      return {
        data: newData,
      }
    }

    render() {
      const { treeData, onFilter, onCreate, ...other } = this.props
      const { filterText, innerData, text } = this.state
      const filterFn = onFilter || onCreate ? this.handleFilter : undefined
      const dataGenerator = treeData ? this.filterTreeData : this.filterData
      const props = {
        ...other,
        filterText,
        inputText: text,
        result: this.getResultByValues(),
        inputable: !!onCreate,
        onCreate: onCreate ? this.handleCreate : undefined,
        onFilter: filterFn,
        innerData,
        ...dataGenerator.call(this),
      }
      return <Origin {...props} />
    }
  }
