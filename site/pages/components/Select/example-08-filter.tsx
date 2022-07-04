/**
 * cn - 筛选数据 - 内置
 *    -- onFilter 返回函数时，使用这个函数做前端过滤
 * en - Filter - built-in
 *    -- When the onFilter property returns a function, use this function to do front-end filtering.
 */
import React, { useState } from 'react'
import { Select, TYPE } from 'shineout'

type SelectProps = TYPE.Select.Props<any, any>
type SelectData = SelectProps['data']
type SelectOnFilter = SelectProps['onFilter']
type SelectRenderItem = SelectProps['renderItem']

const data: SelectData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const highlight = (props: SelectProps) => (Component: Select) => {
  const [filterText, setFilterText] = useState(undefined)

  const handlerFilter: SelectOnFilter = text => {
    const { onFilter } = props
    setFilterText(text)
    return onFilter(text)
  }

  const renderItem: SelectRenderItem = (d, index) => {
    const { renderItem, highlightStyle } = props
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

  return <Component {...props} onFilter={props.onFilter ? handlerFilter : undefined} renderItem={renderItem} />
}

const HighlightFilter = highlight(Select)

const App: React.FC = () => (
  <div>
    <HighlightFilter
      style={{ width: 240, marginBottom: 12 }}
      data={data}
      keygen
      placeholder="Select color"
      onFilter={text => d => d.indexOf(text) >= 0}
      renderResult={d => d}
    />
    <br />
    <HighlightFilter
      style={{ width: 300 }}
      multiple
      keygen
      data={data}
      placeholder="Select color"
      onFilter={text => d => d.indexOf(text) >= 0}
      renderResult={d => d}
    />
  </div>
)

export default App
