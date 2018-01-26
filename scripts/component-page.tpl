/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import locate from 'doc/locate'

import cn from 'doc/pages/Components/{{name}}/cn.md'
import en from 'doc/pages/Components/{{name}}/en.md'

const source = locate(cn, en)

const examples = [
  {%- for i, exam in examples %}
  {
    title: locate('{{exam.cn}}', '{{exam.en}}'),
    component: require('doc/pages/Components/{{name}}/{{exam.path}}').default,
    rawText: require('!raw-loader!doc/pages/Components/{{name}}/{{exam.path}}'),
  },
  {%- endfor %}
]

export default navable(props => <MarkDown {...props} source={source} examples={examples} />)
