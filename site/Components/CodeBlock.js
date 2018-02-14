import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  }

  static defaultProps = {
    language: '',
  }

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  bindElement = (el) => {
    this.element = el
  }

  highlightCode() {
    window.hljs.highlightBlock(this.element)
  }

  render() {
    return (
      <pre>
        <code ref={this.bindElement} className={this.props.language}>
          {this.props.value}
        </code>
      </pre>
    )
  }
}
