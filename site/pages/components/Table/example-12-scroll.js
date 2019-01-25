/**
 * cn - 滚动加载
 *    -- onScroll 事件会返回当前滚动条位置 (float 类型，[0,1])，可以据此实现滚动加载数据
 * en - onScroll
 *    -- The onScroll event returns the current position(float,[0,1]) of the scroll bar.
 */
import React, { PureComponent } from 'react'
import { Table } from 'shineout'
import { fetch } from 'doc/data/user'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      pageSize: 50,
      data: [],
    }

    this.columns = [
      { title: 'id', render: 'id', width: 70 },
      {
        title: 'First Name',
        group: 'Name',
        render: 'firstName',
        width: 100,
      },
      {
        title: 'Last Name',
        fixed: 'left',
        group: 'Name',
        render: 'lastName',
        width: 120,
      },
      { title: 'Country', render: 'country' },
      { title: 'Office', render: 'office' },
      { title: 'Start Date', render: 'start' },
    ]
  }

  componentDidMount() {
    this.fetchData()
  }

  handleScroll = (left, top) => {
    if (top === 1 && !this.state.loading) {
      this.setState({ current: this.state.current + 1 }, this.fetchData)
    }
  }

  fetchData = () => {
    const { current, pageSize } = this.state
    this.setState({ loading: true })
    fetch.get('table', { current, pageSize }).then(res => {
      this.setState({ data: [...this.state.data, ...res.data], loading: false })
    })
  }

  render() {
    const { data, loading } = this.state

    return (
      <Table
        bordered
        data={data}
        loading={loading}
        keygen="id"
        columns={this.columns}
        style={{ height: 450 }}
        fixed="y"
        onScroll={this.handleScroll}
        verticalAlign="middle"
      />
    )
  }
}
