/**
 * cn - 渲染 textarea footer
 *    -- 在输入框内嵌入标题
 * en - RenderFooter
 *    -- render textarea footer
 */

import React from 'react'
import { EditableArea, TYPE } from 'shineout'

type EditableAreaProps = TYPE.EditableArea.Props
type EditableAreaRenderFooter = EditableAreaProps['renderFooter']

const App: React.FC = () => {
  const renderFooter: EditableAreaRenderFooter = () => <div>Tip</div>

  return (
    <div>
      <EditableArea bordered renderFooter={renderFooter} placeholder="input something" />
    </div>
  )
}

export default App
