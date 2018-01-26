import markdown from 'docs/Navable/markdown'
import locate from 'doc/locate'

const exams = [
  {
    title: locate('基础', 'Base'),
    component: require('./example-base').default,
    rawText: require('!raw-loader!./example-base'),
  },
]

const loader = locate(
  () => import('./cn.md'),
  () => import('./en.md'),
)

export default markdown(loader, exams)
