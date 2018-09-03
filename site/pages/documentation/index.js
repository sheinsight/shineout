import { createMarkDown } from 'docs/MarkDown'
import Page from '../Page'

const versions = ['1.x.x']

const pages = [
  'API',

  {
    name: 'Props',
    cn: '约定',
    level: 2,
    component: createMarkDown(() => import('./api-props.md')),
  },

  {
    name: 'Classname',
    level: 2,
    component: createMarkDown(() => import('./api-classname.md')),
  },

  'CHANGELOG',

  ...versions.map(v => ({
    name: v,
    level: 2,
    component: createMarkDown(() => import(`./changelog/${v}.md`)),
  })),
]

export default Page(pages)
