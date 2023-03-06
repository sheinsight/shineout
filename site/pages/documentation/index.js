import { createMarkDown } from 'docs/MarkDown'
import Page from '../Page'

const versions = ['2.x.x', '1.x.x']
const changelogs = versions.reduce((result, v) => {
  const temp = [
    {
      name: v,
      level: 2,
      component: createMarkDown(() => import(/* webpackChunkName: 'changelog' */ `./changelog/${v}.md`), true),
    },
  ]
  if (process.env.LOG_ENV === 'rc') {
    temp.push({
      name: `${v}-rc`,
      level: 2,
      component: createMarkDown(() => import(/* webpackChunkName: 'changelog' */ `./changelog-rc/${v}.md`), true),
    })
  }
  return result.concat(temp)
}, [])

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

  ...changelogs,
]

export default Page(pages)
