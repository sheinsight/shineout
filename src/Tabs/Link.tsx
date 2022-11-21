import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { tabsClass } from './styles'
import { isLink } from '../utils/is'
import { TabsLinkProps } from './Props'

class Link extends PureComponent<TabsLinkProps> {
  static isTabLink: boolean

  render() {
    const { children, href, className, ...other } = this.props
    const mergeClass = classnames(className, tabsClass('link'))

    const props = {
      className: mergeClass,
      href,
      ...other,
    }

    if (isLink(children)) {
      if (children!.props.onClick) {
        props.onClick = () => {
          children.props.onClick()
          other.onClick!()
        }
      }
      return React.cloneElement(children, { ...props })
    }

    return <a {...props}>{children}</a>
  }
}

Link.isTabLink = true

export default Link
