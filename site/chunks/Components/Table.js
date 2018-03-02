/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
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
    title: locate('基本用法', 'Overview'),
    component: require('doc/pages/components/Table/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-01-base.js'),
  },
  {
    title: locate('边框和底纹', 'Style (bordered, striped)'),
    component: require('doc/pages/components/Table/example-02-style.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-02-style.js'),
  },
  {
    title: locate('紧凑表格 \n 设置 size=small', 'Small table'),
    component: require('doc/pages/components/Table/example-03-small.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-03-small.js'),
  },
  {
    title: locate('表头分组', 'Column group'),
    component: require('doc/pages/components/Table/example-04-column-group.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-04-column-group.js'),
  },
  {
    title: locate('固定表头 \n *固定表头需要设置整个表格的高度', 'Fixed head'),
    component: require('doc/pages/components/Table/example-06-fixed-header.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-06-fixed-header.js'),
  },
  {
    title: locate('固定列', 'Fixed column'),
    component: require('doc/pages/components/Table/example-07-fixed-column-1.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-07-fixed-column-1.js'),
  },
  {
    title: locate('', ''),
    component: require('doc/pages/components/Table/example-07-fixed-column-2.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-07-fixed-column-2.js'),
  },
  {
    title: locate('超大数据 \n * 这个例子加载了10000条数据。可以通过设置rowsInView调整单次最多render的行数，默认为20', 'Big data'),
    component: require('doc/pages/components/Table/example-08-bigdata.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-08-bigdata.js'),
  },
  {
    title: locate('加载中', 'Loading'),
    component: require('doc/pages/components/Table/example-09-loading.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-09-loading.js'),
  },
  {
    title: locate('排序', 'Sort'),
    component: require('doc/pages/components/Table/example-10-sort.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-10-sort.js'),
  },
  {
    title: locate('前端数据分页', 'Pagination'),
    component: require('doc/pages/components/Table/example-11-pagination.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-11-pagination.js'),
  },
  {
    title: locate('服务端分页 \n 通过 pagination 的 onChange 事件来处理', 'Pagination'),
    component: require('doc/pages/components/Table/example-12-pagination.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-12-pagination.js'),
  },
  {
    title: locate('合并行/列 \n *一个单元格同时指定了rowSpan和colSpan时，如果两行的rolSpan计算结果不同，这两行不会合并', 'rowSpan &amp; colSpan'),
    component: require('doc/pages/components/Table/example-13-merge-cell.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-13-merge-cell.js'),
  },
  {
    title: locate('', ''),
    component: require('doc/pages/components/Table/example-14-merge-cell.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-14-merge-cell.js'),
  },
  {
    title: locate('选择行 \n onRowChange 事件，会自动添加选择列', 'Select'),
    component: require('doc/pages/components/Table/example-15-select.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-15-select.js'),
  },
  {
    title: locate('选择行 (Datum) \n 使用 Datum，可以简化一些数据处理的工作', 'Select (use Datum)'),
    component: require('doc/pages/components/Table/example-16-select.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-16-select.js'),
  },
  {
    title: locate('\n 上面例子可以简化，传入一个 option 作为 datum', '\n'),
    component: require('doc/pages/components/Table/example-17-select.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-17-select.js'),
  },
  {
    title: locate('选择行 (分页) \n 默认情况下，翻页时 Datum 对象会保留当前选中的数据', 'Select'),
    component: require('doc/pages/components/Table/example-18-select.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-18-select.js'),
  },
  {
    title: locate('\n 如果需要翻页时清除选中数据，可以在翻页时调用 Datum.clear() 方法', 'Select'),
    component: require('doc/pages/components/Table/example-19-select.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-19-select.js'),
  },
  {
    title: locate('选择行 (示例) \n 通常情况下，不需要使用 onChange 事件，使用 Datum.getValue 即可', 'Select'),
    component: require('doc/pages/components/Table/example-20-select.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-20-select.js'),
  },
  {
    title: locate('只使用样式 \n 使用原生的tr, td来显示表格', 'Style only'),
    component: require('doc/pages/components/Table/example-99-raw.js').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-99-raw.js'),
  },
]

export default navable(props => <MarkDown {...props} source={source} examples={examples} />)
