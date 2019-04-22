/**
 * cn - 基本用法
 *    -- 默认标签样式
 * en - Base
 *    -- Basic usage.
 */
import React from 'react'
import { Tabs, Table } from 'shineout'
import lorem from 'doc/utils/faker/lorem'
import { fetchSync } from 'doc/data/user'

const panelStyle = { padding: '12px 0' }

const data = fetchSync(20)
const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

export default class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      value: 1,
    }
    this.index = 0
  }

  componentDidMount() {
    setTimeout(() => {
      console.log('change')
      this.setState({
        data: fetchSync(25),
      })
    }, 5000)
  }

  handleChange = value => {
    this.setState({
      value,
    })
  }

  render() {
    return (
      <div>
        {this.state.value}
        <Tabs defaultActive={this.state.value} onChange={this.handleChange}>
          <Tabs.Panel style={panelStyle} tab="Home">
            <div style={{ height: 300, overflow: 'auto' }}>
              <div style={{ height: 1000 }}>asdfklasfjlkasfjalskfj</div>
            </div>
          </Tabs.Panel>
          <Tabs.Panel style={panelStyle} tab="Profile">
            <Table
              bordered
              rowsInView={30}
              keygen="id"
              columns={columns}
              data={this.state.data}
              fixed="y"
              height={200}
            />
          </Tabs.Panel>
        </Tabs>
      </div>
    )
  }
}
