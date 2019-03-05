import React from 'react'
import { Table } from 'shineout'
import Render from 'react-test-renderer'

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
]
const columnsFixed = [
  { title: 'id', render: 'id', width: 50 },
  {
    title: 'First Name',
    group: 'Name',
    render: 'firstName',
    width: 120,
  },
  {
    title: 'Last Name',
    fixed: 'left',
    group: 'Name',
    render: 'lastName',
    width: 120,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    fixed: 'right',
    width: 100,
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

describe('Table[Empty]', () => {
  test('should render empty table', () => {
    const wrapper = Render.create(<Table keygen="id" width={1500} columns={columns} data={[]} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
  test('should render empty table with fixed column', () => {
    const wrapper = Render.create(
      <Table bordered fixed="both" keygen="id" width={1500} style={{ height: 300 }} columns={columnsFixed} data={[]} />
    ).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
  test('should render empty table with emtpyText', () => {
    const wrapper = Render.create(
      <Table empty="custom empty text" keygen="id" width={1500} columns={columns} data={[]} />
    ).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
  test('should render loading status while empty', () => {
    const wrapper = Render.create(<Table keygen="id" width={1500} columns={columns} data={[]} loading />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})
