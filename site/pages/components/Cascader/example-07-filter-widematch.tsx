/**
 * cn - 宽泛筛选
 *    -- 开启 wideMatch 后，将筛选出所有可能的匹配项目
 *    --
 * en - wideMatch
 *    -- Allows all possible matching options to be choosed
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
    value: '江苏',
    children: [
      {
        value: '南京',
        children: [
          {
            value: '江宁',
            children: [
              {
                value: '东山',
              },
            ],
          },
          {
            value: '鼓楼',
          },
        ],
      },
      {
        value: '镇江',
        children: [
          {
            value: '丹阳',
          },
          {
            value: '句容',
          },
        ],
      },
    ],
  },
  {
    value: '安徽',
    children: [
      {
        value: '合肥',
        children: [
          {
            value: '肥东',
          },
        ],
      },
    ],
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
