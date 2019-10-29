/**
 * cn - 排序
 *    -- 设置 Table 的 sorter 属性统一指定排序函数
 *    -- 设置 column 的 sorter 标示此列需要排序并指定依据字段，会作为第一个参数传入排序函数
 *    -- sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序
 *    -- 后端或自行排序用户自行处理，sorter 函数不要返回结果
 * en - Sorter
 *    -- Set the sorter property of Table to indicate the method of table sort.
 *    -- Set the sorter property of Column to indicate the sort key string, will pass to table sorter method
 *    -- When the sorter returns a function, use this function to sort data internally.
 *    -- Server-side or self-sorting is is handled by the user, do not return results.
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(1000)
const columns = [
  {
    title: 'id',
    render: 'id',
    width: 80,
    sorter: 'id',
  },
  {
    title: 'Name',
    fixed: 'left',
    render: d => `${d.firstName} ${d.lastName}`,
    width: 160,
    sorter: 'firstName',
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
]

const sorter = {
  id: order => (a, b) => (order === 'asc' ? a.id - b.id : b.id - a.id),
  firstName: order => (a, b) =>
    order === 'asc' ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName),
}

function handleSorter(name, order) {
  return sorter[name](order)
}

function handleCancel(prevType, index) {
  console.log('sort cancel : ', prevType, index)
}

export default function() {
  return (
    <Table
      sorter={handleSorter}
      fixed="both"
      keygen="id"
      striped
      width={1200}
      style={{ maxHeight: 400 }}
      columns={columns}
      data={data}
      rowsInView={10}
      onSortCancel={handleCancel}
    />
  )
}
