/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Dropdown, Message } from 'shineout'

const menu = [
  {
    content: 'Submenu',
    children: [
      {
        content: 'Link to Google',
        target: '_blank',
        url: 'https://google.com',
      },
      {
        content: 'Disabled',
        disabled: true,
      },
    ],
  },
  <a href="#/">Home</a>,
  {
    content: 'Message',
    onClick: () => { Message.info('Some message.') },
  },
]

export default function () {
  return (
    <Dropdown placeholder="Dropdown" data={menu} />
  )
}
