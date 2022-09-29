import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { cardClass } from './styles'
import { isRTL } from '../config'
import { CardFooterProps } from './interface'

export default class Footer extends PureComponent<CardFooterProps> {

  render() {
    const { align, className, ...props } = this.props
    const newClassName = classnames(cardClass('footer', align, isRTL() && 'footer-rtl'), className)

    return <div {...props} className={newClassName} />
  }
}
