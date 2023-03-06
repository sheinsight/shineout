import React from 'react'
import { Table } from 'shineout'
import { mount } from 'enzyme'
import TableCExpand from '../../../site/pages/components/Table/example-22-expand-control'

/* global SO_PREFIX */
const columns = [
  { title: 'id', render: 'id', width: 50 },
  {
    type: 'row-expand',
    render: d => () => <div>{JSON.stringify(d)}</div>,
  },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
]
const data = Array(10)
  .fill(0)
  .map((v, i) => ({
    id: `id${i}`,
    firstName: 'first',
    lastName: 'last',
  }))

describe('Table[expand]', () => {
  test('should render correct', () => {
    const wrapper = mount(<Table data={data} keygen="id" columns={columns} />)
    wrapper.find(`table tbody span.${SO_PREFIX}-table-expand-indicator`).forEach(expand => {
      expand.prop('onClick')()
    })
    wrapper.update()
    expect(wrapper.debug()).toMatchSnapshot()
  })
  test('should expand while click the expand btn', () => {
    const wrapper = mount(<Table data={data} keygen="id" columns={columns} />)
    wrapper.find(`table tbody span.${SO_PREFIX}-table-expand-indicator`).forEach(expand => {
      expand.prop('onClick')()
    })
    wrapper.update()
    expect(wrapper.find('td iframe')).toHaveLength(data.length)
  })

  test('should control the expandKeys', () => {
    const wrapper = mount(<TableCExpand />)
    wrapper.find(`span.${SO_PREFIX}-table-expand-indicator`).forEach(i => {
      i.prop('onClick')()
    })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-checkinput-checked`).length).toBe(4)
  })
})
