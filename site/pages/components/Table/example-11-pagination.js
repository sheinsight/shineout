/**
 * cn - 静态数据分页
 * en - Pagination
 */
import React, { PureComponent } from 'react'
import { Table } from 'shineout'
import { getData } from 'doc/data/table'

const data = getData(10000)

export default class extends PureComponent {
  state = {
    current: 1,
  }

  handlePageChange = (current) => {
    console.log(1111111111)
    this.setState({ current })
  }

  render() {
    const columns = [
      {
        title: 'id',
        render: 'id',
        width: 70,
        sorter: (order) => {
          this.handlePageChange(1)
          return (a, b) => {
            if (order === 'asc') return a.id - b.id
            return b.id - a.id
          }
        },
      },
      {
        title: 'First Name', group: 'Name', render: 'firstName', width: 100,
      },
      {
        title: 'Last Name',
        fixed: 'left',
        group: 'Name',
        render: 'lastName',
        width: 100,
        sorter: (order) => {
          this.handlePageChange(1)
          return (a, b) => {
            if (order === 'asc') return a.lastName.localeCompare(b.lastName)
            return b.lastName.localeCompare(a.lastName)
          }
        },
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

    return (
      <Table
        data={data}
        fixed="x"
        keygen="id"
        width={1500}
        columns={columns}
        pagination={{
          current: this.state.current,
          align: 'center',
          layout: ['links', 'list'],
          onChange: this.handlePageChange,
          pageSizeList: [10, 15, 20],
          text: {
            page: '/ page',
          },
        }}
      />
    )
  }
}

