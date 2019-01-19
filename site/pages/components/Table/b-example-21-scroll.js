/**
 * cn - Example
 * en - \n Example
 */
import React, { PureComponent } from 'react'
import { Table, Button } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(100)

let columns = [
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
      selectedText: '2, 3, 5',
      width: 1200,
      height: 300,
    }

    this.handelRowSelect = this.handelRowSelect.bind(this)
    this.addColumn = this.addColumn.bind(this)
  }

  handelRowSelect(values) {
    // this.setState({ height: this.state.height === 300 ? 500 : 300 })
    this.setState({ selectedText: values.join(', ') })
  }

  addColumn() {
    columns = [...columns, { title: `Office${columns.length}`, render: 'office' }]
    this.setState({ width: 1200 + columns.length * 100 })
  }

  render() {
    const initValue = this.state.selectedText.split(',').map(v => parseInt(v, 10))
    return (
      <div>
        <Button onClick={this.addColumn}>add column</Button>

        <Table
          fixed="both"
          keygen="id"
          columns={columns}
          data={data}
          style={{ height: this.state.height }}
          datum={{
            format: 'id',
            value: initValue,
            disabled: d => d.id % 3 === 0,
            onChange: this.handelRowSelect,
          }}
          width={this.state.width}
        />
        <div>selected rows: [{this.state.selectedText}]</div>
      </div>
    )
  }
}
