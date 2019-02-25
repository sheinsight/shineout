import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import { exampleClass } from 'doc/styles'

export default prop => {
  const { language = 'lang-jsx', onHighLight, value } = prop

  const elRef = useRef(null)

  useEffect(() => {
    const el = elRef.current
    Prism.highlightElement(el, false, () => {
      if (onHighLight) onHighLight(el.offsetHeight)
    })
  }, [])

  return (
    <pre ref={elRef} className={classnames(language || 'lang-jsx', exampleClass('pre'))}>
      <code>{value}</code>
    </pre>
  )
}
