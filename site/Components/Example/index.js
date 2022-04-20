import React, { useState, useRef, useEffect, Fragment, createElement } from 'react'
import PropTypes from 'prop-types'
import { Lazyload, Spin } from 'shineout'
import Icon from 'doc/icons/Icon'
import { exampleClass } from 'doc/styles'
import Codesandbox from './Codesandbox'
import CodeBlock from '../CodeBlock'
import getParameterByName from '../../utils/param'

const placeholder = (
  <div className={exampleClass('placeholder')}>
    <Spin />
  </div>
)

export default function Example({ component, id, name, rawText, title: propsTitle }) {
  const codeblock = useRef(null)
  const [showcode, setShowCode] = useState(false)
  const [com] = useState(createElement(component))
  const [codeHeight, setCodeHeight] = useState()
  let [bottom] = useState()

  const text = rawText.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/, '').trim()

  const collapse = (height, remain, isBottom) => {
    codeblock.current.style.height = `${height * (remain - 1)}px`
    if (remain > 1) {
      setTimeout(() => {
        collapse(height, remain - 1, isBottom)
      }, 16)
    }
    if (isBottom) {
      document.documentElement.scrollTop -= height
    }
  }

  useEffect(
    () => {
      if (!codeblock.current) return
      if (showcode) {
        codeblock.current.style.height = `${codeHeight}px`
      } else {
        const y = codeHeight % 15
        if (y > 0) collapse(y, 1, bottom)
        collapse((codeHeight - y) / 15, 15, bottom)
      }
    },
    [showcode]
  )

  const setCodeBlockHeight = height => {
    setCodeHeight(height)
  }

  const toggleCode = isBottom => {
    const showCode = !showcode
    setShowCode(showCode)
    bottom = isBottom
  }

  const renderCodeHandle = isBottom => (
    <a className={exampleClass('toggle')} onClick={toggleCode.bind(null, isBottom)}>
      <Icon name={showcode ? 'code-close' : 'code'} />
    </a>
  )

  const single = getParameterByName('example')
  if (single) {
    if (name.indexOf(single) < 0) return null
  }

  // eslint-disable-next-line
  let [title, ...sub] = propsTitle.split('\n')
  if (title) title = title.trim()

  return (
    <Fragment>
      {title && (
        <h3 key="0" id={id}>
          {title}
        </h3>
      )}

      <Lazyload placeholder={placeholder}>
        <div className={exampleClass('_', showcode && 'showcode')}>
          <div className={exampleClass('body')}>{com}</div>

          {propsTitle.length > 0 && (
            <div className={exampleClass('desc')}>
              {sub.map((s, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: s }} />
              ))}
              <Codesandbox id={id} text={text} />
              {renderCodeHandle(false)}
            </div>
          )}

          <div ref={codeblock} className={exampleClass('code')}>
            <CodeBlock onHighLight={setCodeBlockHeight} onClose={toggleCode} value={text} />
            {renderCodeHandle(true)}
          </div>
        </div>
      </Lazyload>
    </Fragment>
  )
}

Example.propTypes = {
  component: PropTypes.func.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  rawText: PropTypes.string,
  title: PropTypes.string.isRequired,
}

Example.defaultProps = {
  rawText: '',
}
