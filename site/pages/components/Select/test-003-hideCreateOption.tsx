/**
 * cn - hideCreateOption
 *    -- 创建选项不展示option
 * en - hideCreateOption
 *    -- 创建选项不展示option
 */
import React from 'react'
import { Select } from 'shineout'

const data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <>
    <Select keygen style={{ width: 240 }} data={data} onCreate hideCreateOption multiple />
  </>
)

export default App
