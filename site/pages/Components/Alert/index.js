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
  {
    title: locate('样式属性 type', 'Type'),
    component: require('./example-type').default,
    rawText: require('!raw-loader!./example-type'),
  },
  {
    title: locate('关闭 onClose', 'onClose'),
    component: require('./example-close').default,
    rawText: require('!raw-loader!./example-close'),
  },
  {
    title: locate('图标', 'with icon'),
    component: require('./example-icon').default,
    rawText: require('!raw-loader!./example-icon'),
  },
]

const loader = locate(
  () => import('./cn.md'),
  () => import('./en.md'),
)

class Sticky extends PureComponent {
  render() {
    return (
      <MarkDown {...this.props} loader={loader} examples={exams} />
    )
  }
}

export default navable(Sticky)

