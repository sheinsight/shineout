import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class CodeBlock extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    onHighLight: PropTypes.func,
    value: PropTypes.string.isRequired,
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
    if (this.props.onHighLight) {
      this.props.onHighLight(this.element.offsetHeight)
    }
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
