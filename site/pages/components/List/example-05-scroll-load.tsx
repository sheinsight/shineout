/**
 * cn - 滚动加载
 *    -- 设置 scrollLoading 属性，当滚动到底部时，会自动调用该属性
 * en - scroll loading
 *    -- Set the scrollLoad property, when the scroll to the bottom, it will automatically call to change the property.
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
type ListProps = TYPE.List.Props<ListItem, number>
type ListRenderItem = ListProps['renderItem']

const { BaseItem } = List

const style: React.CSSProperties = { maxHeight: 300, overflowY: 'scroll' }

const image = '../../../images/list.png'

const App: React.FC = () => {
  const [current, setCurrent] = useState(1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ListItem[]>([])

  const fetchData = (c: number) => {
    setLoading(true)
    fetch.get('List', { current: c, pageSize: 10, sorter: '', username: '' }).then((_data: { data: ListItem[] }) => {
      setData([...data, ..._data.data])
      setCurrent(c)
      setLoading(false)
    })
  }

  const scrollLoading = () => {
    if (current >= 10) return
    fetchData(current + 1)
  }

  const renderItem: ListRenderItem = rowData => (
    <BaseItem
      title={rowData.country}
      avatar={<Image src={image} />}
      content={`Name: ${rowData.firstName}-${rowData.lastName}. Office in ${rowData.office}`}
      desc={`From ${rowData.country}. Position in ${rowData.position}. Start datetime ${rowData.start}.`}
    />
  )

  useEffect(() => {
    fetchData(1)
  }, [])

  return (
    <List
      keygen="id"
      format="id"
      data={data}
      style={style}
      loading={loading}
      renderItem={renderItem}
      scrollLoading={scrollLoading}
    />
  )
}

export default App
