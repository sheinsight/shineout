/**
 * cn - 合并单元格
 * en - rowSpan & colSpan
 */
import React, { PureComponent } from 'react'
import { Table } from 'shineout'
import { fetch } from 'doc/data/table'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      pageSize: 10,
      total: 0,
      sorter: { name: 'start', order: 'asc' },
    }
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
    fetch.get('table', { sorter, current, pageSize }).then((res) => {
      this.setState({ data: res.data, loading: false, total: res.total })
    })
  }

  render() {
    const {
      data, current, pageSize, total, loading,
    } = this.state

    const columns = [
      {
        title: 'id',
        render: 'id',
        width: 70,
        sorter: this.handleSorter.bind(this, 'id'),
      },
      {
        title: 'First Name', group: 'Name', render: 'firstName', width: 100,
      },
      {
        title: 'Last Name',
        fixed: 'left',
        group: 'Name',
        render: 'lastName',
        width: 120,
      },
      {
        title: 'Start Date',
        rowSpan: true,
        render: 'start',
        width: 120,
        sorter: this.handleSorter.bind(this, 'start'),
      },
      { title: 'Country', render: 'country' },
      { title: 'Position', render: 'position' },
      { title: 'Office', render: 'office' },
      {
        title: 'Salary',
        fixed: 'right',
        width: 100,
        render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
      },
    ]

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
