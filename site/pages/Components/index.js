import loadable from 'docs/Loadable'
import Page from '../Page'

const pages = [
  {
    name: 'Get Start',
    component: loadable(() => import('./GetStart')),
  },

  'LAYOUT',

  {
    name: 'Sticky',
    cn: '附着',
    level: 2,
    component: loadable(() => import('./Sticky')),
  },

  'FEEDBACK',

  {
    name: 'Alert',
    cn: '提示框',
    level: 2,
    component: loadable(() => import('./Alert')),
  },
]

export default Page(pages)
