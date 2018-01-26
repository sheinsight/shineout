/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import markdown from 'docs/Navable/markdown'
import locate from 'doc/locate'

const loader = locate(
  () => import('doc/pages/Components/Alert/cn.md'),
  () => import('doc/pages/Components/Alert/en.md'),
)

const examples = [
  {
    title: locate('基础', 'Base'),
    component: require('doc/pages/Components/Alert/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/Components/Alert/example-1-base.js'),
  },
  {
    title: locate('类型 type', 'type'),
    component: require('doc/pages/Components/Alert/example-2-type.js').default,
    rawText: require('!raw-loader!doc/pages/Components/Alert/example-2-type.js'),
  },
  {
    title: locate('关闭 onClose', 'onClose'),
    component: require('doc/pages/Components/Alert/example-3-close.js').default,
    rawText: require('!raw-loader!doc/pages/Components/Alert/example-3-close.js'),
  },
  {
    title: locate('图标 icon', 'with icon'),
    component: require('doc/pages/Components/Alert/example-4-icon.js').default,
    rawText: require('!raw-loader!doc/pages/Components/Alert/example-4-icon.js'),
  },
]

export default markdown(loader, examples)
