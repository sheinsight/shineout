/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import markdown from 'docs/Navable/markdown'
import locate from 'doc/locate'

const loader = locate(
  () => import('doc/pages/Components/Dropdown/cn.md'),
  () => import('doc/pages/Components/Dropdown/en.md'),
)

const examples = [
  {
    title: locate('基础', 'Base'),
    component: require('doc/pages/Components/Dropdown/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/Components/Dropdown/example-1-base.js'),
  },
]

export default markdown(loader, examples)
