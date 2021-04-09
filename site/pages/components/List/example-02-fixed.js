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
import { List } from 'shineout'
import { fetchSync } from 'doc/data/user'

const names = fetchSync(10000)

function renderItem({ id, firstName }) {
  return (
    <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
      <span
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: '#eee',
          marginRight: 12,
        }}
      >
        {firstName.slice(0, 1)}
      </span>
      <span style={{ flex: 1 }}>{firstName}</span>
      <span>{id}</span>
    </div>
  )
}
export default function() {
  return <List height={300} lineHeight={54} fixed keygen="id" bordered data={names} renderItem={renderItem} />
}
