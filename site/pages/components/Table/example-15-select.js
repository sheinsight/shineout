/**
 * cn - 选择行 \n onRowChange 事件，会自动添加选择列
 * en - Select
 */
import React, { PureComponent } from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/table'

const data = fetchSync(100)

const columns = [
  {
    title: 'id',
    render: 'id',
    width: 50,
    sorter: order => (a, b) => {
      if (order === 'asc') return a.id - b.id
      return b.id - a.id
    },
  },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}`, width: 160 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
]

export default class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      selectedValue: '',
    }

    this.handelRowSelect = this.handelRowSelect.bind(this)
  }

  handelRowSelect(selectedValue) {
    console.log(selectedValue)
    this.setState({ selectedValue: selectedValue.map(v => v.id).join(', ') })
  }

  render() {
    return (
      <div>
        <Table
          fixed="both"
          keygen="id"
          columns={columns}
          data={data}
          style={{ height: 450 }}
          onRowSelect={this.handelRowSelect}
        />
        <div>
          selected rows: [{ this.state.selectedValue }]
        </div>
      </div>
    )
  }
}
