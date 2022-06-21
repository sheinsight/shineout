/**
 * cn - 原始图片
 *    -- 提供了 4 种方式展示原始图片，弹出层、新窗口打开、当前窗口打开、下载
 * en - Target
 *    -- There are 4 ways to display the original image, pop-up layer, new window open, current window open, download.
 */
import React from 'react'
import { Image, TYPE } from 'shineout'

type ImageProps = TYPE.Image.Props
type ImageTarget = ImageProps['target']

const target: ImageTarget[] = ['_modal', '_blank', '_self', '_download']

const App: React.FC = () => (
  <div>
    {target.map(t => (
      <div key={t} style={{ display: 'inline-block', marginInlineEnd: 12, textAlign: 'center' }}>
        <Image
          fit="fill"
          target={t}
          width={80}
          height={80}
          shape="thumbnail"
          src="../../../images/1_s.jpg"
          href="../../../images/1_b.jpg"
        />
        <br />
        {target}
      </div>
    ))}
  </div>
)

export default App
