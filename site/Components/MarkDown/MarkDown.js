import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactMarkDown from 'react-markdown'
import { getUidStr } from 'shineout/utils/uid'
import classGenerate from '../../utils/classname'
import locate from '../../locate'
import CodeBlock from '../CodeBlock'
import Example from '../Example'

const markdownClass = classGenerate(require('./markdown.less'), 'markdown')

const codeReg = /^<code name="([\w|-]+)" /
const exampleReg = /^<example name="([\w|-]+)" /

export default class MarkDown extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
    ]),
    codes: PropTypes.object,
    examples: PropTypes.array,
    onHeadingSetted: PropTypes.func,
    source: PropTypes.string.isRequired,
  }

  static defaultProps = {
    children: null,
    examples: null,
    onHeadingSetted: undefined,
  }

  constructor(props) {
    super(props)

    this.headings = []

    this.appendHeading = this.appendHeading.bind(this)
  }

  componentDidMount() {
    if (this.props.onHeadingSetted) {
      this.props.onHeadingSetted(this.headings)
    }
  }

  appendHeading(heading) {
    this.headings.push(heading)
  }

  renderCode(name) {
    const { codes } = this.props
    const code = codes[name]
    if (code) {
      return (
        <Fragment>
          <CodeBlock language="jsx" value={code.text} />
          {
            code.log.map((txt, i) => (
              <div key={i} className={markdownClass('console')}>{txt}</div>
            ))
          }
        </Fragment>
      )
    }
    console.error(`Code ${name} not existed`)
    return null
  }

  renderExamples() {
    const { examples } = this.props
    if (!examples) return <div />

    const text = locate('示例', 'Example')

    const id = getUidStr()
    this.appendHeading({
      id,
      level: 2,
      children: [text],
    })

    return (
      <Fragment>
        <h2 id={id}>{text}</h2>
        {
          examples.map((props, i) => (
            <Example key={i} appendHeading={this.appendHeading} {...props} />))
        }
      </Fragment>
    )
  }

  renderExample(name) {
    const { examples } = this.props
    const example = (examples || []).find(e => e.name === name)

    if (!example) return null

    return <Example {...example} />
  }

  render() {
    const { source } = this.props

    // clear headings
    this.headings = []

    return (
      <ReactMarkDown
        className={markdownClass('_')}
        source={source}
        renderers={{
          code: CodeBlock,
          heading: ({ level, children }) => {
            const id = getUidStr()
            if (level === 2 || level === 3) {
              this.appendHeading({ id, level, children })
            }
            const Tag = `h${level}`
            return <Tag id={id}>{children}</Tag>
          },
          html: ({ value }) => {
            if (value === '<example />') return this.renderExamples()

            const example = value.match(exampleReg)
            if (example) return this.renderExample(example[1])

            if (value === '<br>' || value === '<br />') return <br />

            const code = value.match(codeReg)
            if (code) return this.renderCode(code[1])

            return null
          },
        }}
      />
    )
  }
}
