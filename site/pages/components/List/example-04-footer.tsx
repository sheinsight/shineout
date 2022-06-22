/**
 * cn - 加载更多
 *    -- 通过使用 footer 属性，可实现加载更多功能
 * en - Load more
 *    -- Through use the footer attribute, you can load more functions.
 */
import React, { useState, useEffect } from 'react'
import { List, Button, TYPE } from 'shineout'
import { fetch } from 'doc/data/user'

type ListProps = TYPE.List.Props<any, any>
type ListData = ListProps['data']
type ListRenderItem = ListProps['renderItem']

const { BaseItem } = List

const image = '../../../images/list.png'

const style: React.CSSProperties = {
  padding: 16,
  display: 'flex',
  lineHeight: '22px',
  alignItems: 'center',
  justifyContent: 'center',
}

const App: React.FC = () => {
  const [current, setCurrent] = useState(1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ListData[]>([])

  const fetchData = (c: number) => {
    setLoading(true)
    fetch.get('List', { current: c, pageSize: 10, sorter: '', username: '' }).then((_data: { data: any }) => {
      setData([...data, ..._data.data])
      setCurrent(c)
      setLoading(false)
    })
  }

  const onClick = () => {
    if (loading) return

    fetchData(current + 1)
  }

  const renderItem: ListRenderItem = rowData => (
    <BaseItem avatar={image} desc={`From ${rowData.country}. Name: ${rowData.firstName}-${rowData.lastName}`} />
  )

  const renderFooter = () => (
    <div style={style}>
      <Button size="small" loading={loading} onClick={onClick}>
        load more
      </Button>
    </div>
  )

  useEffect(() => {
    fetchData(1)
  }, [])

  return <List keygen="id" data={data} renderItem={renderItem} footer={renderFooter} />
}

export default App
