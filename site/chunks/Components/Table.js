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
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基础的表格用法。推荐 columns 写为常量，以提升性能。',
      'Base \n Basic table usage.'
    ),
    component: require('doc/pages/components/Table/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-01-base.tsx'),

  },
  {
    name: '02-style',
    isTs: true,
    isTest: false,
    title: locate(
      '边框和底纹 \n 通过 striped 显示交错底纹；通过 bordered 显示边框。',
      'Style \n Set striped to add zebra-striping; Set bordered to add borders.'
    ),
    component: require('doc/pages/components/Table/example-02-style.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-02-style.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-02-style.tsx'),

  },
  {
    name: '03-small',
    isTs: true,
    isTest: false,
    title: locate(
      '紧凑表格 \n 设置 size 为 small 显示紧凑表格',
      'Small table \n Set size to small to display the compact form.'
    ),
    component: require('doc/pages/components/Table/example-03-small.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-03-small.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-03-small.tsx'),

  },
  {
    name: '04-column-group',
    isTs: true,
    isTest: false,
    title: locate(
      '表头分组 \n Table 会自动合并相邻相同 group 的表头',
      'Column group \n Table automatically merges headers with adjacent and identical groups.'
    ),
    component: require('doc/pages/components/Table/example-04-column-group.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-04-column-group.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-04-column-group.tsx'),

  },
  {
    name: '06-fixed-header',
    isTs: true,
    isTest: false,
    title: locate(
      '固定表头 \n 设置 fixed 属性为 \'both\' 或 \'y\'，可以固定表头，表格高度默认填充父元素 \n 设置 fixed 属性为 \'auto\'，可以自动展示滚动条 \n 注:横向滚动需要指定 Table 的 width 属性, 不建议给所有的 column 设置宽度, 如果出现表头对不齐的问题, 请尝试至少留一列不设宽度以适应弹性布局，或者检查表格内容是否有超长不换行元素破坏布局.',
      'Fixed head \n Set the fixed property to \'both\' or \'y\' can fix the table header. The table height defaults to full the parent element. \n Set the fixed property to \'auto\' can auto show scrollbar. \n Note: Horizontal scrolling requires the width property of Table, it is not recommended to set the width for all columns, if there is a problem with tablehead pairs, try leaving at least one column without a width to fit the elastic layout, or check the table contentford for excessively long unwrapped elements to break the layout.'
    ),
    component: require('doc/pages/components/Table/example-06-fixed-header.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-06-fixed-header.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-06-fixed-header.tsx'),

  },
  {
    name: '07-fixed-column-1',
    isTs: true,
    isTest: false,
    title: locate(
      '固定列 \n 设置 column 的 fixed 属性，可以固定列。只在设置了表格的 width 属性，并且 width 大于外部容器情况下才会生效',
      'Fixed column \n Set the fixed property of the column can fix the column; Only take effect if the table\'s width property is set and width is greater than the external container.'
    ),
    component: require('doc/pages/components/Table/example-07-fixed-column-1.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-07-fixed-column-1.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-07-fixed-column-1.tsx'),

  },
  {
    name: '07-fixed-column-2',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 示例：只固定右侧列',
      ' \n Example: Only fix the right column.'
    ),
    component: require('doc/pages/components/Table/example-07-fixed-column-2.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-07-fixed-column-2.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-07-fixed-column-2.tsx'),

  },
  {
    name: '08-bigdata',
    isTs: true,
    isTest: false,
    title: locate(
      '性能 \n Table内部对大量数据的渲染做了lazy render的优化。这个例子加载了10000条，55列数据。可以通过设置rowsInView调整单次最多render的行数，默认为20',
      'Performance \n The rendering of large amounts of data in the Table has been optimized by lazy render. This example loads 10000 pieces and 55 columns of data. \n You can set rowsInView property to change the number of rows in rendering. The default value is 20.'
    ),
    component: require('doc/pages/components/Table/example-08-bigdata.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-08-bigdata.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-08-bigdata.tsx'),

  },
  {
    name: '09-loading',
    isTs: true,
    isTest: false,
    title: locate(
      '加载中 \n 设置 loading 属性可以将表格状态设置为加载中',
      'Loading \n Set the loading property can set the table state to loading.'
    ),
    component: require('doc/pages/components/Table/example-09-loading.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-09-loading.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-09-loading.tsx'),

  },
  {
    name: '10-sort-default',
    isTs: true,
    isTest: false,
    title: locate(
      '排序 \n 设置 Table 的 sorter 属性统一指定排序函数 \n 设置 column 的 sorter 标示此列需要排序并指定依据字段，会作为第一个参数传入排序函数 \n defaultOrder 指定该列默认排序规则 \n sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序 \n 后端或自行排序用户自行处理，sorter 函数不要返回结果',
      'Sorter \n Set the sorter property of Table to indicate the method of table sort. \n Set the sorter property of Column to indicate the sort key string, will pass to table sorter method \n Set defaultOrder mark defualt order \n When the sorter returns a function, use this function to sort data internally. \n Server-side or self-sorting is is handled by the user, do not return results.'
    ),
    component: require('doc/pages/components/Table/example-10-sort-default.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-10-sort-default.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-10-sort-default.tsx'),

  },
  {
    name: '10-sort-render',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义排序图标 \n 设置 Table 的 renderSorter 属性来自定义图标',
      'Sorter \n Set the renderSorter property of the Table to customize the icon.'
    ),
    component: require('doc/pages/components/Table/example-10-sort-render.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-10-sort-render.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-10-sort-render.tsx'),

  },
  {
    name: '10-sort-weight',
    isTs: true,
    isTest: false,
    title: locate(
      '多列排序 \n 设置 column 的 sorter 为一个对象，对象的rule属性同单列排序的sorter，weight表示排序权重，值越大表示排序优先级越高 \n 支持多列默认排序，为需要默认排序的列设置defaultOrder \n sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序 \n 后端或自行排序用户自行处理，sorter 函数不要返回结果',
      'multiple Sorter \n Set the sorter property of Table to indicate the method of table sort. \n Set the sorter of column to an object, the rule attribute of the object is the same as the sorter of single column sorting, weight indicates the sorting weight, the larger the value, the higher the sorting priority \n Support multi-column default sorting, set defaultOrder for columns that need default sorting \n When the sorter returns a function, use this function to sort data internally. \n Server-side or self-sorting is is handled by the user, do not return results.'
    ),
    component: require('doc/pages/components/Table/example-10-sort-weight.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-10-sort-weight.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-10-sort-weight.tsx'),

  },
  {
    name: '11-pagination',
    isTs: true,
    isTest: false,
    title: locate(
      '分页 \n 前端分页的情况下, 设置 pagination 显示分页，没有设置 onChange 处理数据的情况下，会自动对数据进行分页 \n pagination 的参数和 Pagination 组件一致',
      'Pagination \n Set the pagination property to show the pagination and if not set onChange property, the data is automatically paged. \n The parameters of pagination are consistent with the Pagination component.'
    ),
    component: require('doc/pages/components/Table/example-11-pagination.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-11-pagination.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-11-pagination.tsx'),

  },
  {
    name: '12-pagination',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 后端分页的情况下, 在 pagination 的 onChange 中处理（获取）数据，可以实现服务端分页',
      ' \n Processing (acquiring) data in pagination\'s onChange realizes the pagination of server-side.'
    ),
    component: require('doc/pages/components/Table/example-12-pagination.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-12-pagination.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-12-pagination.tsx'),

  },
  {
    name: '12-scroll',
    isTs: true,
    isTest: false,
    title: locate(
      '滚动加载 \n onScroll 事件会返回当前滚动条位置 (float 类型，[0,1])，可以据此实现滚动加载数据',
      'onScroll \n The onScroll event returns the current position(float,[0,1]) of the scroll bar.'
    ),
    component: require('doc/pages/components/Table/example-12-scroll.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-12-scroll.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-12-scroll.tsx'),

  },
  {
    name: '13-merge-cell',
    isTs: true,
    isTest: false,
    title: locate(
      '合并行/列 \n 设置 column 的 rowSpan 可以合并行，rowSpan 为函数，会传入相邻的两行数据，根据此函数返回结果(bool)判断是否合并行 \n 设置 column 的 colSpan 可以合并列，colSpan 为函数，传入参数为当前行数据，函数返回结果为需要向后合并的列数，不合并返回 1 \n 一个单元格同时指定了rowSpan和colSpan时，如果两行的colSpan计算结果不同，这两行不会合并',
      'rowSpan & colSpan \n - Set column\'s rowSpan property to merge rows. The rowSpan property is a function that passed in two adjacent rows of data and determine whether to merge or not. \n - Set column\'s colSpan property to merge columns. The colSpan property is a function that passed in current row of data and the result returned by this function is as the number of columns that need to be merged. \n - When a cell specifies both rowSpan and colSpan, if the colSpan\'s calculation results of the two rows are different, the two rows will not be merged.'
    ),
    component: require('doc/pages/components/Table/example-13-merge-cell.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-13-merge-cell.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-13-merge-cell.tsx'),

  },
  {
    name: '14-merge-cell',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 示例：不带分页的合并行/列',
      ' \n Example: Merged rows/columns without pagination.'
    ),
    component: require('doc/pages/components/Table/example-14-merge-cell.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-14-merge-cell.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-14-merge-cell.tsx'),

  },
  {
    name: '15-select-base',
    isTs: true,
    isTest: false,
    title: locate(
      '选择行 \n 设置 onRowSelect 属性，会自动添加选择列',
      'Select \n Set the onRowSelect property will automatically add a column with checkbox.'
    ),
    component: require('doc/pages/components/Table/example-15-select-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-15-select-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-15-select-base.tsx'),

  },
  {
    name: '15-select-format',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 使用 format，可以格式化返回的数据',
      ' \n Set format property to format the returned value.'
    ),
    component: require('doc/pages/components/Table/example-15-select-format.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-15-select-format.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-15-select-format.tsx'),

  },
  {
    name: '15-select-radio',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 设置 radio 属性实现单选效果',
      ' \n Set the radio attribute to achieve the radio effect'
    ),
    component: require('doc/pages/components/Table/example-15-select-radio.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-15-select-radio.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-15-select-radio.tsx'),

  },
  {
    name: '15-select-render',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 通过 render 自定义渲染',
      'Select \n Custom rendering via render'
    ),
    component: require('doc/pages/components/Table/example-15-select-render.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-15-select-render.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-15-select-render.tsx'),

  },
  {
    name: '17-select-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 设置 disabled 属性，禁用选项。',
      ' \n Set disabled to disable the selection.'
    ),
    component: require('doc/pages/components/Table/example-17-select-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-17-select-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-17-select-disabled.tsx'),

  },
  {
    name: '18-select',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 分页中 默认情况下，翻页时会保留当前选中的数据, 如果不需要保留, 则可以分页的时候手动清除',
      ' \n By default, the Datum object retains the currently selected data when the page is changed.'
    ),
    component: require('doc/pages/components/Table/example-18-select.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-18-select.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-18-select.tsx'),

  },
  {
    name: '21-drag-column',
    isTs: true,
    isTest: false,
    title: locate(
      '可伸缩列 \n 设置 columnResizable，使所有列可伸缩。<br />可在columns中设置某一列 columnResizable: false 来取消伸缩该列。',
      'Fixed head \n Set the columnResizable property to make all columns resizable. set columnResizable: false on columns item to cancel resizable.'
    ),
    component: require('doc/pages/components/Table/example-21-drag-column.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-21-drag-column.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-21-drag-column.tsx'),

  },
  {
    name: '21-expand',
    isTs: true,
    isTest: false,
    title: locate(
      '可展开 \n 需要展开行时，可以增加一个 type 为 \'expand\' 的 column，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果',
      'Expand \n Add a column with type \'expand\' and the render function returns a function, that means the row can be expanded. The content is the result returned by this function.'
    ),
    component: require('doc/pages/components/Table/example-21-expand.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-21-expand.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-21-expand.tsx'),

  },
  {
    name: '22-expand-control',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 受控,当传入一个expandKeys时,展开会变成受控的,需要自行在column里面的onClick去处理',
      ' \n When an expandKeys is provided, the expansion becomes controlled and needs to be processed by the onClick in the column.'
    ),
    component: require('doc/pages/components/Table/example-22-expand-control.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-22-expand-control.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-22-expand-control.tsx'),

  },
  {
    name: '23-scroll-to-index',
    isTs: true,
    isTest: false,
    title: locate(
      '滚动 \n 固定表头的表格提供了一个 scrollToIndex 方法滚动到指定行，因为非固定行高的原因，滚动到未渲染过的行有一定偏差，请谨慎使用。',
      'scrollToIndex \n The table of the fixed header provides a scrollToIndex method to scroll to the specified line. Because of the row height is not fixed, scrolling to the unrendered line has a little deviation. Please use it with caution.'
    ),
    component: require('doc/pages/components/Table/example-23-scroll-to-index.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-23-scroll-to-index.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-23-scroll-to-index.tsx'),

  },
  {
    name: '24-row-classname',
    isTs: true,
    isTest: false,
    title: locate(
      '行样式 \n 通过 rowClassName 设置单行样式（使用了 rowClassName 必须给 td 指定背景色）',
      'Row ClassName \n Set the rowClassName property to set row style. (You must specify td background-color when the rowClassName is set)'
    ),
    component: require('doc/pages/components/Table/example-24-row-classname.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-24-row-classname.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-24-row-classname.tsx'),

  },
  {
    name: '25-row-click-attr',
    isTs: true,
    isTest: false,
    title: locate(
      '行内元素点击 \n 设置rowClickAttr，可以使行内元素的点击事件触发onRowClick',
      'Base \n Set the rowClickAttr to trigger an onRowClick event for an element.'
    ),
    component: require('doc/pages/components/Table/example-25-row-click-attr.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-25-row-click-attr.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-25-row-click-attr.tsx'),

  },
  {
    name: '26-tree',
    isTs: true,
    isTest: false,
    title: locate(
      '树形数据 \n 支持树形数据的展示，通过 columns.treeColumnsName 指定子数据字段名，同时在该列自动添加 展开/收起 按钮。\n 通过 columns.treeIndent 指定每一层缩进宽度。\n 备注：当展开列内容过长时，单元格会自动换行。可以通过 width 设定足够的长度来避免。',
      'Tree Data \n Support Tree Data.'
    ),
    component: require('doc/pages/components/Table/example-26-tree.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-26-tree.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-26-tree.tsx'),

  },
  {
    name: '26-tree0',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 设置 treeCheckAll, 支持递归选择子数据',
      ' \n Set treeCheckAll to deep check children'
    ),
    component: require('doc/pages/components/Table/example-26-tree0.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-26-tree0.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-26-tree0.tsx'),

  },
  {
    name: '27-tree',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 展开图标在其他列',
      ' \n expeng icon in other column'
    ),
    component: require('doc/pages/components/Table/example-27-tree.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-27-tree.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-27-tree.tsx'),

  },
  {
    name: '28-tree',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 使用 treeExpandKeys 和 onTreeExpand 使展开行受控 \n 设置 changedByExpand 为 true 用来改变滚动条重置的默认行为',
      ' \n Use treeExpandKeys and onTreeExpand to control the expand row. \n Set changedByExpand to true to change the default behavior of scrollbar reset'
    ),
    component: require('doc/pages/components/Table/example-28-tree.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-28-tree.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-28-tree.tsx'),

  },
  {
    name: '29-sort',
    isTs: true,
    isTest: false,
    title: locate(
      '排序 (旧) \n 设置 column 的 sorter 属性标示此列需要排序 \n sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序 \n 后端或自行排序用户自行处理，sorter 函数不要返回结果',
      'Sorter (Out of date) \n Set the sorter property of column to indicate that this column can be sorted. \n When the sorter returns a function, use this function to sort data internally. \n Server-side or self-sorting is is handled by the user, do not return results.'
    ),
    component: require('doc/pages/components/Table/example-29-sort.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-29-sort.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-29-sort.tsx'),

  },
  {
    name: '30-raw',
    isTs: true,
    isTest: false,
    title: locate(
      '只使用样式 \n 使用原生的tr, td来显示表格',
      'Style only \n Use the native tr and td to display the table.'
    ),
    component: require('doc/pages/components/Table/example-30-raw.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-30-raw.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-30-raw.tsx'),

  },
  {
    name: '31-sticky',
    isTs: true,
    isTest: false,
    title: locate(
      '表头附着 \n 在滚屏场景下，可以设置 sticky 属性使表头附着顶部',
      'Sticky Header \n Use the sticky attribute to sticky the header.'
    ),
    component: require('doc/pages/components/Table/example-31-sticky.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-31-sticky.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-31-sticky.tsx'),

  },
  {
    name: '32-selection',
    isTs: true,
    isTest: false,
    title: locate(
      '单元格选中 \n 通过 cellSelectable 属性来启用 ctrl/cmd + click 选中单元格',
      'Cell selectable \n whether to enable ctrl/cmd + click check.'
    ),
    component: require('doc/pages/components/Table/example-32-selection.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-32-selection.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-32-selection.tsx'),

  },
  {
    name: '33-row-drag',
    isTs: true,
    isTest: false,
    title: locate(
      '拖动行 \n 通过 rowEvents 属性来自定义拖拽事件',
      'drag row \n customize drag events through the rowEvents property'
    ),
    component: require('doc/pages/components/Table/example-33-row-drag.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-33-row-drag.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-33-row-drag.tsx'),

  },
  {
    name: '34-foots-01',
    isTs: true,
    isTest: false,
    title: locate(
      '底部总结栏 \n 通过 foots 属性来渲染底部信息',
      'footer summary \n Render bottom information through the foots property'
    ),
    component: require('doc/pages/components/Table/example-34-foots-01.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-34-foots-01.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-34-foots-01.tsx'),

  },
  {
    name: '34-foots-02-fixed',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 固定列用法',
      ' \n Fixed column usage'
    ),
    component: require('doc/pages/components/Table/example-34-foots-02-fixed.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/example-34-foots-02-fixed.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/example-34-foots-02-fixed.tsx'),

  },
  {
    name: 'test-001-hover',
    isTs: true,
    isTest: true,
    title: locate(
      'T:hover \n ',
      'T:hover \n '
    ),
    component: require('doc/pages/components/Table/test-001-hover.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/test-001-hover.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/test-001-hover.tsx'),

  },
  {
    name: 'test-002-value',
    isTs: true,
    isTest: true,
    title: locate(
      'T:value \n ',
      'T:value \n '
    ),
    component: require('doc/pages/components/Table/test-002-value.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Table/test-002-value.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Table/test-002-value.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
