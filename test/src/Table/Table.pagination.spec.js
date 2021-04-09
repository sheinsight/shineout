import React from 'react'
import { mount } from 'enzyme'
import { Table } from 'shineout'
import Render from 'react-test-renderer'

/* global SO_PREFIX */
const columns = [
  {
    id: 'id',
    render: 'id',
  },
  {
    title: 'Name',
    render: 'name',
  },
]

const data = [{ id: 0, name: 'Jack' }, { id: 1, name: 'Lucy' }, { id: 2, name: 'Tom' }, { id: 3, name: 'Jerry' }]
function createTable(props) {
  return <Table keygen="id" columns={columns} data={data} {...props} />
}
describe('Table[pagination]', () => {
  test('should render correctly', () => {
    const wrapper = Render.create(
      createTable({
        pagination: {
          current: 1,
          pageSize: 1,
        },
      })
    ).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
  test('should use pageSize when defaultPageSize and pageSize are both specified', () => {
    const wrapper = mount(createTable({ pagination: { pageSize: 1 } }))
    expect(wrapper.find(`tr.${SO_PREFIX}-table-normal`)).toHaveLength(1)
  })
  test('repaginates when pageSize change', () => {
    const wrapper = mount(
      createTable({
        pagination: {
          pageSize: data.length,
        },
      })
    )
    expect(wrapper.find(`tr.${SO_PREFIX}-table-normal`)).toHaveLength(data.length)
    wrapper.setProps({ pagination: { pageSize: 1 } })
    expect(wrapper.find(`tr.${SO_PREFIX}-table-normal`)).toHaveLength(1)
  })
  test('should call onChange', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      createTable({
        pagination: {
          pageSize: 1,
          onChange: handleChange,
        },
      })
    )
    wrapper
      .find('ShineoutPaginationNext')
      .find('a')
      .prop('onClick')()
    expect(handleChange.mock.calls[0][0]).toBe(2)
  })
  test('should support specify the position of pagination', () => {
    const positions = ['left', 'center', 'right']
    positions.forEach(pos => {
      const wrapper = mount(
        createTable({
          pagination: {
            align: pos,
          },
        })
      )
      expect(wrapper.find(`.${SO_PREFIX}-pagination-${pos}`)).toHaveLength(1)
    })
  })
})
