/**
 * cn - 指定无定位属性容器后，下拉菜单是否正常定位
 *    -- 检查容器位置是否在下拉菜单之下。该示例需要单独运行，否则 setConfig 会干扰其他示例
 * en -
 *    --
 */

import React, { useEffect, useState } from 'react'
import { Select, setConfig, DatePicker, Cascader, TreeSelect } from 'shineout'

type SelectItem = string
const data: SelectItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

for (let i = 0; i < 50; i++) {
  data.push(`color-${i}`)
}

const cascaderData = [
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

const treeSelectData = [
  {
    id: '1',
    title: '1',
    children: [
      { id: '1-1', title: '1-1', children: [{ id: '1-1-1', title: '1-1-1' }, { id: '1-1-2', title: '1-1-2' }] },
      { id: '1-2', title: '1-2' },
    ],
  },
  { id: '2', title: '2', children: [{ id: '2-1', title: '2-1' }, { id: '2-2', title: '2-2' }] },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
]

const container: React.CSSProperties = {
  padding: 10,
  height: 100,
  width: 300,
  background: '#ebebeb',
  overflow: 'auto',
}

const style: React.CSSProperties = {
  width: 200,
  marginInlineEnd: 12,
  marginBottom: 8,
  marginLeft: 100,
}

const App: React.FC = () => {
  const [mount, setMount] = useState(false)

  useEffect(() => {
    setConfig({
      popupContainer: document.getElementById('app-root-container') || document.body,
    })

    setMount(true)
  }, [])

  return (
    <>
      <div style={{ width: 200, height: 1000 }} />
      <div style={container} id="app-out-container">
        <section id="relative-app">
          <div style={{ height: 200, width: 500 }} />
          {mount && (
            <Select itemsInView={50} height={500} className="select" style={style} keygen absolute data={data} />
          )}
          <br />
          {mount && (
            <DatePicker
              className="datepicker"
              absolute
              format="x"
              type="datetime"
              defaultValue={new Date()}
              style={style}
              formatResult="YYYY-MM-DD HH:mm:ss"
            />
          )}
          {mount && (
            <Cascader
              className="cascader"
              style={style}
              data={cascaderData}
              absolute
              keygen="value"
              renderItem={n => `${n.value}`}
            />
          )}
          {mount && (
            <TreeSelect
              className="treeselect"
              absolute
              clearable
              style={style}
              keygen="id"
              renderItem={node => `node ${node.title}`}
              data={treeSelectData}
            />
          )}
          <br />
          <div style={{ height: 500 }} />
        </section>

        <div id="app-root-container" />
      </div>
    </>
  )
}

export default App
