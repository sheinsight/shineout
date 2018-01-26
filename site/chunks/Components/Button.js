/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import markdown from 'docs/Navable/markdown'
import locate from 'doc/locate'

const loader = locate(
  () => import('doc/pages/Components/Button/cn.md'),
  () => import('doc/pages/Components/Button/en.md'),
)

const examples = [
  {
    title: locate('类型 type', 'Type'),
    component: require('doc/pages/Components/Button/example-1-type.js').default,
    rawText: require('!raw-loader!doc/pages/Components/Button/example-1-type.js'),
  },
]

export default markdown(loader, examples)
