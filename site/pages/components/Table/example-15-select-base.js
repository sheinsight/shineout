/**
 * cn - 选择行
 *    -- 设置 onRowChange 属性，会自动添加选择列
 * en - Select
 *    -- Set the onRowChange property will automatically add a column with checkbox.
 */
import React, { PureComponent } from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(100)

const columns = [
  {
    type: 'checkbox',
    rowSpan: a => a.id % 3 === 0,
  },
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
      selectedValue: [data[2]],
    }

    this.handelRowSelect = this.handelRowSelect.bind(this)
  }

  handelRowSelect(selectedValue) {
    console.log(selectedValue)
    this.setState({ selectedValue })
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
          value={this.state.selectedValue}
          prediction={(v, d) => v.id === d.id}
        />
        <div>selected rows: [{this.state.selectedValue.map(v => v.id).join(', ')}]        </div>
      </div>
    )
  }
}
