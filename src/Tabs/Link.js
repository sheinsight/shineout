import React, { PureComponent, isValidElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { tabsClass } from '../styles'

class Link extends PureComponent {
  render() {
    const { children, href, className, ...other } = this.props
    const mergeClass = classnames(className, tabsClass('link'))

    if (
      isValidElement(children) &&
      (children.type === 'a' || (children.type && children.type.displayName === 'Link'))
    ) {
      return React.cloneElement(children, { className: mergeClass, ...other })
    }

    return (
      <a href={href} className={mergeClass} {...other}>
        {children}
      </a>
    )
  }
}

Link.isTabLink = true

Link.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

export default Link
