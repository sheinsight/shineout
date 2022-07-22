/**
 * cn - 链接
 *    --  可以通过设置 linkKey 来渲染出对应的链接
 * en - link
 *    -- Can render the corresponding link by setting linkKey
 */
import React from 'react'
import { Menu } from 'shineout'

const data = [
  {
    id: '1',
    title: 'Google',
    link: 'https://www.google.com',
  },
  {
    id: '2',
    title: 'strackoverflow',
    link: 'https://www.strackoverflow.com',
  },
  {
    id: '3',
    title: 'github',
    link: 'https://www.github.com',
  },
]

export default function() {
  return (
    <Menu keygen="id" linkKey="link" data={data} renderItem={d => d.title} style={{ width: 256 }} inlineIndent={24} />
  )
}
