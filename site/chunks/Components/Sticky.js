/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import markdown from 'docs/Navable/markdown'
import locate from 'doc/locate'

const loader = locate(
  () => import('doc/pages/Components/Sticky/cn.md'),
  () => import('doc/pages/Components/Sticky/en.md'),
)

const examples = [
  {
    title: locate('附着在顶部 20px', 'Sticky 20px to top'),
    component: require('doc/pages/Components/Sticky/example-1-top.js').default,
    rawText: require('!raw-loader!doc/pages/Components/Sticky/example-1-top.js'),
  },
  {
    title: locate('附着在元素内', 'Sticky to element'),
    component: require('doc/pages/Components/Sticky/example-2-element.js').default,
    rawText: require('!raw-loader!doc/pages/Components/Sticky/example-2-element.js'),
  },
  {
    title: locate('附着在底部', 'Sticky to bottom'),
    component: require('doc/pages/Components/Sticky/example-3-bottom.js').default,
    rawText: require('!raw-loader!doc/pages/Components/Sticky/example-3-bottom.js'),
  },
]

export default markdown(loader, examples)
