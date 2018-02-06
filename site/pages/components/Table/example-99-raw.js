/**
 * cn - 只使用样式 - tr, td
 * en - Style only
 */
import React from 'react'
import { Table } from 'shineout'

export default function () {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Office</th>
          <th>Start Date</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ashton Cox</td>
          <td>San Francisco</td>
          <td>2009/01/12</td>
          <td>$86,000</td>
        </tr>
        <tr>
          <td>Ashton Cox</td>
          <td>San Francisco</td>
          <td>2009/01/12</td>
          <td>$86,000</td>
        </tr>
        <tr>
          <td>Ashton Cox</td>
          <td>San Francisco</td>
          <td>2009/01/12</td>
          <td>$86,000</td>
        </tr>
        <tr>
          <td>Ashton Cox</td>
          <td>San Francisco</td>
          <td>2009/01/12</td>
          <td>$86,000</td>
        </tr>
      </tbody>
    </Table>
  )
}
