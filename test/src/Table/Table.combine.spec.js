import React from 'react'
import { Table } from 'shineout'
import Render from 'react-test-renderer'

const columns = [
  {
    title: 'id',
    render: 'id',
    width: 70,
  },
  { title: 'First Name', group: 'Name', render: 'firstName' },
  { title: 'Last Name', group: 'Name', render: 'lastName' },
  {
    title: 'Start Date',
    render: 'start',
    rowSpan: (a, b) => a.start === b.start,
    colSpan: d => {
      const hour = parseInt(d.time.slice(0, 2), 10)
      if (hour > 21 || hour < 9) return 2
      return 1
    },
  },
  { title: 'Time', render: 'time' },
  { title: 'Office', render: 'office5', rowSpan: true },
]

const data = [
  {
    id: 5839,
    firstName: 'Ryley',
    lastName: 'Ruecker',
    position: 'Marketing Designer',
    start: '2005-06-26',
    time: '12:30',
    salary: 329526,
    country: 'Lebanon',
    office: 'Mexico City',
    office5: 'Baghdad',
    height: 163.12,
  },
  {
    id: 6558,
    firstName: 'Patience',
    lastName: 'Stark',
    position: 'Secretary',
    start: '2005-06-26',
    time: '10:35',
    salary: 241073,
    country: 'Syrian Arab Republic',
    office: 'Atlanta',
    office5: 'Osaka-Kobe-Kyoto',
    height: 87.46,
  },
  {
    id: 2418,
    firstName: 'Myrtis',
    lastName: 'Denesik',
    position: 'Support Engineer',
    start: '2005-06-27',
    time: '03:46',
    salary: 239196,
    country: 'Bosnia and Herzegovina',
    office: 'Mexico City',
    office5: 'Baghdad',
    height: 130.66,
  },
  {
    id: 2612,
    firstName: 'Mollie',
    lastName: 'Kling',
    position: 'Javascript Developer',
    start: '2005-06-27',
    time: '10:38',
    salary: 131931,
    country: 'Ghana',
    office: 'Tokyo',
    office5: 'Fuzhou',
    height: 131.5,
  },
  {
    id: 6257,
    firstName: 'Cecilia',
    lastName: 'Wisozk',
    position: 'Support Lead',
    start: '2005-06-28',
    time: '01:04',
    salary: 159013,
    country: 'Falkland Islands (Malvinas)',
    office: 'London',
    office5: 'Berlin',
    height: 94.45,
  },
  {
    id: 6428,
    firstName: 'Lela',
    lastName: 'Murray',
    position: 'Accountant',
    start: '2005-06-28',
    time: '07:01',
    salary: 130936,
    country: 'Syrian Arab Republic',
    office: 'Mexico City',
    office5: 'Fuzhou',
    height: 133.12,
  },
  {
    id: 9469,
    firstName: 'Vernie',
    lastName: 'Ondricka',
    position: 'Integration Specialist',
    start: '2005-06-29',
    time: '09:44',
    salary: 267203,
    country: 'Wallis and Futuna',
    office: 'Chengdu',
    office5: 'Osaka-Kobe-Kyoto',
    height: 123.94,
  },
  {
    id: 7841,
    firstName: 'Maud',
    lastName: 'Gutkowski',
    position: 'Integration Specialist',
    start: '2005-06-30',
    time: '11:21',
    salary: 406431,
    country: 'Mexico',
    office: 'Chicago',
    office5: 'Baghdad',
    height: 149.17,
  },
  {
    id: 9634,
    firstName: 'Dixie',
    lastName: 'Strosin',
    position: 'Marketing Designer',
    start: '2005-06-30',
    time: '02:14',
    salary: 300638,
    country: 'Mexico',
    office: 'Delhi',
    office5: 'Osaka-Kobe-Kyoto',
    height: 145.6,
  },
  {
    id: 4758,
    firstName: 'Henderson',
    lastName: 'McCullough',
    position: 'Sales Assistant',
    start: '2005-07-01',
    time: '12:47',
    salary: 438465,
    country: 'Netherlands',
    office: 'Ho Chi Minh City',
    office5: 'Osaka-Kobe-Kyoto',
    height: 80.78,
  },
]
describe('Table[combine]', () => {
  test('should combine with pagination', () => {
    const wrapper = Render.create(
      <Table keygen="id" columns={columns} data={data} pagination={{ current: 1 }} />
    ).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
  test('should combine without pagination', () => {
    const wrapper = Render.create(<Table keygen="id" columns={columns} data={data} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})
