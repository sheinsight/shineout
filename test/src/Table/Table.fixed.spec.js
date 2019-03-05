import React from 'react'
import { mount } from 'enzyme'
import { Table } from 'shineout'

function clearLength(snapshot) {
  return snapshot.replace('length={0}', '').replace('length={NaN}', '')
}
describe('Table[Fixed-Header]', () => {
  const columns = [
    { title: 'id', render: 'id', width: 50 },
    { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
    { title: 'Country', render: 'country' },
    { title: 'Position', render: 'position' },
    { title: 'Office', render: 'office' },
    { title: 'Start Date', render: 'start' },
  ]
  const data = [
    {
      id: 0,
      firstName: `name0`,
      lastName: `name0`,
      country: 'country',
      position: 'position',
      office: 'office',
      start: 'start',
    },
  ]
  test('should fixed header with less columns', () => {
    const wrapper = mount(
      <Table fixed="y" data={data} keygen="id" style={{ height: 300 }} columns={columns.slice(0, 4)} />
    )
    expect(clearLength(wrapper.debug())).toMatchSnapshot()
  })
  test('should fixed header with many columns', () => {
    const wrapper = mount(
      <Table fixed="both" keygen="id" width={1500} height={300} columns={columns} bordered data={data} />
    )
    expect(clearLength(wrapper.debug())).toMatchSnapshot()
  })
})

describe('Table[Fixed-Columns]', () => {
  const columns = [
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
  ]
  const data = Array(5)
    .fill(1)
    .map((v, i) => ({
      id: i,
      firstName: 'firstName',
      lastName: 'lastName',
      country: 'country',
      position: 'position',
      office: 'office',
      start: 'start',
      render: 'time',
    }))
  test('should fixed columns', () => {
    const wrapper = mount(
      <Table fixed="both" keygen="id" width={1500} style={{ height: 300 }} columns={columns} data={data} />
    )
    expect(clearLength(wrapper.debug())).toMatchSnapshot()
  })
  test('shoul only fixed right columns', () => {
    const innerColumns = [
      { title: 'id', render: 'id', width: 50 },
      { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
      { title: 'Country', render: 'country' },
      { title: 'Position', render: 'position' },
      { title: 'Office', render: 'office' },
      {
        title: 'Date',
        render: 'start',
        fixed: 'right',
        group: 'Start Time',
        width: 120,
      },
      {
        title: 'Time',
        render: 'time',
        group: 'Start Time',
        width: 80,
      },
    ]
    const wrapper = mount(<Table fixed="x" keygen="id" width={1500} columns={innerColumns} data={data} />)
    expect(clearLength(wrapper.debug())).toMatchSnapshot()
  })
})
