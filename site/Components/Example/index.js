import React, { useState, useRef, useEffect, Fragment, createElement } from 'react'
import PropTypes from 'prop-types'
import { Lazyload, Spin, Tabs } from 'shineout'
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

export default function Example({ component, id, name, rawText, title: propsTitle, ...rest }) {
  const { isTs, parseTsText } = rest
  const codeblock = useRef(null)
  const [showcode, setShowCode] = useState(false)
  const [com] = useState(createElement(component))
  const [codeHeight, setCodeHeight] = useState()
  const [codeType, setCodeType] = useState('ts')
  let [bottom] = useState()

  const commendReg = /(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/
  const text = rawText.replace(commendReg, '').trim()
  const parseText = (parseTsText || '').replace(commendReg, '').trim()

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

  const getHeight = () => `${codeHeight + (isTs ? 41 : 0)}px`

  useEffect(
    () => {
      if (!codeblock.current) return
      if (showcode) {
        codeblock.current.style.height = getHeight()
      } else {
        const y = codeHeight % 15
        if (y > 0) collapse(y, 1, bottom)
        collapse((codeHeight - y) / 15, 15, bottom)
      }
    },
    [showcode]
  )

  useEffect(
    () => {
      if (!showcode) return
      if (!codeblock.current) return
      codeblock.current.style.height = getHeight()
    },
    [codeHeight]
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
              <Codesandbox id={id} text={parseText || text} />
              {renderCodeHandle(false)}
            </div>
          )}

          <div ref={codeblock} className={exampleClass('code')}>
            {isTs ? (
              <div className={exampleClass('code-type')}>
                <Tabs
                  shape="line"
                  active={codeType}
                  onChange={d => {
                    setCodeType(d)
                  }}
                >
                  <Tabs.Panel tab="TypeScript" id="ts" />
                  <Tabs.Panel tab="Javascript" id="js" />
                </Tabs>
              </div>
            ) : null}
            <CodeBlock
              onHighLight={setCodeBlockHeight}
              onClose={toggleCode}
              key={codeType}
              value={isTs && codeType === 'js' ? parseText : text}
            />
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
