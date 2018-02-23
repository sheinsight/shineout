/**
 * cn - 分页
 * en - Fixed column
 */
import React, { PureComponent } from 'react'
import { Table, Pagination } from 'shineout'
import { fetch } from 'doc/data/table'

const columns = [
  {
    title: 'id',
    render: 'id',
    width: 70,
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
    width: 100,
  },
  {
    title: 'Country',
    render: 'country',
  },
  {
    title: 'Position',
    render: 'position',
  },
  {
    title: 'Office',
    render: 'office',
  },
  {
    title: 'Start Date',
    render: 'start',
  },
  {
    title: 'Salary',
    fixed: 'right',
    width: 100,
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

export default class extends PureComponent {
  state = {
    current: 1,
    pageSize: 10,
    total: 0,
    loading: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  handlePageChange = (current, pageSize) => {
    this.setState({ current, pageSize }, this.fetchData)
  }

  fetchData = () => {
    const { current, pageSize } = this.state
    this.setState({ loading: true })
    fetch.get('table', { current, pageSize }).then((res) => {
      this.setState({ data: res.data, loading: false, total: res.total })
    })
  }

  render() {
    const {
      data, current, pageSize, total, loading,
    } = this.state

    return (
      <div>
        <Table
          bordered
          loading={loading}
          fixed="x"
          keygen="id"
          width={1500}
          columns={columns}
          data={data}
        />
        <Pagination
          align="center"
          current={current}
          disabled={loading}
          layout={['links', 'list']}
          onChange={this.handlePageChange}
          pageSize={pageSize}
          pageSizeList={[10, 15, 20]}
          total={total}
        />
      </div>
    )
  }
}
