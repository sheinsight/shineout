import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Icons from '../icons'
import Card from '../Card'
import { defaultProps, getProps } from '../utils/proptypes'
import { modalClass } from '../styles'

export default class Panel extends PureComponent {
  getStyle() {
    const { width, height, top } = this.props
    return { width, height, top }
  }

  // eslint-disable-next-line
  lockWheel(event) {
    event.preventDefault()
  }

  renderContent() {
    const {
      children, noPadding, title, type, padding,
    } = this.props

    const style = {
      overflow: 'auto',
    }

    if (type === 'default') return <Card.Body style={style}>{children}</Card.Body>

    const iconType = type.charAt(0).toUpperCase() + type.slice(1)
    const icon = Icons[iconType]

    return (
      <Card.Body className={modalClass('body')} style={style}>
        { icon && <div className={modalClass('icon')}>{icon}</div> }
        { title && <div className={modalClass('title')}>{title}</div> }
        <div>{children}</div>
      </Card.Body>
    )
  }

  render() {
    const {
      footer, title, type, onClose, maskCloseAble,
    } = this.props

    const className = classnames(
      modalClass('panel', type),
      this.props.className,
    )

    return [
      <div
        key="mask"
        className={modalClass('mask')}
        onClick={maskCloseAble ? onClose : undefined}
      />,

      <Card key="card" shadow className={className} style={this.getStyle()}>
        {
          (maskCloseAble || maskCloseAble === null) &&
          <a className={modalClass('close')} onClick={onClose} href="javascript:;">
            {Icons.Close}
          </a>
        }
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
  ...getProps(PropTypes),
  footer: PropTypes.any,
  id: PropTypes.string.isRequired,
  maskCloseAble: PropTypes.bool,
  noPadding: PropTypes.bool,
  onClose: PropTypes.func,
  padding: PropTypes.number,
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
  maskCloseAble: true,
  padding: 16,
  width: 500,
}
