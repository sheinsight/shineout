/**
 * cn - 自定义 header
 *    -- header
 * en - 自定义 header
 *    -- header
 */
import React from 'react'
import { Select } from 'shineout'

const data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <Select keygen style={{ width: 240 }} data={data} defaultValue="" header={<span>i am header</span>} />
)

export default App
