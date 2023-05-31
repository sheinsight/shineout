/**
 * cn - 异步动态数据筛选问题
 *    -- 点击加载数据，然后输入2进行筛选，等待数据加载完成后选项会显示出来但是点击选项后会报错。
 */

import React, { useState } from 'react'
import { Cascader, Button } from 'shineout'

const data = [
  {
    id: '2',
    text: '2',
    children: [
      {
        id: '3-0',
        text: '3-0',
        children: [
          {
            id: '3-0-0',
            text: '3-0-0',
          },
        ],
      },
      {
        id: '3-1',
        text: '3-1',
        children: [],
      },
    ],
  },
]

const App = () => {
  const [value, setValue] = useState([])
  const [s, setS] = useState<any>([])
  const renderItem = (node: any) => `${node.id}`
  return (
    <div>
      <Button
        id="load-btn"
        onClick={() => {
          setTimeout(() => {
            setS(data)
          }, 2000)
        }}
      >
        加载数据
      </Button>
      <br />

      <Cascader
        compressed
        onFilter={text => d => `${d.id}`.indexOf(text) >= 0}
        data={s}
        keygen="id"
        mode={3}
        onChange={v => setValue(v)}
        renderItem={renderItem}
        value={value}
      />
    </div>
  )
}
export default App
