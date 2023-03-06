/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/EditableArea/cn.md'
import en from 'doc/pages/components/EditableArea/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n EditableArea 默认展示一行，超过一行的内容用...代替',
      'Base \n Editablearea displays one line by default, and more than one line is replaced by ...'
    ),
    component: require('doc/pages/components/EditableArea/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/EditableArea/example-01-base.tsx'),

  },
  {
    name: '02-controlled',
    isTs: true,
    isTest: false,
    title: locate(
      '受控 \n 传递value, onChange使组件受控',
      'Controlled \n Pass value and onChange props to make the component controlled'
    ),
    component: require('doc/pages/components/EditableArea/example-02-controlled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-02-controlled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/EditableArea/example-02-controlled.tsx'),

  },
  {
    name: '03-container',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义容器 \n 在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动',
      'Custom container \n use getPopupContainer return target container'
    ),
    component: require('doc/pages/components/EditableArea/example-03-container.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-03-container.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/EditableArea/example-03-container.tsx'),

  },
  {
    name: '04-renderFooter',
    isTs: true,
    isTest: false,
    title: locate(
      '渲染 textarea footer \n 在输入框内嵌入标题',
      'RenderFooter \n render textarea footer'
    ),
    component: require('doc/pages/components/EditableArea/example-04-renderFooter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-04-renderFooter.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/EditableArea/example-04-renderFooter.tsx'),

  },
  {
    name: '05-renderResult',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义显示结果 \n 自定义显示结果',
      'RenderResult \n Customize display results'
    ),
    component: require('doc/pages/components/EditableArea/example-05-renderResult.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-05-renderResult.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/EditableArea/example-05-renderResult.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"EditableArea","properties":[{"name":"value","tag":{"cn":"受控","en":"The value passed in when controlled","default":""},"type":"string"},{"name":"onChange","tag":{"cn":"值改变后的回调函数","en":"Callback function when the value changes","default":""},"type":"(value: string) => void"},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":""},"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":""},"type":"(e?: Error ) => void"},{"name":"disabled","tag":{"cn":"是否禁用","en":"Whether to disable","default":"false"},"type":"boolean"},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":""},"type":"string[]"},{"name":"defaultValue","tag":{"cn":"默认值","en":"default value","default":""},"type":"string"},{"name":"reserveAble","tag":{"cn":"设置为true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":""},"type":"boolean"},{"name":"rules","tag":{"cn":"校验规则 详见 Rule 用法","en":"Validation rules, see Rule usage for details","default":""},"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段,配合 Form 使用","en":"Form field, used with Form","default":""},"type":"string | string[]"},{"name":"delay","tag":{"cn":"用户输入触发 onChange 和校验间隔时间，单位 毫秒。","en":"User input triggers the onChange and to check interval, unit: ms.","default":"400"},"type":"number"},{"name":"bordered","tag":{"cn":"是否显示外边框","en":"Whether to show the border","default":"false"},"type":"boolean"},{"name":"clearable","tag":{"cn":"是否展示清除按钮","en":"Whether to show the clear button","default":"true"},"type":"boolean"},{"name":"placeholder","tag":{"cn":"同原生属性","en":"The same as the native placeholder tag","default":""},"type":"string"},{"name":"width","tag":{"cn":"编辑域宽度","en":"width of the editablearea","default":""},"type":"string | number"},{"name":"maxHeight","tag":{"cn":"输入框的最大高度, 超过之后会出现滚动条","en":"the maxHeight of the textarea, scroll bars appear after more than","default":""},"type":"string | number"},{"name":"onBlur","tag":{"cn":"失去焦点事件","en":"blur event","default":""},"type":"(e: FocusEvent<Element>) => void"},{"name":"onFocus","tag":{"cn":"聚焦事件","en":"focus event","default":""},"type":"(e: FocusEvent<Element>) => void"},{"name":"getPopupContainer","tag":{"cn":"自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement","en":"Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement","default":""},"type":"() => HTMLElement"},{"name":"renderFooter","tag":{"cn":"渲染 textarea footer","en":"Render textarea footer","default":""},"type":"(value: string) => ReactNode"},{"name":"renderResult","tag":{"cn":"自定义显示结果","en":"Customize display results","default":""},"type":"(value: string) => ReactNode"},{"name":"trim","tag":{"cn":"trim 为 true 时，失去焦点时会自动删除空白字符","en":"When trim is true, blank characters are automatically deleted when lose focus","default":""},"type":"boolean"},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":""},"type":"string"},{"name":"style","tag":{"cn":"内联样式","en":"style object","default":""},"type":"CSSProperties"}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
