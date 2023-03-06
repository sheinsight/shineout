/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Dropdown/cn.md'
import en from 'doc/pages/components/Dropdown/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n Dropdown 通过数据来渲染，支持 json 格式数据、React 组件',
      'Base \n Dropdown is rendered through data and supports json formatted data and React components.'
    ),
    component: require('doc/pages/components/Dropdown/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Dropdown/example-1-base.tsx'),

  },
  {
    name: '2-hover',
    isTs: true,
    isTest: false,
    title: locate(
      '触发 \n Dropdown 默认通过点击触发下拉行为，设置 trigger="hover" 属性可以改为移入触发',
      'Trigger \n By default, Dropdown toggled clicking, setting trigger="hover" can toggled by mouse move in.'
    ),
    component: require('doc/pages/components/Dropdown/example-2-hover.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-2-hover.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Dropdown/example-2-hover.tsx'),

  },
  {
    name: '3-position',
    isTs: true,
    isTest: false,
    title: locate(
      '弹出位置 \n 设置 position 属性可以控制下拉菜单弹出的方向和位置',
      'Position \n Set position property can control the direction and position of the drop-down menu.'
    ),
    component: require('doc/pages/components/Dropdown/example-3-position.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-3-position.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Dropdown/example-3-position.tsx'),

  },
  {
    name: '4-items',
    isTs: true,
    isTest: false,
    title: locate(
      '多列平铺 \n 设置 columns 属性可以让选项多列平铺',
      'Multiple columns \n Set columns property can make the option multi-column tiled.'
    ),
    component: require('doc/pages/components/Dropdown/example-4-items.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-4-items.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Dropdown/example-4-items.tsx'),

  },
  {
    name: '5-split',
    isTs: true,
    isTest: false,
    title: locate(
      '组合 \n 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项',
      'Group \n Dropdown can be combined with Button used in Button.Group.'
    ),
    component: require('doc/pages/components/Dropdown/example-5-split.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-5-split.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Dropdown/example-5-split.tsx'),

  },
  {
    name: '6-type',
    isTs: true,
    isTest: false,
    title: locate(
      '样式 \n 使用了和Button相同的 type 和 size 设置样式',
      'type \n Style is set using the same type and size as Button.'
    ),
    component: require('doc/pages/components/Dropdown/example-6-type.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-6-type.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Dropdown/example-6-type.tsx'),

  },
  {
    name: '7-base',
    isTs: true,
    isTest: false,
    title: locate(
      '绝对定位 \n 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。',
      'Absolute \n If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer.'
    ),
    component: require('doc/pages/components/Dropdown/example-7-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-7-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Dropdown/example-7-base.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"DropDown","properties":[{"name":"columns","tag":{"cn":"页面多元素展示,此属性需要依赖width属性,请合理的设置列数和宽度","en":"Display multiple elements on the page. This property depends on the width attribute. Please set the number of columns and width appropriately.","default":"","version":""},"type":"number"},{"name":"outline","tag":{"cn":"同 Button","en":"same as Button","default":"","version":""},"type":"boolean"},{"name":"disabled","tag":{"cn":"禁用","en":"Specifies the dropdown should be disabled","default":"false","version":""},"type":"boolean"},{"name":"animation","tag":{"cn":"是否开启动画","en":"Specifies the dropdown should be disabled","default":"true","version":""},"type":"boolean"},{"name":"data","tag":{"cn":"下拉数据","en":"data of dropdown","default":"[]","version":""},"type":"(DropdownNode | ReactNode)[]"},{"name":"trigger","tag":{"cn":"触发方式","en":"Toggle mode","default":"\\\"click\\\"","version":""},"type":"\\\"click\\\" | \\\"hover\\\""},{"name":"placeholder","tag":{"cn":"按钮显示内容","en":"Displayed content of the button","default":"","version":""},"type":"ReactNode"},{"name":"size","tag":{"cn":"同 Button","en":"same as Button","default":"\\\"default\\\"","version":""},"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"type","tag":{"cn":"类型","en":"type of Dropdown","default":"","version":""},"type":"\\\"default\\\" | \\\"success\\\" | \\\"warning\\\" | \\\"danger\\\" | \\\"primary\\\" | \\\"secondary\\\" | \\\"link\\\""},{"name":"onClick","tag":{"cn":"点击事件。参数为渲染的数据,注: 如果数据内设置了onClick，会忽略此方法，调用data.onClick","en":"The click event. The parameter is the rendered data. <br /> Note: if the onClick is set in the data, this method will be ignored and data.onclick will be called.","default":"","version":""},"type":"(data: any) => void"},{"name":"width","tag":{"cn":"弹出选项层的宽度","en":"The width of the pop-up option layer","default":"","version":""},"type":"number"},{"name":"position","tag":{"cn":"弹出的方向和位置","en":"Set position property can control the direction and position of the drop-down menu","default":"\\\"auto\\\"","version":""},"type":"\\\"top-left\\\" | \\\"top-right\\\" | \\\"left-top\\\" | \\\"left-bottom\\\" | \\\"right-top\\\" | \\\"right-bottom\\\" | \\\"bottom-left\\\" | \\\"bottom-right\\\" | \\\"auto\\\""},{"name":"renderItem","tag":{"cn":"设置显示的内容,如果是字符串,则为对应的值。如果是函数,则返回值为显示的内容,参数为当条数据","en":"Set the displayed content. If it is a string,  the corresponding value will be displayed. \\n If it is a function, the return value will be displayed and its parameter is the current data.","default":"","version":""},"type":"string | ((data: any) => ReactNode)"},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":"","version":""},"type":"string"},{"name":"style","tag":{"cn":"内联样式","en":"style object","default":"","version":""},"type":"CSSProperties"},{"name":"absolute","tag":{"cn":"为 true 时，选项弹出层在 DOM 中独立 render; 为函数时，返回值作为弹出层容器","en":"When it is true, the pop-up layer of option append into document.body; When it is a function, the return value is used as the popup layer container","default":"false","version":""},"type":"boolean | (() => HTMLElement)"}],"cn":"","en":""},{"title":"DropdownNode","properties":[{"name":"url","tag":{"cn":"url属性不为空时，render为一个链接","en":"When the url is not empty, a url will be rendered.","default":"","version":""},"type":"string"},{"name":"target","tag":{"cn":"url 不为空时有效","en":"It is valid when the url is not empty.","default":"","version":""},"type":"string"},{"name":"disabled","tag":{"cn":"禁用","en":"Disabled","default":"","version":""},"type":"boolean"},{"name":"content","tag":{"cn":"默认从content获取内容","en":"element","default":"","version":""},"type":"ReactNode"},{"name":"children","tag":{"cn":"子节点","en":"childNode","default":"","version":""},"type":"DropdownNode[]"},{"name":"onClick","tag":{"cn":"点击事件","en":"click event","default":"","version":""},"type":"(data: DropdownNode) => void"}],"cn":"data 选项有三种情况：\\n  为 ReactElement 时，直接显示此元素；\\n  为 object 且设置了 renderItem，显示 renderItem 返回的内容；\\n  为 object 且未设置 renderItem，按以下数据结构处理。","en":"If data item is a ReactElement, render the item;\\nIf data item is an object and renderItem is set, render the renderItem\\\"s result;\\nif data item is an object and renderItem is not set, handle the parameters as follows;"}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
