/**
 * cn - 筛选数据
 *    -- onFilter 可用于数据过滤，不返回结果时，可实现服务端过滤；返回函数时，用于前端过滤。
 *    -- 单选状态下筛选结果以列表展示，多选状态任保持树状结构展示。
 * en - Filter
 *    -- onFilter can be used for data filtering, for server-side filtering when no results are returned, and for front-end filtering when a function is returned.
 *    -- Support in single selection state
 */
import React, { useState } from 'react'
import { Cascader, Form, TYPE } from 'shineout'

type DateItem = { value: string; children?: DateItem[] }
type CascaderProps = TYPE.Cascader.Props<DateItem, string[]>
type RenderResult = CascaderProps['renderResult']
type CascaderOnFilter = CascaderProps['onFilter']
type CascaderRenderItem = CascaderProps['renderItem']

const data = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'gulou',
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

const highlight = (Component: any) => (
  props: CascaderProps & {
    beforeChange?: (...args: any[]) => void
    highlightStyle?: React.CSSProperties
  }
) => {
  const [filterText, setFilterText] = useState<any>(undefined)

  const HandlerFilter: CascaderOnFilter = text => {
    const { onFilter } = props
    setFilterText(text)
    return onFilter!(text)
  }

  const RenderItem: CascaderRenderItem = (d, index) => {
    const { renderItem = item => item, highlightStyle } = props
    const result = typeof renderItem === 'function' ? renderItem(d, index) : d[renderItem]
    if (!filterText) return result
    if (typeof result !== 'string') return result
    return result.split(filterText).map((item, i, arr) => {
      if (i === arr.length - 1) return <React.Fragment key={i}>{item}</React.Fragment>
      return (
        <React.Fragment key={i}>
          {item}
          <span style={highlightStyle}>{filterText}</span>
        </React.Fragment>
      )
    })
  }

  const HandleReset = (...args: any[]) => {
    const { beforeChange } = props
    if (beforeChange) beforeChange(...args)
    setFilterText(undefined)
  }

  const mp = {
    ...props,
    onFilter: props.onFilter ? HandlerFilter : undefined,
    renderItem: RenderItem,
    beforeChange: HandleReset,
  }
  return <Component {...mp} />
}

const HighlightCascader = highlight(Cascader)

const App: React.FC = () => {
  const renderResult: RenderResult = d => d.value
  const renderItem: CascaderRenderItem = n => `${n.value}`
  const onFilter: CascaderOnFilter = text => d => d.value.indexOf(text) >= 0

  return (
    <div>
      <Form.Item label="Single">
        <HighlightCascader
          absolute
          data={data}
          keygen="value"
          onFilter={onFilter}
          renderItem={renderItem}
          renderResult={renderResult}
        />
      </Form.Item>

      <Form.Item label="Multiple">
        <HighlightCascader
          mode={1}
          absolute
          data={data}
          keygen="value"
          onFilter={onFilter}
          renderItem={renderItem}
          renderResult={renderResult}
        />
      </Form.Item>
    </div>
  )
}

export default App
