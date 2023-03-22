/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Switch/cn.md'
import en from 'doc/pages/components/Switch/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基本的 Switch',
      'Base \n Base Switch.'
    ),
    component: require('doc/pages/components/Switch/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Switch/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Switch/example-1-base.tsx'),

  },
  {
    name: '2-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n 设置 disabled 为 true 禁用 switch',
      'Disabled \n disabled check while disabled true'
    ),
    component: require('doc/pages/components/Switch/example-2-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Switch/example-2-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Switch/example-2-disabled.tsx'),

  },
  {
    name: '3-content',
    isTs: true,
    isTest: false,
    title: locate(
      '内容 \n 为每个状态添加描述',
      'Base \n Description for every status.'
    ),
    component: require('doc/pages/components/Switch/example-3-content.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Switch/example-3-content.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Switch/example-3-content.tsx'),

  },
  {
    name: '4-size',
    isTs: true,
    isTest: false,
    title: locate(
      '大小 \n 通过 size 设置 Switch 大小',
      'Size \n size set'
    ),
    component: require('doc/pages/components/Switch/example-4-size.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Switch/example-4-size.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Switch/example-4-size.tsx'),

  },
  {
    name: '5-loading',
    isTs: true,
    isTest: false,
    title: locate(
      '加载中 \n 表示还在执行中',
      'loading \n still in progress'
    ),
    component: require('doc/pages/components/Switch/example-5-loading.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Switch/example-5-loading.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Switch/example-5-loading.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Switch","properties":[{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":"","version":""},"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"type":"CSSProperties "},{"name":"checked","tag":{"cn":"当前选中状态，checked 传入时为受控组件","en":"checked status，will in control when pass","default":"","version":""},"type":"boolean "},{"name":"disabled","tag":{"cn":"是否禁用","en":"disable checkbox","default":"false","version":""},"type":"boolean "},{"name":"value","tag":{"cn":"checked 未设置的情况下， checked = value","en":"set while no checked","default":"","version":""},"type":"boolean "},{"name":"onChange","tag":{"cn":"checked 表示选中状态","en":"checked is status","default":"","version":""},"type":"((value: boolean) => void) "},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"type":"((e?: Error ) => void) "},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"type":"string[] "},{"name":"defaultValue","tag":{"cn":"默认值  和 value 类型相同","en":"defaultValue 和 value 类型相同","default":"","version":""},"type":"Value "},{"name":"reserveAble","tag":{"cn":"设置为true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 Rule 用法","en":"Validation rules, see Rule usage for details","default":"","version":""},"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段, 配合 Form 使用","en":"Form field, used with Form","default":"","version":""},"type":"string "},{"name":"size","tag":{"cn":"尺寸","en":"size","default":"\\\"default\\\"","version":""},"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"loading","tag":{"cn":"加载中","en":"loading","default":"false","version":""},"type":"boolean "},{"name":"content","tag":{"cn":"选中和未选中时的内容","en":"content with checked and unchecked","default":"","version":""},"type":"[ReactNode, ReactNode] | [] "},{"name":"onClick","tag":{"cn":"勾选框点击回调","en":"Checkbox click callback","default":"false","version":""},"type":"MouseEventHandler<HTMLInputElement> "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
