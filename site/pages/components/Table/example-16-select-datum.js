/**
 * cn - 选择行 (Datum)
 *    -- 使用 Datum，可以做更复杂的数据处理的工作
 * en - Select (datum)
 *    -- Using Datum.List can process more complex data.
 */
import React, { PureComponent } from 'react'
import { Table, Datum } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(20)

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

    const value = [2, 3, 5].map(i => `${data[i].firstName} ${data[i].lastName}`)

    this.datum = new Datum.List({
      format: d => `${d.firstName} ${d.lastName}`,
      value,
      prediction: (v, d) => v === `${d.firstName} ${d.lastName}`,
      onChange: this.handelRowSelect.bind(this),
    })

    this.state = {
      selectedValue: value,
    }
  }

  handelRowSelect(values) {
    this.setState({ selectedValue: values })
  }

  render() {
    return (
      <div>
        <Table fixed="both" keygen="id" columns={columns} data={data} style={{ height: 300 }} datum={this.datum} />
        <div style={{ wordBreak: 'break-all' }}>selected rows: {JSON.stringify(this.state.selectedValue)}</div>
      </div>
    )
  }
}
