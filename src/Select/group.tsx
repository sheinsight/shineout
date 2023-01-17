import React from 'react'
import { getUidStr } from '../utils/uid'
import { SelectPropsWidthGroup, SelectPropsWidthAbsolute } from './Props'

interface GroupState<Item> {
  data: Item[]
}

export default <Item, Value>(Origin: React.ComponentType<SelectPropsWidthAbsolute<Item, Value>>) =>
  class Group extends React.Component<SelectPropsWidthGroup<Item, Value>, GroupState<Item>> {
    static defaultProps = {
      data: [],
    }

    groupKey: string

    constructor(props: SelectPropsWidthGroup<Item, Value>) {
      super(props)
      this.state = {
        data: [],
      }
      this.groupByData = this.groupByData.bind(this)
      this.groupKey = getUidStr()
    }

    componentDidMount() {
      this.groupByData()
    }

    componentDidUpdate(prevProps: SelectPropsWidthGroup<Item, Value>) {
      if (prevProps.data !== this.props.data) this.groupByData()
    }

    groupByData() {
      const { groupBy, data } = this.props

      if (typeof groupBy !== 'function') {
        this.setState({ data })
        return
      }

      const groupData: { [group: string]: Item[] } = {}

      data.forEach((d, i) => {
        const g = groupBy(d, i, data) as any
        if (!groupData[g]) groupData[g || ''] = (g ? [{ [this.groupKey]: g }] : []) as Item[]
        groupData[g].push(d)
      })

      this.setState({
        data: Object.keys(groupData).reduce((p, v) => (v ? p.concat(groupData[v] as any) : groupData[v].concat(p)), []),
      })
    }

    render() {
      const { groupBy, data, ...props } = this.props
      return <Origin {...props} data={this.state.data} groupKey={this.groupKey} />
    }
  }
