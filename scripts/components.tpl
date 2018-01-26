/**
 * 此文件根据 scripts/components.tpl 生成，不要手动修改
 */
import loadable from 'docs/Loadable'
import Page from 'doc/pages/Page'

const pages = [
{%- for key, group in groups %}
  {%- if key %}
  '{{ key }}',
  {%- endif %}
  {%- for i, page in group %}
  {
    name: '{{ page.name }}',
    cn: '{{page.cn}}',
    level: {% if key %}2{% else %}1{% endif %},
    component: loadable(() => import('./{{page.name}}')),
  },
  {%- endfor %}
{%- endfor %}  
]

export default Page(pages)
