import { createMarkDown } from 'docs/MarkDown'
import Page from '../Page'

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

  {
    name: 'ChangeLog',
    cn: '日志',
    component: createMarkDown(() => import('./changelog.md')),
  },
]

export default Page(pages)
