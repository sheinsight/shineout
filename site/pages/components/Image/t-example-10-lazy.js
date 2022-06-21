/**
 * cn -
 *    -- 如果需要在特定的元素内部进行懒加载, 则需要提供一个选择器, 请确保 Image 组件渲染的时候能够通过选择器获取到指定元素.
 * en -
 *    -- If you need to lazy loading inside a specific element, you need to provide a selector, please ensure that the Image component can get the specified element through the selector when rendering.
 */
import React from 'react'
import { Image } from 'shineout'

const data = [1, 2, 3, 4].map(i => `../../../images/${i}_b.jpg`)

export default function() {
  return (
    <div id="image-container" style={{ height: '300px', overflowY: 'scroll' }}>
      {data.map((img, i) => (
        <Image lazy container="#image-container" key={i} fit="fill" height="66%" src={img} />
      ))}
    </div>
  )
}
