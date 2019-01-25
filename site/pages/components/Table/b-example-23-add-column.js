/**
 * cn - 动态增加列
 * en - \n Dynamically increase columns.
 */
import React, { Component } from 'react'
import immer from 'immer'
import { Button, Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(100)

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        { title: 'id', render: 'id', width: 50 },
        { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
        { title: 'Country', render: 'country' },
        { title: 'Position', render: 'position' },
        { title: 'Office', render: 'office' },
        {
          title: 'Date',
          render: 'start',
          group: 'Start Time',
          width: 120,
        },
        {
          title: 'Time',
          render: 'time',
          group: 'Start Time',
          width: 80,
        },
      ],
    }
  }

  addColumn = () => {
    this.setState(
      immer(draft => {
        draft.columns.push({
          title: `cols ${draft.columns.length}`,
          render: 'salary',
          width: 100,
        })
      })
    )
  }

  removeColumn = () => {
    this.setState(
      immer(draft => {
        draft.columns.pop()
      })
    )
  }

  render() {
    const allWidth = this.state.columns.reduce((count, col) => count + (col.width || 120), 0)
    return (
      <div>
        <Button onClick={this.addColumn}>Add Column</Button>
        <Button onClick={this.removeColumn}>Remove Column</Button>
        <Table
          fixed="both"
          keygen="id"
          width={allWidth}
          style={{ height: 400 }}
          columns={this.state.columns}
          data={data}
        />
      </div>
    )
  }
}
