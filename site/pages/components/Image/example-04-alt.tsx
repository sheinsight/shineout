/**
 * cn - 备用地址
 *    -- 在 src 获取失败的情况下，自动使用 alt 属性设置的地址
 * en - Alt
 *    -- If the src address fails to load, use the alt property instead.
 */
import React from 'react'
import { Image, TYPE } from 'shineout'

type ImageProps = TYPE.Image.Props
type ImageAlt = ImageProps['alt']

const alt: ImageAlt = '../../../images/1_b.jpg'

const App: React.FC = () => <Image width={200} height={125} src="notfound" alt={alt} />

export default App
