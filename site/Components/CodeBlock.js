import React, { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism.css'

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
    <pre ref={elRef} className={language || 'lang-jsx'}>
      <code>{value}</code>
    </pre>
  )
}
