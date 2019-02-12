import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { markdownClass } from 'doc/styles'

const Console = ({ children }) => {
  const [expanded, setExpanded] = useState(false)

  const toggle = () => {
    setExpanded(!expanded)
  }

  const text = children.map(t =>
    t
      .replace(/"fn#fn/g, '')
      .replace(/fn#fn"/g, '')
      .replace(/\\n/g, '\n')
  )
  const Tag = expanded ? 'pre' : 'div'
  return (
    <div onClick={toggle} className={markdownClass('console')}>
      <Tag>{text}</Tag>
    </div>
  )
}

Console.propTypes = {
  children: PropTypes.array,
}

Console.defaultProps = {
  children: [],
}

export default Console
