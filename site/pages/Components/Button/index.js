import React, { PureComponent } from 'react'
import MarkDown from 'docs/MarkDown'
import navable from 'docs/Navable'
import locate from 'doc/locate'

const exams = [
  {
    title: locate('基础', 'Base'),
    component: require('./example-base').default,
    rawText: require('!raw-loader!./example-base'),
  },
]

const loader = locate(
  () => import('./cn.md'),
  () => import('./en.md'),
)

class Button extends PureComponent {
  render() {
    return (
      <MarkDown {...this.props} loader={loader} examples={exams} />
    )
  }
}

export default navable(Button)
