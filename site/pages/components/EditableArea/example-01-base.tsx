/**
 * cn - 基本用法
 *    -- EditableArea 默认展示一行，超过一行的内容用...代替
 * en - Base
 *    -- Editablearea displays one line by default, and more than one line is replaced by ...
 */

import React from 'react'
import { EditableArea } from 'shineout'

const App: React.FC = () => <EditableArea bordered placeholder="input something" />

export default App
