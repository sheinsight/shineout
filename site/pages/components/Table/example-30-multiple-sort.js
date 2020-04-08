/**
 * cn - 多列排序
 *    -- 设置 Table 的 sorter 属性统一指定排序函数
 *    -- 设置 column 的 sorter 为一个对象，对象的rule属性同单列排序的sorter，weight表示排序权重，值越大表示排序优先级越高
 *    -- 支持多列默认排序，为需要默认排序的列设置defaultOrder
 *    -- sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序
 *    -- 后端或自行排序用户自行处理，sorter 函数不要返回结果
 * en - multiple Sorter
 *    -- Set the sorter property of Table to indicate the method of table sort.
 *    -- Set the sorter of column to an object, the rule attribute of the object is the same as the sorter of single column sorting, weight indicates the sorting weight, the larger the value, the higher the sorting priority
 *    -- Support multi-column default sorting, set defaultOrder for columns that need default sorting
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
    sorter: {
      rule: 'id',
      weight: 1,
    },
  },
  {
    title: 'Name',
    fixed: 'left',
    render: d => `${d.firstName} ${d.lastName}`,
    width: 160,
    sorter: {
      rule: 'firstName',
      weight: 2,
    },
    defaultOrder: 'asc',
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
