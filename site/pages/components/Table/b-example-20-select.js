/**
 * cn - 选择行 (示例)
 *    -- 可以不处理 onChange 事件，在调用时使用 datum.getValue 获取当前选中值。
 * en - Select (getValue)
 *    -- You can use datum.getValue to get current selected values.
 */
import React, { PureComponent } from 'react'
import { Table, Datum, Button, Message } from 'shineout'
import { fetch } from 'doc/data/user'

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
      disabled: d => d.status === true,
    })

    this.columns = [
      {
        title: 'Id',
        render: 'id',
        width: 70,
        sorter: this.handleSorter.bind(this, 'id'),
      },
      { title: 'First Name', render: 'firstName' },
      { title: 'Last Name', render: 'lastName' },
      { title: 'Office', render: 'office' },
      { title: 'Start Date', render: 'start', sorter: this.handleSorter.bind(this, 'start') },
      {
        width: 100,
        render: d => {
          if (!d.status) return ''
          return <a onClick={this.handleTurnOff.bind(this, d)}>turn off</a>
        },
      },
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
      this.datum.clear()

      this.setState({
        data: res.data,
        loading: false,
        total: res.total,
      })
    })
  }

  handleTurnOff(d) {
    this.setState({ loading: true })
    fetch.post('user', { op: 'off', ids: [d.id] }).then(this.fetchData)
  }

  handleOpClick(op) {
    const ids = this.datum.getValue()
    if (ids.length > 0) {
      this.setState({ loading: true })
      fetch.post('user', { op, ids }).then(this.fetchData)
    } else {
      Message.warn('No item selected.')
    }
  }

  render() {
    const { data, current, pageSize, total, loading } = this.state

    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <Button.Group outline type="secondary">
            <Button onClick={this.handleOpClick.bind(this, 'on')}>On</Button>
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
