import React, { Component, isValidElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isFunc, isString } from 'shineout/utils/is'
import { listClass } from '../styles'
import Image from '../Image'

class Meta extends Component {
  constructor(props) {
    super(props)
    this.renderAvatar = this.renderAvatar.bind(this)
    this.renderMeta = this.renderMeta.bind(this)
    this.renderMetaContainer = this.renderMetaContainer.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.renderTitle = this.renderTitle.bind(this)
    this.renderDesc = this.renderDesc.bind(this)
  }

  renderAvatar() {
    const { avatar } = this.props
    if (!avatar) return null
    if (isValidElement(avatar)) {
      return <div className={listClass('avatar')}>{avatar}</div>
    }
    if (isFunc(avatar)) {
      return <div className={listClass('avatar')}>{avatar()}</div>
    }
    if (isString(avatar))
      return (
        <div className={listClass('avatar')}>
          <Image src={avatar} />
        </div>
      )

    return null
  }

  renderTitle() {
    const { title } = this.props
    if (!title) return null
    return <div className={listClass('meta-title')}>{title}</div>
  }

  renderDesc() {
    const { desc } = this.props
    if (!desc) return null
    return <div className={listClass('meta-desc')}>{desc}</div>
  }

  renderMeta() {
    const { title, desc, content } = this.props
    if (!title && !desc && !content) return null
    return (
      <div className={listClass('meta-meta')}>
        {this.renderTitle()}
        {this.renderDesc()}
        {this.renderContent(true)}
      </div>
    )
  }

  renderMetaContainer() {
    return (
      <div className={listClass('meta-container')}>
        {this.renderAvatar()}
        {this.renderMeta()}
      </div>
    )
  }

  renderContent(flag = false) {
    const { content, desc, title } = this.props
    if (!content) return null
    if (flag) {
      if (isFunc(content)) return <div className={listClass('meta-desc')}>content()</div>
      return <div className={listClass('meta-desc')}>{content}</div>
    }

    if (!desc || !title) return null
    if (isFunc(content)) return <div className={listClass('meta-content')}>{content()}</div>
    return <div className={listClass('meta-content')}>{content}</div>
  }

  render() {
    const { className } = this.props
    return (
      <div className={classnames(listClass('meta'), className)}>
        {this.renderMetaContainer()}
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
