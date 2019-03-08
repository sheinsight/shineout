import React from 'react'
import Render from 'react-test-renderer'
import { mount } from 'enzyme'
import { Table, Spin } from 'shineout'

/* global SO_PREFIX */
const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
]
const data = [
  {
    id: 0,
    firstName: 'first',
    lastName: 'last',
    country: 'country',
    position: 'pos',
    office: 'office',
  },
]
const loading = <Spin color="#1890ff" name="ring" />
describe('Table[loading]', () => {
  test('should render loading', () => {
    const wrapper = Render.create(<Table keygen="id" loading={loading} columns={columns} data={data} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
  test('should have default loading', () => {
    const wrapper = mount(<Table keygen="id" loading columns={columns} />)
    expect(wrapper.find(`.${SO_PREFIX}-table-loading`).length).toBe(1)
  })
})
