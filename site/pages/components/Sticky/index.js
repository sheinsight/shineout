import React, { PureComponent, Fragment } from 'react'
import MarkDown from 'docs/MarkDown'
import navable from 'docs/Navable'
import Example from 'docs/Example'

import ExampleTopRaw from '!raw-loader!./example-top'
import ExampleBottomRaw from '!raw-loader!./example-bottom'
import ExampleTop from './example-top'
import ExampleBottom from './example-bottom'

import cntext from './cn.md'

function exampleRender(appendHeading) {
  const heading = Example.getHeading(appendHeading)

  return (
    <Fragment>
      {heading}

      <Example
        title="顶部附着"
        appendHeading={appendHeading}
        component={ExampleTop}
        rawText={ExampleTopRaw}
      />

      <Example
        title="底部附着"
        appendHeading={appendHeading}
        component={ExampleBottom}
        rawText={ExampleBottomRaw}
      />
    </Fragment>
  )
}

class Sticky extends PureComponent {
  render() {
    return (
      <MarkDown {...this.props} exampleRender={exampleRender} source={cntext} />
    )
  }
}

export default navable(Sticky)

