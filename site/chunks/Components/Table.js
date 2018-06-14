/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Table/cn.md'
import en from 'doc/pages/components/Table/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    title: locate('基本用法', 'Overview'),
    component: require('doc/pages/components/Table/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-01-base.js'),
  },
  {
    name: '02-style',
    title: locate('边框和底纹', 'Style (bordered, striped)'),
    component: require('doc/pages/components/Table/example-02-style.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-02-style.js'),
  },
  {
    name: '03-small',
    title: locate('紧凑表格 \n 设置 size=small', 'Small user'),
    component: require('doc/pages/components/Table/example-03-small.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-03-small.js'),
  },
  {
    name: '04-column-group',
    title: locate('表头分组', 'Column group'),
    component: require('doc/pages/components/Table/example-04-column-group.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-04-column-group.js'),
  },
  {
    name: '06-fixed-header',
    title: locate('固定表头 \n *固定表头需要设置整个表格的高度', 'Fixed head'),
    component: require('doc/pages/components/Table/example-06-fixed-header.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-06-fixed-header.js'),
  },
  {
    name: '07-fixed-column-1',
    title: locate('固定列', 'Fixed column'),
    component: require('doc/pages/components/Table/example-07-fixed-column-1.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-07-fixed-column-1.js'),
  },
  {
    name: '07-fixed-column-2',
    title: locate('', ''),
    component: require('doc/pages/components/Table/example-07-fixed-column-2.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-07-fixed-column-2.js'),
  },
  {
    name: '08-bigdata',
    title: locate('性能 \n Table内部对大量数据的渲染做了lazy render的优化。这个例子加载了10000条数据。可以通过设置rowsInView调整单次最多render的行数，默认为20', 'rowsInView'),
    component: require('doc/pages/components/Table/example-08-bigdata.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-08-bigdata.js'),
  },
  {
    name: '09-loading',
    title: locate('加载中', 'Loading'),
    component: require('doc/pages/components/Table/example-09-loading.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-09-loading.js'),
  },
  {
    name: '10-sort',
    title: locate('排序 \n 此示例演示了前端排序，sorter 返回一个 sort 函数。后端排序在 sorter 中处理，不要返回。', 'Sort'),
    component: require('doc/pages/components/Table/example-10-sort.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-10-sort.js'),
  },
  {
    name: '11-pagination',
    title: locate('前端数据分页', 'Pagination'),
    component: require('doc/pages/components/Table/example-11-pagination.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-11-pagination.js'),
  },
  {
    name: '12-pagination',
    title: locate('服务端分页 \n 通过 pagination 的 onChange 事件来处理', 'Pagination'),
    component: require('doc/pages/components/Table/example-12-pagination.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-12-pagination.js'),
  },
  {
    name: '12-scroll',
    title: locate('滚动加载 \n 通过 onScroll 事件，实现滚动到底部加载下一页数据', 'onScroll'),
    component: require('doc/pages/components/Table/example-12-scroll.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-12-scroll.js'),
  },
  {
    name: '13-merge-cell',
    title: locate('合并行/列 \n *一个单元格同时指定了rowSpan和colSpan时，如果两行的rolSpan计算结果不同，这两行不会合并', 'rowSpan &amp; colSpan'),
    component: require('doc/pages/components/Table/example-13-merge-cell.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-13-merge-cell.js'),
  },
  {
    name: '14-merge-cell',
    title: locate('', ''),
    component: require('doc/pages/components/Table/example-14-merge-cell.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-14-merge-cell.js'),
  },
  {
    name: '15-select',
    title: locate('选择行 \n onRowChange 事件，会自动添加选择列', 'Select'),
    component: require('doc/pages/components/Table/example-15-select.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-15-select.js'),
  },
  {
    name: '16-select',
    title: locate('选择行 (Datum) \n 使用 Datum，可以简化一些数据处理的工作', 'Select (use Datum)'),
    component: require('doc/pages/components/Table/example-16-select.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-16-select.js'),
  },
  {
    name: '17-select',
    title: locate('\n 上面例子可以简化，传入一个 option 作为 datum', '\n'),
    component: require('doc/pages/components/Table/example-17-select.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-17-select.js'),
  },
  {
    name: '18-select',
    title: locate('选择行 (分页) \n 默认情况下，翻页时 Datum 对象会保留当前选中的数据', 'Select'),
    component: require('doc/pages/components/Table/example-18-select.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-18-select.js'),
  },
  {
    name: '19-select',
    title: locate('\n 如果需要翻页时清除选中数据，可以在翻页时调用 Datum.clear() 方法', 'Select'),
    component: require('doc/pages/components/Table/example-19-select.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-19-select.js'),
  },
  {
    name: '20-select',
    title: locate('选择行 (示例) \n 通常情况下，不需要使用 onChange 事件，使用 Datum.getValue 即可', 'Select'),
    component: require('doc/pages/components/Table/example-20-select.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-20-select.js'),
  },
  {
    name: '21-expand',
    title: locate('可展开 \n 需要展开行时，可以增加一个 type 为 &#39;expand&#39; 的 column，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果', 'Expand'),
    component: require('doc/pages/components/Table/example-21-expand.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-21-expand.js'),
  },
  {
    name: '22-scroll-to-index',
    title: locate('滚动 （试验） \n 固定表头的表格提供了一个 scrollToIndex 方法滚动到指定行，因为非固定行高的原因，滚动到未渲染过的行有一定偏差，请谨慎使用。', 'scrollToIndex'),
    component: require('doc/pages/components/Table/example-22-scroll-to-index.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-22-scroll-to-index.js'),
  },
  {
    name: '99-raw',
    title: locate('只使用样式 \n 使用原生的tr, td来显示表格', 'Style only'),
    component: require('doc/pages/components/Table/example-99-raw.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-99-raw.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
