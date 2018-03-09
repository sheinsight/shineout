import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

function Group(props) {
  const { children, style, ...other } = props
  return Children.toArray(children).map((child, i) => {
    if (typeof child === 'string') {
      return <span key={i}>{child}</span>
    }
    return cloneElement(child, other)
  })
}

Group.propTypes = {
  children: PropTypes.any,
}

export default Group
