import React, { PureComponent } from 'react'
import MarkDown from 'docs/MarkDown'
import navable from 'docs/Navable'
import locate from 'doc/locate'

const exams = [
  {
    title: locate('附着在顶部 200px', 'Sticky 200px to top'),
    component: require('./example-top').default,
    rawText: require('!raw-loader!./example-top'),
  },
  {
    title: locate('附着在元素内', 'Sticky to element'),
    component: require('./example-element').default,
    rawText: require('!raw-loader!./example-element'),
  },
  {
    title: locate('附着在底部', 'Sticky to bottom'),
    component: require('./example-bottom').default,
    rawText: require('!raw-loader!./example-bottom'),
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
