import React from 'react'
import { getKey } from '../utils/uid'
import { Component } from '../component'
import { getFilterTree } from '../utils/tree'
import { CascaderProps } from './interface'

interface CascaderFilterProps<U, T> extends Omit<CascaderProps<U, T>, 'renderItem'> {
  filterDelay: number
}

interface CascaderFilterState {
  filterText: string
  filter: null
}

export default <T, U extends CascaderFilterProps<U, T>>(Origin: React.ComponentClass) =>
  class CascaderFilter extends Component<U, CascaderFilterState> {
    // static propTypes = {
    //   onFilter: PropTypes.func,
    //   filterDelay: PropTypes.number,
    //   data: PropTypes.array,
    //   childrenKey: PropTypes.string,
    //   keygen: PropTypes.any,
    //   mode: PropTypes.number,
    // }

    static defaultProps = {
      filterDelay: 400,
    }

    firstMatchNode: U | null

    timer: NodeJS.Timeout

    constructor(props: U) {
      super(props)
      this.handleFilter = this.handleFilter.bind(this)
      this.state = {
        filterText: '',
        filter: null,
      }
    }

    getData() {
      const { data, childrenKey, keygen } = this.props
      const { filter } = this.state
      if (!filter) return data
      return getFilterTree(data, filter, undefined, (node: any) => getKey(node, keygen), childrenKey, true, node => {
        if (this.firstMatchNode) return
        this.firstMatchNode = node as U
      })
    }

    handleFilter(filterText: string) {
      const { filterDelay, onFilter } = this.props
      if (this.timer) clearTimeout(this.timer)
      this.firstMatchNode = null
      if (filterText.length === 0) {
        this.setState({ filter: null, filterText })
        return
      }

      this.timer = setTimeout(() => {
        const fn = onFilter!(filterText)
        if (typeof fn === 'function') {
          this.setState({ filter: fn, filterText })
        }
      }, filterDelay)
    }

    render() {
      const { onFilter } = this.props
      const { filterText, filter } = this.state
      if (!onFilter) return <Origin {...this.props} />
      const data = this.getData()
      return (
        <Origin
          {...this.props}
          data={data}
          filterText={filterText}
          onFilter={this.handleFilter}
          filterDataChange={filter}
          firstMatchNode={this.firstMatchNode}
        />
      )
    }
  }
