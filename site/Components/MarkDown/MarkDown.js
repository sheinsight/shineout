import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactMarkDown from 'react-markdown'
import { Link } from 'react-router-dom'
import { getUidStr } from 'shineout/utils/uid'
import { markdownClass } from 'doc/styles'
import locate from '../../locate'
import CodeBlock from '../CodeBlock'
import Example from '../Example'
import Console from './Console'
import Table from '../Table'

const codeReg = /^<code name="([\w|-]+)" /
const exampleReg = /^<example name="([\w|-]+)"/

const createId = (level, str) => {
  if (level === 4) return getUidStr()
  return `${level}-${(str || '').replace(/\s/g, '-')}`
}

export default function MarkDown({ onHeadingSetted, codes, examples, source }) {
  let [headings] = useState([])
  const [cache] = useState({})

  useEffect(() => {
    if (onHeadingSetted) {
      onHeadingSetted(headings)
    }
  }, [])

  const appendHeading = heading => {
    headings.push(heading)
  }

  const renderCode = name => {
    const code = codes[name]
    if (code) {
      return [<CodeBlock key="cb" value={code.text} />, ...code.log.map((txt, i) => <Console key={i}>{txt}</Console>)]
    }
    console.error(`Code ${name} not existed`)
    return null
  }

  const renderExamples = () => {
    if (cache.examples) return cache.examples

    if (!examples) return <div />

    const text = locate('示例', 'Example')

    const id = `heading-example-h`
    appendHeading({
      id,
      level: 2,
      children: [text],
    })

    cache.examples = [
      <h2 key="h" id={id}>
        {text}
      </h2>,
      ...examples.map((prop, i) => {
        if (/\d+-/.test(prop.name)) {
          const sid = `heading-${prop.name}`
          const [title] = prop.title.split('\n')
          appendHeading({
            id: sid,
            level: 3,
            children: [title],
          })
          return <Example key={i} id={sid} {...prop} lazy={i > 2} />
        }
        return undefined
      }),
    ]

    return cache.examples
  }

  const renderExample = name => {
    const key = `example-${name}`
    if (!cache[key]) {
      const example = (examples || []).find(e => e.name === name)

      if (!example) cache[key] = null
      else cache[key] = <Example {...example} />
    }
    return cache[key]
  }

  const renderHeading = ({ level, children }) => {
    const key = `${level}-${children[0]}`
    const Tag = `h${level}`

    if (typeof children[0] === 'object') {
      return <Tag>{children}</Tag>
    }

    if (!cache[key]) {
      const id = `heading-${createId(level, children[0])}`
      if (level === 2 || level === 3) {
        appendHeading({ id, level, children })
      }
      cache[key] = <Tag id={id}>{children}</Tag>
    }

    return cache[key]
  }

  // clear headings
  headings = []

  return (
    <ReactMarkDown
      className={markdownClass('_')}
      source={source}
      renderers={{
        code: CodeBlock,
        heading: renderHeading,
        html: prop => {
          if (prop.value === '<example />') return renderExamples()

          const example = prop.value.match(exampleReg)
          if (example) return renderExample(example[1], prop.value.indexOf('noExpand') >= 0)

          if (prop.value === '<br>' || prop.value === '<br />') return <br />

          const code = prop.value.match(codeReg)
          if (code) return renderCode(code[1])

          return null
        },
        table: Table,
        link: prop => {
          const target = prop.href.indexOf('http') === 0 ? '_blank' : undefined
          if (target)
            return (
              <a href={prop.href} target={target}>
                {prop.children}
              </a>
            )
          return (
            <Link to={prop.href} target={target}>
              {prop.children}
            </Link>
          )
        },
      }}
    />
  )
}

MarkDown.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  codes: PropTypes.object,
  examples: PropTypes.array,
  onHeadingSetted: PropTypes.func,
  source: PropTypes.string.isRequired,
}

MarkDown.defaultProps = {
  children: null,
  examples: null,
  onHeadingSetted: undefined,
}
