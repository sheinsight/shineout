/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Divider/cn.md'
import en from 'doc/pages/components/Divider/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 默认为水平分割线',
      'Base \n Divider is horizontal by default. You can add text within Divider.'
    ),
    component: require('doc/pages/components/Divider/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Divider/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Divider/example-1-base.tsx'),

  },
  {
    name: '2-base',
    isTs: true,
    isTest: false,
    title: locate(
      '带文字的分割线 \n 分割线中带有文字，可以用 orientation 指定文字位置。',
      'Divider with title \n Divider with inner title, set orientation="left/right" to align it.'
    ),
    component: require('doc/pages/components/Divider/example-2-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Divider/example-2-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Divider/example-2-base.tsx'),

  },
  {
    name: '3-base',
    isTs: true,
    isTest: false,
    title: locate(
      '垂直分割线 \n 使用 mode="vertical" 设置为行内的垂直分割线。',
      'Vertical \n Use type="vertical" make it vertical.'
    ),
    component: require('doc/pages/components/Divider/example-3-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Divider/example-3-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Divider/example-3-base.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Divider","properties":[{"name":"children","tag":{"cn":"分割线中文字内容","en":"Content, text or react component","default":"","version":""},"type":"ReactNode"},{"name":"mode","tag":{"cn":"分割线排布模式","en":"mode of divider","default":"\\\"horizontal\\\"","version":""},"type":"\\\"horizontal\\\" | \\\"vertical\\\" "},{"name":"orientation","tag":{"cn":"水平分割线的文字排布位置","en":"The position of title inside divider","default":"\\\"center\\\"","version":""},"type":"\\\"left\\\" | \\\"right\\\" | \\\"center\\\" "},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":"","version":""},"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"type":"CSSProperties "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
