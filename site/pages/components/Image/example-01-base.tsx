/**
 * cn - 基本用法
 *    -- 图片设置宽高后即使图片未加载，仍然会先占位
 * en - Base
 *    -- The most basic image.
 */
import React from 'react'
import { Image } from 'shineout'

const App: React.FC = () => <Image width={200} height={125} src="../../../images/1_b.jpg" noImgDrag />

export default App
