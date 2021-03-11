/**
 * cn - 行内元素点击
 *    -- 设置rowClickAttr，可以使行内元素的点击事件触发onRowClick
 * en - Base
 *    -- Set the rowClickAttr to trigger an onRowClick event for an element.
 */
import React from 'react'
import { Table, Select, Button } from 'shineout'
import { fetchSync } from 'doc/data/user'

const dataList = fetchSync(4)

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  {
    title: 'Operation',
    render: () => (
      <span>
        <Button data-info size="small">
          info
        </Button>
        &nbsp;
        <Button data-call type="primary" size="small">
          call
        </Button>
      </span>
    ),
  },
]

export default class extends React.PureComponent {
  state = {
    count: 0,
    attrs: ['*'],
  }

  handleClick = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }

  handleChange = value => {
    this.setState({
      attrs: value,
    })
  }

  render() {
    const { attrs, count } = this.state
    return (
      <div>
        <Table rowClickAttr onRowClick={this.handleClick} keygen="id" columns={columns} data={dataList} />
        Select rowClickAttr：
        <Select
          style={{ width: '300px', margin: '0 0 10px 10px' }}
          data={['data-info', 'data-call', '*']}
          keygen
          multiple
          placeholder="select rowClickAttr"
          value={attrs}
          onChange={this.handleChange}
        />
        <div>
          <span>onRowClick call count： </span> <strong>{count}</strong>
        </div>
      </div>
    )
  }
}
