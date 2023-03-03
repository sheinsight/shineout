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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/List/example-01-base.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/List/example-01-renderItem.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/List/example-02-fixed.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/List/example-02-pagination.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/List/example-02-size.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/List/example-03-checkbox.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/List/example-04-footer.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/List/example-05-scroll-load.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/List/example-06-base-item.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"List","properties":[{"name":"onChange","tag":{"en":"Select the row ,rowData is the selected data, rowIndex is the selected row number. If the data needs to be formatted, it is recommended to configure format","cn":"选择行。rowData为选中的数据，rowIndex为选中行号。如果需要数据需要格式化的处理，建议配置 format。"},"type":"(rowData: Value, index: number) => void"},{"name":"value","tag":{"en":"The current selected value.","cn":"当前选中值，格式和 onChange 返回值一致","override":"any[]"},"type":"any[]"},{"name":"prediction","tag":{"en":"By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match","cn":"(val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配","default":"(val, d) => val===format(d)"},"type":"(value: Value extends (infer U)[] ? U : Value, data: DataItem) => boolean"},{"name":"disabled","tag":{"en":"When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.","cn":"如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项","default":"false","override":"((data: Item) => boolean) | boolean"},"type":"((data: Item) => boolean) | boolean"},{"name":"format","tag":{"en":"Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d[format] When it is a function, use its return value.","cn":"格式化 value。 默认值，返回原始数据。 为string时，会作为key从原始数据中获取值，相当于 (d) => d[format]。为函数时，以函数返回结果作为 value。","default":": d => d","override":"ObjectKey<Item> | ((data: Item) => Value extends (infer U)[] ? U : Value)"},"type":"ObjectKey<Item> | ((data: Item) => Value extends (infer U)[] ? U : Value)"},{"name":"colNum","tag":{"en":"Multi-column display","cn":"多列展示","default":"1"},"type":"number"},{"name":"data","tag":{"en":"Multi-column display","cn":"多列展示","default":"1"},"type":"DataItem[]"},{"name":"keygen","tag":{"en":"Generate a auxiliary method for each key\\nIf not filled, index will be used (not recommended, in some cases there may be problems)\\nWhen it is a function, use its return value.\\nWhen it is a string，ues the value of the string.For example, \\\"id\\\" is the same thing as (d) => d.id .","cn":"生成每一项key的辅助方法\\n为 true 时，以数据项本身作为key，相当于 (d => d)\\n为函数时，使用此函数返回值\\n为string时，使用这个string对应的数据值。如 \\\"id\\\"，相当于 (d => d.id)"},"type":"ObjectKey<DataItem> | ((data: DataItem, index?: number) => KeygenResult) | true"},{"name":"renderItem","tag":{"en":"render item","cn":"渲染列表"},"type":"ObjectKey<DataItem>| ((d: DataItem, index: number) => ReactNode)"},{"name":"fixed","tag":{"en":"virtualized list","cn":"是否启用虚拟列表","default":"false"},"type":"boolean"},{"name":"height","tag":{"en":"list height","cn":"列表高度"},"type":"number"},{"name":"bordered","tag":{"en":"show border","cn":"是否显示边框","default":"false"},"type":"boolean"},{"name":"lineHeight","tag":{"en":"height of item","cn":"列表项高度","default":"32"},"type":"number"},{"name":"rowsInView","tag":{"en":"Number of list items displayed at the same time","cn":"同时展示的列表项数量","default":"10"},"type":"number"},{"name":"empty","tag":{"en":"What to display when no data","cn":"无数据时展示的内容"},"type":"ReactNode"},{"name":"scrollLoading","tag":{"en":"Triggered when scrolling to the bottom","cn":"滚动到底部时触发"},"type":"() => void"},{"name":"size","tag":{"en":"size","cn":"尺寸","override":"union"},"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"loading","tag":{"en":"loading","cn":"加载中","default":"false"},"type":"ReactNode"},{"name":"footer","tag":{"en":"The content at the bottom","cn":"底部内容"},"type":"ReactNode | (() => ReactNode)"},{"name":"rowClassName","tag":{"en":"custom row className","cn":"自定义行 className"},"type":"(rowData: DataItem, index: number) => string"},{"name":"className","tag":{"en":"extend className","cn":"扩展className"},"type":"string"},{"name":"style","tag":{"en":"style object","cn":"内联样式"},"type":"CSSProperties"},{"name":"pagination","tag":{"en":"Show pagination See Pagination for details","cn":"展示分页 详见 Pagination"},"type":"PaginationProps"}]},{"title":"List.BaseItem","properties":[{"name":"desc","tag":{"en":"describe","cn":"描述"},"type":"string"},{"name":"title","tag":{"en":"The title of the list","cn":"列表元素的标题"},"type":"string"},{"name":"className","tag":{"en":"Item className","cn":"Item 容器的className"},"type":"string"},{"name":"extra","tag":{"en":"Content area on the right side of the list","cn":"列表右侧内容"},"type":"ReactNode | ReactNode[]"},{"name":"avatar","tag":{"en":"List images","cn":"列表元素的图标"},"type":"ReactNode | (() => ReactNode)"},{"name":"content","tag":{"en":"list content","cn":"列表内容"},"type":"ReactNode | (() => ReactNode)"}]}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
