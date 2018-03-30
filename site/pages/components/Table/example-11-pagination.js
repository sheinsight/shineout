/**
 * cn - 前端数据分页
 * en - Pagination
 */
import React, { PureComponent } from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(1000)

export default class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      current: 1,
    }
    this.columns = [
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
        width: 120,
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
  }

  handlePageChange = (current) => {
    this.setState({ current })
  }

  render() {
    return (
      <Table
        data={data}
        fixed="x"
        keygen="id"
        width={1500}
        columns={this.columns}
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

