/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Button/cn.md'
import en from 'doc/pages/components/Button/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n Button 内置了几种常用的类型，分为默认(default), 主要(primary), 次要(secondary), 成功(success), 警告(warning), 危险(danger)和链接(link)',
      'Base \n Button has several built-in type, default, primary, secondary, success, warning, dange, and link.'
    ),
    component: require('doc/pages/components/Button/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Button/example-1-base.tsx'),

  },
  {
    name: '1-text',
    isTs: true,
    isTest: false,
    title: locate(
      '文字按钮 \n 设置 text 属性来使用文字按钮',
      'Text \n set text to use text button'
    ),
    component: require('doc/pages/components/Button/example-1-text.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-1-text.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Button/example-1-text.tsx'),

  },
  {
    name: '2-icon',
    isTs: true,
    isTest: false,
    title: locate(
      '图标 \n shineout 并不提供内置的图标, 所以需要图标可以在内容中自行加入',
      'Icon \n shineout does not provide built-in icons, you can add it to the content by yourself.'
    ),
    component: require('doc/pages/components/Button/example-2-icon.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-2-icon.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Button/example-2-icon.tsx'),

  },
  {
    name: '3-size',
    isTs: true,
    isTest: false,
    title: locate(
      '大小 \n 一共有三种尺寸，[\'small\', \'default\', \'large\']，默认为 \'default\'',
      'Size \n There are three sizes, [\'small\', \'default\', \'large\'], default value is \'default\'.'
    ),
    component: require('doc/pages/components/Button/example-3-size.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-3-size.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Button/example-3-size.tsx'),

  },
  {
    name: '4-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '不可用 \n 添加 disabled 属性可以禁用按钮。',
      'Disabled \n Adding disabled property can disable the button.'
    ),
    component: require('doc/pages/components/Button/example-4-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-4-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Button/example-4-disabled.tsx'),

  },
  {
    name: '5-loading',
    isTs: true,
    isTest: false,
    title: locate(
      '加载中 \n 设定 loading 属性，可以让按钮变成加载中状态',
      'Loading \n Set loading property can add a loading indicator to button.'
    ),
    component: require('doc/pages/components/Button/example-5-loading.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-5-loading.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Button/example-5-loading.tsx'),

  },
  {
    name: '6-href',
    isTs: true,
    isTest: false,
    title: locate(
      '链接 \n 设置 href 属性，按钮会渲染为 a 标签，同时可以设置 target 属性',
      'Link \n Set the href attribute, the button will be rendered as <a> tag and you can also set the target property.'
    ),
    component: require('doc/pages/components/Button/example-6-href.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-6-href.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Button/example-6-href.tsx'),

  },
  {
    name: '7-outline',
    isTs: true,
    isTest: false,
    title: locate(
      '透明背景 \n 添加 outline 属性可以设置为透明背景，type 不能为 default 和 link。',
      'Outline \n Adding outline property can set background to transparent. Outline type can not be default and link.'
    ),
    component: require('doc/pages/components/Button/example-7-outline.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-7-outline.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Button/example-7-outline.tsx'),

  },
  {
    name: '8-group',
    isTs: true,
    isTest: false,
    title: locate(
      '组合 \n 一组 Button 可以用 Button.Group 容器中，按钮样式通过 Button.Gorup 的 size, type, outline 属性设置',
      'Group \n A series of buttons can group by Button.Group, set styles by Button.Group\'s size, type, and outline property.'
    ),
    component: require('doc/pages/components/Button/example-8-group.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-8-group.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Button/example-8-group.tsx'),

  },
  {
    name: '9-shape',
    isTs: true,
    isTest: false,
    title: locate(
      '形状 \n Button 内置了几种常用的类型，分为默认(default), 主要(primary), 次要(secondary), 成功(success), 警告(warning), 危险(danger)和链接(link)',
      'Base \n Button has several built-in type, default, primary, secondary, success, warning, dange, and link.'
    ),
    component: require('doc/pages/components/Button/example-9-shape.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-9-shape.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Button/example-9-shape.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Button","properties":[{"name":"children","tag":{"en":"The content inside the button, can be a text icon, etc.","cn":"按钮里面的内容, 可以是文字图标等"},"type":"ReactNode"},{"name":"disabled","tag":{"en":"Specifies the button should be disabled","cn":"禁用","default":"false"},"type":"boolean"},{"name":"href","tag":{"en":"If the href attribute is set, &lt;a> will be used instead of &lt;button>.","cn":"如果设置了 href 属性，将会用 <a> 代替 <button>"},"type":"string"},{"name":"target","tag":{"en":"If present, target will be set onto <a> element.(Effective only when href is been set)","cn":"当设置了 href 属性时，target 会被设置到 <a> 元素上"},"type":"string"},{"name":"outline","tag":{"en":"When outline is true, the background is transparent.","cn":"outline 为 true 时，显示透明背景的按钮","default":"false"},"type":"boolean"},{"name":"size","tag":{"en":"size of button","cn":"按钮尺寸","default":"\\\"default\\\"","override":"union"},"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"type","tag":{"en":"type of button","cn":"按钮类型","default":"\\\"default\\\"","override":"union"},"type":"\\\"default\\\" | \\\"success\\\" | \\\"warning\\\" | \\\"danger\\\" | \\\"primary\\\" | \\\"secondary\\\" | \\\"link\\\""},{"name":"htmlType","tag":{"en":"type of button original","cn":"按钮原生type属性","default":"\\\"button\\\""},"type":"\\\"button\\\" | \\\"reset\\\" | \\\"submit\\\""},{"name":"text","tag":{"en":"text button","cn":"文字按钮，不展示边框和背景","default":"false"},"type":"boolean"},{"name":"onClick","tag":{"en":"button click callback","cn":"按钮点击回调"},"type":"MouseEventHandler<HTMLElement>"},{"name":"space","tag":{"en":"For Button with only 2 Chinese characters, whether to insert a space between the two Chinese characters.","cn":"仅有2个汉字的按钮，是否在2个汉字中间插入空格","default":"false"},"type":"boolean"},{"name":"loading","tag":{"en":"loading","cn":"loading状态"},"type":"boolean"},{"name":"shape","tag":{"en":"Can be set button shape","cn":"设置按钮形状","default":"\\\"default\\\"","override":"union"},"type":"\\\"default\\\" | \\\"circle\\\" | \\\"round\\\""},{"name":"onRef","tag":{"en":"get button dom","cn":"获取按钮节点"},"type":"(instance: any) => void"},{"name":"className","tag":{"en":"extend className","cn":"扩展className"},"type":"string"},{"name":"style","tag":{"en":"style object","cn":"内联样式"},"type":"CSSProperties"}]},{"title":"ButtonGroup","properties":[{"name":"children","tag":{"en":"array of Button","cn":"由 Button 组成的 array"},"type":"ReactNode"},{"name":"size","tag":{"en":"same as Button","cn":"同 Button；如果 Button 和 Group 同时设置 size，以 Group 为准","override":"union"},"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"outline","tag":{"en":"same as Button","cn":"同 Button；如果 Button 未设置，使用此值"},"type":"boolean"},{"name":"type","tag":{"en":"same as Button","cn":"同 Button；如果 Button 和 Group 同时设置 type，以 Group 为准"},"type":"\\\\\"default\\\\\" | \\\\\"primary\\\\\" | \\\\\"secondary\\\\\" | \\\\\"success\\\\\" | \\\\\"warning\\\\\" | \\\\\"danger\\\\\" | \\\\\"link\\\\\""},{"name":"className","tag":{"en":"extend className","cn":"扩展className"},"type":"string"},{"name":"style","tag":{"en":"style object","cn":"内联样式"},"type":"CSSProperties"}]}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
