import React from 'react'
import { mount } from 'enzyme'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

/* global SO_PREFIX */

describe('Table empty data 不能拖动列', () => {
  const data = fetchSync(20)
  const columns = [
    { title: 'id', render: 'id', fixed: 'left', maxWidth: 300, minWidth: 100 },
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
  let wrapper
  beforeAll(() => {
    wrapper = mount(
      <Table columnResizable height={300} width={1200} fixed="both" keygen="id" columns={columns} data={[]} />
    )
  })
  test('empty data can not resize', () => {
    expect(wrapper.find(`table .${SO_PREFIX}-table-resize-spanner`).length).toBe(0)
  })

  test('data not empty  can resize', () => {
    wrapper.setProps({ data })
    expect(wrapper.find(`table .${SO_PREFIX}-table-resize-spanner`).length).toBe(7)
  })
})
