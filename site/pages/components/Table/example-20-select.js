/**
 * cn - 选择行
 * en - Select
 */
import React, { PureComponent } from 'react'
import { Table, Datum } from 'shineout'
import { fetch } from 'doc/data/table'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      pageSize: 10,
      total: 0,
      selectedValue: new Datum.List(),
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

  handleIdSort = (order) => {
    this.handleSorter('id', order)
  }

  handleStartSort = (order) => {
    this.handleSorter('start', order)
  }

  handleLastNameSort = (order) => {
    this.handleSorter('lastName', order)
  }

  render() {
    const {
      data, current, pageSize, total, loading, selectedValue,
    } = this.state

    const columns = [
      {
        title: 'Id',
        render: 'id',
        width: 70,
        sorter: this.handleIdSort,
      },
      { title: 'First Name', render: 'firstName' },
      { title: 'Last Name', render: 'lastName', sorter: this.handleLastNameSort },
      { title: 'Office', render: 'office' },
      { title: 'Start Date', render: 'start', sorter: this.handleStartSort },
    ]

    return (
      <div>
        <div>
          selected rows:
        </div>
        <br />
        <Table
          bordered
          loading={loading}
          data={data}
          keygen="id"
          columns={columns}
          value={selectedValue}
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
      </div>
    )
  }
}
