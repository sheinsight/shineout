/**
 * cn - 分组
 *    -- 可以通过 groupBy 去将数据分组
 *    -- 组件会通过该函数的返回值对内容进行分组, 如果返回的是空, 则默认不分组, 为了防止产生歧义, 建议有一个默认分组.
 * en - GroupBy
 *    -- Grouping data by groupBy.
 *    -- The component will group the content by the return value of the function. If the return is empty, the default is not grouped. To prevent ambiguity, it is recommended to have a default grouping.
 */
import React from 'react'
import { Select, TYPE } from 'shineout'

type SelectProps = TYPE.Select.Props<any, any>
type SelectData = SelectProps['data']
type SelectGroupBy = SelectProps['groupBy']

const data: SelectData = [
  { value: 'Mars', group: '3' },
  { value: 'China', group: '2' },
  { value: 'Beijing', group: '1' },
  { value: 'Shanghai', group: '1' },
]

const App: React.FC = () => {
  const groupBy: SelectGroupBy = d => {
    if (d.group === '1') return 'City'
    if (d.group === '2') return 'Country'
    return 'Other'
  }

  return <Select data={data} keygen="value" renderItem="value" style={{ width: 240 }} groupBy={groupBy} />
}

export default App
