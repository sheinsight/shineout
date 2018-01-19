import loadable from 'docs/Loadable'
import Page from '../Page'

const pages = [
  {
    name: 'Get Start',
    component: loadable(import('./GetStart')),
  },
  {
    name: 'Sticky',
    cn: '附着',
    component: loadable(import('./Sticky')),
  },
]

export default Page(pages)
