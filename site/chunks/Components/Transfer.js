/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Transfer/cn.md'
import en from 'doc/pages/components/Transfer/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基本的使用',
      'Base \n Basic usage'
    ),
    component: require('doc/pages/components/Transfer/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-1-base.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Transfer/example-1-base.tsx'),

  },
  {
    name: '2-controlled',
    isTs: true,
    isTest: false,
    title: locate(
      '受控 \n 组件受控',
      'Controlled \n Component controlled'
    ),
    component: require('doc/pages/components/Transfer/example-2-controlled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-2-controlled.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Transfer/example-2-controlled.tsx'),

  },
  {
    name: '3-customTitle',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义 \n 可以自定义标题, 按钮, 底部, 样式等属性',
      'Customize \n Customizable title, button, bottom properties'
    ),
    component: require('doc/pages/components/Transfer/example-3-customTitle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-3-customTitle.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Transfer/example-3-customTitle.tsx'),

  },
  {
    name: '4-selected',
    isTs: true,
    isTest: false,
    title: locate(
      '受控选中 \n 可以通过 selectedKeys 和 onSelectChange 去控制哪些列表项被选中 \n <b>注: 勾选的值均使用的是 keygen 的结果</b>',
      'Controlled selected \n Can control which elements are selected by selectedKeys and onSelectChange'
    ),
    component: require('doc/pages/components/Transfer/example-4-selected.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-4-selected.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Transfer/example-4-selected.tsx'),

  },
  {
    name: '5-filter',
    isTs: true,
    isTest: false,
    title: locate(
      '筛选 \n 可以通过设置 onFilter 去筛选列表项',
      'Filter \n Can filter list items by setting onFilter'
    ),
    component: require('doc/pages/components/Transfer/example-5-filter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-5-filter.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Transfer/example-5-filter.tsx'),

  },
  {
    name: '6-loading',
    isTs: true,
    isTest: false,
    title: locate(
      '加载中 \n 穿梭框的加载中',
      'Loading \n Loading'
    ),
    component: require('doc/pages/components/Transfer/example-6-loading.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-6-loading.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Transfer/example-6-loading.tsx'),

  },
  {
    name: '6-mloading',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 可以通过给 loading 设置数组的方式, 给两边设置一个不同的loading',
      ' \n You can set an array for loading and set an unused loading for both sides'
    ),
    component: require('doc/pages/components/Transfer/example-6-mloading.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-6-mloading.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Transfer/example-6-mloading.tsx'),

  },
  {
    name: '7-bigdata',
    isTs: true,
    isTest: false,
    title: locate(
      '性能 \n Transfer 内部使用了虚拟列表来优化性能，本例加载了10000条数据',
      ' \n Transfer uses a lazy loading to optimize performance. This example loads 10,000 pieces of data.'
    ),
    component: require('doc/pages/components/Transfer/example-7-bigdata.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-7-bigdata.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Transfer/example-7-bigdata.tsx'),

  },
  {
    name: '8-renderFilter',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义过滤渲染 \n 自定义渲染过滤框区域内容',
      'RenderFilter \n Custom render filter'
    ),
    component: require('doc/pages/components/Transfer/example-8-renderFilter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-8-renderFilter.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Transfer/example-8-renderFilter.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Transfer","properties":[{"name":"children","tag":{"cn":"自定义渲染内容","en":"custom render content","default":"","version":""},"required":false,"type":"((props: { onSelected: (keys: string | number) => void; direction: \\\"left\\\" | \\\"right\\\"; selectedKeys: (string | number)[]; value: Value; filterText: string; }) => ReactNode) "},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"disabled","tag":{"cn":"如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项","en":"When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.","default":"","version":""},"required":false,"type":"boolean | ((data: DataItem) => boolean) "},{"name":"value","tag":{"cn":"显示在右侧框数据的值集合","en":"The set of values displayed in the box data on the right","default":"","version":""},"required":false,"type":"any[]"},{"name":"onChange","tag":{"cn":"参数为当前选中值","en":"Parameter is the selected value","default":"","version":""},"required":false,"type":"((value: Value, data?: DataItem , checked?: boolean ) => void) "},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((e?: Error ) => void) "},{"name":"filterSameChange","tag":{"cn":"当两次选择的值相同时不触发 onChange","en":"onChange is not triggered when two selected values are the same","default":"false","version":""},"required":false,"type":"boolean "},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "},{"name":"defaultValue","tag":{"cn":"默认值  和 value 类型相同","en":"defaultValue 和 value 类型相同","default":"","version":""},"required":false,"type":"Value "},{"name":"reserveAble","tag":{"cn":"设置为 true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段, 配合 Form 使用","en":"Form field, used with Form","default":"","version":""},"required":false,"type":"string "},{"name":"onFilter","tag":{"cn":"筛选函数, 参数为: 输入文本, 数据, 是否为左侧数据","en":"filter data","default":"","version":""},"required":false,"type":"((text: string, data: DataItem, isSource: boolean) => boolean) "},{"name":"data","tag":{"cn":"数据源","en":"data source","default":"","version":""},"required":true,"type":"DataItem[]"},{"name":"loading","tag":{"cn":"加载中, 如果需要两侧加载中状态不一致, 需要传入数组","en":"loading","default":"","version":""},"required":false,"type":"boolean | [boolean, boolean] "},{"name":"keygen","tag":{"cn":"生成每一项key的辅助方法\\n为 true 时，以数据项本身作为key，相当于 (d => d)\\n为函数时，使用此函数返回值\\n为string时，使用这个string对应的数据值。如 \\\"id\\\"，相当于 (d => d.id)","en":"Generate a auxiliary method for each key\\nIf not filled, index will be used(not recommended,there may be problems with more than 10 data)\\nWhen it is a function, use its return value.\\nWhen it is a string，ues the value of the string.For example, \\\"id\\\" is the same thing as (d) => d.id.","default":"","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, index?: number) => string | number) | true"},{"name":"renderItem","tag":{"cn":"为 string 时，返回 d\\\\[string]\\n为 function 时，返回函数结果","en":"When it is a string, return d\\\\[string]\\nWhen it is a function, return the result of the function","default":"d => d","version":""},"required":false,"type":"ObjectKey<DataItem> | ((data: DataItem) => ReactNode) "},{"name":"prediction","tag":{"cn":"默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配","en":"By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match","default":"(val, d) => val===format(d)","version":""},"required":false,"type":"((value: Value extends (infer U)[] ? U : Value, data: DataItem) => boolean) "},{"name":"format","tag":{"cn":"格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d\\\\[format]; 为函数时，以函数返回结果作为 value。","en":"Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\\\\[format] When it is a function, use its return value.","default":"d => d","version":""},"required":false,"type":"ObjectKey<DataItem> | ((data: DataItem) => Value extends (infer U)[] ? U : Value) "},{"name":"empty","tag":{"cn":"无内容的展示","en":"ContentLess display","default":"getLocale(\\\"no data\\\")","version":""},"required":false,"type":"ReactNode"},{"name":"lineHeight","tag":{"cn":"列表行高","en":"line height of list","default":"32","version":""},"required":false,"type":"number "},{"name":"rowsInView","tag":{"cn":"一次加载的数据条数","en":"number of data loaded at one time","default":"20","version":""},"required":false,"type":"number "},{"name":"itemClass","tag":{"cn":"选项 className","en":"item className","default":"","version":""},"required":false,"type":"string "},{"name":"titles","tag":{"cn":"两侧的标题, 顺序是从左到右","en":"Title on both sides, order from left to right","default":"","version":""},"required":false,"type":"[ReactNode , ReactNode ] "},{"name":"footers","tag":{"cn":"底部元素, 顺序是从左到右","en":"Bottom element, order from left to right","default":"","version":""},"required":false,"type":"[ReactNode , ReactNode ] "},{"name":"operations","tag":{"cn":"操作元素, 顺序是从上到下","en":"Operational elements, the order is from top to bottom","default":"","version":""},"required":false,"type":"[ReactNode , ReactNode ] "},{"name":"operationIcon","tag":{"cn":"是否显示操作按钮的图标","en":"Whether to display the icon of the action button","default":"true","version":""},"required":false,"type":"boolean "},{"name":"listClassName","tag":{"cn":"列表扩展的 class","en":"List extended class","default":"","version":""},"required":false,"type":"string "},{"name":"listStyle","tag":{"cn":"列表扩展的样式","en":"List extension style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"selectedKeys","tag":{"cn":"被勾选的列表, 勾选的值均使用的是 keygen 的结果","en":"checked lists","default":"","version":""},"required":false,"type":"(string | number)[] "},{"name":"defaultSelectedKeys","tag":{"cn":"默认被勾选的列表","en":"checked by default","default":"","version":""},"required":false,"type":"(string | number)[] "},{"name":"onSelectChange","tag":{"cn":"勾选触发的方法","en":"select event","default":"","version":""},"required":false,"type":"((sourceKeys: (string | number)[], targetKeys: (string | number)[]) => void) "},{"name":"onSearch","tag":{"cn":"输入框值变化的回调, 参数为: 输入文本, 是否为左侧数据","en":"search event","default":"","version":""},"required":false,"type":"((text: string, isSource: boolean) => void) "},{"name":"listHeight","tag":{"cn":"列表高度","en":"list height","default":"180","version":""},"required":false,"type":"number "},{"name":"renderFilter","tag":{"cn":"自定义过滤器渲染。自定义过滤器渲染","en":"custom render filter","default":"","version":""},"required":false,"type":"((value: {  value: string  disabled: boolean  onFilter?: (value: string) => void  placeholder?: string  isSource: boolean}) => ReactNode) "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
