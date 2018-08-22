/**
 * cn -
 *    -- 当 format 不能满足需求时，可以使用 Datum.List 进行处理
 * en -
 *    -- When the format does not satisfied your requirements, you can use <a href="#/components/Datum.List">Data.List</a> istead.
 */
import React, { Component } from 'react'
import { Radio, Datum } from 'shineout'

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
      format: 'color',
      prdiction: (v, d) => v === d.color,
    })
  }

  render() {
    return (
      <Radio.Group
        keygen="id"
        data={data}
        datum={this.datum}
        onChange={d => console.log(d)}
        value="cyan"
        renderItem="color"
      />
    )
  }
}
