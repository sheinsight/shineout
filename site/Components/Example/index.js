import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
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
      codeHeight: 0,
      showcode: false,
    }

    this.id = getUidStr()
    const [title] = props.title.split('\n')
    props.appendHeading({
      id: this.id,
      level: 3,
      children: [title],
    })
  }

  setCodeBlockHeight = (height) => {
    this.setState({ codeHeight: height })
  }

  collapse(height, remain) {
    document.documentElement.scrollTop -= height
    if (remain > 1) {
      setTimeout(() => {
        this.collapse(height, remain - 1)
      }, 16)
    }
  }

  toggleCode(isBottom) {
    this.setState(immer((state) => {
      state.showcode = !state.showcode
    }), () => {
      if (isBottom && !this.state.showcode) {
        this.collapse(this.state.codeHeight / 15, 15)
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
    const { showcode, codeHeight } = this.state

    const text = rawText.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/, '').trim()

    const [title, sub] = this.props.title.split('\n')

    return (
      <div id={this.id} className={exampleClass('_', showcode && 'showcode')}>
        <div className={exampleClass('title')}>
          { title }
          { sub && <div className={exampleClass('sub-title')}>{sub}</div> }
          { this.renderCodeHandle(false) }
        </div>
        <div style={{ height: showcode ? codeHeight : 0 }} className={exampleClass('code')}>
          { this.renderCodeHandle(true) }
          <CodeBlock
            onHighLight={this.setCodeBlockHeight}
            onClose={this.toggleCode}
            language="jsx"
            value={text}
          />
        </div>
        <div className={exampleClass('body')}>
          { createElement(component) }
        </div>
      </div>
    )
  }
}
