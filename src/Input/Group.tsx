import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { InputGroupProps } from './Props'

function Group(props: InputGroupProps) {
  const { children, style, inputFocus, ...other } = props
  return Children.toArray(children).map((child: React.ReactElement, i) => {
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
