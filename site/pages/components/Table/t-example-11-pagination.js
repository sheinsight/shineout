/**
 * cn - 分页
 *    -- 前端分页的情况下, 设置 pagination 显示分页，没有设置 onChange 处理数据的情况下，会自动对数据进行分页
 *    -- pagination 的参数和 Pagination 组件一致
 * en - Pagination
 *    -- Set the pagination property to show the pagination and if not set onChange property, the data is automatically paged.
 *    -- The parameters of pagination are consistent with the Pagination component.
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
        sorter: order => {
          this.handlePageChange(1)
          return (a, b) => {
            if (order === 'asc') return a.id - b.id
            return b.id - a.id
          }
        },
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
        sorter: order => {
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

  handlePageChange = current => {
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
