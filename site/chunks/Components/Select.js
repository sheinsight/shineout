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
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n Select 没有单独的 Option 选项，通过数据来渲染。',
      'Base \n Select generate group of options from data.'
    ),
    component: require('doc/pages/components/Select/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-01-base.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-01-base.tsx'),

  },
  {
    name: '01-cadapt',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 当文字过长时，下拉列表宽度根据内容自由展开',
      ' \n options auto adapt width'
    ),
    component: require('doc/pages/components/Select/example-01-cadapt.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-01-cadapt.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-01-cadapt.tsx'),

  },
  {
    name: '01-multiple',
    isTs: true,
    isTest: false,
    title: locate(
      '多选 \n multiple 属性为true时，为多选状态，默认为单选',
      'Multiple \n Set the multiple property to true, it is multi-selection.'
    ),
    component: require('doc/pages/components/Select/example-01-multiple.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-01-multiple.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-01-multiple.tsx'),

  },
  {
    name: '01-o-compressed',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 设置 compressed 使选中值合并展示，鼠标悬浮时将会展示所有值。',
      ' \n Set the compressed property to compress values, hover to show all values.'
    ),
    component: require('doc/pages/components/Select/example-01-o-compressed.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-01-o-compressed.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-01-o-compressed.tsx'),

  },
  {
    name: '02-format',
    isTs: true,
    isTest: false,
    title: locate(
      '数据处理 \n 设置 format 选项把数据对象格式化为指定的 value',
      'Datum \n Set format property to format the data object to the specified value.'
    ),
    component: require('doc/pages/components/Select/example-02-format.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-02-format.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-02-format.tsx'),

  },
  {
    name: '02-group',
    isTs: true,
    isTest: false,
    title: locate(
      '分组 \n 可以通过 groupBy 去将数据分组 \n 组件会通过该函数的返回值对内容进行分组, 如果返回的是空, 则默认不分组, 为了防止产生歧义, 建议有一个默认分组.',
      'GroupBy \n Grouping data by groupBy. \n The component will group the content by the return value of the function. If the return is empty, the default is not grouped. To prevent ambiguity, it is recommended to have a default grouping.'
    ),
    component: require('doc/pages/components/Select/example-02-group.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-02-group.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-02-group.tsx'),

  },
  {
    name: '04-clearable',
    isTs: true,
    isTest: false,
    title: locate(
      '可清空 \n clearable 属性为 true 时，hover 后会显示清空图标。',
      'Clearable \n Set the clearable property to true, the clear icon will be displayed on hover.'
    ),
    component: require('doc/pages/components/Select/example-04-clearable.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-04-clearable.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-04-clearable.tsx'),

  },
  {
    name: '04-size',
    isTs: true,
    isTest: false,
    title: locate(
      '大小 \n 有三种 size，[\'small\', default, \'large\']',
      'Size \n There are three sizes, [\'small\', default, \'large\']'
    ),
    component: require('doc/pages/components/Select/example-04-size.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-04-size.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-04-size.tsx'),

  },
  {
    name: '06-bigdata',
    isTs: true,
    isTest: false,
    title: locate(
      '性能 \n Select 内部使用了虚拟列表来优化性能，本例加载了10000条数据。',
      'Performance \n Select uses a lazy loading to optimize performance. This example loads 10,000 pieces of data.'
    ),
    component: require('doc/pages/components/Select/example-06-bigdata.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-06-bigdata.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-06-bigdata.tsx'),

  },
  {
    name: '07-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n 设置 disabled 禁用组件',
      'Disabled \n Set the disabled property to disable the component.'
    ),
    component: require('doc/pages/components/Select/example-07-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-07-disabled.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-07-disabled.tsx'),

  },
  {
    name: '08-filter',
    isTs: true,
    isTest: false,
    title: locate(
      '筛选数据 - 内置 \n onFilter 返回函数时，使用这个函数做前端过滤',
      'Filter - built-in \n When the onFilter property returns a function, use this function to do front-end filtering.'
    ),
    component: require('doc/pages/components/Select/example-08-filter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-08-filter.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-08-filter.tsx'),

  },
  {
    name: '09-filter',
    isTs: true,
    isTest: false,
    title: locate(
      '筛选数据 - 服务端 \n onFilter 函数不返回结果时，从服务端筛选数据或自行处理',
      'Filter - server \n When the onFilter property don\'t return a function, you can filter data from server or filter by yourself.'
    ),
    component: require('doc/pages/components/Select/example-09-filter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-09-filter.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-09-filter.tsx'),

  },
  {
    name: '10-filter',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 示例：服务端过滤多选',
      ' \n Example: Server-side filters multiple selection.'
    ),
    component: require('doc/pages/components/Select/example-10-filter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-10-filter.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-10-filter.tsx'),

  },
  {
    name: '11-create',
    isTs: true,
    isTest: false,
    title: locate(
      '创建选项 \n 设置 onCreate 属性可以通过输入创建选项',
      'Create by input \n Set the onCreate property can create options by inputting.'
    ),
    component: require('doc/pages/components/Select/example-11-create.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-11-create.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-11-create.tsx'),

  },
  {
    name: '12-create',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 示例：创建选项和 filter 配合使用',
      ' \n Example: Create options with filter'
    ),
    component: require('doc/pages/components/Select/example-12-create.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-12-create.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-12-create.tsx'),

  },
  {
    name: '13-absolute',
    isTs: true,
    isTest: false,
    title: locate(
      '绝对定位 \n 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。（非必要情况下不建议）',
      'Absolute \n If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer. (not recommended if not necessary)'
    ),
    component: require('doc/pages/components/Select/example-13-absolute.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-13-absolute.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-13-absolute.tsx'),

  },
  {
    name: '14-columns-default',
    isTs: true,
    isTest: false,
    title: locate(
      '多列选项 \n 设置 columns 属性，选项变为多列展示，设置 columnWidth 指定每一列宽度',
      'Columns \n Set columns property over 1, options will display in multiple columns.'
    ),
    component: require('doc/pages/components/Select/example-14-columns-default.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-14-columns-default.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-14-columns-default.tsx'),

  },
  {
    name: '14-columns-stack',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n columns 为 -1 时选项会堆叠展示， columnWidth 为选项框的宽度',
      ' \n Set columns -1, options will display end by end， columnsWidth is the width of the option box'
    ),
    component: require('doc/pages/components/Select/example-14-columns-stack.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-14-columns-stack.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-14-columns-stack.tsx'),

  },
  {
    name: '15-treeData',
    isTs: true,
    isTest: false,
    title: locate(
      '树形选择 \n 通过设置 treeData 来实现树形选择。',
      'Tree Select \n Set treeData to select with tree.'
    ),
    component: require('doc/pages/components/Select/example-15-treeData.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-15-treeData.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-15-treeData.tsx'),

  },
  {
    name: '16-onFilter',
    isTs: true,
    isTest: false,
    title: locate(
      '树形选择 - 筛选数据 \n 通过设置 onFilter 来筛选树形数据。',
      'Tree Select Filter \n Set onFilter to filter tree data.'
    ),
    component: require('doc/pages/components/Select/example-16-onFilter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-16-onFilter.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-16-onFilter.tsx'),

  },
  {
    name: '16-z-advanced-filter',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 使用 onAdvancedFilter 属性开启高级筛选，可针对当前层级在筛选结果和原始数据间切换',
      ' \n In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button'
    ),
    component: require('doc/pages/components/Select/example-16-z-advanced-filter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-16-z-advanced-filter.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-16-z-advanced-filter.tsx'),

  },
  {
    name: '17-result',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义结果 \n 使用 renderResult 去自定义选中的结果。',
      'result \n use renderRsult. to format the result'
    ),
    component: require('doc/pages/components/Select/example-17-result.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-17-result.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-17-result.tsx'),

  },
  {
    name: '18-innertitle',
    isTs: true,
    isTest: false,
    title: locate(
      '内嵌标题 \n 使用 innerTitle 展示内嵌标题',
      'inner title \n use innerTitle to display the inner title'
    ),
    component: require('doc/pages/components/Select/example-18-innertitle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-18-innertitle.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-18-innertitle.tsx'),

  },
  {
    name: '19-loading',
    isTs: true,
    isTest: false,
    title: locate(
      '加载中 \n 数据加载中，为true时会展示一个默认的[Spin](/components/Spin)组件，可以传入一个自定义的Spin代替',
      'Loading \n When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.'
    ),
    component: require('doc/pages/components/Select/example-19-loading.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-19-loading.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-19-loading.tsx'),

  },
  {
    name: '20-renderOptionList',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义渲染下拉列表 \n 使用 renderOptionList 来自定义渲染下拉列表',
      'custom render dropdown \n Use the renderOptionList property to customize the render dropdown list'
    ),
    component: require('doc/pages/components/Select/example-20-renderOptionList.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-20-renderOptionList.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/example-20-renderOptionList.tsx'),

  },
  {
    name: 'test-001-maxlength',
    isTs: true,
    isTest: true,
    title: locate(
      '筛选限制字符长度 \n maxLength',
      '筛选限制字符长度 \n maxLength'
    ),
    component: require('doc/pages/components/Select/test-001-maxlength.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/test-001-maxlength.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/test-001-maxlength.tsx'),

  },
  {
    name: 'test-002-header',
    isTs: true,
    isTest: true,
    title: locate(
      '自定义 header \n header',
      '自定义 header \n header'
    ),
    component: require('doc/pages/components/Select/test-002-header.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/test-002-header.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/test-002-header.tsx'),

  },
  {
    name: 'test-003-hideCreateOption',
    isTs: true,
    isTest: true,
    title: locate(
      'hideCreateOption \n 创建选项不展示option',
      'hideCreateOption \n 创建选项不展示option'
    ),
    component: require('doc/pages/components/Select/test-003-hideCreateOption.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/test-003-hideCreateOption.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/test-003-hideCreateOption.tsx'),

  },
  {
    name: 'test-004-blurAndSubmit',
    isTs: true,
    isTest: true,
    title: locate(
      '创建选项 blur 后点击回调搜索 \n 修复blur 后延迟导致 onSubmit 的数据不对的问题',
      ''
    ),
    component: require('doc/pages/components/Select/test-004-blurAndSubmit.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/test-004-blurAndSubmit.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/test-004-blurAndSubmit.tsx'),

  },
  {
    name: 'test-005-unmount',
    isTs: true,
    isTest: true,
    title: locate(
      '组件挂载时检查容器是否存在 \n 检查容器存活，如果不存在容器，则重新创建容器',
      ' \n '
    ),
    component: require('doc/pages/components/Select/test-005-unmount.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/test-005-unmount.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/test-005-unmount.tsx'),

  },
  {
    name: 'test-006-open',
    isTs: true,
    isTest: true,
    title: locate(
      '控制弹层（受控） \n Select 通过 open 控制弹层的显示和隐藏',
      'Dropdown list controlled by open property \n The dropdown list of Select controlled by open property'
    ),
    component: require('doc/pages/components/Select/test-006-open.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Select/test-006-open.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Select/test-006-open.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Select","properties":[{"name":"onCollapse","tag":{"cn":"下拉列表展开/收起回调","en":"option list collapse callback","default":"","version":""},"required":false,"type":"((collapse: boolean) => void) "},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"placeholder","tag":{"cn":"默认占位内容 placeholder","en":"select default content","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"disabled","tag":{"cn":"如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项","en":"When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.","default":"false","version":""},"required":false,"type":"boolean | ((data: DataItem) => boolean) "},{"name":"value","tag":{"cn":"在 Form 中，value 会被表单接管，value 无效","en":"In the Form, the value will be taken over by the form and the value will be invalid.","default":"","version":""},"required":false,"type":"any"},{"name":"onChange","tag":{"cn":"值改变回调","en":"change callback","default":"","version":""},"required":false,"type":"(value: Value, data?: DataItem , checked?: boolean ) => void"},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((e?: Error ) => void) "},{"name":"popover","tag":{"cn":"校验信息弹出位置，参考 [Popover](/components/Popover)","en":"The position where the validation info pop up, see [Popover](/components/Popover)","default":"","version":""},"required":false,"type":"PopoverProps[\\\"position\\\"]"},{"name":"filterSameChange","tag":{"cn":"过滤掉相同值的回调","en":"filter out value change callbacks with the same value","default":"false","version":""},"required":false,"type":"boolean "},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "},{"name":"defaultValue","tag":{"cn":"默认值 通过 Value 类型","en":"Initial value","default":"","version":""},"required":false,"type":"Value "},{"name":"reserveAble","tag":{"cn":"设置为 true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段, 配合 Form 使用","en":"Form field, used with Form","default":"","version":""},"required":false,"type":"string "},{"name":"size","tag":{"cn":"尺寸","en":"size of select","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"onFocus","tag":{"cn":"focus 回调","en":"focus callback","default":"","version":""},"required":false,"type":"(e?: any) => void"},{"name":"onBlur","tag":{"cn":"blur 回调","en":"blur callback","default":"","version":""},"required":false,"type":"(e?: any) => void"},{"name":"tip","tag":{"cn":"提示信息","en":"Prompt information","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"width","tag":{"cn":"输入框宽度","en":"input width","default":"","version":""},"required":false,"type":"string | number "},{"name":"popoverProps","tag":{"cn":"校验弹框接受的属性，具体属性参考 [Popover](/components/Popover)","en":"Vilidate popup properties, specific properties refer to [Popover](/components/Popover)","default":"","version":""},"required":false,"type":"PopoverProps "},{"name":"underline","tag":{"cn":"仅仅展示下边框","en":"show border bottom","default":"false","version":""},"required":false,"type":"boolean "},{"name":"border","tag":{"cn":"是否展示边框","en":"Whether to display border","default":"false","version":""},"required":false,"type":"boolean "},{"name":"onFilter","tag":{"cn":"onFilter 不为空时，可以输入过滤数据。onFilter 如果返回一个函数，使用这个函数做前端过滤。如果不返回，可以自行做后端过滤","en":"When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering.","default":"","version":""},"required":false,"type":"((text: string, from?: string ) => void | ((data: Item) => boolean) ) "},{"name":"childrenKey","tag":{"cn":"指定子数据的属性名","en":"specify the name of the subdata","default":"\\\"children\\\"","version":""},"required":false,"type":"ObjectKey<DataItem> "},{"name":"filterDelay","tag":{"cn":"毫秒。用户输入触发 fitler 事件的延时","en":"ms. The delay of user input triggering filter events","default":"400","version":""},"required":false,"type":"number "},{"name":"absolute","tag":{"cn":"为 true 时，选项弹出层在 DOM 中独立 render; 为函数时，返回值作为弹出层容器","en":"When it is true, the pop-up layer of option append into document.body; When it is a function, the return value is used as the popup layer container","default":"false","version":""},"required":false,"type":"boolean | (() => HTMLElement) "},{"name":"zIndex","tag":{"cn":"选项列表 z-index 值, 需要配合 absolute","en":"options z-index should use with absolute","default":"1000","version":""},"required":false,"type":"number "},{"name":"innerTitle","tag":{"cn":"内嵌标题","en":"inner title","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"renderOptionList","tag":{"cn":"自定义渲染下拉列表","en":"Custom render dropdown","default":"","version":""},"required":false,"type":"((list: ReactElement, info: { loading: boolean; }) => ReactElement) "},{"name":"renderUnmatched","tag":{"cn":"渲染未匹配值的方式","en":"the way to render not matched data value","default":"","version":""},"required":false,"type":"((data: Value extends (infer U)[] ? U : Value) => ReactNode) "},{"name":"open","tag":{"cn":"控制浮层显隐","en":"Set visible of select popup","default":"","version":""},"required":false,"type":"boolean "},{"name":"data","tag":{"cn":"筛选后是否展示命中节点的后代节点","en":"Options data","default":"","version":""},"required":false,"type":"Item[] "},{"name":"height","tag":{"cn":"高度","en":"height","default":"250","version":""},"required":false,"type":"number "},{"name":"clearable","tag":{"cn":"是否可清除值","en":"If clearable is true, show clear value icon","default":"false","version":""},"required":false,"type":"boolean "},{"name":"showArrow","tag":{"cn":"是否显示下拉箭头，仅针对单选情况","en":"show dropdown arrow, only single select","default":"true","version":""},"required":false,"type":"boolean "},{"name":"compressedBound","tag":{"cn":"开启多选后，指定允许展示标签数量，超过后将折叠","en":"when compressed is True,the comptessedBound can limit the numbers of multiple selected item\\\"s label","default":"","version":""},"required":false,"type":"number "},{"name":"loading","tag":{"cn":"数据加载中，为true时会展示一个默认的 [Spin](/components/Spin) 组件，可以传入一个自定义的Spin代替","en":"When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.","default":"false","version":""},"required":false,"type":"boolean | ReactNode"},{"name":"compressed","tag":{"cn":"将选中值合并，只在多选模式下有效; 为 \\\"no-repeat\\\" 时弹出框中不重复展示值","en":"Merges selected values, valid only in multiselect mode","default":"false","version":""},"required":false,"type":"boolean | \\\"no-repeat\\\" "},{"name":"loader","tag":{"cn":"设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点","en":"dynamically load nodes","default":"","version":""},"required":false,"type":"((key: Value extends (infer U)[] ? U : Value, data: DataItem) => void) "},{"name":"keygen","tag":{"cn":"生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 \\\"id\\\"，相当于 (d) => d.id","en":"Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, \\\"id\\\" is the same thing as (d) => d.id.","default":"index","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, index?: number) => string | number) | true"},{"name":"renderItem","tag":{"cn":"为 string 时，返回 d\\\\[string]。 为 function 时，返回函数结果","en":"When it is a string, return d\\\\[string]. When it is a function, return the result of the function.","default":"d => d","version":""},"required":false,"type":"ObjectKey<DataItem> | ((data: DataItem, index?: number ) => ReactNode) "},{"name":"renderResult","tag":{"cn":"为 选中后在结果中显示的内容，默认和 renderItem 相同","en":"The content displayed in the result after selecting, if not set, use renderItem","default":"renderItem","version":""},"required":false,"type":"((data: DataItem, index?: number ) => ReactNode) "},{"name":"position","tag":{"cn":"弹出层位置","en":"The position of the pop-up layer, options: [\\\"left\\\", \\\"top\\\", \\\"right\\\", \\\"bottom\\\"]","default":"auto","version":""},"required":false,"type":".ListPosition "},{"name":"trim","tag":{"cn":"trim 为 true 时，失去焦点时会自动删除空白字符。","en":"When trim is true, blank characters are automatically deleted when lose focus。","default":"false","version":""},"required":false,"type":"boolean "},{"name":"separator","tag":{"cn":"多选情况下设置后，value 会处理为 separator 分隔的字符串。","en":"set with multiple, value will separator by this","default":"","version":""},"required":false,"type":"string "},{"name":"prediction","tag":{"cn":"默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配","en":"By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match","default":"(val, d) => val===format(d)","version":""},"required":false,"type":"((value: Value extends (infer U)[] ? U : Value, data: DataItem) => boolean) "},{"name":"format","tag":{"cn":"格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d\\\\[format]; 为函数时，以函数返回结果作为 value。","en":"Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\\\\[format] When it is a function, use its return value.","default":"d => d","version":""},"required":false,"type":"ObjectKey<DataItem> | ((data: DataItem) => Value extends (infer U)[] ? U : Value) "},{"name":"maxLength","tag":{"cn":"Select 输入框输入字符串最大长度","en":"The maximum length of the input string in the Select input box","default":"","version":""},"required":false,"type":"number "},{"name":"lineHeight","tag":{"cn":"选项高度。列表项使用虚拟列表渲染，当选项高度改变时，应该通过 lineHeight 来指定正确高度","en":"Option height. List items are rendered using virtual lists, and when the option height changes, the correct height should be specified via lineHeight","default":"34","version":""},"required":false,"type":"number "},{"name":"onAdvancedFilter","tag":{"cn":"使用 onAdvancedFilter 属性开启高级筛选，可针对当前层级在筛选结果和原始数据间切换","en":"Use the onAdvancedFilter property to enable filtering to switch between filtering results and raw data for the current hierarchy.","default":"","version":""},"required":false,"type":"((text: string) => void | ((data: Item) => boolean)) "},{"name":"onExpand","tag":{"cn":"节点展开回调，参数为当前展开节点 key 数组","en":"expand event","default":"","version":""},"required":false,"type":"((value: (string | number)[]) => void) "},{"name":"expanded","tag":{"cn":"展开的节点 key （受控）","en":"expanded node","default":"","version":""},"required":false,"type":"(string | number)[] "},{"name":"defaultExpanded","tag":{"cn":"默认展开的节点 key（非受控）","en":"default expanded nodes","default":"","version":""},"required":false,"type":"(string | number)[] "},{"name":"defaultExpandAll","tag":{"cn":"默认展开全部子节点, 仅树形数据下有效","en":"expand all node, only in can be use in treeData","default":"false","version":""},"required":false,"type":"boolean "},{"name":"columns","tag":{"cn":"columns 大于 1 时，选项展示为多列布局模式","en":"Option columns.","default":"1","version":""},"required":false,"type":"number "},{"name":"treeData","tag":{"cn":"树形结构数据项，[{children: []}]","en":"tree select data，[{children: []}]","default":"","version":""},"required":false,"type":"object[]"},{"name":"itemsInView","tag":{"cn":"单次 render 的最大行数。Select 采用了lazy render 的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了 10 条，可以调整 itemsInView","en":"The maximum number of rows for a single render. Select uses lazy render to optimize performance under large amounts of data. If your table displays more than 10 rows, you can change the value of itemsInView.","default":"10","version":""},"required":false,"type":"number "},{"name":"multiple","tag":{"cn":"是否是多选","en":"if it is true, it will be multiple selection","default":"false","version":""},"required":false,"type":"boolean "},{"name":"onCreate","tag":{"cn":"如果设置了 onCreate 事件，组件为可输入状态。onCreate 为函数时，将此函数返回值作为新的选项拆入最上方。onCreate 为 true 时，使用默认函数 text => text","en":"If the onCreate event is set, the component is inputable. When onCreate is a function, the return value of this function is diaplay at the top as a new option. When onCreate is true, use the built-in functuon text => text.","default":"","version":""},"required":false,"type":"boolean | ((input: string | DataItem) => string | DataItem) "},{"name":"autoAdapt","tag":{"cn":"下拉列表宽度根据内容自由展开","en":"option list is auto adapt","default":"false","version":""},"required":false,"type":"boolean "},{"name":"filterSingleSelect","tag":{"cn":"当筛选数据仅为一条时，失焦后直接选中该条数据。仅在 Filter 下有效。","en":"blur to select the data when filter data has only single. only work in filter.","default":"false","version":""},"required":false,"type":"boolean "},{"name":"emptyAfterSelect","tag":{"cn":"选中后是否清空输入框内容","en":"empty input after select value","default":"false","version":""},"required":false,"type":"boolean "},{"name":"focusSelected","tag":{"cn":"onCreate 或 onFilter 在单选情况下单击值后是否选中值","en":"selected value while click under onCreate or onFilter","default":"true","version":""},"required":false,"type":"boolean "},{"name":"compressedClassName","tag":{"cn":"多选合并展示弹出框的类名","en":"compressed popover classname","default":"","version":""},"required":false,"type":"string "},{"name":"resultClassName","tag":{"cn":"选中结果内容容器的className","en":"The className of the selected result content container","default":"","version":""},"required":false,"type":"string | ((value: DataItem) => string) "},{"name":"reFocus","tag":{"cn":"存在 onFilter 和 onCreate，选中 Option，自动 focus Input","en":"There are onFilter and onCreate, select Option, automatically focus Input","default":"false","version":""},"required":false,"type":"boolean "},{"name":"header","tag":{"cn":"自定义渲染 Option List Header","en":"Custom render option list header","default":"","version":""},"required":false,"type":"ReactElement "},{"name":"convertBr","tag":{"cn":"用来转化粘贴文本中的换行","en":"Used to convert line breaks in pasted text","default":"\\\",\\\"","version":""},"required":false,"type":"string | ((text: string) => string) "},{"name":"onEnterExpand","tag":{"cn":"回车触发下拉框展开的时候调用","en":"expand option list while enter press","default":"","version":""},"required":false,"type":"((e: KeyboardEvent<HTMLDivElement>) => boolean) "},{"name":"hideCreateOption","tag":{"cn":"在使用创建选项时，在选项列表中隐藏该选项，回车后直接选中","en":"hide the creat option while set onCreate","default":"false","version":""},"required":false,"type":"boolean "},{"name":"optionWidth","tag":{"cn":"下拉列表宽度","en":"width of option list","default":"100%","version":""},"required":false,"type":"number "},{"name":"columnWidth","tag":{"cn":"columns 大于 1 时，选项展示为多列布局模式","en":"Option column width, only effective when columns > 1","default":"160","version":""},"required":false,"type":"number "},{"name":"groupBy","tag":{"cn":"分组","en":"group by","default":"","version":""},"required":false,"type":"((record: DataItem, index: number, data: DataItem[]) => string) "},{"name":"columnsTitle","tag":{"cn":"多列选项多选时的标题文字","en":"title of columns multiple select","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"emptyText","tag":{"cn":"自定义 empty 文案","en":"custom empty copy","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"showHitDescendants","tag":{"cn":"筛选后是否展示命中节点的后代节点","en":"Whether to show the descendant nodes of the hit node after filtering","default":"false","version":""},"required":false,"type":"boolean "},{"name":"noCache","tag":{"cn":"是否开启数据缓存，如果数据存在动态更新的情况建议开启","en":"data cache, if data change asynchronously, better set true","default":"false","version":""},"required":false,"type":"boolean "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
