/**
 * cn - 树形选择 - 筛选数据
 *    -- 通过设置 onFilter 来筛选树形数据。
 * en - Tree Select Filter
 *    -- Set onFilter to filter tree data.
 */
import React from 'react'
import { Select } from 'shineout'

const data = [
  {
    id: '1',
    title: '1',
    children: [
      { id: '1-1', title: '1-1', children: [{ id: '1-1-1', title: '1-1-1' }, { id: '1-1-2', title: '1-1-2' }] },
      { id: '1-2', title: '1-2' },
    ],
  },
  { id: '2', title: '2', children: [{ id: '2-1', title: '2-1' }, { id: '2-2', title: '2-2' }] },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
]

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [],
    }
  }

  handleChange = v => {
    this.setState({
      value: v,
    })
  }

  handleFilter = text => v => v.title.indexOf(text) > -1

  render() {
    return (
      <Select
        absolute
        onFilter={this.handleFilter}
        clearable
        multiple
        onChange={this.handleChange}
        value={this.state.value}
        disabled={v => v.title.startsWith('1-')}
        format="id"
        keygen="id"
        renderItem={v => `node ${v.title}`}
        style={{ width: 250 }}
        treeData={data}
      />
    )
  }
}
