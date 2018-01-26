/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import markdown from 'docs/Navable/markdown'
import locate from 'doc/locate'

const loader = locate(
  () => import('doc/pages/Components/{{name}}/cn.md'),
  () => import('doc/pages/Components/{{name}}/en.md'),
)

const examples = [
  {%- for i, exam in examples %}
  {
    title: locate('{{exam.cn}}', '{{exam.en}}'),
    component: require('doc/pages/Components/{{name}}/{{exam.path}}').default,
    rawText: require('!raw-loader!doc/pages/Components/{{name}}/{{exam.path}}'),
  },
  {%- endfor %}
]

export default markdown(loader, examples)
