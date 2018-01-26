/**
 * 此文件根据 scripts/components.tpl 生成，不要手动修改
 */
import markdown from 'docs/Navable/markdown'
import locate from 'doc/locate'
import Page from '../Page'

{% for key, group in groups -%}
{% for i, page in group %}
const loader{{page.name}} = locate(
  () => import('./{{page.name}}/cn.md'),
  () => import('./{{page.name}}/en.md'),
)
{% endfor %}
{%- endfor %}

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
    component: markdown(loader{{page.name}}, [
      {%- for j, exam in page.examples -%}
      {
        title: locate('{{exam.cn}}', '{{exam.en}}'),
        component: require('./{{page.name}}/{{exam.path}}').default,
        rawText: require('!raw-loader!./{{page.name}}/{{exam.path}}'),
      },
      {%- endfor %}
    ]),
  },
  {%- endfor %}
{%- endfor %}  
]

export default Page(pages)
