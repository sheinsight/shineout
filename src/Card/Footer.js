import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { cardClass } from './styles'
import { isRTL } from '../config'

export default class Footer extends PureComponent {
  static propTypes = {
    align: PropTypes.string,
    className: PropTypes.string,
  }

  render() {
    const { align, className, ...props } = this.props
    const newClassName = classnames(cardClass('footer', align, isRTL() && 'footer-rtl'), className)

    return <div {...props} className={newClassName} />
  }
}
