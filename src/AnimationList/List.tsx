import React, { Component } from 'react'
import classnames from 'classnames'
import { listClass } from './styles'
import { ListProps } from './Props'

// Use Component cause stateless Element can't use ref
// eslint-disable-next-line
class List extends Component<ListProps> {
  static displayName = 'List'

  static defaultProps = {
    show: false,
  }

  render() {
    const className = classnames(listClass('_'), this.props.className)
    const { show, getRef, ...props } = this.props
    return <div ref={getRef} {...props} className={className} style={this.props.style} />
  }
}

export default List
