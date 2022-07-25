/**
 * cn - 性能
 *    -- 设置 fixed 属性来启用虚拟列表，本例加载了10000条数据。
 *    -- 支持自动高度，默认跟随父元素高度
 *    -- lineHeight 用来设置列表项高度
 *    -- rowsInView 用来设置同时所展示的列表项数量，默认为10个
 * en - Performance
 *    -- Set the fixed property to enable the virtual list, which in this case loads 10,000 pieces of data.
 *    -- support automatic height, and follow the height of parent element by default
 *    -- lineheight is used to set the height of list items
 *    -- rowsinview is used to set the number of list items displayed on a page. The default is 10
 */
import React from 'react'
import { List, TYPE } from 'shineout'
import { fetchSync } from 'doc/data/user'

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
type ListProps = TYPE.List.Props<ListItem, any>
type ListRenderItem = ListProps['renderItem']

const names: ListItem[] = fetchSync(10000)

const style: React.CSSProperties = {
  width: 22,
  height: 22,
  background: '#eee',
  borderRadius: '50%',
  marginInlineEnd: 12,
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
}

// eslint-disable-next-line react/prop-types
const renderItem: ListRenderItem = ({ id, firstName }) => (
  <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
    <span style={style}>{firstName.slice(0, 1)}</span>
    <span style={{ flex: 1 }}>{firstName}</span>
    <span>{id}</span>
  </div>
)

const App: React.FC = () => (
  <List height={300} lineHeight={54} fixed keygen="id" bordered data={names} renderItem={renderItem} />
)

export default App
