import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import Datum from '../Datum/Tree'
import { curry } from '../utils/func'
import { mergeFilteredTree } from '../utils/tree'
import { treeClass } from '../Tree/styles'
import { treeSelectClass } from './styles'
import { Component } from '../component'

export default curry((options, Origin) => {
  const { dataKey = 'data' } = options
  class Tiled extends Component {
    static propTypes = {
      rawData: PropTypes.array,
      keygen: PropTypes.any,
      onFilter: PropTypes.func,
      childrenKey: PropTypes.string,
      filterText: PropTypes.string,
      data: PropTypes.array,
      expanded: PropTypes.array,
      onAdvancedFilter: PropTypes.bool,
    }

    static defaultProps = {
      childrenKey: 'children',
    }

    constructor(props) {
      super(props)
      this.state = {
        tileds: [],
      }
      this.getIcon = this.getIcon.bind(this)
      this.handleFilter = this.handleFilter.bind(this)
      if (props.onAdvancedFilter) this.genRawDatum()
    }

    componentDidUpdate(prevProps) {
      if (prevProps.rawData !== this.props.rawData && this.props.onAdvancedFilter) {
        if (this.rawDatum) this.rawDatum.setData(this.props.rawData)
        else this.genRawDatum()
        this.forceUpdate()
      }
    }

    getFilteredDatum() {
      const { keygen, childrenKey } = this.props
      const data = this.props[dataKey]
      if (this.filteredDatum && this.filteredDatum.data === data) return this.filteredDatum
      this.filteredDatum = new Datum({
        data,
        keygen,
        childrenKey,
      })
      return this.filteredDatum
    }

    getIcon(data) {
      const { childrenKey, expanded = [] } = this.props
      const originIcon = <span className={treeClass('default-icon')} />
      const key = this.rawDatum.getKey(data)
      const rawData = this.rawDatum.getDataById(key)
      if (!data || !rawData) return originIcon
      const sameCount =
        data[childrenKey] && rawData[childrenKey] && data[childrenKey].length === rawData[childrenKey].length
      if (expanded.indexOf(key) === -1) return originIcon
      return (
        <span className={treeSelectClass('match', sameCount && 'full')} onClick={this.handleToggle.bind(this, key)}>
          <span />
        </span>
      )
    }

    handleFilter(text) {
      const { onFilter } = this.props
      if (!text) this.setState({ tileds: [] })
      if (onFilter) onFilter(text)
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
