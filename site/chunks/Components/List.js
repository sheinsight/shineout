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
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基础的List用法。',
      'Base \n Basic List usage.'
    ),
    component: require('doc/pages/components/List/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-01-base.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/List/example-01-base.tsx'),

  },
  {
    name: '01-renderItem',
    isTs: true,
    isTest: false,
    title: locate(
      '不使用 renderItem \n 当数据是字符串数组时，可以不传renderItem。',
      'dont use renderItem \n When the data is a string array, renderItem can not be passed.'
    ),
    component: require('doc/pages/components/List/example-01-renderItem.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-01-renderItem.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/List/example-01-renderItem.tsx'),

  },
  {
    name: '02-fixed',
    isTs: true,
    isTest: false,
    title: locate(
      '性能 \n 设置 fixed 属性来启用虚拟列表，本例加载了10000条数据。 \n 支持自动高度，默认跟随父元素高度 \n lineHeight 用来设置列表项高度 \n rowsInView 用来设置同时所展示的列表项数量，默认为10个',
      'Performance \n Set the fixed property to enable the virtual list, which in this case loads 10,000 pieces of data. \n support automatic height, and follow the height of parent element by default \n lineheight is used to set the height of list items \n rowsinview is used to set the number of list items displayed on a page. The default is 10'
    ),
    component: require('doc/pages/components/List/example-02-fixed.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-02-fixed.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/List/example-02-fixed.tsx'),

  },
  {
    name: '02-pagination',
    isTs: true,
    isTest: false,
    title: locate(
      '分页 \n 前端分页的情况下, 设置 pagination 显示分页，没有设置 onChange 处理数据的情况下，会自动对数据进行分页 \n pagination 的参数和 Pagination 组件一致',
      'Pagination \n Set the pagination property to show the pagination and if not set onChange property, the data is automatically paged. \n The parameters of pagination are consistent with the Pagination component.'
    ),
    component: require('doc/pages/components/List/example-02-pagination.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-02-pagination.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/List/example-02-pagination.tsx'),

  },
  {
    name: '02-size',
    isTs: true,
    isTest: false,
    title: locate(
      '尺寸 \n 通过设置 size 为 large small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。',
      'size \n If a large or small list is desired, set the size property to either large or small respectively. Omit the size property for a list with the default size.'
    ),
    component: require('doc/pages/components/List/example-02-size.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-02-size.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/List/example-02-size.tsx'),

  },
  {
    name: '03-checkbox',
    isTs: true,
    isTest: false,
    title: locate(
      '选择行 \n 设置 onChange 属性，会自动添加选择行',
      'Select \n Set the onChange property will automatically add a row with checkbox.'
    ),
    component: require('doc/pages/components/List/example-03-checkbox.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-03-checkbox.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/List/example-03-checkbox.tsx'),

  },
  {
    name: '04-footer',
    isTs: true,
    isTest: false,
    title: locate(
      '加载更多 \n 通过使用 footer 属性，可实现加载更多功能',
      'Load more \n Through use the footer attribute, you can load more functions.'
    ),
    component: require('doc/pages/components/List/example-04-footer.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-04-footer.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/List/example-04-footer.tsx'),

  },
  {
    name: '05-scroll-load',
    isTs: true,
    isTest: false,
    title: locate(
      '滚动加载 \n 设置 scrollLoading 属性，当滚动到底部时，会自动调用该属性',
      'scroll loading \n Set the scrollLoad property, when the scroll to the bottom, it will automatically call to change the property.'
    ),
    component: require('doc/pages/components/List/example-05-scroll-load.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-05-scroll-load.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/List/example-05-scroll-load.tsx'),

  },
  {
    name: '06-base-item',
    isTs: true,
    isTest: false,
    title: locate(
      'List.BaseItem 布局 \n 使用 List.BaseItem 组件，可使用经典布局方式快速布局',
      'List.BaseItem layout \n Use List.BaseItem component to quickly layout'
    ),
    component: require('doc/pages/components/List/example-06-base-item.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-06-base-item.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/List/example-06-base-item.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"List","properties":[{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"disabled","tag":{"cn":"如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项","en":"When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.","default":"false","version":""},"required":false,"type":"((data: Item) => boolean) | boolean"},{"name":"value","tag":{"cn":"当前选中值，格式和 onChange 返回值一致","en":"The current selected value.","default":"","version":""},"required":false,"type":"any[]"},{"name":"onChange","tag":{"cn":"选择行。rowData 为选中的数据，rowIndex 为选中行号。如果需要数据需要格式化的处理，建议配置 format。","en":"Select the row ,rowData is the selected data, rowIndex is the selected row number. If the data needs to be formatted, it is recommended to configure format","default":"","version":""},"required":false,"type":"((rowData: Value, index: number) => void) "},{"name":"size","tag":{"cn":"尺寸","en":"size","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"data","tag":{"cn":"渲染数据","en":"render data","default":"","version":""},"required":true,"type":"any[]"},{"name":"height","tag":{"cn":"列表高度","en":"list height","default":"","version":""},"required":false,"type":"number "},{"name":"loading","tag":{"cn":"加载中","en":"loading","default":"false","version":""},"required":false,"type":"ReactNode"},{"name":"keygen","tag":{"cn":"生成每一项key的辅助方法\\n为 true 时，以数据项本身作为 key，相当于 (d => d)\\n为函数时，使用此函数返回值\\n为 string 时，使用这个 string 对应的数据值。如 \\\"id\\\"，相当于 (d => d.id)","en":"Generate a auxiliary method for each key\\nIf not filled, index will be used (not recommended, in some cases there may be problems)\\nWhen it is a function, use its return value.\\nWhen it is a string，ues the value of the string.For example, \\\"id\\\" is the same thing as (d) => d.id .","default":"","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, index?: number) => string | number) | true"},{"name":"renderItem","tag":{"cn":"需要渲染成列表的数据","en":"render item","default":"","version":""},"required":false,"type":"ObjectKey<DataItem> | ((d: DataItem, index: number) => ReactNode) "},{"name":"prediction","tag":{"cn":"默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配","en":"By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match","default":"(val, d) => val===format(d)","version":""},"required":false,"type":"((value: Value extends (infer U)[] ? U : Value, data: DataItem) => boolean) "},{"name":"format","tag":{"cn":"格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d\\\\[format]; 为函数时，以函数返回结果作为 value。","en":"Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\\\\[format] When it is a function, use its return value.","default":"d => d","version":""},"required":false,"type":"ObjectKey<DataItem> | ((data: DataItem) => Value extends (infer U)[] ? U : Value) "},{"name":"bordered","tag":{"cn":"是否显示边框","en":"show border","default":"false","version":""},"required":false,"type":"boolean "},{"name":"empty","tag":{"cn":"无数据时展示的内容","en":"What to display when no data","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"colNum","tag":{"cn":"多列展示","en":"Multi-column display","default":"1","version":""},"required":false,"type":"number "},{"name":"fixed","tag":{"cn":"是否启用虚拟列表","en":"virtualized list","default":"false","version":""},"required":false,"type":"boolean "},{"name":"lineHeight","tag":{"cn":"列表项高度","en":"height of item","default":"32","version":""},"required":false,"type":"number "},{"name":"rowsInView","tag":{"cn":"同时展示的列表项数量","en":"Number of list items displayed at the same time","default":"10","version":""},"required":false,"type":"number "},{"name":"scrollLoading","tag":{"cn":"滚动到底部时触发","en":"Triggered when scrolling to the bottom","default":"","version":""},"required":false,"type":"(() => void) "},{"name":"footer","tag":{"cn":"底部内容","en":"The content at the bottom","default":"","version":""},"required":false,"type":"ReactNode | (() => ReactNode)"},{"name":"rowClassName","tag":{"cn":"自定义行 className","en":"custom row className","default":"","version":""},"required":false,"type":"string | ((rowData: DataItem, index: number) => string ) "},{"name":"pagination","tag":{"cn":"展示分页 详见 [Pagination](/components/Pagination)","en":"Show pagination See [Pagination](/components/Pagination) for details","default":"","version":""},"required":false,"type":"PaginationProps "}],"cn":"","en":""},{"title":"List.BaseItem","properties":[{"name":"desc","tag":{"cn":"描述","en":"describe","default":"","version":""},"required":false,"type":"string "},{"name":"title","tag":{"cn":"列表元素的标题","en":"The title of the list","default":"","version":""},"required":false,"type":"string "},{"name":"className","tag":{"cn":"Item 容器的 className","en":"Item className","default":"","version":""},"required":false,"type":"string "},{"name":"extra","tag":{"cn":"列表右侧内容","en":"Content area on the right side of the list","default":"","version":""},"required":false,"type":"ReactNode | ReactNode[]"},{"name":"avatar","tag":{"cn":"列表元素的图标","en":"List images","default":"","version":""},"required":false,"type":"ReactNode | (() => ReactNode)"},{"name":"content","tag":{"cn":"列表内容","en":"list content","default":"","version":""},"required":false,"type":"ReactNode | (() => ReactNode)"}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
