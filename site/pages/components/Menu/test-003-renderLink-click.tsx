/**
 * cn - 自定义渲染成链接和点击测试
 *    --  如果自定义在最外层渲染 a 标签内部将不会再生成 a 标签
 * en - 自定义渲染成链接
 *    --  如果自定义在最外层渲染 a 标签内部将不会再生成 a 标签
 */
import React from 'react'
import { Menu } from 'shineout'

// eslint-disable-next-line react/prop-types
export default function(props: any) {
  const { itemClick, onClick, dataClick } = props
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
      onClick: (...args: any) => {
        console.log('dataClick', ...args)
        if (dataClick) {
          dataClick(...args)
        }
      },
    },
  ]
  return (
    <Menu
      keygen="id"
      data={data}
      renderItem={d => (
        <a
          href={d.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={
            d.id === '1'
              ? (...args) => {
                  console.log('内部点击事件')
                  if (itemClick) itemClick(...args)
                }
              : undefined
          }
        >
          {d.title}
          {d.id === '1' ? '(我有自己的onClick 事件)' : ''}
        </a>
      )}
      onClick={(...args) => {
        console.log('外部点击事件')
        if (onClick) {
          onClick(...args)
        }
      }}
      style={{ width: 256 }}
      inlineIndent={24}
    />
  )
}
