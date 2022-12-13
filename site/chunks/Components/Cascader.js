/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Cascader/cn.md'
import en from 'doc/pages/components/Cascader/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基础的级联用法',
      'Base \n Basic usage of Cascader'
    ),
    component: require('doc/pages/components/Cascader/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-01-base.tsx'),

  },
  {
    name: '02-multiple',
    isTs: true,
    isTest: false,
    title: locate(
      '多选 \n 设置 mode 属性，使组件变为多选，mode 可选值如下 \n 0: 只返回完全选中的节点，包含父节点 \n 1: 返回全部选中的节点和半选中的父节点 \n 2: 只返回选中的子节点 \n 3: 如果父节点选中，只返回父节点',
      'Multiple \n Set the mode property change the component to multiple select \n 0: Return only the fully selected node, including the parent node. \n 1: Return the fully selected nodes and semi-selected parent nodes. \n 2: Return only the selected child node. \n 3: Return only the parent node, if the parent node is selected.'
    ),
    component: require('doc/pages/components/Cascader/example-02-multiple.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-02-multiple.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-02-multiple.tsx'),

  },
  {
    name: '03-hover',
    isTs: true,
    isTest: false,
    title: locate(
      '移入展开 \n 设置 expandTrigger 为 \'hover\' 或 \'hover-only\', 可以在鼠标移入节点时展开，默认为 \'click\' \n 如果值为 \'hover-only\'，父节点只能 hover 触发展开, 只有子节点可以点击选择值',
      'Hover \n Set expandTrigger to \'hover\' or \'hover-only\', expand the node when mouse hover, default value is \'click\'.'
    ),
    component: require('doc/pages/components/Cascader/example-03-hover.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-03-hover.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-03-hover.tsx'),

  },
  {
    name: '04-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n disabled 为函数时，根据返回结果禁用节点，同时禁用子节点 \n disabled 为 true 时，禁用全部节点',
      'disabled \n When the disabled property is a function, disable the node and its child nodes according to the returned result. \n When the disabled property is true, disable all nodes.'
    ),
    component: require('doc/pages/components/Cascader/example-04-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-04-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-04-disabled.tsx'),

  },
  {
    name: '05-lazyload',
    isTs: true,
    isTest: false,
    title: locate(
      '动态加载 \n 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数 \n 注意，在开启动态加载功能后，mode 属性仅支持 3 或 4 模式。',
      'Lazy load \n Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded. \n In addition, with lazyload enabled, the mode attribute only supports mode 3 or 4.'
    ),
    component: require('doc/pages/components/Cascader/example-05-lazyload.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-05-lazyload.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-05-lazyload.tsx'),

  },
  {
    name: '06-filter',
    isTs: true,
    isTest: false,
    title: locate(
      '筛选数据 \n onFilter 可用于数据过滤，不返回结果时，可实现服务端过滤；返回函数时，用于前端过滤。 \n 单选状态下筛选结果以列表展示，多选状态任保持树状结构展示。',
      'Filter \n onFilter can be used for data filtering, for server-side filtering when no results are returned, and for front-end filtering when a function is returned. \n Support in single selection state'
    ),
    component: require('doc/pages/components/Cascader/example-06-filter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-06-filter.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-06-filter.tsx'),

  },
  {
    name: '07-filter-widematch',
    isTs: true,
    isTest: false,
    title: locate(
      '宽泛筛选 \n 开启 wideMatch 后，将筛选出所有可能的匹配项目 \n ',
      'wideMatch \n Allows all possible matching options to be choosed \n '
    ),
    component: require('doc/pages/components/Cascader/example-07-filter-widematch.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-07-filter-widematch.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-07-filter-widematch.tsx'),

  },
  {
    name: '07-innertitle',
    isTs: true,
    isTest: false,
    title: locate(
      '内嵌标题 \n 使用 innerTitle 展示内嵌标题',
      'InnerTitle \n use innerTitle to display the inner title'
    ),
    component: require('doc/pages/components/Cascader/example-07-innertitle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-07-innertitle.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-07-innertitle.tsx'),

  },
  {
    name: 'test-001-compressed',
    isTs: true,
    isTest: true,
    title: locate(
      '超长合并选项 \n 设置 compressed 属性，当选项超长的时候会合并选项',
      'Extra long merge option \n Set the compressed attribute, when the option is too long, the option will be merged'
    ),
    component: require('doc/pages/components/Cascader/test-001-compressed.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/test-001-compressed.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/test-001-compressed.tsx'),

  },
  {
    name: 'test-002-expandtrigger-finaldismiss',
    isTs: true,
    isTest: true,
    title: locate(
      'expandTrigger 和 finalDismiss 示例',
      'Hover'
    ),
    component: require('doc/pages/components/Cascader/test-002-expandtrigger-finaldismiss.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/test-002-expandtrigger-finaldismiss.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/test-002-expandtrigger-finaldismiss.tsx'),

  },
  {
    name: 'test-003-open',
    isTs: true,
    isTest: true,
    title: locate(
      '控制浮层显隐 \n open 控制浮层显隐',
      'Base \n open set visible of cascader popup'
    ),
    component: require('doc/pages/components/Cascader/test-003-open.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/test-003-open.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/test-003-open.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
