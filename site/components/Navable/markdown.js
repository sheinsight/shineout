import React, { PureComponent } from 'react'
import MarkDown from 'docs/MarkDown'
import navable from './index'

export default function (loader, examples) {
  class Component extends PureComponent {
    render() {
      return (
        <MarkDown {...this.props} loader={loader} examples={examples} />
      )
    }
  }

  return navable(Component)
}
