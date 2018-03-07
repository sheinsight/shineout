/**
 * cn - 基本用法
 * en - Base
 */
import React, { Fragment } from 'react'
import { Dropdown, Message } from 'shineout'

export default function () {
  const menu = [{
    content: 'First',
    children: [{
      content: 'link1',
    }, {
      content: 'link2',
    }],
  }, {
    content: 'Second',
    url: 'www.baidu.com',
    children: [{
      content: 'link3',
      onClick: () => { console.log('this is special') },
    }, {
      content: 'link4',
    }],
  }]

  return (
    <Fragment>
      <Dropdown placeholder="10" data={menu} onClick={(data) => { console.log(data) }} />

      <Dropdown placeholder="Link" data={menu} itemRender={data => (`data${data.content}`)} type="link" />

      <Dropdown placeholder="Primary" size="small" type="primary" data={menu} />

      <Dropdown placeholder="Outline" outline size="large" type="primary" data={menu} />

      <Dropdown placeholder="Small" size="small" data={menu} />
    </Fragment>
  )
}
