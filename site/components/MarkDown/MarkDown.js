import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactMarkDown from 'react-markdown'
import { getUidStr } from 'shineout/utils/uid'
import classGenerate from '../../utils/classname'
import locate from '../../locate'
import CodeBlock from '../CodeBlock'
import Example from '../Example'

const cls = classGenerate(require('./markdown.less'), 'markdown')

class MarkDown extends PureComponent {
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

  render() {
    const { source } = this.props

    // clear headings
    this.headings = []

    return (
      <ReactMarkDown
        className={cls('_')}
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
            return null
          },
        }}
      />
    )
  }
}

MarkDown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  examples: PropTypes.array,
  onHeadingSetted: PropTypes.func,
  source: PropTypes.string.isRequired,
}

MarkDown.defaultProps = {
  children: null,
  examples: null,
  onHeadingSetted: undefined,
}

export default MarkDown
