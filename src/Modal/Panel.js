import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Icons from '../icons'
import Card from '../Card'
import { defaultProps, getProps } from '../utils/proptypes'
import { modalClass } from '../styles'

export default class Panel extends PureComponent {
  getStyle() {
    const {
      width, height, top, position,
    } = this.props

    return Object.assign({
      position: 'absolute',
    }, position ? {} : {
      width, height, top, position: 'relative',
    })
  }

  // eslint-disable-next-line
  lockWheel(event) {
    event.preventDefault()
  }

  renderContent() {
    const {
      children, noPadding, title, type, padding, position,
    } = this.props

    const style = { padding: noPadding === true ? 0 : padding }
    if (position) style.overflow = 'auto'

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
      footer, title, type, onClose, maskCloseAble, position,
    } = this.props

    const className = classnames(
      modalClass('panel', type, position),
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

Panel.displayName = 'ShineoutModalPanel'

Panel.propTypes = {
  ...getProps(PropTypes),
  footer: PropTypes.any,
  id: PropTypes.string.isRequired,
  maskCloseAble: PropTypes.bool,
  noPadding: PropTypes.bool,
  onClose: PropTypes.func,
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  position: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
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
  width: 500,
}
