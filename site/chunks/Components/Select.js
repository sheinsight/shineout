/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Select/cn.md'
import en from 'doc/pages/components/Select/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    title: locate('基本用法 \n Select 没有单独的 Option 选项，通过数据 (data) 来渲染', 'Base'),
    component: require('doc/pages/components/Select/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-01-base.js'),
  },
  {
    name: '02-format',
    title: locate('数据处理 \n format 选项可以把数据对象格式化为指定的 value', 'Datum'),
    component: require('doc/pages/components/Select/example-02-format.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-02-format.js'),
  },
  {
    name: '03-datum',
    title: locate(' \n 如果 format 属性不能满足需求，可以借助 Datum.List 来处理', ''),
    component: require('doc/pages/components/Select/example-03-datum.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-03-datum.js'),
  },
  {
    name: '04-clearable',
    title: locate('可清空 \n clearable 属性为 true 时，hover 后会显示清空图标，点击后清除所选数据', 'Clearable'),
    component: require('doc/pages/components/Select/example-04-clearable.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-04-clearable.js'),
  },
  {
    name: '04-size',
    title: locate('大小 \n 有三种 size，[&#39;small&#39;, default, &#39;large&#39;]，默认为 default(不要填写)', 'Size'),
    component: require('doc/pages/components/Select/example-04-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-04-size.js'),
  },
  {
    name: '05-multiple',
    title: locate('多选 \n multiple 属性为true时，为多选状态，默认为单选', 'Multiple'),
    component: require('doc/pages/components/Select/example-05-multiple.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-05-multiple.js'),
  },
  {
    name: '06-bigdata',
    title: locate('性能 \n Select 内部用懒加载机制来优化性能，本例加载了10000条数据。', 'Datum'),
    component: require('doc/pages/components/Select/example-06-bigdata.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-06-bigdata.js'),
  },
  {
    name: '07-disabled',
    title: locate('禁用 \n 设置 disabled 禁用组件', 'Disabled'),
    component: require('doc/pages/components/Select/example-07-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-07-disabled.js'),
  },
  {
    name: '08-filter',
    title: locate('筛选数据 - 前端 \n onFilter 返回函数时，使用这个函数做前端过滤', 'onFilter'),
    component: require('doc/pages/components/Select/example-08-filter.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-08-filter.js'),
  },
  {
    name: '09-filter',
    title: locate('筛选数据 - 服务端 \n onFilter 函数不返回结果时，可以自行去服务端筛选数据', 'onFilter'),
    component: require('doc/pages/components/Select/example-09-filter.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-09-filter.js'),
  },
  {
    name: '10-filter',
    title: locate(' \n 示例：服务端过滤多选', ''),
    component: require('doc/pages/components/Select/example-10-filter.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-10-filter.js'),
  },
  {
    name: '11-create',
    title: locate('创建选项 \n 设置 onCreate 属性可以通过输入创建选项', 'onCreate'),
    component: require('doc/pages/components/Select/example-11-create.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-11-create.js'),
  },
  {
    name: '12-create',
    title: locate(' \n 示例：创建选项和 filter 配合使用', ''),
    component: require('doc/pages/components/Select/example-12-create.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-12-create.js'),
  },
  {
    name: '13-absolute',
    title: locate('绝对定位 \n 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。（非必要情况下不建议）', 'Absolute'),
    component: require('doc/pages/components/Select/example-13-absolute.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-13-absolute.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
