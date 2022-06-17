/**
 * cn - 自定义显示结果
 *    -- 自定义显示结果
 * en - RenderResult
 *    -- Customize display results
 */

import React from 'react'
import { EditableArea, TYPE } from 'shineout'

type EditableAreaProps = TYPE.EditableArea.Props
type EditableAreaRenderResult = EditableAreaProps['renderResult']

const App: React.FC = () => {
  const renderResult: EditableAreaRenderResult = () => <div>Guessing what I inputed ?</div>

  return (
    <div>
      <EditableArea bordered renderResult={renderResult} placeholder="input something" />
    </div>
  )
}

export default App
