/**
 * cn - 样式 \n 使用了和Button相同的 type 和 size 设置样式
 * en - type
 */
import React, { Fragment } from 'react'
import { Dropdown, Message } from 'shineout'

const menu = [
  {
    content: 'Submenu',
    children: [
      {
        content: 'Link',
        target: '_blank',
        url: 'https://google.com',
      },
      {
        content: 'Disabled',
        disabled: true,
      },
    ],
  },
  {
    content: 'Message',
    onClick: () => { Message.info('Some message.') },
  },
]

export default function () {
  return (
    <Fragment>
      <Dropdown placeholder="Dropdown" data={menu} />
      <Dropdown placeholder="Link" data={menu} type="link" />
      <Dropdown placeholder="Primary" type="primary" data={menu} />
      <Dropdown placeholder="Outline" type="primary" outline data={menu} />
      <Dropdown placeholder="Small" size="small" data={menu} />
      <Dropdown placeholder="Large" size="large" data={menu} />
    </Fragment>
  )
}
