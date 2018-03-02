/**
 * cn - 选择行 (示例) \n 通常情况下，不需要使用 onChange 事件，使用 Datum.getValue 即可
 * en - Select
 */
import React, { PureComponent } from 'react'
import { Table, Datum, Button, Message } from 'shineout'
import { fetch } from 'doc/data/table'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      pageSize: 10,
      total: 0,
    }

    this.datum = new Datum.List({
      format: 'id',
    })

    this.columns = [
      {
        title: 'Id', render: 'id', width: 70, sorter: this.handleIdSort,
      },
      { title: 'First Name', render: 'firstName' },
      { title: 'Last Name', render: 'lastName' },
      { title: 'Office', render: 'office' },
      { title: 'Start Date', render: 'start', sorter: this.handleStartSort },
      { title: 'Status', width: 100, render: d => d.status && 'on' },
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
    fetch.get('table', { sorter, current, pageSize }).then((res) => {
      this.datum.clear()

      this.setState({
        data: res.data,
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

  handleOpClick(op) {
    const ids = this.datum.getValue()
    if (ids.length > 0) {
      this.setState({ loading: true })
      fetch.post('table', { op, ids }).then(this.fetchData)
    } else {
      Message.warn('No item selected.')
    }
  }

  render() {
    const {
      data, current, pageSize, total, loading,
    } = this.state

    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <Button.Group outline type="secondary">
            <Button onClick={this.handleOpClick.bind(this, 'on')}>On</Button>
            <Button onClick={this.handleOpClick.bind(this, 'off')}>Off</Button>
            <Button onClick={this.handleOpClick.bind(this, 'delete')}>Delete</Button>
          </Button.Group>
        </div>
        <Table
          loading={loading}
          data={data}
          keygen="id"
          columns={this.columns}
          datum={this.datum}
          pagination={{
            align: 'center',
            current,
            pageSize,
            onChange: this.handlePageChange,
            total,
          }}
        />
      </div>
    )
  }
}
