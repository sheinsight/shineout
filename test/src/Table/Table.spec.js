import React from 'react'
import { mount, render, shallow } from 'enzyme'
import { Table } from 'shineout'
import TableBase from '../../../site/pages/components/Table/example-01-base'
import Render from 'react-test-renderer'

const columns = [{ title: 'id', render: 'id', width: 50 }, { title: 'Name', render: 'name' }]
const data = [
  {
    id: 1,
    name: '1',
  },
  {
    id: 2,
    name: '2',
  },
  {
    id: 3,
    name: '3',
  },
]

describe('Table[Base]', () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<TableBase />)
  })
  test('should render correct dom structure', () => {
    expect(wrapper.find(`table colgroup`).length).toBe(2)
    expect(wrapper.find(`table thead`).length).toBe(1)
    expect(wrapper.find(`table tbody`).length).toBe(1)
  })
  test('should render correct columns and data', () => {
    const innerColumns = wrapper.find('ShineoutTable').prop('columns')
    const innerData = wrapper.find('ShineoutTable').prop('data')
    expect(wrapper.find('table thead th').length).toBe(innerColumns.length)
    expect(wrapper.find('table tbody tr').length).toBe(innerData.length + 1)
  })
  test('should update columns when receiving props', () => {
    const innerColumns = [{ title: 'id', render: 'id' }]
    const w = shallow(<Table columns={innerColumns} keygen="id" />)
    const newColumns = [{ title: 'id', render: 'id' }, { title: 'Name', render: 'name' }]
    w.setProps({
      columns: newColumns,
    })
    expect(w.instance().props.columns).toBe(newColumns)
  })
})

describe('Table[Border&striped]', () => {
  test('should render border & striped', () => {
    const wrapper = Render.create(<Table keygen="id" striped bordered columns={columns} data={data} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Table[small]', () => {
  test('should render compact table', () => {
    const wrapper = Render.create(<Table keygen="id" size="small" columns={columns} data={data} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})
