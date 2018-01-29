import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class CodeBlock extends PureComponent {
  constructor(props) {
    super(props)
    this.setRef = this.setRef.bind(this)
  }

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  setRef(el) {
    this.codeEl = el
  }

  highlightCode() {
    window.hljs.highlightBlock(this.codeEl)
  }

  render() {
    return (
      <pre>
        <code ref={this.setRef} className={this.props.language}>
          {this.props.value}
        </code>
      </pre>
    )
  }
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
}

CodeBlock.defaultProps = {
  language: '',
}

export default CodeBlock
