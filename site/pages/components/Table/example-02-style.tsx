/**
 * cn - 边框和底纹
 *    -- 通过 striped 显示交错底纹；通过 bordered 显示边框。
 * en - Style
 *    -- Set striped to add zebra-striping; Set bordered to add borders.
 */
import React from 'react'
import { Table, TYPE } from 'shineout'
import { fetchSync } from 'doc/data/user'

interface TableRowData {
  id: number
  time: string
  start: string
  height: number
  salary: number
  office: string
  country: string
  office5: string
  position: string
  lastName: string
  firstName: string
}
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>

const data: TableRowData[] = fetchSync(4)

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}`, align: 'right' },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position', align: 'right' },
  { title: 'Office', render: 'office' },
]

const App: React.FC = () => <Table keygen="id" striped bordered columns={columns} data={data} />

export default App
