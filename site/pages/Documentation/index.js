import { createMarkDown } from 'docs/MarkDown'
import Page from '../Page'

const pages = [
  {
    name: 'Api',
    component: createMarkDown(() => import('./api.md')),
  },
  {
    name: 'ChangeLog',
    cn: '日志',
    component: createMarkDown(() => import('./changelog.md')),
  },
]

export default Page(pages)
