/**
 * cn - 禁用
 *    -- 是否禁用选择框
 * en - Disabled
 *    -- disable checkbox
 */
import React, { useState } from 'react'
import { CardGroup } from 'shineout'
import Icon from '../Icon/Shineout'

interface ItemData {
  title: string
  icon: string
  color: string
}

const data: ItemData[] = [
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

function Item({ title, icon, color }: ItemData) {
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

const App: React.FC = () => {
  const [values, setValues] = useState<string[]>([])

  const handleChange = (checked: boolean, v: any) => {
    console.log(checked, v)
    setValues(checked ? values.concat(v) : values.filter(item => item !== v))
  }

  return (
    <div>
      <CardGroup height={300}>
        {data.map((v, idx) => (
          <CardGroup.Item
            disabled={idx % 2 === 0}
            key={v.title}
            value={v.title}
            checked={values.includes(v.title)}
            onChange={handleChange}
          >
            <Item {...v} />
          </CardGroup.Item>
        ))}
      </CardGroup>
    </div>
  )
}

export default App
