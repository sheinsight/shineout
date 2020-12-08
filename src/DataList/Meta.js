import React, { Component, isValidElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isFunc, isString } from '../utils/is'
import { listClass } from '../styles'
import Image from '../Image'

const metaClass = (...a) => listClass(...a.map(v => `meta-${v}`))

class Meta extends Component {
  renderAvatar() {
    const { avatar } = this.props
    if (!avatar) return null
    if (isValidElement(avatar)) {
      return <div className={metaClass('avatar')}>{avatar}</div>
    }
    if (isFunc(avatar)) {
      return <div className={metaClass('avatar')}>{avatar()}</div>
    }
    if (isString(avatar))
      return (
        <div className={metaClass('avatar')}>
          <Image lazy src={avatar} />
        </div>
      )

    return null
  }

  renderTitle() {
    const { title, desc } = this.props
    if (!title) return null
    const flag = !desc
    return <div className={metaClass('title', flag && 'center')}>{title}</div>
  }

  renderDesc() {
    const { desc, title } = this.props
    if (!desc) return null
    const flag = !title
    return <div className={metaClass('desc', flag && 'center')}>{desc}</div>
  }

  renderContent() {
    const { content } = this.props
    if (!content) return null
    if (isFunc(content)) return <div className={metaClass('content')}>{content()}</div>
    return <div className={metaClass('content')}>{content}</div>
  }

  render() {
    const { className, content, title, desc } = this.props

    // if content && title && desc is all null, just render avatar
    if (!content && !title && !desc) {
      return <div className={classnames(listClass('meta'), className)}>{this.renderAvatar()}</div>
    }

    // if title && desc is null, render classic layout
    if (!title && !desc) {
      return (
        <div className={classnames(listClass('meta', 'includes'), className)}>
          {this.renderAvatar()}
          {this.renderContent()}
        </div>
      )
    }

    // full layout
    return (
      <div className={classnames(listClass('meta'), className)}>
        <div className={metaClass('container')}>
          {this.renderAvatar()}
          <div className={metaClass('meta')}>
            {this.renderTitle()}
            {this.renderDesc()}
          </div>
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

Meta.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  title: PropTypes.string,
  desc: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
}

export default Meta
