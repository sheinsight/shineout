/**
 * cn -
 *    -- 展开图标在其他列
 * en -
 *    --  expeng icon in other column
 */
import React from 'react'
import { Table } from 'shineout'

const data = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    country: 'Reunion',
    office: 'Miami',
    children: [
      {
        id: 6,
        firstName: 'Ialu',
        lastName: 'Opis',
        position: 'Finalick Designer',
        country: 'Tokiy',
        office: 'Miami',
        children: [
          {
            id: 3,
            firstName: 'Dylan',
            lastName: 'Ratke',
            position: 'Development Lead',
            country: 'Peru',
            office: 'Boston',
            children: [
              {
                id: 10,
                firstName: 'Danil',
                lastName: 'Forun',
                position: 'Development Lead',
                country: 'Deini',
                office: 'Conty',
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
        country: 'Moran',
        office: 'Korosal',
      },
      {
        id: 8,
        firstName: 'Jest',
        lastName: 'Rokio',
        position: 'Fmaiil Mail',
        country: 'Moran',
        office: 'Ticko',
        children: [
          {
            id: 9,
            firstName: 'Domo',
            lastName: 'Wang',
            position: 'Ameri Kich',
            country: 'Moran',
            office: 'Fiour',
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
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
  },
  {
    id: 11,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    country: 'Peru',
    office: 'Chengdu',
    children: [
      {
        id: 12,
        firstName: 'Dylan',
        lastName: 'Ratke',
        position: 'Development Lead',
        country: 'Peru',
        office: 'Boston',
      },
    ],
  },
  {
    id: 13,
    firstName: 'Wolo',
    lastName: 'Casho',
    position: 'Developer',
    country: 'Franch',
    office: 'Jiangsu',
  },
  {
    id: 14,
    firstName: 'Lou',
    lastName: 'Woch',
    position: 'Befined',
    country: 'China',
    office: 'Beijing',
    children: [
      {
        id: 15,
        firstName: 'Oos',
        lastName: 'Wargen',
        position: 'UX Designer',
        country: 'Upck',
        office: 'Andwarea',
      },
    ],
  },
  {
    id: 16,
    firstName: 'Endted',
    lastName: 'Wang',
    position: 'Ameri Kich',
    country: 'Moran',
    office: 'Fiour',
    children: [
      {
        id: 17,
        firstName: 'Oos',
        lastName: 'Wargen',
        position: 'UX Designer',
        country: 'Upck',
        office: 'Andwarea',
      },
    ],
  },
  {
    id: 18,
    firstName: 'Danil',
    lastName: 'Forun',
    position: 'Development Lead',
    country: 'Deini',
    office: 'Conty',
  },
]

const columns = [
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}`, width: 300 },
  { title: 'Country', render: 'country', treeColumnsName: 'children' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
]

export default function() {
  return <Table bordered fixed="y" height={300} keygen="id" columns={columns} data={data} />
}
