/**
 * cn - 图片水印
 *    -- image 优先绘制，图片加载失败时会回退到 content。
 * en - Image
 *    -- The image is preferred and falls back to content if loading fails.
 */
import React from 'react'
import { Watermark } from 'shineout'

const App: React.FC = () => (
  <Watermark
    image="../../../images/logo-icon.png"
    content="Shineout"
    width={42}
    height={42}
    gap={[72, 72]}
    style={{ border: '1px solid #e8e8e8' }}
  >
    <div style={{ height: 220, padding: 24 }}>
      <h3>Design Assets</h3>
      <p>Approved brand materials for product and campaign teams.</p>
    </div>
  </Watermark>
)

export default App
