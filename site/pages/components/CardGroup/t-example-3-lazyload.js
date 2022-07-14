/**
 * cn - 懒加载
 *    -- 设置 Item 的 placeholder 后会开启懒加载
 *    -- placeholder 必须要有一定的高度，否则懒加载无法有效果
 * en - Lazyload
 *    -- enable lazyload while set placeholder on Item
 *    -- placehoder's height should beyond zero
 */
import React from 'react'
import { CardGroup, Spin } from 'shineout'
import Icon from '../Icon/Shineout'

const data = [
  {
    title: 'Tags',
    icon: 'star',
    color: '#197AFA',
  },
  {
    title: 'Set Owner',
    icon: 'phone-fill',
    color: '#7A5AF7',
  },
  {
    title: 'Set Property',
    icon: 'email-fill',
    color: '#FFA940',
  },
  {
    title: 'Score',
    icon: 'jubaoyichang',
    color: '#74D13D',
  },
  {
    title: 'Add Deal',
    icon: 'selection',
    color: '#16B2EB',
  },
  {
    title: 'Add Task',
    icon: 'charge',
    color: '#FF4D50',
  },
  {
    title: 'Send',
    icon: 'send',
    color: '#27AE60',
  },
  {
    title: 'Info',
    icon: 'warning',
    color: '#2980B9',
  },
  {
    title: 'Success',
    icon: 'check-circle',
    color: '#A569BD',
  },
  {
    title: 'Filter',
    icon: 'filter',
    color: '#99A3A4',
  },
]

function Item({ title, icon, color }) {
  return (
    <div style={{ padding: 20 }}>
      <div>
        <div style={{ width: 40, height: 40, display: 'inline-flex', borderRadius: '50%', background: `${color}20` }}>
          <Icon name={icon} fontSize={14} style={{ margin: 'auto', color }} />
        </div>
        <span style={{ marginInlineStart: 12, fontSize: 16, fontWeight: 500, color: 'rgba(51,62,89,1)' }}>{title}</span>
      </div>
      <p style={{ margin: '20px 0', fontSize: 14, color: 'rgba(153,157,168,1)' }}>
        Add or delete tag for your customer. You can sort your customer...
      </p>
      <div style={{ color: 'rgba(102,108,124,1)' }}>
        <Icon name="plus" style={{ marginInlineEnd: 6 }} />
        Add This
      </div>
    </div>
  )
}

const placeholder = (
  <div style={{ width: '100%', height: 200, display: 'flex' }}>
    <Spin style={{ margin: 'auto' }} />
  </div>
)

export default function() {
  return (
    <CardGroup height={400} columns={1}>
      {data.map(v => (
        <CardGroup.Item key={v.title} placeholder={placeholder}>
          <Item {...v} />
        </CardGroup.Item>
      ))}
    </CardGroup>
  )
}
