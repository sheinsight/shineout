import React, { PureComponent, Fragment, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import ReactMarkDown from 'react-markdown'
import { getUidStr } from 'shineout/utils/uid'
import classGenerate from '../../utils/classname'
import CodeBlock from '../CodeBlock'

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

  renderChildren() {
    const { children } = this.props
    if (!children) return <div />

    const id = getUidStr()
    this.appendHeading({
      id,
      level: 2,
      children: ['Example'],
    })

    return (
      <Fragment>
        <h2 id={id}>Example</h2>
        {
          Children.map(
            children,
            (child) => {
              if (typeof child === 'object' && child.type.isExample) {
                return cloneElement(child, { appendHeading: this.appendHeading })
              }
              return child
            },
          )
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
            if (value === '<example />') return this.renderChildren()
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
  onHeadingSetted: PropTypes.func,
  source: PropTypes.string.isRequired,
}

MarkDown.defaultProps = {
  children: null,
  onHeadingSetted: undefined,
}

export default MarkDown
