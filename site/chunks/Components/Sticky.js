/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Sticky/cn.md'
import en from 'doc/pages/components/Sticky/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-top',
    isTs: true,
    isTest: false,
    title: locate(
      '基本 \n 附着在顶部 20px',
      'Basic \n Sticky 20px to top'
    ),
    component: require('doc/pages/components/Sticky/example-1-top.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Sticky/example-1-top.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Sticky/example-1-top.tsx'),

  },
  {
    name: '2-element',
    isTs: true,
    isTest: false,
    title: locate(
      '指定元素 \n 附着在元素内',
      'Element \n Sticky to element'
    ),
    component: require('doc/pages/components/Sticky/example-2-element.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Sticky/example-2-element.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Sticky/example-2-element.tsx'),

  },
  {
    name: '3-bottom',
    isTs: true,
    isTest: false,
    title: locate(
      '位置 \n 附着在底部',
      'Position \n Sticky to bottom'
    ),
    component: require('doc/pages/components/Sticky/example-3-bottom.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Sticky/example-3-bottom.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Sticky/example-3-bottom.tsx'),

  },
  {
    name: 'test-001-bottom',
    isTs: true,
    isTest: true,
    title: locate(
      'T:bottom \n ',
      'T:bottom \n '
    ),
    component: require('doc/pages/components/Sticky/test-001-bottom.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Sticky/test-001-bottom.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Sticky/test-001-bottom.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Sticky","properties":[{"name":"style","tag":{"cn":"扩展样式。触发浮动后的默认zIndex为900，修改style的zIndex来改变。","en":"Extend style. \bThe default z-Index after triggering the float is 900, and you can modify the z-Index of the style to change.","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"bottom","tag":{"cn":"距离底部多少偏移量触发","en":"Offsets from the bottom.","default":"","version":""},"required":false,"type":"number "},{"name":"target","tag":{"cn":"附着的目标，默认为document.body。可以传入HTMLElement或者css selector，target 必须为 Sticky 组件的祖先节点","en":"Attached target. the default is the document.body. You can pass in an HTMLElement or css selector, and the target must be an ancestor node of the Sticky component.","default":"","version":""},"required":false,"type":"string | HTMLElement "},{"name":"top","tag":{"cn":"距离顶部多少偏移量触发","en":"Offsets from the top.","default":"","version":""},"required":false,"type":"number "},{"name":"css","tag":{"cn":"在指定 target 下，是否采用css方式实现附着效果","en":"use css position:sticky while target is ordered","default":"true","version":""},"required":false,"type":"boolean "},{"name":"onChange","tag":{"cn":"吸附效果时，触发该回调","en":"When the adsorption effect, trigger the callback","default":"","version":""},"required":false,"type":"((isSticky: boolean) => void) "},{"name":"children","tag":{"cn":"子元素","en":"children","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":"","version":""},"required":false,"type":"string "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
