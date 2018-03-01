/**
 * cn - \n 上面例子可以把Datum简化为json配置
 * en - \n
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
      selectedText: '',
    }

    this.handelRowSelect = this.handelRowSelect.bind(this)
  }

  handelRowSelect(values) {
    this.setState({ selectedText: values })
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          selected rows: [{ this.state.selectedText }]
        </div>
        <Table
          fixed="both"
          keygen="id"
          columns={columns}
          data={data}
          style={{ height: 300 }}
          value={{
            format: 'id',
            separator: ', ',
            prediction: (a, b) => a.id === b.id,
            onChange: this.handelRowSelect,
          }}
        />
      </div>
    )
  }
}
