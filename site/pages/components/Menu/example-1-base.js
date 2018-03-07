/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Menu } from 'shineout'

const data = [
  {
    id: '1',
    title: 'Home',
  }, {
    id: '3',
    title: 'Product',
  }, {
    id: '6',
    title: 'Buyer',
  }, {
    id: '2',
    title: 'Index',
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
        // multiple
        keygen={d => `${d.id}my`}
        data={data}
        itemRender={d => d.title}
        active={da => this.state.active.includes(da.id)}
        style={{ width: 256 }}
        inlineIndent={14}
        onClick={this.handleClick}
      />
    )
  }
}
