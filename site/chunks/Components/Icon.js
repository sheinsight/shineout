/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Icon/cn.md'
import en from 'doc/pages/components/Icon/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-awesome',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 引入一个在线地址（本示例为 font-awesome）创建一个新的 Icon 组件，在需要使用的地方引入。',
      'Base \n Create a new compoennt with url, then use it anywhere.'
    ),
    component: require('doc/pages/components/Icon/example-1-awesome.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Icon/example-1-awesome.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Icon/example-1-awesome.tsx'),

  },
  {
    name: '2-iconfont',
    isTs: true,
    isTest: false,
    title: locate(
      '使用 Iconfont \n 可以在 iconfont.cn 定制一个图标，在项目中引入，支持font和svg两种方式',
      'Customize Font \n You can customize an icon in <a target="_blank" href="http://iconfont.cn">iconfont.cn</a> or <a target="_blank" href="http://fontastic.me/">fontastic.me</a>, support font and svg.'
    ),
    component: require('doc/pages/components/Icon/example-2-iconfont.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Icon/example-2-iconfont.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Icon/example-2-iconfont.tsx'),

  },
  {
    name: '3-size',
    isTs: true,
    isTest: false,
    title: locate(
      '样式 \n 通过 fontSize 和 type 属性可以便捷的设置大小和颜色，更多样式可以通过 style 属性设置。',
      'Style \n Set fontSize and type to change icon size and color.'
    ),
    component: require('doc/pages/components/Icon/example-3-size.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Icon/example-3-size.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Icon/example-3-size.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Icon","subTitle":"function(url, fontFamily, prefix):ReactClass","properties":[{"name":"url","tag":{"cn":"图标css或js文件地址，使用在线地址，不需要引入到项目中。如果在 link或script 中已经引用过，可以为空字符串","en":"The address of css or js file of the icon. If it has been introduced in the link/script tag, it can be empty.","default":"","version":""},"required":true,"type":"string"},{"name":"fontFamily","tag":{"cn":"font-family 需要和引入的css/js文件内的font-family一致","en":"The font-family needs to be the same as the font-family in the introduced CSS/JS file","default":"\\\"iconfont\\\"","version":""},"required":false,"type":"string "},{"name":"prefix","tag":{"cn":"类名前缀","en":"The prefix of the class","default":"\\\"icon\\\"","version":""},"required":false,"type":"string "}],"cn":"函数，返回一个新的组件，一个项目内可以创建多个，但是 fontFamily 不能相同","en":"Function, returns a new component. A project can create more than one, but fontFamily must be the unique."},{"title":"MyIcon","properties":[{"name":"children","tag":{"cn":"图标 unicode 编码，和 name 二选一","en":"The unicode code of the icon.","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"name","tag":{"cn":"图标类名（去除前缀的部分），值参照具体使用的图标库","en":"Icon class name (the part without the prefix)","default":"\\\"\\\"","version":""},"required":false,"type":"string "},{"name":"fontSize","tag":{"cn":"图标大小，和 style.fontSize 相同","en":"Icon size, same as style.fontsize","default":"","version":""},"required":false,"type":"string | number "},{"name":"type","tag":{"cn":"内置颜色类型","en":"Built-in color type","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"default\\\" | \\\"primary\\\" | \\\"secondary\\\" | \\\"success\\\" | \\\"warning\\\" | \\\"danger\\\" | \\\"info\\\" "},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "}],"cn":"Icon函数创建的图标组件","en":"Component created by the Icon function"}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
