import React, { PureComponent } from 'react'
import MarkDown from 'docs/MarkDown'
import navable from 'docs/Navable'
import locate from 'doc/locate'

const loader = locate(
  () => import('./cn.md'),
  () => import('./en.md'),
)

class GetStart extends PureComponent {
  render() {
    return (
      <MarkDown {...this.props} loader={loader} />
    )
  }
}

export default navable(GetStart)
