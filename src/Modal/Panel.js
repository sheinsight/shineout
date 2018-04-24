import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Icons from '../icons'
import Card from '../Card'
import Button from '../Button'
import { defaultProps, getProps } from '../utils/proptypes'
import { modalClass } from '../styles'

export default class Panel extends PureComponent {
  constructor(props) {
    super(props)
    this.specialContent = this.specialContent.bind(this)
  }

  getStyle() {
    const { width, top } = this.props
    return { width, top }
  }

  // eslint-disable-next-line
  lockWheel(event) {
    event.preventDefault()
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

  renderContent() {
    const { children, title, type } = this.props

    if (type === 'default') return <Card.Body>{children}</Card.Body>

    const iconType = type.charAt(0).toUpperCase() + type.slice(1)
    const icon = Icons[iconType]

    return (
      <Card.Body className={modalClass('body')}>
        { icon && <div className={modalClass('icon')}>{icon}</div> }
        { title && <div className={modalClass('title')}>{title}</div> }
        <div>{children}</div>
      </Card.Body>
    )
  }

  render() {
    const { footer, title, type } = this.props

    const className = classnames(
      modalClass('panel', type),
      this.props.className,
    )

    return [
      <div key="mask" onWheel={this.lockWheel} className={modalClass('mask')} />,
      <Card key="card" className={className} style={this.getStyle()}>
        <a className={modalClass('close')} onClick={this.props.onClose} href="javascript:;">
          {Icons.Close}
        </a>
        {
          title && type === 'default' &&
          <Card.Header className={(modalClass('title'))}>{title}</Card.Header>
        }
        { this.renderContent() }
        {
          footer &&
          <Card.Footer className={(modalClass('footer'))} align="right">
            { footer }
          </Card.Footer>
        }
      </Card>,
    ]
  }
}

Panel.propTypes = {
  ...getProps(),
  footer: PropTypes.any,
  id: PropTypes.string.isRequired,
  maskCloseAble: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  type: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

Panel.defaultProps = {
  ...defaultProps,
  top: '10vh',
  width: 500,
}
