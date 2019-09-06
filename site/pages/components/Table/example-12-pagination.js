/**
 * cn -
 *    -- 后端分页的情况下, 在 pagination 的 onChange 中处理（获取）数据，可以实现服务端分页
 * en -
 *    -- Processing (acquiring) data in pagination's onChange realizes the pagination of server-side.
 */
import React, { PureComponent } from 'react'
import { Table } from 'shineout'
import { fetch } from 'doc/data/user'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      pageSize: 10,
      total: 0,
    }

    this.columns = [
      {
        title: 'id',
        render: 'id',
        width: 80,
        sorter: this.handleSorter.bind(this, 'id'),
      },
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
        sorter: this.handleSorter.bind(this, 'lastName'),
      },
      { title: 'Country', render: 'country' },
      { title: 'Office', render: 'office' },
      { title: 'Start Date', render: 'start', sorter: this.handleSorter.bind(this, 'start') },
    ]
  }

  componentDidMount() {
    this.fetchData()
  }

  handleSorter = (name, order) => {
    this.setState({ sorter: { name, order }, current: 1 }, this.fetchData)
  }

  handlePageChange = (current, pageSize) => {
    this.setState({ current, pageSize }, this.fetchData)
  }

  fetchData = () => {
    const { sorter, current, pageSize } = this.state
    this.setState({ loading: true })
    fetch.get('user', { sorter, current, pageSize }).then(res => {
      this.setState({ data: res.data, loading: false, total: res.total })
    })
  }

  render() {
    const { data, current, pageSize, total, loading } = this.state

    return (
      <Table
        bordered
        loading={loading}
        data={data}
        keygen="id"
        columns={this.columns}
        style={{ height: 450 }}
        fixed="y"
        pagination={{
          align: 'center',
          current,
          pageSize,
          layout: ['links', 'list'],
          onChange: this.handlePageChange,
          pageSizeList: [10, 15, 20, 100],
          total,
        }}
      />
    )
  }
}
