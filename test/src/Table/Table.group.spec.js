import React from 'react'
import { Table } from 'shineout'
import Render from 'react-test-renderer'

const name = (
  <span
    style={{
      background: '#ccc',
      display: 'block',
      lineHeight: '40px',
      color: '#fff',
    }}
  >
    Name
  </span>
)
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
const other = <span>Other</span>

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'First Name', render: 'firstName', group: [name, 'True Name'] },
  { title: 'Last Name', render: 'lastName', group: [name, 'True Name'] },
  { title: 'Nick Name', render: () => 'nickname', group: name },
  { title: 'Country', render: 'country' },
  { title: 'Office', render: 'office', group: other },
  { title: 'Position', render: 'position', group: other },
]

describe('Table[group]', () => {
  test('should render group header', () => {
    const wrapper = Render.create(<Table bordered keygen="id" columns={columns} data={data} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})
