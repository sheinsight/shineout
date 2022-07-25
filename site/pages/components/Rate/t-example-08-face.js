/**
 * cn - 分级显示
 *    -- 创建组件时可以使用数组显示不同分数下的选项，这种情况下，不支持带小数的value
 * en - Array
 *    -- You can use arrays to display items with different scores when creating components. In this case, values with decimals are not supported.
 */
import React from 'react'
import { Rate, Icon } from 'shineout'

const FaceIcon = Icon('https://at.alicdn.com/t/font_662584_hfkafvbgwurkvs4i.css', 'facefont')
const background = <FaceIcon name="question" />
const front = [
  <FaceIcon name="cry" style={{ color: '#003a8c' }} />,
  <FaceIcon name="sad" style={{ color: '#222222' }} />,
  <FaceIcon name="sleeping" style={{ color: '#ffa940' }} />,
  <FaceIcon name="happy" style={{ color: '#fa541c' }} />,
  <FaceIcon name="lol" style={{ color: '#fa541c' }} />,
]
const TextRate = Rate(background, front)

export default function() {
  return <TextRate equal={false} size={40} defaultValue={3} />
}
