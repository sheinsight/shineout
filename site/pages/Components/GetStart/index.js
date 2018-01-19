import React, { PureComponent } from 'react'
import MarkDown from 'docs/MarkDown'
import navable from 'docs/Navable'

import cntext from './cn.md'

class GetStart extends PureComponent {
  render() {
    return (
      <MarkDown {...this.props} source={cntext} />
    )
  }
}

export default navable(GetStart)
