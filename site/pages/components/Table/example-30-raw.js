/**
 * cn - 只使用样式
 *    -- 使用原生的tr, td来显示表格
 * en - Style only
 *    -- Use the native tr and td to display the table.
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(6)

export default function() {
  return (
    <Table striped keygen="id">
      <thead>
        <tr>
          <th>Name</th>
          <th>Office</th>
          <th>Start Date</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {data.map(d => (
          <tr key={d.id}>
            <td>
              {d.firstName} {d.lastName}
            </td>
            <td>{d.office}</td>
            <td>{d.start}</td>
            <td>${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
