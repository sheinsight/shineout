import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import classGenerate from '../../utils/classname'
import Icon from '../../icons/Icon'
import CodeBlock from '../CodeBlock'

const exampleClass = classGenerate(require('./example.less'), 'example')

export default class Example extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    id: PropTypes.string,
    rawText: PropTypes.string,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    rawText: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      showcode: false,
    }
  }

  setCodeBlockHeight = (height) => {
    this.codeHeight = height
  }

  bindCodeBlock = (el) => {
    this.codeblock = el
  }

  collapse(height, remain, isBottom) {
    this.codeblock.style.height = `${height * (remain - 1)}px`
    if (remain > 1) {
      setTimeout(() => {
        this.collapse(height, remain - 1, isBottom)
      }, 16)
    }
    if (isBottom) {
      document.documentElement.scrollTop -= height
    }
  }

  toggleCode(isBottom) {
    const showcode = !this.state.showcode
    this.setState({ showcode }, () => {
      if (showcode) {
        this.codeblock.style.height = `${this.codeHeight}px`
      } else {
        const y = this.codeHeight % 15
        if (y > 0) this.collapse(y, 1, isBottom)
        this.collapse((this.codeHeight - y) / 15, 15, isBottom)
      }
    })
  }

  renderCodeHandle(isBottom) {
    const { showcode } = this.state
    return (
      <a
        href="javascript:;"
        className={exampleClass('toggle')}
        onClick={this.toggleCode.bind(this, isBottom)}
      >
        <Icon name={showcode ? 'code-close' : 'code'} />
      </a>
    )
  }

  render() {
    const { component, id, rawText } = this.props
    const { showcode } = this.state

    const text = rawText.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/, '').trim()

    // eslint-disable-next-line
    let [title, ...sub] = this.props.title.split('\n')
    if (title) title = title.trim()

    return [
      title ? <h3 key="0" id={id}>{title}</h3> : null,

      <div key="1" className={exampleClass('_', showcode && 'showcode')}>
        <div className={exampleClass('body')}>
          {createElement(component)}
        </div>

        {
          this.props.title.length > 0 &&
          <div className={exampleClass('desc')}>
            {
              // eslint-disable-next-line
              sub.map((s, i) => <div key={i} dangerouslySetInnerHTML={{ __html: s }} />)
            }
            {this.renderCodeHandle(false)}
          </div>
        }

        <div ref={this.bindCodeBlock} className={exampleClass('code')}>
          <CodeBlock
            onHighLight={this.setCodeBlockHeight}
            onClose={this.toggleCode}
            language="jsx"
            value={text}
          />
          {this.renderCodeHandle(true)}
        </div>
      </div>,
    ]
  }
}
