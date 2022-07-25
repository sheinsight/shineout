/**
 * cn - 分页
 *    -- 前端分页的情况下, 设置 pagination 显示分页，没有设置 onChange 处理数据的情况下，会自动对数据进行分页
 *    -- pagination 的参数和 Pagination 组件一致
 * en - Pagination
 *   -- Set the pagination property to show the pagination and if not set onChange property, the data is automatically paged.
 *    -- The parameters of pagination are consistent with the Pagination component.
 */
import React, { useState, useEffect } from 'react'
import { List, Image, TYPE } from 'shineout'
import { fetch } from 'doc/data/user'

interface ListItem {
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
type ListProps = TYPE.List.Props<ListItem, ListItem>
type ListRenderItem = ListProps['renderItem']

type PaginationProps = TYPE.Pagination.Props

const { BaseItem } = List

const image = '../../../images/list.png'

const App: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState<number>(1)
  const [data, setData] = useState<ListItem[]>([])

  const fetchData = (c: number) => {
    setLoading(true)
    fetch.get('List', { current, pageSize: 10, sorter: '', username: '' }).then((_data: { data: any }) => {
      setData([...data, ..._data.data])
      setLoading(false)
      setCurrent(c)
    })
  }

  useEffect(() => {
    fetchData(1)
  }, [])

  const renderItem: ListRenderItem = rowData => (
    <BaseItem
      avatar={<Image src={image} />}
      title={rowData.country}
      desc={`From ${rowData.country}. Position in ${rowData.position}. Start datetime ${rowData.start}.`}
      content={`Name: ${rowData.firstName}-${rowData.lastName}. Office in ${rowData.office}`}
    />
  )

  const handlePageChange = (index: number) => {
    if (index > 10) return
    fetchData(index)
  }

  const pagination: PaginationProps = {
    current,
    total: 100,
    pageSize: 10,
    align: 'right',
    onChange: handlePageChange,
  }

  return <List keygen="id" format="id" data={data} loading={loading} renderItem={renderItem} pagination={pagination} />
}

export default App
