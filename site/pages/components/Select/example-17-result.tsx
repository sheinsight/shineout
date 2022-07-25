/**
 * cn - 自定义结果
 *    --  使用 renderResult 去自定义选中的结果。
 * en -  result
 *    --  use renderRsult. to format the result
 */
import React from 'react'
import { Select, TYPE } from 'shineout'

type SelectItem = string
type SelectProps = TYPE.Select.Props<SelectItem, string>
type SelectRenderResult = SelectProps['renderResult']

const data: SelectItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => {
  const renderResult: SelectRenderResult = c => `I love ${c}`

  return <Select keygen renderResult={renderResult} style={{ width: 240 }} data={data} defaultValue="" />
}

export default App
