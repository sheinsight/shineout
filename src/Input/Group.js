import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

function Group(props) {
  const { children, style, inputFocus, onBlur, ...other } = props
  return Children.toArray(children).map((child, i) => {
    const onChlidBlur = e => {
      const childBlurEvent = child.props.onBlur
      if (childBlurEvent) {
        childBlurEvent(e)
      }
      onBlur(e)
    }

    if (typeof child === 'string') {
      return <span key={i}>{child}</span>
    }
    return cloneElement(child, { ...other, onBlur: onChlidBlur })
  })
}

Group.propTypes = {
  children: PropTypes.any,
}

export default Group
