import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactMarkDown from 'react-markdown'
import { getUidStr } from 'shineout/utils/uid'
import classGenerate from '../../utils/classname'
import locate from '../../locate'
import CodeBlock from '../CodeBlock'
import Example from '../Example'

const markdownClass = classGenerate(require('./markdown.less'), 'markdown')

const codeReg = /^<code name="([\w|-]+)" /
const exampleReg = /^<example name="([\w|-]+)"/

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
    this.cache = {}
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
      return [
        <CodeBlock key="cb" language="jsx" value={code.text} />,
        ...code.log.map((txt, i) => (
          <div key={i} className={markdownClass('console')}>{txt}</div>
        )),
      ]
    }
    console.error(`Code ${name} not existed`)
    return null
  }

  renderExamples() {
    if (this.cache.examples) return this.cache.examples

    const { examples } = this.props
    if (!examples) return <div />

    const text = locate('示例', 'Example')

    const id = `heading-${getUidStr()}`
    this.appendHeading({
      id,
      level: 2,
      children: [text],
    })

    this.cache.examples = [
      <h2 key="h" id={id}>{text}</h2>,
      ...examples.map((props, i) => {
        if (/\d+-/.test(props.name)) {
          const sid = `heading-${props.name}`
          const [title] = props.title.split('\n')
          this.appendHeading({
            id: sid,
            level: 3,
            children: [title],
          })
          return <Example key={i} id={sid} {...props} />
        }
        return undefined
      }),
    ]

    return this.cache.examples
  }

  renderExample(name) {
    const key = `example-${name}`
    if (!this.cache[key]) {
      const { examples } = this.props
      const example = (examples || []).find(e => e.name === name)

      if (!example) this.cache[key] = null
      else this.cache[key] = <Example {...example} />
    }
    return this.cache[key]
  }

  renderHeading = ({ level, children }) => {
    const key = `${level}-${children[0]}`
    if (!this.cache[key]) {
      const id = `heading-${getUidStr()}`
      if (level === 2 || level === 3) {
        this.appendHeading({ id, level, children })
      }
      const Tag = `h${level}`
      this.cache[key] = <Tag id={id}>{children}</Tag>
    }

    return this.cache[key]
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
          heading: this.renderHeading,
          html: ({ value }) => {
            if (value === '<example />') return this.renderExamples()

            const example = value.match(exampleReg)
            if (example) return this.renderExample(example[1], value.indexOf('noExpand') >= 0)

            if (value === '<br>' || value === '<br />') return <br />

            const code = value.match(codeReg)
            if (code) return this.renderCode(code[1])

            return null
          },
          link: ({ href, children }) => {
            const target = href.indexOf('http' === 0) ? '_blank' : undefined
            return <a href={href} target={target}>{children}</a>
          },
        }}
      />
    )
  }
}
