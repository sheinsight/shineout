import React, { PureComponent, isValidElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { tabsClass } from '../styles'

class Link extends PureComponent {
  render() {
    const { children, href, className, elRef, ...other } = this.props
    const mergeClass = classnames(className, tabsClass('link'))

    const props = {
      className: mergeClass,
      href,
      ref: elRef,
      ...other,
    }

    if (
      isValidElement(children) &&
      (children.type === 'a' || (children.type && children.type.displayName === 'Link'))
    ) {
      return React.cloneElement(children, { ...props })
    }

    return <a {...props}>{children}</a>
  }
}

Link.isTabLink = true

Link.propTypes = {
  elRef: PropTypes.func,
  className: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

export default Link
