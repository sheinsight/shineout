/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import markdown from 'docs/Navable/markdown'
import locate from 'doc/locate'

const loader = locate(
  () => import('doc/pages/Components/GetStart/cn.md'),
  () => import('doc/pages/Components/GetStart/en.md'),
)

const examples = [
]

export default markdown(loader, examples)
