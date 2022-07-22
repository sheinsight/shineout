/**
 * cn - 禁用菜单
 *    -- 通过 disabled 属性可以禁用选项
 * en - Disabled
 *    --Disable the option by the disabled property.
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
    disabled: true,
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
    disabled: true,
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
        mode="inline"
        keygen="id"
        data={data}
        disabled={d => d.disabled}
        renderItem={d => d.title}
        active={d => this.state.active.includes(d.id)}
        style={{ width: 256 }}
        inlineIndent={24}
        onClick={this.handleClick}
      />
    )
  }
}
