/**
 * cn - 滚动
 *    -- 固定表头的表格提供了一个 scrollToIndex 方法滚动到指定行，因为非固定行高的原因，滚动到未渲染过的行有一定偏差，请谨慎使用。
 * en - scrollToIndex
 *    -- The table of the fixed header provides a scrollToIndex method to scroll to the specified line. Because of the row height is not fixed, scrolling to the unrendered line has a little deviation. Please use it with caution.
 */
import React, { Component } from 'react'
import { Input, Table, Form } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(10000)
const columns = [
  { title: 'id', render: 'id', width: 80 },
  {
    title: 'Name',
    fixed: 'left',
    render: d => (
      <div id={`name_${d.id}`} style={{ height: d.height }}>
        {d.firstName} {d.lastName}
      </div>
    ),
    width: 160,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start', width: 140 },
]

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { index: 25 }
  }

  componentDidMount() {
    setTimeout(this.handleScroll)
  }

  handleIndexChange = ({ index }) => {
    this.setState({ index }, this.handleScroll)
  }

  handleScroll = () => {
    this.table.scrollToIndex(this.state.index - 1, () => {
      const el = document.querySelector(`#name_${this.state.index}`)
      if (el) {
        el.style.color = 'red'
      }
    })
  }

  render() {
    return (
      <div>
        <Form value={this.state} inline onSubmit={this.handleIndexChange}>
          <Input.Number min={1} max={10000} width={100} name="index" />
          <Form.Submit>Scroll</Form.Submit>
        </Form>
        <Table
          fixed="both"
          keygen="id"
          width={1400}
          style={{ height: 600 }}
          columns={columns}
          data={data}
          tableRef={table => {
            this.table = table
          }}
          rowsInView={10}
          rowHeight={80}
        />
      </div>
    )
  }
}
