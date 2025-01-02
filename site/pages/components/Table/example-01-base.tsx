/**
 * cn - 基本用法
 *    -- 基础的表格用法。推荐 columns 写为常量，以提升性能。
 * en - Base
 *    -- Basic table usage.
 */
import React from 'react'
import { Table, Image } from 'shineout'
import Ellipsis from '@shein-components/Ellipsis'
import Icon from '@shein-components/Icon'
import testData from './z-test-big-data'

const chanelIconMap = {
  '3': 'pc-facebook-shineout-fill',
  '5': 'pc-tiktok-multic',
}

const name = <span style={{ background: '#ccc', display: 'block', lineHeight: '40px', color: '#fff' }}>Name</span>

const App: React.FC = () => {
  const columns = [
    // { title: 'id', width: 120, render: (_, index) => index, fixed: 'left' },
    // { title: 'First Name', width: 120, render: () => 'firstName', group: [name, 'True Name'] },
    // { title: 'Last Name', width: 120, render: () => 'lastName', group: [name, 'True Name'] },
    // { title: 'Nick Name', fixed: 'left', width: 120, render: () => 'nickname', group: name },
    {
      title: 'KOL信息/账号信息',
      width: 200,
      render: row => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={row.avatar} />
          <div>
            <Ellipsis autoSize value={`${row.partnerId} ${row.username}`} />
            <div>
              {(row.channels || []).map(item => (
                <Icon name={chanelIconMap[item]} />
              ))}
            </div>
          </div>
        </div>
      ),
      fixed: 'left',
      group: ['KOL信息/账号信息群组1', 'KOL信息/账号信息群组2'],
    },
    {
      title: 'KOL信息/账号信息2',
      group: ['KOL信息/账号信息群组1', 'KOL信息/账号信息群组2'],
      render: () => '123',
      width: 200,
      fixed: 'left',
    },

    { title: 'id', render: (_, index) => index, width: 200 },
    { title: 'Name', width: 200, render: d => `${d.firstName} ${d.lastName}` },
    { title: 'Country', width: 200, render: 'country' },
    { title: 'Position', width: 200, render: 'position' },
    { title: 'Office', width: 200, render: 'office' },
    { title: 'Start Date', width: 200, render: 'start' },
    {
      title: 'Salary',
      width: 200,
      render: (d: any) => 'Salary',
    },
    { title: 'First Name2', width: 120, render: () => 'firstName', group: [name, 'True Name'] },
    { title: 'Last Name2', width: 120, render: () => 'lastName', group: [name, 'True Name'] },
    { title: 'Name2', width: 110, render: () => 'nick2', group: name },
  ]

  const tableWidth = columns.reduce((acc, item) => acc + item.width, 0)

  return (
    <div style={{ overflow: 'auto', height: 500 }} id="xxxxxx">
      <Table
        // keygen="id"
        keygen={d => d.cooperateId || d.channelId || d.partnerId}
        columns={columns}
        // data={testData.slice(0, 10)}
        data={testData}
        height="auto"
        hover={false}
        columnResizable
        onRowSelect={() => {}}
        width={tableWidth}
        fixed="x"
        bordered
        nativeScroll
      />
    </div>
  )
}

export default App
