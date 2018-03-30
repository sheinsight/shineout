/**
 * cn - 合并行/列 \n *一个单元格同时指定了rowSpan和colSpan时，如果两行的rolSpan计算结果不同，这两行不会合并
 * en - rowSpan & colSpan
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
      sorter: { name: 'start', order: 'asc' },
    }

    this.columns = [
      {
        title: 'id',
        render: 'id',
        width: 70,
        sorter: this.handleSorter.bind(this, 'id'),
      },
      { title: 'First Name', group: 'Name', render: 'firstName' },
      { title: 'Last Name', group: 'Name', render: 'lastName' },
      {
        title: 'Start Date',
        render: 'start',
        sorter: this.handleSorter.bind(this, 'start'),
        rowSpan: (a, b) => a === b,
        colSpan: (d) => {
          const hour = parseInt(d.time.slice(0, 2), 10)
          if (hour > 21 || hour < 9) return 2
          return 1
        },
      },
      { title: 'Time', render: 'time' },
      { title: 'Office', render: 'office5', rowSpan: true },
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
    fetch.get('user', { sorter, current, pageSize }).then((res) => {
      this.setState({ data: res.data, loading: false, total: res.total })
    })
  }

  render() {
    const {
      data, current, pageSize, total, loading,
    } = this.state

    return (
      <Table
        bordered
        loading={loading}
        data={data}
        keygen="id"
        columns={this.columns}
        pagination={{
          align: 'center',
          current,
          pageSize,
          layout: ['links', 'list'],
          onChange: this.handlePageChange,
          pageSizeList: [10, 15, 20],
          total,
        }}
      />
    )
  }
}
