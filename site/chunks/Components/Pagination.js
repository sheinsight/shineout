/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Pagination/cn.md'
import en from 'doc/pages/components/Pagination/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 最基本的使用',
      'Base \n The basic usage'
    ),
    component: require('doc/pages/components/Pagination/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Pagination/example-1-base.tsx'),

  },
  {
    name: '10-span',
    isTs: true,
    isTest: false,
    title: locate(
      '按钮数量 \n 分页器页码按钮数量',
      'Span \n The number of pagination buttons'
    ),
    component: require('doc/pages/components/Pagination/example-10-span.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-10-span.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Pagination/example-10-span.tsx'),

  },
  {
    name: '2-size',
    isTs: true,
    isTest: false,
    title: locate(
      '大小 \n 内置了 3 种大小供选择，small, default, large，默认为 default',
      'Size \n Three sizes are built in for selection: small, default, large, default value is default.'
    ),
    component: require('doc/pages/components/Pagination/example-2-size.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-2-size.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Pagination/example-2-size.tsx'),

  },
  {
    name: '3-layout',
    isTs: true,
    isTest: false,
    title: locate(
      '布局 \n 通过 layout 属性来控制组件是否显示以及显示的位置',
      'Layout \n Use the layout property to control whether the child elements is displayed and where is displayed.'
    ),
    component: require('doc/pages/components/Pagination/example-3-layout.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-3-layout.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Pagination/example-3-layout.tsx'),

  },
  {
    name: '4-text',
    isTs: true,
    isTest: false,
    title: locate(
      '文字 \n 通过 text 替换文字',
      'Text \n Set text property to replace the default text..'
    ),
    component: require('doc/pages/components/Pagination/example-4-text.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-4-text.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Pagination/example-4-text.tsx'),

  },
  {
    name: '5-align',
    isTs: true,
    isTest: false,
    title: locate(
      '位置 \n 内置了 3 种位置，left, center, right，默认为 left',
      'Alignment \n Options: \'left\', \'center\', \'right\', the default value is left.'
    ),
    component: require('doc/pages/components/Pagination/example-5-align.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-5-align.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Pagination/example-5-align.tsx'),

  },
  {
    name: '7-controlled',
    isTs: true,
    isTest: false,
    title: locate(
      '受控组件 \n 同时设置 current 和 onChange 属性，可以作为受控组件使用',
      'Controlled \n Set both the current and onChange properties for being used as a controlled component.'
    ),
    component: require('doc/pages/components/Pagination/example-7-controlled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-7-controlled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Pagination/example-7-controlled.tsx'),

  },
  {
    name: '8-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n 设置 disabled 属性，可以禁用组件',
      'Disabled \n Set the disabled property to disable the component.'
    ),
    component: require('doc/pages/components/Pagination/example-8-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-8-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Pagination/example-8-disabled.tsx'),

  },
  {
    name: '9-simple',
    isTs: true,
    isTest: false,
    title: locate(
      'Simple 模式 \n layout 设置为 simple；注意：simple 模式不与其他layout共存。',
      'Simple mode \n layout set to simple; Note: simple mode does not coexist with other layouts.'
    ),
    component: require('doc/pages/components/Pagination/example-9-simple.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-9-simple.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Pagination/example-9-simple.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Pagination","properties":[{"name":"align","tag":{"cn":"排布方式","en":"align of pagination","default":"\\\"left\\\"","version":""},"required":false,"type":"\\\"left\\\" | \\\"center\\\" | \\\"right\\\" "},{"name":"current","tag":{"cn":"当前页，如果传入值，组件为受控组件，必须通过onChange来处理回调","en":"Current page.","default":"","version":""},"required":false,"type":"number "},{"name":"defaultCurrent","tag":{"cn":"初始页码","en":"Initial page number","default":"1","version":""},"required":false,"type":"number "},{"name":"disabled","tag":{"cn":"禁用","en":"Disabled","default":"false","version":""},"required":false,"type":"boolean "},{"name":"layout","tag":{"cn":"子组件布局，可选值为:\\\"links\\\": 页码；\\\"simple\\\": 简约页码(和links不要同时使用)；\\\"list\\\": 每页数量选择。\\\"jumper\\\": 跳转页码；function({ current, total, pageSize }): 匿名函数，用来信息展示","en":"The layout of child elements, options: \\\"links\\\": page number; \\\"simple\\\": simple page number(Do not use both simple and links); \\\"list\\\": page size selector; \\\"jumper\\\": jump to page number; \\\"simple\\\": minimalist mode; function({ current, total, pageSize }): custom information","default":"[\\\"links\\\"]","version":""},"required":false,"type":"(\\\"links\\\" | \\\"simple\\\" | \\\"list\\\" | \\\"jumper\\\" | ((props: PaginationProps) => string))[] "},{"name":"onChange","tag":{"cn":"页码或每页显示数量改变时回调。current: 新的页码。pageSize: 每页数量","en":"The callback function when current page or pageSize is changing。current: new page number。pageSize: number of each page","default":"","version":""},"required":false,"type":"((current: number, pageSize: number, sizeChange?: boolean ) => void) "},{"name":"pageSize","tag":{"cn":"每页数量","en":"Number of each page","default":"10","version":""},"required":false,"type":"number "},{"name":"pageSizeList","tag":{"cn":"[10, 20, 30, 50, 100] | 每页数量可选列表","en":"The list of number of each page","default":"[10, 20, 30, 50, 100]","version":""},"required":false,"type":"number[] "},{"name":"size","tag":{"cn":"尺寸","en":"size of pagination","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\" "},{"name":"text","tag":{"cn":"替换文案。prev: 上一页。next: 下一页。page: pageSizeList文字。jumper: 跳转输入框文字, \\\"{input}\\\" 为输入框占位","en":"Replaced text。prev: the previous page。next: the next page。page:the text of pageSizeList。jumper: jump to input box text, \\\"{input}\\\" pilaceholder for input box","default":"","version":""},"required":false,"type":"{  prev?: string , next?: string , page?: string , jumper?: string  } "},{"name":"total","tag":{"cn":"总条目数。如果 total 小于 0，隐藏分页。","en":"Total number. If total is less than 0, hide the Pagination.","default":"0","version":""},"required":false,"type":"number "},{"name":"sizeListProps","tag":{"cn":"需要给分页数量的选择框的额外的属性","en":"Additional attributes which need to given page size selector","default":"","version":""},"required":false,"type":"SelectProps<number, number> "},{"name":"span","tag":{"cn":"分页器页码按钮数量","en":"The number of pagination buttons","default":"5","version":""},"required":false,"type":"number "},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
