import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { listClass } from '../styles'
import Meta from './Meta'
import Extra from './Extra'

class BaseItem extends PureComponent {
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

BaseItem.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  title: PropTypes.string,
  desc: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
}

export default BaseItem
