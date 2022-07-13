/**
 * cn - 样式
 *    -- 使用了和Button相同的 type 和 size 设置样式
 * en - type
 *    -- Style is set using the same type and size as Button.
 */
import React, { useState } from 'react'
import { Dropdown, Message, Select, Checkbox, TYPE } from 'shineout'

type SelectProps = TYPE.Select.Props<string, string>
type SelectData = SelectProps['data']

type DropdownProps = TYPE.Dropdown.Props
type DropdownData = DropdownProps['data']
type DropdownSize = DropdownProps['size']
type DropdownType = DropdownProps['type']
type DropdownOutline = DropdownProps['outline']
type DropdownDisabled = DropdownProps['disabled']

const menu: DropdownData = [
  {
    content: 'Submenu',
    children: [
      {
        content: 'Link',
        target: '_blank',
        url: 'https://google.com',
      },
      {
        content: 'Disabled',
        disabled: true,
      },
    ],
  },
  {
    content: 'Message',
    onClick: () => {
      Message.info('Some message.')
    },
  },
]

const style: React.CSSProperties = { marginInlineEnd: 20 }

const App: React.FC = () => {
  const [type, setType] = useState<DropdownType>('primary')
  const [size, setSize] = useState<DropdownSize>('default')
  const [outline, setOutline] = useState<DropdownOutline>(false)
  const [disabled, setDisabled] = useState<DropdownDisabled>(false)
  const sizes: SelectData = ['small', 'default', 'large']
  const types: SelectData = ['primary', 'success', 'warning', 'danger']

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <span style={{ display: 'inline-block' }}>type: </span>
        <Select
          width={140}
          data={types}
          value={type}
          style={style}
          keygen={d => d}
          onChange={value => setType(value)}
        />

        <span style={{ display: 'inline-block' }}>size: </span>
        <Select
          width={100}
          data={sizes}
          value={size}
          style={style}
          keygen={d => d}
          onChange={value => setSize(value)}
        />

        <Checkbox value={outline} onChange={value => setOutline(value)}>
          outline
        </Checkbox>

        <Checkbox value={disabled} onChange={value => setDisabled(value)}>
          disabled
        </Checkbox>
      </div>

      <Dropdown placeholder="Dropdown" data={menu} disabled={disabled} outline={outline} size={size} type={type} />
    </div>
  )
}

export default App
