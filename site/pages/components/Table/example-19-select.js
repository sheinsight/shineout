/**
 * cn - \n 如果需要翻页时清除选中数据，可以在翻页时调用 Datum.clear() 方法
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
      pageSize: 5,
      total: 0,
      selectedValue: '',
    }

    this.datum = new Datum.List({
      format: 'id',
      onChange: (selectedValue) => {
        this.setState({ selectedValue })
      },
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  handlePageChange = (current, pageSize) => {
    this.setState({ current, pageSize }, this.fetchData)
  }

  fetchData = () => {
    const { sorter, current, pageSize } = this.state
    this.setState({ loading: true })
    fetch.get('table', { sorter, current, pageSize }).then((res) => {
      this.datum.clear()

      this.setState({
        data: res.data,
        selectedValue: [],
        loading: false,
        total: res.total,
      })
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
      { title: 'Last Name', render: 'lastName' },
      { title: 'Office', render: 'office' },
      { title: 'Start Date', render: 'start', sorter: this.handleStartSort },
    ]

    return (
      <div>
        <Table
          loading={loading}
          data={data}
          keygen="id"
          columns={columns}
          datum={this.datum}
          pagination={{
            align: 'center',
            current,
            pageSize,
            onChange: this.handlePageChange,
            total,
          }}
        />
        <br />
        <div>
          selected rows: {JSON.stringify(selectedValue)}
        </div>
      </div>
    )
  }
}
