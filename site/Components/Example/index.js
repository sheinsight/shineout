import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import { getUidStr } from 'shineout/utils/uid'
import classGenerate from '../../utils/classname'
import CodeBlock from '../CodeBlock'

const exampleClass = classGenerate(require('./example.less'), 'example')

export default class Example extends PureComponent {
  static propTypes = {
    appendHeading: PropTypes.func,
    component: PropTypes.func.isRequired,
    rawText: PropTypes.string,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    appendHeading: () => {},
    rawText: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      showcode: false,
    }

    const [title] = props.title.split('\n')
    this.id = `heading-${getUidStr()}`
    props.appendHeading({
      id: this.id,
      level: 3,
      children: [title],
    })
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
        {'<'}{showcode ? '/' : ' '}{'>'}
      </a>
    )
  }

  render() {
    const { component, rawText } = this.props
    const { showcode } = this.state

    const text = rawText.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/, '').trim()

    const [title, ...sub] = this.props.title.split('\n')

    return [
      <div key="0" id={this.id} className={exampleClass('title')}>
        {title}
        {
          sub.length > 0 &&
          <div className={exampleClass('sub-title')}>
            {
              // eslint-disable-next-line
              sub.map((s, i) => <div key={i} dangerouslySetInnerHTML={{ __html: s }} />)
            }
          </div>
        }
      </div>,
      <div key="1" className={exampleClass('_', showcode && 'showcode')}>
        <div className={exampleClass('body')}>
          {createElement(component)}
          {this.renderCodeHandle(false)}
        </div>
        <div ref={this.bindCodeBlock} className={exampleClass('code')}>
          {this.renderCodeHandle(true)}
          <CodeBlock
            onHighLight={this.setCodeBlockHeight}
            onClose={this.toggleCode}
            language="jsx"
            value={text}
          />
        </div>
      </div>,
    ]
  }
}
