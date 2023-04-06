/**
 * cn - 筛选数据 - 内置
 *    -- onFilter 返回函数时，使用这个函数做前端过滤
 * en - Filter - built-in
 *    -- When the onFilter property returns a function, use this function to do front-end filtering.
 */
import React, { useState } from 'react'
import { Select, TYPE } from 'shineout'

type SelectItem = string
type SelectProps = TYPE.Select.Props<SelectItem, string>
type SelectRenderItem = SelectProps['renderItem']

const style: React.CSSProperties = { width: 240, marginBottom: 12 }
const data: SelectItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const highlight = (Component: any) => (props: SelectProps) => {
  const [filterText, setFilterText] = useState<string>('')

  const handlerFilter = (text: string) => {
    const { onFilter } = props
    setFilterText(text)
    return onFilter!(text, text)
  }

  const handleRenderItem: SelectRenderItem = (d, index) => {
    const { renderItem = v => v } = props
    const result = typeof renderItem === 'function' ? renderItem(d, index) : d[renderItem]

    if (!filterText) return result
    if (typeof result !== 'string') return result
    return result.split(filterText).map((item, i, arr) => {
      if (i === arr.length - 1) return <React.Fragment key={i}>{item}</React.Fragment>
      return (
        <React.Fragment key={i}>
          {item}
          <span style={{ color: '#FF4E50' }}>{filterText}</span>
        </React.Fragment>
      )
    })
  }
  type BeforeChange = Exclude<SelectProps['beforeChange'], undefined>
  const handleReset = (...args: Parameters<BeforeChange>) => {
    const { beforeChange } = props
    if (beforeChange) beforeChange(...args)
    setFilterText('')
  }

  return (
    <Component
      {...props}
      beforeChange={handleReset}
      renderItem={handleRenderItem}
      onFilter={props.onFilter ? handlerFilter : undefined}
    />
  )
}

const HighlightFilter = highlight(Select)

const App: React.FC = () => (
  <div>
    <HighlightFilter
      keygen
      data={data}
      style={style}
      renderResult={d => d}
      placeholder="Select color"
      onFilter={text => d => d.indexOf(text) >= 0}
    />

    <br />

    <HighlightFilter
      keygen
      multiple
      data={data}
      renderResult={d => d}
      style={{ width: 300 }}
      placeholder="Select color"
      onFilter={text => d => d.indexOf(text) >= 0}
    />
  </div>
)

export default App
