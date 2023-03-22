/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/CardGroup/cn.md'
import en from 'doc/pages/components/CardGroup/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基础的卡片组用法',
      'Base \n Basic CardGroup'
    ),
    component: require('doc/pages/components/CardGroup/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/CardGroup/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/CardGroup/example-1-base.tsx'),

  },
  {
    name: '2-width',
    isTs: true,
    isTest: false,
    title: locate(
      '限定宽度 \n 设置 cardWidth 限定卡片最小宽度',
      'Width \n set cardWidth limited min-width'
    ),
    component: require('doc/pages/components/CardGroup/example-2-width.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/CardGroup/example-2-width.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/CardGroup/example-2-width.tsx'),

  },
  {
    name: '3-lazyload',
    isTs: true,
    isTest: false,
    title: locate(
      '懒加载 \n 设置 Item 的 placeholder 后会开启懒加载 \n placeholder 必须要有一定的高度，否则懒加载无法有效果',
      'Lazyload \n enable lazyload while set placeholder on Item \n placehoder\'s height should beyond zero'
    ),
    component: require('doc/pages/components/CardGroup/example-3-lazyload.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/CardGroup/example-3-lazyload.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/CardGroup/example-3-lazyload.tsx'),

  },
  {
    name: '4-checkbox',
    isTs: true,
    isTest: false,
    title: locate(
      '多选 \n 使用 checked 使 Item 支持多选',
      'Checkbox \n set checked to support checkbox'
    ),
    component: require('doc/pages/components/CardGroup/example-4-checkbox.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/CardGroup/example-4-checkbox.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/CardGroup/example-4-checkbox.tsx'),

  },
  {
    name: '5-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n 是否禁用选择框',
      'Disabled \n disable checkbox'
    ),
    component: require('doc/pages/components/CardGroup/example-5-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/CardGroup/example-5-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/CardGroup/example-5-disabled.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"CardGroup.Item","properties":[{"name":"onChange","tag":{"cn":"选中状态变化事件，checked表示选中状态，value代表对应的值","en":"check changed, value is the value props","default":"","version":""},"type":"((checked: boolean, value: Value) => void) "},{"name":"value","tag":{"cn":"选中时返回值","en":"Specifies the result","default":"true","version":""},"type":"any"},{"name":"disabled","tag":{"cn":"是否禁用选择框","en":"disable checkbox","default":"false","version":""},"type":"boolean "},{"name":"children","tag":{"cn":"子元素","en":"children","default":"","version":""},"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":"","version":""},"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"type":"CSSProperties "},{"name":"placeholder","tag":{"cn":"懒加载占位元素，设置后卡片将开启懒加载","en":"lazy load placeholder, enable lazy load while set","default":"","version":""},"type":"ReactNode"},{"name":"checked","tag":{"cn":"checked 表示选中状态，不设置则不显示选择框","en":"checked status, hide while not set","default":"","version":""},"type":"boolean "}],"cn":"","en":""},{"title":"CardGroup","properties":[{"name":"height","tag":{"cn":"卡片组高度","en":"group height","default":"","version":""},"type":"number "},{"name":"cardWidth","tag":{"cn":"卡片最小宽度","en":"card min width","default":"","version":""},"type":"number "},{"name":"columns","tag":{"cn":"列数，设置 cardWidth 后该属性将失效","en":"items count each row, not work while cardWidth setted","default":"3","version":""},"type":"number "},{"name":"gridStyle","tag":{"cn":"卡片网格样式","en":"grid style","default":"","version":""},"type":"CSSProperties "},{"name":"gutter","tag":{"cn":"卡片横向纵向间距，如果两个间距相互独立可以通过 gridStyle 调整","en":"gutter width horizontal and vertical, if diff shoud set gridStyle","default":"16","version":""},"type":"number "},{"name":"children","tag":{"cn":"children","en":"子元素","default":"","version":""},"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":"","version":""},"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"type":"CSSProperties "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
