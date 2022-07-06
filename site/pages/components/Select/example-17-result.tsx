/**
 * cn - 自定义结果
 *    --  使用 renderResult 去自定义选中的结果。
 * en -  result
 *    --  use renderRsult. to format the result
 */
import React from 'react'
import { Select, TYPE } from 'shineout'

type SelectProps = TYPE.Select.Props<any, any>
type SelectData = SelectProps['data']
type SelectRenderResult = SelectProps['renderResult']

const data: SelectData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => {
  const renderResult: SelectRenderResult = c => `I love ${c}`

  return <Select keygen renderResult={renderResult} style={{ width: 240 }} data={data} defaultValue="" />
}

export default App
