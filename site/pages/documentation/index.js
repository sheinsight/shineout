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

// path 属性需要和 scripts/build-html 中 getDocumentation 生成的html 路径一致
const pages = [
  'API',

  {
    name: 'Props',
    cn: '约定',
    path: 'props',
    level: 2,
    component: createMarkDown(() => import(/* webpackChunkName: 'api.props' */ './api-props.md'), true),
  },

  {
    name: 'Classname',
    path: 'classname',
    level: 2,
    component: createMarkDown(() => import(/* webpackChunkName: 'api.classname' */ './api-classname.md'), true),
  },
  {
    name: '从 v1 到 v2',
    level: 2,
    path: 'v1-v2',
    component: createMarkDown(() => import(/* webpackChunkName: 'api.classname' */ './api-v1-v2.md'), true),
  },

  'CHANGELOG',

  ...changelogs,
]

export default Page(pages)
