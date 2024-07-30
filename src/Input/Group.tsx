import React, { Children, cloneElement } from 'react'
import { InputGroupProps } from './Props'

function Group(props: InputGroupProps) {
  const { children, style, inputFocus, onBlur, ...other } = props

  return Children.toArray(children).map((child: React.ReactElement, i) => {
    const onChlidBlur = (e: React.FocusEvent<HTMLElement>) => {
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

export default Group
