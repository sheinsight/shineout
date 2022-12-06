import React from 'react'
import { getUidStr } from '../utils/uid'
import { GroupProps, GetGroupProps } from './Props'

interface GroupState<Item> {
  data: Item[]
}

export default <Props, Item>(Origin: React.ComponentType<GetGroupProps<Props, Item>>) =>
  class Group extends React.Component<GroupProps<Item>, GroupState<Item>> {
    static defaultProps = {
      data: [],
    }

    groupKey: string

    constructor(props: GroupProps<Item>) {
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

    componentDidUpdate(prevProps: GroupProps<Item>) {
      if (prevProps.data !== this.props.data) this.groupByData()
    }

    groupByData() {
      const { groupBy, data } = this.props

      if (typeof groupBy !== 'function') {
        this.setState({ data })
        return
      }

      const groupData = {}

      data.forEach((d, i) => {
        const g = groupBy(d, i, data)
        if (!groupData[g]) groupData[g || ''] = g ? [{ [this.groupKey]: g }] : []
        groupData[g].push(d)
      })

      this.setState({
        data: Object.keys(groupData).reduce((p, v) => (v ? p.concat(groupData[v]) : groupData[v].concat(p)), []),
      })
    }

    render() {
      const { groupBy, data, ...props } = this.props
      return <Origin {...props} data={this.state.data} groupKey={this.groupKey} />
    }
  }
