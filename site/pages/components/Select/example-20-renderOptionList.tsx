/**
 * cn - 自定义渲染下拉列表
 *    -- 使用 renderOptionList 来自定义渲染下拉列表
 * en - custom render dropdown
 *    -- Use the renderOptionList property to customize the render dropdown list
 */
import React from 'react'
import { Select } from 'shineout'
import treeDta from 'doc/data/tree'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'aaa', 'bbb', 'ccc', 'ddd']

const App: React.FC = () => (
  <>
    <Select
      keygen
      style={{ width: 240, marginInlineEnd: 16 }}
      data={data}
      renderOptionList={s => (
        <div>
          <div>header</div>
          <div>{s}</div>
          <div>footer</div>
        </div>
      )}
    />
    <Select
      keygen
      columns={2}
      style={{ width: 240, marginInlineEnd: 16 }}
      data={data}
      renderOptionList={(s: any) => (
        <div>
          <div>header</div>
          <div>{s}</div>
          <div>footer</div>
        </div>
      )}
    />
    <Select
      style={{ width: 240 }}
      format="id"
      keygen="id"
      treeData={treeDta}
      renderItem={v => `node ${v.text}`}
      renderOptionList={(s: any) => (
        <div>
          <div>header</div>
          <div>{s}</div>
          <div>footer</div>
        </div>
      )}
    />
  </>
)

export default App
