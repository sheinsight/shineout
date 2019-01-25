/**
 * cn - 自定义渲染
 *    -- 设置 renderItem 属性展现稍微复杂的内容
 * en - RenderItem
 *    -- Set the renderItem property to show format content.
 */
import React from 'react'
import { Menu } from 'shineout'
import Icon from '../Icon/FontAwesome'

const Icons = {
  1: <Icon name="home" />,
  3: <Icon name="flag" />,
  6: <Icon name="tag" />,
  2: <Icon name="github" />,
}
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

function renderItem(da) {
  if (da.title.startsWith('Navigation')) {
    return (
      <span>
        {Icons[da.id]} {da.title}
      </span>
    )
  }
  return da.title
}

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
        renderItem={renderItem}
        active={da => this.state.active.includes(da.id)}
        style={{ width: 256 }}
        inlineIndent={24}
        defaultOpenKeys={['3']}
        onClick={this.handleClick}
      />
    )
  }
}
