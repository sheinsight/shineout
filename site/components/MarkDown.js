import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactMarkDown from 'react-markdown'
import CodeBlock from './CodeBlock'

class MarkDown extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { source, exampleRender } = this.props

    return (
      <ReactMarkDown
        source={source}
        renderers={{
          code: CodeBlock,
          html: (value) => {
            if (value === '<example />') return exampleRender()
            return null
          },
        }}
      />
    )
  }
}

MarkDown.propTypes = {
  source: PropTypes.string.isRequired,
  exampleRender: PropTypes.func,
}

MarkDown.defaultProps = {
  exampleRender: undefined,
}

export default MarkDown
