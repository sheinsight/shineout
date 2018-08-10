/**
 * cn -
 *    -- 上面例子可以简化，传入一个 option 作为 datum
 * en -
 *    --- The above example can be simplified by passing in an option as datum.
 */
import React, { PureComponent } from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

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
      selectedText: '2, 3, 5',
    }

    this.handelRowSelect = this.handelRowSelect.bind(this)
  }

  handelRowSelect(values) {
    this.setState({ selectedText: values.join(', ') })
  }

  render() {
    const initValue = this.state.selectedText.split(',').map(v => parseInt(v, 10))
    return (
      <div>
        <Table
          fixed="both"
          keygen="id"
          columns={columns}
          data={data}
          style={{ height: 300 }}
          datum={{
            format: 'id',
            value: initValue,
            disabled: d => d.id % 3 === 0,
            onChange: this.handelRowSelect,
          }}
        />
        <div>
          selected rows: [{ this.state.selectedText }]
        </div>
      </div>
    )
  }
}
