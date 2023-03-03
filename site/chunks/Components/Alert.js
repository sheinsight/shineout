/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Alert/cn.md'
import en from 'doc/pages/components/Alert/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基本的使用',
      'Base \n Basic usage'
    ),
    component: require('doc/pages/components/Alert/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Alert/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Alert/example-1-base.tsx'),

  },
  {
    name: '2-type',
    isTs: true,
    isTest: false,
    title: locate(
      '类型 \n 内置了 4 种类型（样式），[success, info, warning, danger]，默认为 warning',
      'type \n There are four built-in types (styles), [success, info, warning, danger], the default value is warning.'
    ),
    component: require('doc/pages/components/Alert/example-2-type.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Alert/example-2-type.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Alert/example-2-type.tsx'),

  },
  {
    name: '3-close',
    isTs: true,
    isTest: false,
    title: locate(
      '关闭 \n 设置 onClose 属性时，显示关闭按钮 \n onClose 为 true 时，只关闭提示，不处理 \n onClose 为函数时，关闭后调用此函数',
      'onClose \n When the onClose property is set, the close button is displayed. \n When the onClose property is true, only hide the component. \n When the onClose is a function, call this function after hiding it.'
    ),
    component: require('doc/pages/components/Alert/example-3-close.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Alert/example-3-close.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Alert/example-3-close.tsx'),

  },
  {
    name: '4-icon',
    isTs: true,
    isTest: false,
    title: locate(
      '内置图标 \n 设置 icon 属性可以显示内置的图标，不同类型的图标见示例',
      'Icon \n Set the icon property to display the built-in icon.'
    ),
    component: require('doc/pages/components/Alert/example-4-icon.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Alert/example-4-icon.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Alert/example-4-icon.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Alert","properties":[{"name":"children","tag":{"en":"Content, text or react component","cn":"内容，文字或react组件"},"type":"ReactNode"},{"name":"icon","tag":{"en":"When the type is true, the status icon is displayed according to the type property. If you need to display a custom icon, pass in ReactElement.","cn":"为true时，根据type属性显示状态图标。如果需要显示自定义图标，传入ReactElement。"},"type":"boolean | ReactElement<any, string | JSXElementConstructor<any>>"},{"name":"iconSize","tag":{"en":"The size for icon","cn":"icon 的尺寸","default":"14"},"type":"number"},{"name":"onClose","tag":{"en":"When onClose is empty, no close is displayed. If you need to close and do not need to handle callbacks, set it true.","cn":"当onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为true即可"},"type":"boolean | ((duration?: number , offsetHeight?: number ) => void)"},{"name":"type","tag":{"en":"types","cn":"类型"},"type":"\\\"error\\\" | \\\"success\\\" | \\\"info\\\" | \\\"warning\\\" | \\\"danger\\\" | \\\"confirmwarning\\\""},{"name":"hideClose","tag":{"en":"show close button","cn":"是否隐藏关闭按钮","default":"false"},"type":"boolean"},{"name":"closeItem","tag":{"cn":"custom close button","en":"自定义关闭按钮"},"type":"ReactNode"},{"name":"className","tag":{"en":"extend className","cn":"扩展className"},"type":"string"},{"name":"style","tag":{"en":"style object","cn":"内联样式"},"type":"CSSProperties"}]}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
