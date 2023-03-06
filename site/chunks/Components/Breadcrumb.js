/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Breadcrumb/cn.md'
import en from 'doc/pages/components/Breadcrumb/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 组件调用通过 json 数据配置',
      'Base \n The basic usage.'
    ),
    component: require('doc/pages/components/Breadcrumb/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Breadcrumb/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Breadcrumb/example-1-base.tsx'),

  },
  {
    name: '2-separator',
    isTs: true,
    isTest: false,
    title: locate(
      '分隔符 \n 默认的分隔符为 \'/\'，可以通过 separator 属性自定义',
      'separator \n The default separator is \'/\'.'
    ),
    component: require('doc/pages/components/Breadcrumb/example-2-separator.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Breadcrumb/example-2-separator.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Breadcrumb/example-2-separator.tsx'),

  },
  {
    name: '3-icon',
    isTs: true,
    isTest: false,
    title: locate(
      '图标 \n 带图标的面包屑',
      'icon \n Breadcrumbs with icons'
    ),
    component: require('doc/pages/components/Breadcrumb/example-3-icon.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Breadcrumb/example-3-icon.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Breadcrumb/example-3-icon.tsx'),

  },
  {
    name: '4-renderItem',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义渲染 \n 自定义渲染面包屑中的内容',
      'Base \n Custom render content in Breadcrumb'
    ),
    component: require('doc/pages/components/Breadcrumb/example-4-renderItem.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Breadcrumb/example-4-renderItem.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Breadcrumb/example-4-renderItem.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Breadcrumb","properties":[{"name":"data","tag":{"cn":"面包屑对象数组,见 data","en":"The array of breadcrumb objects, see data","default":"[]"},"type":"any[]"},{"name":"separator","tag":{"cn":"面包屑分隔符,可以是字符串或自定义的元素","en":"A breadcrumb separator which can be strings or custom elements","default":"\\\"/\\\""},"type":"ReactNode"},{"name":"keygen","tag":{"cn":"生成每一项key的辅助方法。为 true 时，以数据项本身作为key，相当于 (d => d)；为函数时，使用此函数返回值；为string时，使用这个string对应的数据值。如 \\\"id\\\"，相当于 (d => d.id)","en":"Key generator.When it is true, the data itself is used as the key equivalent to (d => d);When it is a function, use its return value;When it is a string，ues the value of the string.For example, \\\"id\\\" is the same thing as (d) => d.id.","default":""},"type":"true | ObjectKey<Item> | (data: Item, index?: number ) => string | number"},{"name":"renderItem","tag":{"cn":"自定义渲染","en":"Custom render","default":""},"type":"(value: Item) => ReactNode"},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":""},"type":"string"},{"name":"style","tag":{"cn":"内联样式","en":"style object","default":""},"type":"CSSProperties"}],"cn":"","en":""},{"title":"BreadcrumbData","properties":[{"name":"onClick","tag":{"cn":"点击事件","en":"The click event","default":""},"type":"MouseEventHandler<HTMLAnchorElement>"},{"name":"title","tag":{"cn":"显示内容","en":"Displayed content","default":""},"type":"ReactNode"},{"name":"url","tag":{"cn":"链接地址，onClick 属性二选一","en":"Link address","default":""},"type":"string"},{"name":"icon","tag":{"cn":"自定义图标","en":"Custom icon","default":""},"type":"ReactNode"}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
