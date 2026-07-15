/**
 * cn - 多行水印
 *    -- content 数组会按行绘制，并支持为单独一行设置字体。
 * en - Multiple lines
 *    -- Use a content array for multiple lines and customize the font of each line.
 */
import React from 'react'
import { Watermark, TYPE } from 'shineout'

const content: TYPE.Watermark.Content[] = [
  'Shineout',
  { text: 'CONFIDENTIAL', font: { fontSize: 12, fontWeight: 'bold' } },
]

const App: React.FC = () => (
  <Watermark content={content} style={{ border: '1px solid #e8e8e8' }}>
    <div style={{ height: 220, padding: 24 }}>
      <h3>Customer Portfolio</h3>
      <p>North America · Europe · Asia Pacific</p>
    </div>
  </Watermark>
)

export default App
