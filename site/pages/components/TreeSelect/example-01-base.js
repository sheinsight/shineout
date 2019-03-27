/**
 * cn - 基本用法
 *    -- 基础的TreeSelect用法。
 * en - Base
 *    -- Basic usage of TreeSelect.
 */
import React from 'react'
import { TreeSelect } from 'shineout'

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
      value: '',
    }
  }

  handleChange = v => {
    this.setState({
      value: v,
    })
  }

  render() {
    return (
      <TreeSelect
        value={this.state.value}
        onChange={this.handleChange}
        clearable
        style={{ width: 250 }}
        keygen="id"
        renderItem={node => `node ${node.title}`}
        data={data}
      />
    )
  }
}
