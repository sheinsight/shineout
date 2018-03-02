/**
 * cn - 选择行 (使用Datum)
 * en - Select (use Datum)
 */
import React, { PureComponent } from 'react'
import { Table, Datum } from 'shineout'
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

    const value = '2,3,5'
    const selectedValue = new Datum.List({
      format: d => d.id.toString(),
      separator: ',',
      prediction: (val, d) => val === d.id.toString(),
      value,
      onChange: this.handelRowSelect.bind(this),
    })

    this.state = {
      selectedText: value,
      selectedValue,
    }
  }

  handelRowSelect() {
    const values = this.state.selectedValue.getValue()
    this.setState({ selectedText: values })
  }

  render() {
    return (
      <div>
        <Table
          fixed="both"
          keygen="id"
          columns={columns}
          data={data}
          style={{ height: 300 }}
          value={this.state.selectedValue}
        />
        <div style={{ wordBreak: 'break-all' }}>
          selected rows: [{ this.state.selectedText }]
        </div>
      </div>
    )
  }
}
