import { createMarkDown } from 'docs/MarkDown'
import Page from '../Page'

const versions = ['1.x.x']
const rcVersion = process.env.LOG_ENV === 'rc' ? versions : []

const pages = [
  'API',

  {
    name: 'Props',
    cn: '约定',
    level: 2,
    component: createMarkDown(() => import(/* webpackChunkName: 'api.props' */ './api-props.md'), true),
  },

  {
    name: 'Classname',
    level: 2,
    component: createMarkDown(() => import(/* webpackChunkName: 'api.classname' */ './api-classname.md'), true),
  },

  'CHANGELOG',

  ...versions.map(v => ({
    name: v,
    level: 2,
    component: createMarkDown(() => import(/* webpackChunkName: 'changelog' */ `./changelog/${v}.md`), true),
  })),

  ...rcVersion.map(v => ({
    name: `${v}-rc`,
    level: 2,
    component: createMarkDown(() => import(/* webpackChunkName: 'changelog' */ `./changelog-rc/${v}.md`), true),
  })),
]

export default Page(pages)
