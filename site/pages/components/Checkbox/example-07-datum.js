/**
 * cn -
 *    -- 当 format 不能满足需求时，可以使用 Datum.List 进行处理
 * en -
 *    -- When the format does not satisfied your requirements, you can use <a href="#/components/Datum.List">Data.List</a> istead.
 */
import React, { Component } from 'react'
import { Checkbox, Datum } from 'shineout'

const data = [
  { id: 1, color: 'red' },
  { id: 2, color: 'orange' },
  { id: 3, color: 'yellow' },
  { id: 4, color: 'green' },
  { id: 5, color: 'cyan' },
  { id: 6, color: 'blue' },
  { id: 7, color: 'violet' },
]

export default class extends Component {
  constructor(props) {
    super(props)
    this.datum = new Datum.List({
      prediction: (v, d) => v === d.color,
    })
  }

  renderItem = (d) => {
    const style = { borderBottom: `solid 1px ${d.color}`, paddingBottom: 2 }
    return <span style={style}>{d.color}</span>
  }

  render() {
    return (
      <Checkbox.Group
        keygen="id"
        data={data}
        datum={this.datum}
        onChange={d => console.log(d)}
        value={['blue', 'cyan']}
        renderItem={this.renderItem}
      />
    )
  }
}
