/**
 * cn - 控制浮层显隐
 *    -- open 控制浮层显隐
 */

import React from 'react'
import { Cascader, Button, TYPE } from 'shineout'

type dataItem = { value: string; children?: dataItem[] }
type CascaderProps = TYPE.Cascader.Props<dataItem, string[]>
type CascaderData = CascaderProps['data']

const data: CascaderData = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
]

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        打开
      </Button>
      <Button
        onClick={() => {
          setOpen(false)
        }}
      >
        关闭
      </Button>
      <Cascader
        data={data}
        open={open}
        onFocus={() => {
          console.log('focus')
        }}
        onBlur={() => {
          console.log('blur')
        }}
        onCollapse={v => {
          console.log('cccc', v)
          setOpen(v)
        }}
        keygen="value"
        renderItem={n => `${n.value}`}
      />
    </div>
  )
}

export default App
