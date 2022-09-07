/**
 * cn - 水平布局
 *    -- 设置 mode 为 "horizontal"，显示为水平布局（子菜单在右侧弹出）
 * en - Horizontal
 *    -- Set mode to "horizontal" to display it as horizontal layout (submenu pops up on the right).
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
    id: '6',
    title: 'Navigation Three',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
      },
    ],
  },
  {
    id: '2',
    title: 'Navigation Four',
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
    const { active } = this.state
    return (
      <Menu
        mode="horizontal"
        keygen="id"
        data={data}
        renderItem={d => d.title}
        active={da => active.includes(da.id)}
        inlineIndent={24}
        onClick={this.handleClick}
      />
    )
  }
}
