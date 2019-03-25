/**
 * cn - 基本用法
 *    -- Select 没有单独的 Option 选项，通过数据来渲染。
 * en - Base
 *    -- Select generate group of options from data.
 */
import React from 'react'
import { TreeSelect } from 'shineout'
// import data from 'doc/data/tree'

const data = [
  {
    id: '1',
    title: 'hello',
    children: [
      {
        id: '1-1',
        title: 'hello 1-1',
        children: [],
      },
      {
        id: '1-2',
        title: 'hello 1-2',
        children: [
          {
            id: '1-2-1',
            title: 'hello 1-2-1',
          }
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'world',
    children: [
      {
        id: '2-1',
        title: 'world 2-1',
      },
    ],
  },
  {
    id: '3',
    title: 'helloworld',
    children: [
      {
        id: '3-1',
        title: 'helloworld 3-1-1',
        children: [],
      }
    ]
  }
]

export default class extends React.Component {
  state = {
    value: [],
  }
  handleChange = v => {
    console.log(v)
    this.setState({
      value: v,
    })
  }

  handleFilter = v => d => d.title.indexOf(v) > -1
  render() {
    return (
      <div>
        <h2>{this.state.value}</h2>
        <TreeSelect
          disabled={v => v.id === '1'}
          onFilter={this.handleFilter}
          value={this.state.value}
          onChange={this.handleChange}
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
// export default function() {
//   return
// }
