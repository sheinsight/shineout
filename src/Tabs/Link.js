import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { tabsClass } from './styles'
import { isLink } from '../utils/is'

class Link extends PureComponent {
  render() {
    const { children, href, className, ...other } = this.props
    const mergeClass = classnames(className, tabsClass('link'))

    const props = {
      className: mergeClass,
      href,
      ...other,
    }

    if (isLink(children)) {
      if (children.props.onClick) {
        props.onClick = () => {
          children.props.onClick()
          other.onClick()
        }
      }
      return React.cloneElement(children, { ...props })
    }

    return <a {...props}>{children}</a>
  }
}

Link.isTabLink = true

Link.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

export default Link
