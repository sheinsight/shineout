import markdown from 'docs/Navable/markdown'
import locate from 'doc/locate'

const exams = [
  {
    title: locate('附着在顶部 100px', 'Sticky 20px to top'),
    component: require('./example-top').default,
    rawText: require('!raw-loader!./example-top'),
  },
  {
    title: locate('附着在元素内', 'Sticky to element'),
    component: require('./example-element').default,
    rawText: require('!raw-loader!./example-element'),
  },
  {
    title: locate('附着在底部', 'Sticky to bottom'),
    component: require('./example-bottom').default,
    rawText: require('!raw-loader!./example-bottom'),
  },
]

const loader = locate(
  () => import('./cn.md'),
  () => import('./en.md'),
)

export default markdown(loader, exams)
