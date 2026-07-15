/**
 * cn - 自定义配置
 *    -- 调整旋转角度、间距、偏移和字体样式。
 * en - Custom configuration
 *    -- Customize rotation, gaps, offset, and font styles.
 */
import React from 'react'
import { Watermark } from 'shineout'

const App: React.FC = () => (
  <Watermark
    content="DRAFT"
    rotate={-12}
    gap={[64, 48]}
    offset={[24, 32]}
    font={{ color: 'rgba(197, 48, 48, 0.18)', fontSize: 18, fontWeight: 'bold' }}
    style={{ border: '1px solid #e8e8e8' }}
  >
    <div style={{ height: 220, padding: 24 }}>
      <h3>Operating Plan</h3>
      <p>Review pending · Finance and Operations</p>
    </div>
  </Watermark>
)

export default App
