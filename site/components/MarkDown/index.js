import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactMarkDown from 'react-markdown'
import { getUidStr } from 'shineout/utils/uid'
import classGenerate from '../../utils/classname'
import CodeBlock from '../CodeBlock'

const cls = classGenerate(require('./markdown.less'), 'markdown')

class MarkDown extends PureComponent {
  constructor(props) {
    super(props)

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

  render() {
    const { source, exampleRender } = this.props

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
            if (value === '<example />') return exampleRender(this.appendHeading)
            return null
          },
        }}
      />
    )
  }
}

MarkDown.propTypes = {
  exampleRender: PropTypes.func,
  onHeadingSetted: PropTypes.func,
  source: PropTypes.string.isRequired,
}

MarkDown.defaultProps = {
  exampleRender: undefined,
  onHeadingSetted: undefined,
}

export default MarkDown
