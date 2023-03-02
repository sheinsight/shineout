/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Carousel/cn.md'
import en from 'doc/pages/components/Carousel/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 轮播组件提供了三种动画过渡方式，可以切换选项查看效果',
      'Base \n The carousel component provides three modes of animation transition. Change the option to view the result.'
    ),
    component: require('doc/pages/components/Carousel/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Carousel/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Carousel/example-1-base.tsx'),

  },
  {
    name: '2-custom-indicator',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义 Indicator \n 当 indicatorType 为函数时，可以自定义 Indicator',
      'Custom Indicator \n Indicators can be customized when indicatorType is a function.'
    ),
    component: require('doc/pages/components/Carousel/example-2-custom-indicator.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Carousel/example-2-custom-indicator.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Carousel/example-2-custom-indicator.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Carousel","properties":[{"name":"animation","tag":{"en":"animation effects, options: \\nslide - horizontal sliding\\nslide-y - vertical sliding\\nfade - fading","cn":"动画效果，可选值为 slide - 横向滑动 ，slide-y - 垂直滑动 ，fade - 淡入淡出","default":"\\\"slide\\\""},"type":"\\\"slide\\\" | \\\"slide-y\\\" | \\\"fade\\\""},{"name":"indicatorPosition","tag":{"en":"the position of indicator","cn":"指示标示位置","default":"\\\"center\\\""},"type":"\\\"left\\\" | \\\"center\\\" | \\\"right\\\""},{"name":"indicatorType","tag":{"en":"the style of indicator, string options: [\\\"circle\\\", \\\"number\\\", \\\"line\\\"], using function for custom styles","cn":"指示标示样式，字符串可以是：[\\\"circle\\\", \\\"number\\\", \\\"line\\\"]，函数则可以自定义样式: (current, moveTo) => (<Component />)","default":"\\\"circle\\\""},"type":"\\\"number\\\" | \\\"circle\\\" | ((current: number, moveTo: (index: number) => void) => ReactNode) | \\\"line\\\""},{"name":"interval","tag":{"en":"the interval of animation, When it is not 0, play automatically","cn":"动画间隔时间，为 0 时，不自动播放","default":"0"},"type":"number"},{"name":"onMove","tag":{"en":"move callback","cn":"轮播后的回调"},"type":"(current: number, extra: { prev: number; direction: \\\"forward\\\" | \\\"backward\\\"; moveTo: (n: number) => void; }) => void"},{"name":"children","tag":{"en":"children","cn":"子元素"},"type":"ReactNode"},{"name":"showArrow","tag":{"en":"When to show the switch trigger","cn":"切换箭头显示时机"},"type":"\\\"hover\\\" | \\\"always\\\""},{"name":"arrowClassName","tag":{"en":"The additional css class for arrow","cn":"箭头扩展 class"},"type":"string"},{"name":"className","tag":{"en":"extend className","cn":"扩展className"},"type":"string"},{"name":"style","tag":{"en":"style object","cn":"内联样式"},"type":"CSSProperties"}]}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
