import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getUidStr } from '../utils/uid'
import Icons from '../icons'
import { defaultProps, getProps } from '../utils/proptypes'
import Button from '../Button'
import { modalClass } from '../styles'


export default class Panel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dialogStyle: {
        width: props.width,
      },
    }
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.specialContent = this.specialContent.bind(this)
  }
  specialContent() {
    const {
      title, okText, iconType, cancelText,
    } = this.props
    const iconClass = classnames(modalClass('content-special-icon', `content-special-icon-${iconType.toLowerCase()}`))
    const specialClass = classnames(modalClass('content-special'))
    const specialContent = classnames(modalClass('content-special-body'))
    const specialTitle = classnames(modalClass('content-special-title'))
    const specialButton = classnames(modalClass('content-special-button'))
    return (
      <div className={specialClass}>
        <div className={iconClass}>{Icons[iconType]}</div>
        <span className={specialTitle}>{title}</span>
        <div className={specialContent}>{this.props.children}</div>
        <Button type="primary" className={specialButton} onClick={this.handleOk}>{okText}</Button>
        {
          iconType === 'Confirm' ? <Button className={specialButton} onClick={this.handleCancel}>{cancelText}</Button> : null
        }
      </div>)
  }
  handleCancel() {
    if (this.props.onCancel) this.props.onCancel()
  }
  handleOk() {
    if (this.props.onOk) this.props.onOk()
  }
  render() {
    const {
      title, footer, okText, cancelText, special,
    } = this.props
    const className = classnames(
      modalClass('_'),
      this.props.className,
    )
    const titleClass = classnames(modalClass('title'))
    const contentClass = classnames(modalClass('content'))
    const footerClass = classnames(modalClass('footer'))
    const closeClass = classnames(modalClass('close'))
    return (
      <div style={this.state.dialogStyle} className={className}>
        {
          !special ? (
            <div className={titleClass}>
              {title}
              <a className={closeClass} href="javascript:;" onClick={this.handleCancel}>{Icons.Close}</a>
            </div>
          ) : null
        }
        <div className={contentClass}>
          {
            special ? this.specialContent() : this.props.children
          }
        </div>
        {
          footer !== null ? (
            <div className={footerClass}>
              {
                !footer ? [
                  <Button key={getUidStr()} onClick={this.handleCancel}>{cancelText}</Button>,
                  <Button type="primary" key={getUidStr()} onClick={this.handleOk}>{okText}</Button>,
                ] : footer
              }
            </div>
          ) : null
        }
      </div>)
  }
}

Panel.propTypes = {
  ...getProps(),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  footer: PropTypes.object,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  iconType: PropTypes.string,
}

Panel.defaultProps = {
  ...defaultProps,
  width: 426,
  cancelText: 'cancel',
  okText: 'ok',
}
