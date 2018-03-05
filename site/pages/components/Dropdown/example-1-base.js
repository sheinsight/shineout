/**
 * cn - 基本用法
 * en - Base
 */
import React, { Fragment } from 'react'
import { Dropdown, Message } from 'shineout'

export default function () {
  const menu = [{
    content: 'First',
    id: '1',
    children: [{
      content: 'link1',
      id: '4',
    }, {
      content: 'link2',
      id: '5',
    }],
  }, {
    content: 'Second',
    url: 'www.baidu.com',
    id: '2',
    children: [{
      content: 'link3',
      id: 6,
    }, {
      content: 'link4',
      id: 7,
    }],
  }]

  return (
    <Fragment>
      <Dropdown placeholder="Default" data={menu} onClick={(content, data) => { console.log(content, data) }} />

      <Dropdown placeholder="Link" data={menu} type="link" />

      <Dropdown placeholder="Primary" type="primary" data={menu} />

      <Dropdown placeholder="Outline" outline type="primary" data={menu} />

      <Dropdown placeholder="Small" size="small" data={menu} />
    </Fragment>
  )
}
