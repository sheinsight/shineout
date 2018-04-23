import React from 'react'
import classnames from 'classnames'
import Card from './Card'
import Submit from './Submit'
import { cardClass } from '../styles'

function panel(cn) {
  // eslint-disable-next-line
  return ({ align, className, ...props }) => {
    const newClassName = classnames(cardClass(cn, align), className)
    return <div {...props} className={newClassName} />
  }
}

Card.Header = panel('header')
Card.Body = panel('body')
Card.Footer = panel('footer')
Card.Submit = Submit

export default Card
