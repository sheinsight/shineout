/**
 * cn -
 *    -- 设置 radio 属性实现单选效果
 * en -
 *    -- Set the radio attribute to achieve the radio effect
 */
import React, { PureComponent } from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(50)

const columns = [
  {
    type: 'checkbox',
  },
  {
    title: 'id',
    render: 'id',
    width: 50,
  },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}`, width: 160 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
]

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: 1,
    }
    this.handelRowSelect = this.handelRowSelect.bind(this)
  }

  handelRowSelect(value) {
    console.log(value)
    this.setState({ value })
  }

  render() {
    return (
      <div>
        <Table
          fixed="both"
          keygen="id"
          format="id"
          columns={columns}
          data={data}
          style={{ height: 450 }}
          onRowSelect={this.handelRowSelect}
          value={this.state.value}
          radio
        />
        <div>selected: {this.state.value} </div>
      </div>
    )
  }
}
