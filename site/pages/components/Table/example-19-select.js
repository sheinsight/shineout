/**
 * cn -
 *    -- 如果需要翻页时清除选中数据，可以在翻页时调用 Datum.clear() 方法
 * en -
 *    -- If you need to clear the selected data when the page is changed, you can clear value property or call the Datum.clear() method.
 */
import React, { PureComponent } from 'react'
import { Table, Datum } from 'shineout'
import { fetch } from 'doc/data/user'

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
      onChange: selectedValue => {
        this.setState({ selectedValue })
      },
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
    ]
  }

  componentDidMount() {
    this.fetchData()
  }

  handlePageChange = (current, pageSize) => {
    this.setState({ current, pageSize }, this.fetchData)
  }

  handleSorter = (name, order) => {
    this.setState({ sorter: { name, order }, current: 1 }, this.fetchData)
  }

  fetchData = () => {
    const { sorter, current, pageSize } = this.state
    this.setState({ loading: true })
    fetch.get('user', { sorter, current, pageSize }).then(res => {
      this.datum.clear()

      this.setState({
        data: res.data,
        selectedValue: [],
        loading: false,
        total: res.total,
      })
    })
  }

  render() {
    const { data, current, pageSize, total, loading, selectedValue } = this.state

    return (
      <div>
        <Table
          bordered
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
        <br />
        <div>selected rows: {JSON.stringify(selectedValue)}</div>
      </div>
    )
  }
}
