/**
 * cn -
 *    -- 使用 format，可以格式化返回的数据
 * en -
 *    -- Set format property to format the returned value.
 */
import React, { PureComponent } from 'react'
import { Table } from 'shineout'
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

    this.state = {
      selectedValue: value,
    }
  }

  handelRowSelect = values => {
    this.setState({ selectedValue: values })
  }

  render() {
    return (
      <div>
        <Table
          fixed="both"
          keygen="id"
          columns={columns}
          data={data}
          format={d => `${d.firstName} ${d.lastName}`}
          style={{ height: 300 }}
          onRowSelect={this.handelRowSelect}
          value={this.state.selectedValue}
        />
        <div style={{ wordBreak: 'break-all' }}>
selected rows:
{' '}
{JSON.stringify(this.state.selectedValue)}
</div>
      </div>
    )
  }
}
