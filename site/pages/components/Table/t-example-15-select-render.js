/**
 * cn -
 *    -- 通过 render 自定义渲染
 * en - Select
 *    -- Custom rendering via render
 */
import React, { PureComponent } from 'react'
import { Table, Popover } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(100)

const columns = [
  {
    type: 'checkbox',
    render: (d, index, checkbox) => (
      <span>
        {checkbox}
        {d.id % 3 === 0 ? <Popover position="right">这个不能选</Popover> : null}
      </span>
    ),
    width: 40,
  },
  {
    title: 'id',
    render: 'id',
    width: 60,
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
          disabled={d => d.id % 3 === 0}
          data={data}
          style={{ height: 450 }}
          onRowSelect={this.handelRowSelect}
          value={this.state.selectedValue}
          prediction={(v, d) => v.id === d.id}
        />
        <div>
selected rows: [{this.state.selectedValue.map(v => v.id).join(', ')}
]
{' '}
</div>
      </div>
    )
  }
}
