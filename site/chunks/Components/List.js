/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/List/cn.md'
import en from 'doc/pages/components/List/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    title: locate(
      '基本用法 \n 基础的List用法。',
      'Base \n Basic List usage.'
    ),
    component: require('doc/pages/components/List/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-01-base.js'),
  },
  {
    name: '01-renderItem',
    title: locate(
      '不使用 renderItem \n 当数据是字符串数组时，可以不传renderItem。',
      'dont use renderItem \n When the data is a string array, renderItem can not be passed.'
    ),
    component: require('doc/pages/components/List/example-01-renderItem.js').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-01-renderItem.js'),
  },
  {
    name: '02-fixed',
    title: locate(
      '性能 \n 设置 fixed 属性来启用虚拟列表，本例加载了10000条数据。 \n 支持自动高度，默认跟随父元素高度 \n lineHeight 用来设置列表项高度 \n rowsInView 用来设置同时所展示的列表项数量，默认为10个',
      'Performance \n Set the fixed property to enable the virtual list, which in this case loads 10,000 pieces of data. \n support automatic height, and follow the height of parent element by default \n lineheight is used to set the height of list items \n rowsinview is used to set the number of list items displayed on a page. The default is 10'
    ),
    component: require('doc/pages/components/List/example-02-fixed.js').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-02-fixed.js'),
  },
  {
    name: '02-pagination',
    title: locate(
      '分页 \n 前端分页的情况下, 设置 pagination 显示分页，没有设置 onChange 处理数据的情况下，会自动对数据进行分页 \n pagination 的参数和 Pagination 组件一致',
      'Pagination \n Set the pagination property to show the pagination and if not set onChange property, the data is automatically paged. \n The parameters of pagination are consistent with the Pagination component.'
    ),
    component: require('doc/pages/components/List/example-02-pagination.js').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-02-pagination.js'),
  },
  {
    name: '02-size',
    title: locate(
      '尺寸 \n 通过设置 size 为 large small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。',
      'size \n If a large or small list is desired, set the size property to either large or small respectively. Omit the size property for a list with the default size.'
    ),
    component: require('doc/pages/components/List/example-02-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-02-size.js'),
  },
  {
    name: '03-checkbox',
    title: locate(
      '选择行 \n 设置 onChange 属性，会自动添加选择行',
      'Select \n Set the onChange property will automatically add a row with checkbox.'
    ),
    component: require('doc/pages/components/List/example-03-checkbox.js').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-03-checkbox.js'),
  },
  {
    name: '04-footer',
    title: locate(
      '加载更多 \n 通过使用 footer 属性，可实现加载更多功能',
      'Load more \n Through use the footer attribute, you can load more functions.'
    ),
    component: require('doc/pages/components/List/example-04-footer.js').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-04-footer.js'),
  },
  {
    name: '05-scroll-load',
    title: locate(
      '滚动加载 \n 设置 scrollLoading 属性，当滚动到底部时，会自动调用该属性',
      'scroll loading \n Set the scrollLoad property, when the scroll to the bottom, it will automatically call to change the property.'
    ),
    component: require('doc/pages/components/List/example-05-scroll-load.js').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-05-scroll-load.js'),
  },
  {
    name: '06-base-item',
    title: locate(
      'List.BaseItem 布局 \n 使用 List.BaseItem 组件，可使用经典布局方式快速布局',
      'List.BaseItem layout \n Use List.BaseItem component to quickly layout'
    ),
    component: require('doc/pages/components/List/example-06-base-item.js').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-06-base-item.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
