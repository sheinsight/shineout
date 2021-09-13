/**
 * cn -
 *    -- 设置 treeCheckAll, 支持递归选择子数据
 * en -
 *    -- Set treeCheckAll to deep check children
 */
import React from 'react'
import { Table, Radio } from 'shineout'

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
              {
                id: 13,
                firstName: 'Blus',
                lastName: 'Li',
                position: 'NanJin',
                country: 'China',
                office: 'JiangNing',
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
]

const columns = [
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}`, width: 300, treeColumnsName: 'children' },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
]

const treeMode = ['true', 'half']

export default function() {
  const [mode, setMode] = React.useState('true')
  return (
    <React.Fragment>
      <Radio.Group data={treeMode} value={mode} onChange={setMode} renderItem={d => `treeCheckAll = ${d}`} />
      <Table
        key={mode}
        onRowSelect={selected => console.log(selected)}
        bordered
        fixed="y"
        keygen="id"
        format="id"
        defaultTreeExpandKeys={[1, 6]}
        columns={columns}
        data={data}
        treeCheckAll={mode === 'true' ? true : mode}
      />
    </React.Fragment>
  )
}
