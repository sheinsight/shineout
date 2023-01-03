import React from 'react'
import PropTypes from 'prop-types'
import { Component } from '../component'
import { CardProps, GetFilterProps, FilterType } from './Props'

export interface FilterState {
  text: string
}

export default <DataItem, Value extends any[]>(Origin: React.ComponentType<CardProps<DataItem, Value>>) =>
  (class extends Component<GetFilterProps<CardProps<DataItem, Value>, DataItem, Value>, FilterState> {
    static propTypes = {
      data: PropTypes.array,
      onFilter: PropTypes.func,
      onSearch: PropTypes.func,
      index: PropTypes.number,
    }

    constructor(props: GetFilterProps<CardProps<DataItem, Value>, DataItem, Value>) {
      super(props)
      this.state = {
        text: '',
      }
      this.handleFilter = this.handleFilter.bind(this)
    }

    getData() {
      const { onFilter, data, index } = this.props
      if (!onFilter || !this.state.text) return data
      return data.filter(d => onFilter(this.state.text, d, !index))
    }

    handleFilter(text: string) {
      const { onSearch, index } = this.props
      if (onSearch) onSearch(text, !index)
      this.setState({ text })
    }

    render() {
      const { onFilter } = this.props
      const data = this.getData()
      const filter = onFilter ? this.handleFilter : undefined
      return <Origin {...this.props} onFilter={filter} filterText={this.state.text} data={data} />
    }
  } as unknown) as FilterType
