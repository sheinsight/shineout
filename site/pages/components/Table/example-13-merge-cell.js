/**
 * cn - 合并行/列
 *    -- 设置 column 的 rowSpan 可以合并行，rowSpan 为函数，会传入相邻的两行数据，根据此函数返回结果(bool)判断是否合并行
 *    -- 设置 column 的 colSpan 可以合并列，colSpan 为函数，传入参数为当前行数据，函数返回结果为需要向后合并的列数，不合并返回 1
 *    -- 一个单元格同时指定了rowSpan和colSpan时，如果两行的colSpan计算结果不同，这两行不会合并
 * en - rowSpan & colSpan
 *    -- - Set column's rowSpan property to merge rows. The rowSpan property is a function that passed in two adjacent rows of data and determine whether to merge or not.
 *    -- - Set column's colSpan property to merge columns. The colSpan property is a function that passed in current row of data and the result returned by this function is as the number of columns that need to be merged.
 *    -- - When a cell specifies both rowSpan and colSpan, if the colSpan's calculation results of the two rows are different, the two rows will not be merged.
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
        rowSpan: (a, b) => a.start === b.start,
        colSpan: d => {
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
