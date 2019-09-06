/**
 * cn -
 *    -- 设置 disabled 属性，禁用选项。
 * en -
 *    -- Set disabled to disable the selection.
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
      selectedText: [2, 3, 5],
    }
  }

  handelRowSelect = values => {
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
          disabled={d => d.id % 3 === 0}
          style={{ height: 300 }}
          format="id"
          onRowSelect={this.handelRowSelect}
          value={this.state.selectedText}
        />
        <div>selected rows: [{this.state.selectedText.join(', ')}]        </div>
      </div>
    )
  }
}
