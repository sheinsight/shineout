/**
 * cn - 多选
 *    -- 通过设置 multiple 来实现多选。
 * en - Multiple
 *    -- Set multiple to Multiple choices.
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
      value: [],
    }
  }

  handleChange = v => {
    this.setState({
      value: v,
    })
  }

  render() {
    return (
      <div>
        <TreeSelect
          multiple
          value={this.state.value}
          onChange={this.handleChange}
          clearable
          style={{ width: 250, marginBottom: 15 }}
          keygen="id"
          renderItem={node => `node ${node.title}`}
          data={data}
        />
        <br />
        <TreeSelect
          compressed
          multiple
          clearable
          style={{ width: 250 }}
          keygen="id"
          renderItem={node => `node ${node.title}`}
          data={data}
        />
      </div>
    )
  }
}
