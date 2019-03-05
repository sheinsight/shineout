import React from 'react'
import { Table } from 'shineout'
import Render from 'react-test-renderer'
import { mount } from 'enzyme'

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
]
const data = Array(10)
  .fill(0)
  .map((v, i) => ({
    id: `id${i}`,
    firstName: 'first',
    lastName: 'last',
  }))

const rowClassName = (d, index) => {
  if (index % 2) return 'table-bg-danger'
  return 'table-bg-success'
}
describe('Table[rowClassname]', () => {
  test('should render correct', () => {
    const wrapper = Render.create(
      <Table keygen="id" columns={columns} data={data} rowClassName={rowClassName} />
    ).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})
