import loadable from 'docs/Loadable'
import Page from '../Page'

const pages = [
  {
    name: 'Get Start',
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

  'Layout',

  {
    name: 'Sticky',
    cn: '附着',
    level: 2,
    component: loadable(() => import('./Sticky')),
  },

  'Feedback',

  {
    name: 'Alert',
    cn: '提示框',
    level: 2,
    component: loadable(() => import('./Alert')),
  },
]

export default Page(pages)
