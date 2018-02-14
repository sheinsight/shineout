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

    this.id = getUidStr()
  }

  componentDidMount() {
    const [title] = this.props.title.split('\n')
    this.props.appendHeading({
      id: this.id,
      level: 3,
      children: [title],
    })
  }

  toggleCode = () => {
    this.setState({ showcode: !this.state.showcode })
  }

  render() {
    const { component, rawText } = this.props
    const { showcode } = this.state

    const text = rawText.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/, '').trim()

    const [title, sub] = this.props.title.split('\n')

    return (
      <div id={this.id} className={exampleClass('_', showcode && 'showcode')}>
        <div className={exampleClass('title')}>
          {title}
          { sub && <div className={exampleClass('sub-title')}>{sub}</div> }
          <a href="javascript:;" className={exampleClass('toggle')} onClick={this.toggleCode}>{'< >'}</a>
        </div>
        { showcode && <CodeBlock language="js" value={text} /> }
        <div className={exampleClass('body')}>
          { createElement(component) }
        </div>
      </div>
    )
  }
}
