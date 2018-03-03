/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import log from 'doc/utils/log'
import locate from 'doc/locate'

import cn from 'doc/pages/components/{{name}}/cn.md'
import en from 'doc/pages/components/{{name}}/en.md'

const source = locate(cn, en)

const examples = [
  {%- for i, exam in examples %}
  {
    title: locate('{{exam.cn}}', '{{exam.en}}'),
    component: require('doc/pages/components/{{name}}/{{exam.path}}').default,
    rawText: require('!raw-loader!doc/pages/components/{{name}}/{{exam.path}}'),
  },
  {%- endfor %}
]

log.start()
{% for i, code in codes -%}
log.setType('{{code}}')
require('doc/pages/components/{{name}}/code-{{code}}.js')
{% endfor %}

const logs = log.end()

const codes = {
  {%- for i, code in codes %}
  '{{code}}': {
    text: require('!raw-loader!doc/pages/components/{{name}}/code-{{code}}.js'),
    log: logs['{{code}}'],
  },
  {%- endfor %}
}

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
