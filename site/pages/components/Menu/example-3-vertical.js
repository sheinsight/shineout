/**
 * cn - 垂直样式
 *    -- 设置 mode 为 "vertical"，显示为垂直布局
 *    -- 设置 mode 为 "vertical-auto" 可以自动选择弹出方向（上下）
 * en - Vertical
 *    -- Set mode to "vertical" to display it as vertical layout.
 *    -- set 'vertical-auto' auto popup position
 */
import React from 'react'
import { Menu } from 'shineout'

const data = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    onClick: true,
    children: [
      {
        id: '4',
        title: 'Option 1',
      },
      {
        id: '5',
        title: 'Option 2',
      },
    ],
  },
  {
    id: '21',
    title: 'Navigation 21',
  },
  {
    id: '22',
    title: 'Navigation 22',
  },
  {
    id: '23',
    title: 'Navigation 23',
  },
  {
    id: '24',
    title: 'Navigation 24',
  },
  {
    id: '25',
    title: 'Navigation 25',
  },
  {
    id: '26',
    title: 'Navigation 26',
  },
  {
    id: '27',
    title: 'Navigation 27',
  },
  {
    id: '28',
    title: 'Navigation 28',
  },
  {
    id: '29',
    title: 'Navigation 29',
  },
  {
    id: '30',
    title: 'Navigation 30',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
        children: [
          {
            id: '9',
            title: 'Optic 1',
          },
          {
            id: '10',
            title: 'Optic 2',
          },
        ],
      },
    ],
  },
  {
    id: '31',
    title: 'Navigation 31',
  },
  {
    id: '32',
    title: 'Navigation 32',
  },
  {
    id: '33',
    title: 'Navigation 33',
  },
]

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: ['1'],
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(da) {
    this.setState({
      active: [da.id],
    })
  }

  render() {
    return (
      <Menu
        mode="vertical"
        keygen="id"
        data={data}
        renderItem={d => d.title}
        active={da => this.state.active.includes(da.id)}
        style={{ width: 256, height: 300 }}
        inlineIndent={24}
        onClick={this.handleClick}
      />
    )
  }
}
