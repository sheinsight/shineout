import React from 'react'
import { mount } from 'enzyme'
import { Table } from 'shineout'
import TableSort from '../../../site/pages/components/Table/example-10-sort'

/* global SO_PREFIX */
describe('Table[sort]', () => {
  test('should render sort icon', () => {
    const wrapper = mount(<TableSort />)
    const columns = wrapper.find('ShineoutTable').prop('columns')
    wrapper.find(`.${SO_PREFIX}-table-head table thead th`).forEach((th, index) => {
      if (!columns[index].sorter) return
      expect(th.find(`a.${SO_PREFIX}-table-sorter-asc`).length).toBe(1)
      expect(th.find(`a.${SO_PREFIX}-table-sorter-desc`).length).toBe(1)
    })
  })

  test('should sort records', () => {
    const columns = [
      {
        title: 'id',
        render: 'id',
      },
      {
        title: 'name',
        render: 'name',
        sorter: order => (a, b) => {
          if (order === 'asc') return b.name.localeCompare(a.name)
          return a.name.localeCompare(b.name)
        },
      },
    ]
    const data = [{ id: 0, name: 'Jack' }, { id: 1, name: 'Lucy' }, { id: 2, name: 'Tom' }, { id: 3, name: 'Jerry' }]
    const wrapper = mount(<Table keygen="id" data={data} columns={columns} />)
    const sortColumn = wrapper.find(`table thead th`).at(1)

    // desc
    sortColumn.find(`a.${SO_PREFIX}-table-sorter-desc`).simulate('click')
    expect(
      wrapper
        .find('Table')
        .prop('data')
        .map(v => v.name)
    ).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom'])
    // asc
    sortColumn.find(`a.${SO_PREFIX}-table-sorter-asc`).simulate('click')
    expect(
      wrapper
        .find('Table')
        .prop('data')
        .map(v => v.name)
    ).toEqual(['Tom', 'Lucy', 'Jerry', 'Jack'])
  })
})
