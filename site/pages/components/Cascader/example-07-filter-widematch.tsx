/**
 * cn - 宽泛筛选
 *    -- 开启 wideMatch 后，将筛选出所有可能的匹配项目
 *    --
 * en - wideMatch
 *    -- All possible matching items will be screened out
 *    --
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
    id: '0',
    value: '0',
    children: [
      {
        id: '0-0',
        value: '0-0',
      },
      {
        id: '0-1',
        value: '0-1',
      },
    ],
  },
  {
    id: '1',
    value: '1',
    children: [
      {
        id: '1-0',
        value: '1-0',
        children: [
          {
            id: '1-0-0',
            value: '1-0-0',
            children: [],
          },
          {
            id: '1-0-1',
            value: '1-0-1',
            children: [],
          },
          {
            id: '1-0-2',
            value: '1-0-2',
            children: [],
          },
        ],
      },
      {
        id: '1-1',
        value: '1-1',
        children: [
          {
            id: '1-1-0',
            value: '1-1-0',
            children: [],
          },
          {
            id: '1-1-1',
            value: '1-1-1',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    value: '2',
    children: [],
  },
]

const highlight = (Component: any) => (props: CascaderProps) => {
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
          wideMatch
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
