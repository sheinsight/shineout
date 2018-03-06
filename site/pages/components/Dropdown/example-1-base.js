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
      onClick: () => { console.log('this is special') },
    }, {
      content: 'link4',
      id: 7,
    }],
  }]

  return (
    <Fragment>
      <Dropdown placeholder="Default" data={menu} onClick={(data) => { console.log(data) }} />

      <Dropdown placeholder="Link" data={menu} itemRender={data => (`data${data.content}`)} type="link" />

      <Dropdown placeholder="Primary" size="small" type="primary" data={menu} />

      <Dropdown placeholder="Outline" outline size="large" type="primary" data={menu} />

      <Dropdown placeholder="Small" size="small" data={menu} />
    </Fragment>
  )
}
