/**
 * cn -
 *    -- 复杂的数据可以使用 Datum.List 进行处理
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
      // format: d => d.color,
      format: 'color',
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
