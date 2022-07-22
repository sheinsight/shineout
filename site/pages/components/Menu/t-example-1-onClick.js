/**
 * cn - 父菜单可选中
 *    -- 设置 parentSelectable 使父级菜单支持单独选中 <br /> 此时父级菜单左侧区域用于选中，偏右侧区域用于展开和收起子菜单
 * en - Parent Selectable
 *    -- Setting the parentSelectable property can make the parent menu trigger the onClick of the Menu after clicking
 */
import React from 'react'
import { Menu } from 'shineout'

const data = [
  {
    id: '1',
    title: 'Parent 1',
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
        parentSelectable
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
