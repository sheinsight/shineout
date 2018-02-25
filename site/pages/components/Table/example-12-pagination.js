/**
 * cn - 服务端分页 \n 通过 pagination 的 onChange 事件来处理
 * en - Pagination
 */
import React, { PureComponent } from 'react'
import { Table } from 'shineout'
import { fetch } from 'doc/data/table'

const columns = [
  { title: 'id', render: 'id', width: 70 },
  {
    title: 'First Name', group: 'Name', render: 'firstName', width: 100,
  },
  {
    title: 'Last Name', fixed: 'left', group: 'Name', render: 'lastName', width: 100,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    fixed: 'right',
    width: 100,
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      total: 0,
    }
  }

  componentDidMount() {
    this.fetchData(1, 10)
  }

  handlePageChange = (current, pageSize) => {
    this.fetchData(current, pageSize)
  }

  fetchData = (current, pageSize) => {
    this.setState({ loading: true })
    fetch.get('table', { current, pageSize }).then((res) => {
      this.setState({ data: res.data, loading: false, total: res.total })
    })
  }

  render() {
    const { data, total, loading } = this.state

    return (
      <Table
        bordered
        loading={loading}
        data={data}
        fixed="x"
        keygen="id"
        width={1500}
        columns={columns}
        pagination={{
          align: 'center',
          layout: ['links', 'list'],
          onChange: this.handlePageChange,
          pageSizeList: [10, 15, 20],
          total,
        }}
      />
    )
  }
}
