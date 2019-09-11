/**
 * cn -
 *    -- 受控,当传入一个expandKeys时,展开会变成受控的,需要自行在column里面的onClick去处理
 * en -
 *    -- When an expandKeys is provided, the expansion becomes controlled and needs to be processed by the onClick in the column.
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(100)

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandKeys: [1],
    }
  }

  render() {
    const { expandKeys } = this.state
    const columns = [
      { title: 'id', render: 'id', width: 50 },
      {
        type: 'expand',
        onClick: (d, isExpand) => {
          if (isExpand) this.setState({ expandKeys: [...expandKeys, d.id] })
          else this.setState({ expandKeys: expandKeys.filter(k => k !== d.id) })
        },
        render: d => {
          if (d.id > 5) return undefined
          return () => <div style={{ padding: '10px 30px', wordBreak: 'break-all' }}>{JSON.stringify(d)}</div>
        },
      },
      { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
      { title: 'Office', render: 'office' },
      { title: 'Start Date', render: 'start' },
      {
        title: 'Salary',
        render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
      },
    ]
    return <Table fixed="y" expandKeys={expandKeys} data={data} keygen="id" style={{ height: 300 }} columns={columns} />
  }
}
