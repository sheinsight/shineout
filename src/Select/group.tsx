import React from 'react'
import { getUidStr } from '../utils/uid'
import { GroupProps, GetGroupProps } from './Props'

interface GroupState<Item> {
  data: Item[]
}

export default <Item, Value, Props extends GroupProps<Item, Value>>(Origin: React.ComponentType<Props>) =>
  class Group extends React.Component<GetGroupProps<Props>, GroupState<Item>> {
    static defaultProps = {
      data: [],
    }

    groupKey: string

    constructor(props: GetGroupProps<Props>) {
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

    componentDidUpdate(prevProps: GetGroupProps<Props>) {
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
        const g = groupBy(d, i, data)
        if (!groupData[g]) groupData[g || ''] = (g ? [{ [this.groupKey]: g }] : []) as Item[]
        groupData[g].push(d)
      })

      this.setState({
        data: Object.keys(groupData).reduce((p, v) => (v ? p.concat(groupData[v] as any) : groupData[v].concat(p)), []),
      })
    }

    render() {
      const { groupBy, data, ...props } = this.props
      return <Origin {...props as Props} data={this.state.data} groupKey={this.groupKey} />
    }
  }
