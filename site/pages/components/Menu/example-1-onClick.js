/**
 * cn - 父菜单可选中
 *    -- 为父菜单数据设置 onClick 为 true， 可以使其在点击后触发 Menu 的 onClick
 * en - Parent clickable
 *    -- Set onClick for the parent menu data to trigger the onClick of the Menu after clicking
 */
import React from 'react'
import { Menu } from 'shineout'

const data = [
  {
    id: '1',
    title: 'Parent 1',
    onClick: true,
    children: [
      {
        id: '2',
        title: 'Option 2',
      },
      {
        id: '3',
        title: 'Option 3',
      },
    ],
  },
  {
    id: '4',
    title: 'Parent 4',
    onClick: true,
    children: [
      {
        id: '5',
        title: 'Option 5',
      },
      {
        id: '6',
        title: 'Option 6',
      },
    ],
  },
  {
    id: '7',
    title: 'Option 7',
  },
]

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: '1',
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(d) {
    this.setState({
      active: d.id,
    })
  }

  checkActive = d => this.state.active === d.id

  render() {
    return (
      <Menu
        keygen="id"
        data={data}
        renderItem={d => d.title}
        active={this.checkActive}
        style={{ width: 256 }}
        onClick={this.handleClick}
      />
    )
  }
}
