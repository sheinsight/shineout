import React, { ComponentType } from 'react'
import { getKey } from '../utils/uid'
import { Component } from '../component'
import { getFilterTree } from '../utils/tree'
import { FilterProps, GetFilterProps } from './Props'

interface CascaderFilterState {
  filterText: string
  filter: null
}

export default <DataItem, Props>(Origin: React.ComponentType<Props>) =>
  (class CascaderFilter extends Component<FilterProps<DataItem>, CascaderFilterState> {
    static defaultProps = {
      filterDelay: 400,
      childrenKey: 'children',
    }

    firstMatchNode: DataItem | null

    timer: NodeJS.Timeout

    constructor(props: FilterProps<DataItem>) {
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
        this.firstMatchNode = node
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
      if (!onFilter) return <Origin {...(this.props as unknown) as Props} />
      const data = this.getData()
      return (
        <Origin
          {...(this.props as unknown) as Props}
          data={data}
          filterText={filterText}
          onFilter={this.handleFilter}
          filterDataChange={filter}
          firstMatchNode={this.firstMatchNode}
        />
      )
    }
  } as unknown) as ComponentType<GetFilterProps<Props, DataItem>>
