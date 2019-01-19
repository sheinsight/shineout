/**
 * cn - 基本用法
 *    -- Menu 通过数据来生成菜单项
 * en - Base
 *    -- Menu generates menu items through data.
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
    id: '6',
    title: 'Navigation Three',
    onClick: () => console.log('only click'),
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
    id: '2',
    title: 'Navigation Four',
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
        inlineIndent={24}
        onClick={this.handleClick}
      />
    )
  }
}
