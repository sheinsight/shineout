import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism.css'

/*
export default (props) => {
  const { language = 'lang-jsx', onHighLight, value } = props

  const elRef = useRef(null)

  useEffect(() => {
    const el = elRef.current
    Prism.highlightElement(el, false, () => {
      if (onHighLight) {
        onHighLight(el.offsetHeight)
      }
    })
  })

  return (
    <pre className={language || 'lang-jsx'}>
      <code ref={elRef}>{value}</code>
    </pre>
  )
}
*/

export default class CodeBlock extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    onHighLight: PropTypes.func,
    value: PropTypes.string.isRequired,
  }

  static defaultProps = {
    language: 'lang-jsx',
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
    Prism.highlightElement(this.element, false, () => {
      if (this.props.onHighLight) {
        this.props.onHighLight(this.element.offsetHeight)
      }
    })
  }

  render() {
    return (
      <pre className={this.props.language || 'lang-jsx'}>
        <code ref={this.bindElement}>
          {this.props.value}
        </code>
      </pre>
    )
  }
}
