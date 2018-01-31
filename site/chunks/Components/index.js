/**
 * 此文件根据 scripts/components.tpl 生成，不要手动修改
 */
import loadable from 'docs/Loadable'
import Page from 'doc/pages/Page'

const pages = [
  {
    name: 'GetStart',
    cn: '',
    level: 1,
    component: loadable(() => import('./GetStart')),
  },
  
  'General',
  
  {
    name: 'Button',
    cn: '按钮',
    level: 2,
    component: loadable(() => import('./Button')),
  },
  
  {
    name: 'Dropdown',
    cn: '下拉',
    level: 2,
    component: loadable(() => import('./Dropdown')),
  },
  
  'Form',
  
  'Feedback',
  
  {
    name: 'Alert',
    cn: '提示框',
    level: 2,
    component: loadable(() => import('./Alert')),
  },
  
  {
    name: 'Message',
    cn: '消息提示',
    level: 2,
    component: loadable(() => import('./Message')),
  },
  
  'Layout',
  
  {
    name: 'Sticky',
    cn: '附着',
    level: 2,
    component: loadable(() => import('./Sticky')),
  },
    
]

export default Page(pages)
