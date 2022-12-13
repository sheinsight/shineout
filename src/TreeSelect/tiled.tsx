import React from 'react'
import immer from 'immer'
import Datum from '../Datum/Tree'
import { curry } from '../utils/func'
import { mergeFilteredTree } from '../utils/tree'
import { treeClass } from '../Tree/styles'
import { treeSelectClass } from './styles'
import { Component } from '../component'
import { TiledProps } from './Props'

interface TiledState {
  tileds: string[]
}

export default curry((options, Origin) => {
  const { dataKey = 'data' } = options
  class Tiled<Item, Value> extends Component<TiledProps<Item, Value>, TiledState> {
    static defaultProps = {
      childrenKey: 'children',
    }

    rawDatum: any

    filteredDatum: Datum<Item, any[]>

    constructor(props: TiledProps<Item, Value>) {
      super(props)
      this.state = {
        tileds: [],
      }
      this.getIcon = this.getIcon.bind(this)
      this.handleFilter = this.handleFilter.bind(this)
      if (props.onAdvancedFilter) this.genRawDatum()
    }

    componentDidUpdate(prevProps: TiledProps<Item, Value>) {
      if (prevProps.rawData !== this.props.rawData && this.props.onAdvancedFilter) {
        if (this.rawDatum) this.rawDatum.setData(this.props.rawData)
        else this.genRawDatum()
        this.forceUpdate()
      }
    }

    getFilteredDatum() {
      const { keygen, childrenKey } = this.props
      const data = this.props[dataKey as keyof typeof this.props] as TiledProps<Item, Value>['data']
      if (this.filteredDatum && this.filteredDatum.data === data) return this.filteredDatum
      this.filteredDatum = new Datum({
        data,
        keygen,
        childrenKey,
      })
      return this.filteredDatum
    }

    getIcon(data: Item) {
      const { childrenKey, expanded = [] } = this.props
      const originIcon = <span className={treeClass('default-icon')} />
      const key = this.rawDatum.getKey(data)
      const rawData = this.rawDatum.getDataById(key)
      if (!data || !rawData) return originIcon
      const sameCount =
        data[childrenKey as keyof Item] &&
        rawData[childrenKey] &&
        ((data[childrenKey as keyof Item] as unknown) as Item[]).length === rawData[childrenKey].length
      if (expanded.indexOf(key) === -1) return originIcon
      return (
        <span className={treeSelectClass('match', sameCount && 'full')} onClick={this.handleToggle.bind(this, key)}>
          <span />
        </span>
      )
    }

    handleFilter(text: string, from: string) {
      const { onFilter } = this.props
      if (!text) this.setState({ tileds: [] })
      if (onFilter) onFilter(text, from)
    }

    handleToggle(key, e) {
      e.stopPropagation()
      this.setState(
        immer(draft => {
          const index = draft.tileds.indexOf(key)
          if (index >= 0) draft.tileds.splice(index, 1)
          else draft.tileds.push(key)
        })
      )
    }

    genRawDatum() {
      const { rawData, childrenKey, keygen } = this.props
      this.rawDatum = new Datum({ data: rawData, childrenKey, keygen })
    }

    render() {
      const { filterText, onAdvancedFilter } = this.props
      const { tileds } = this.state
      if (!filterText || !onAdvancedFilter) return <Origin {...this.props} />
      const expandIcons = [this.getIcon, this.getIcon]
      const filterDatum = this.getFilteredDatum()
      const data = mergeFilteredTree(filterDatum, this.rawDatum, tileds)
      const props = {
        ...this.props,
        onFilter: this.handleFilter,
        expandIcons,
        [dataKey]: data,
      }
      return <Origin {...props} />
    }
  }
  return Tiled
})

export const advancedFilterHOC = Origin => props => {
  // eslint-disable-next-line react/prop-types
  const { onAdvancedFilter, onFilter } = props
  return <Origin {...props} onFilter={onAdvancedFilter || onFilter} onAdvancedFilter={!!onAdvancedFilter} />
}
