import React, { PureComponent, ReactNode } from 'react'
import classnames from 'classnames'
import { listClass } from './styles'
import Meta from './Meta'
import Extra from './Extra'

interface BaseItemProps {
  desc: string
  title?: string
  className?: string
  extra?: ReactNode[]
  avatar: ReactNode | (() => ReactNode)
  content?: ReactNode | (() => ReactNode)
}

class BaseItem extends PureComponent<BaseItemProps> {
  render() {
    const { className, extra, ...props } = this.props

    if (!extra) return <Meta {...props} className={className} />
    return (
      <div className={classnames(listClass('base'), className)}>
        <Meta {...this.props} />
        <Extra extra={extra} />
      </div>
    )
  }
}

export default BaseItem
