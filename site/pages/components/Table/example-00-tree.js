/**
 * cn - 树形数据
 *    -- 支持树形数据的展示，使用 treeColumnsName 指定子数据，treeIndent 指定每一层缩进宽度。
 * en - Tree Data
 *    -- Support Tree Data.
 */
import React from 'react'
import { Table } from 'shineout'

const data = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
    children: [
      {
        id: 6,
        firstName: 'Ialu',
        lastName: 'Opis',
        position: 'Finalick Designer',
        start: '2014-01-19',
        time: '19:22',
        salary: 205277,
        country: 'Tokiy',
        office: 'Miami',
        office5: 'Ticke',
        height: 109.22,
        children: [
          {
            id: 3,
            firstName: 'Dylan',
            lastName: 'Ratke',
            position: 'Development Lead',
            start: '2009-10-16',
            time: '01:45',
            salary: 236064,
            country: 'Peru',
            office: 'Boston',
            office5: 'Delhi',
            height: 179.53,
            children: [
              {
                id: 10,
                firstName: 'Danil',
                lastName: 'Forun',
                position: 'Development Lead',
                start: '2007-10-16',
                time: '11:45',
                salary: 235293,
                country: 'Deini',
                office: 'Conty',
                office5: 'Emie',
                height: 178.35,
              },
            ],
          },
        ],
      },
      {
        id: 7,
        firstName: 'Foak',
        lastName: 'Resilt',
        position: 'Dcaoko Designer',
        start: '2017-06-20',
        time: '10:12',
        salary: 205277,
        country: 'Moran',
        office: 'Korosal',
        office5: 'Tisk',
        height: 143.22,
      },
      {
        id: 8,
        firstName: 'Jest',
        lastName: 'Rokio',
        position: 'Fmaiil Mail',
        start: '2010-09-10',
        time: '20:12',
        salary: 235322,
        country: 'Moran',
        office: 'Ticko',
        office5: 'Fro',
        height: 123.22,
        children: [
          {
            id: 9,
            firstName: 'Domo',
            lastName: 'Wang',
            position: 'Ameri Kich',
            start: '2011-09-10',
            time: '00:12',
            salary: 439290,
            country: 'Moran',
            office: 'Fiour',
            office5: 'Slider',
            height: 99.18,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 11,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
]

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

export default function() {
  return <Table fixed="y" height={200} treeColumnsName="children" keygen="id" columns={columns} data={data} />
}
