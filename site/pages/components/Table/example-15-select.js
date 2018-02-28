/**
 * cn - 选择行 \n onRowChange 事件，会自动添加选择列
 * en - Select
 */
import React, { PureComponent } from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/table'

const data = fetchSync(100)

const columns = [
  { title: 'id', render: 'id', width: 80 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}`, width: 160 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
]

export default class extends PureComponent {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selectedValue, data, index) {
    console.log(selectedValue, data, index)
  }

  render() {
    return (
      <Table
        fixed="both"
        keygen="id"
        columns={columns}
        data={data}
        style={{ height: 450 }}
        onRowSelect={this.handleChange}
      />
    )
  }
}
