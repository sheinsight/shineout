import React, { PureComponent } from 'react'
import MarkDown from 'docs/MarkDown'
import navable from 'docs/Navable'
import Example from 'docs/Example'

import ExampleTopRaw from '!raw-loader!./example-top'
import ExampleBottomRaw from '!raw-loader!./example-bottom'
import ExampleTop from './example-top'
import ExampleBottom from './example-bottom'

import cntext from './cn.md'

class Sticky extends PureComponent {
  render() {
    return (
      <MarkDown {...this.props} source={cntext}>
        <Example
          title="顶部附着"
          component={ExampleTop}
          rawText={ExampleTopRaw}
        />

        <Example
          title="底部附着"
          component={ExampleBottom}
          rawText={ExampleBottomRaw}
        />
      </MarkDown>
    )
  }
}

export default navable(Sticky)
