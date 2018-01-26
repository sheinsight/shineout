/**
 * 此文件根据 scripts/components.tpl 生成，不要手动修改
 */
import markdown from 'docs/Navable/markdown'
import locate from 'doc/locate'
import Page from '../Page'


const loaderGetStart = locate(
  () => import('./GetStart/cn.md'),
  () => import('./GetStart/en.md'),
)

const loaderButton = locate(
  () => import('./Button/cn.md'),
  () => import('./Button/en.md'),
)

const loaderDropdown = locate(
  () => import('./Dropdown/cn.md'),
  () => import('./Dropdown/en.md'),
)

const loaderAlert = locate(
  () => import('./Alert/cn.md'),
  () => import('./Alert/en.md'),
)

const loaderSticky = locate(
  () => import('./Sticky/cn.md'),
  () => import('./Sticky/en.md'),
)


const pages = [
  {
    name: 'GetStart',
    cn: '',
    level: 1,
    component: markdown(loaderGetStart, [
      
    ]),
  },
  
  'General',
  
  {
    name: 'Button',
    cn: '按钮',
    level: 2,
    component: markdown(loaderButton, [
      {
        title: locate('类型 type', 'Type'),
        component: require('./Button/example-1-type.js').default,
        rawText: require('!raw-loader!./Button/example-1-type.js'),
      },
      
    ]),
  },
  
  {
    name: 'Dropdown',
    cn: '下拉',
    level: 2,
    component: markdown(loaderDropdown, [
      {
        title: locate('基础', 'Base'),
        component: require('./Dropdown/example-1-base.js').default,
        rawText: require('!raw-loader!./Dropdown/example-1-base.js'),
      },
      
    ]),
  },
  
  'Form',
  
  'Feedback',
  
  {
    name: 'Alert',
    cn: '提示框',
    level: 2,
    component: markdown(loaderAlert, [
      {
        title: locate('基础', 'Base'),
        component: require('./Alert/example-1-base.js').default,
        rawText: require('!raw-loader!./Alert/example-1-base.js'),
      },
      {
        title: locate('类型 type', 'type'),
        component: require('./Alert/example-2-type.js').default,
        rawText: require('!raw-loader!./Alert/example-2-type.js'),
      },
      {
        title: locate('关闭 onClose', 'onClose'),
        component: require('./Alert/example-3-close.js').default,
        rawText: require('!raw-loader!./Alert/example-3-close.js'),
      },
      {
        title: locate('图标 icon', 'with icon'),
        component: require('./Alert/example-4-icon.js').default,
        rawText: require('!raw-loader!./Alert/example-4-icon.js'),
      },
      
    ]),
  },
  
  'Layout',
  
  {
    name: 'Sticky',
    cn: '附着',
    level: 2,
    component: markdown(loaderSticky, [
      {
        title: locate('附着在顶部 20px', 'Sticky 20px to top'),
        component: require('./Sticky/example-1-top.js').default,
        rawText: require('!raw-loader!./Sticky/example-1-top.js'),
      },
      {
        title: locate('附着在元素内', 'Sticky to element'),
        component: require('./Sticky/example-2-element.js').default,
        rawText: require('!raw-loader!./Sticky/example-2-element.js'),
      },
      {
        title: locate('附着在底部', 'Sticky to bottom'),
        component: require('./Sticky/example-3-bottom.js').default,
        rawText: require('!raw-loader!./Sticky/example-3-bottom.js'),
      },
      
    ]),
  },
    
]

export default Page(pages)
