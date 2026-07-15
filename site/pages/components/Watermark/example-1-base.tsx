/**
 * cn - 基本用法
 *    -- 为一段内容添加重复文字水印。
 * en - Base
 *    -- Add a repeated text watermark to content.
 */
import React from 'react'
import { Watermark } from 'shineout'

const App: React.FC = () => (
  <Watermark content="Shineout" style={{ border: '1px solid #e8e8e8' }}>
    <div style={{ height: 220, padding: 24, lineHeight: 1.8 }}>
      <h3>Quarterly Report</h3>
      <p>Revenue remained stable while fulfillment efficiency improved across all regions.</p>
      <p>Internal distribution only.</p>
    </div>
  </Watermark>
)

export default App
