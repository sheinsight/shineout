/**
 * cn - 水平布局
 * en - Base
 */
import React from 'react'
import { Menu } from 'shineout'

const data = [
  {
    id: '1',
    title: 'Navigation One',
  }, {
    id: '3',
    title: 'Navigation Two',
    children: [{
      id: '4',
      title: 'Option 1',
    }, {
      id: '5',
      title: 'Option 2',
    }],
  }, {
    id: '6',
    title: 'Navigation Three',
    children: [{
      id: '7',
      title: 'Option 3',
    }, {
      id: '8',
      title: 'Option 4',
    }],
  }, {
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
    return (
      <Menu
        mode="horizontal"
        keygen="id"
        data={data}
        renderItem={d => d.title}
        active={da => this.state.active.includes(da.id)}
        inlineIndent={24}
        onClick={this.handleClick}
      />
    )
  }
}
