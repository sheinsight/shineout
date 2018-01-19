import React, { PureComponent } from 'react'
import MarkDown from 'docs/MarkDown'
import navable from 'docs/Navable'
import Example from 'docs/Example'
import locate from 'doc/locate'

import ExampleTopRaw from '!raw-loader!./example-top'
import ExampleBottomRaw from '!raw-loader!./example-bottom'
import ExampleTop from './example-top'
import ExampleBottom from './example-bottom'

const loader = locate(
  () => import('./cn.md'),
  () => import('./en.md'),
)

class Sticky extends PureComponent {
  render() {
    return (
      <MarkDown {...this.props} loader={loader}>
        <Example
          title={locate('附着在顶部', 'Sticky at top')}
          component={ExampleTop}
          rawText={ExampleTopRaw}
        />

        <Example
          title={locate('附着在底部', 'Sticky at bottom')}
          component={ExampleBottom}
          rawText={ExampleBottomRaw}
        />
      </MarkDown>
    )
  }
}

export default navable(Sticky)
