import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Icons from '../icons'
import Card from '../Card'
import { defaultProps, getProps } from '../utils/proptypes'
import { modalClass } from '../styles'
import { Provider } from '../Scroll/context'
import { Provider as ZProvider } from './context'
import { isRTL } from '../config'

function setTransformOrigin(node, value) {
  const { style } = node
  style.transformOrigin = value
}

let mousePosition = null
const getClickPosition = e => {
  mousePosition = {
    x: e.clientX,
    y: e.clientY,
  }
  setTimeout(() => {
    mousePosition = null
  }, 100)
}

document.addEventListener('click', getClickPosition, true)

export default class Panel extends PureComponent {
  panel = null

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    const { container } = this.props
    this.updateOrigin()
    this.animate()

    const { autoFocusButton, id } = this.props
    if (!autoFocusButton) return
    const el = container.querySelector(`#${id}-${autoFocusButton}`)
    if (!el) return
    el.focus()
  }

  componentDidUpdate() {
    if (this.getShow()) return
    this.updateOrigin()
    this.animate()
  }

  getShow() {
    const { container } = this.props
    if (container.classList.contains(modalClass('show'))) return true
    return false
  }

  getStyle() {
    const { width, height, top, position, style } = this.props

    return Object.assign(
      {
        position: 'absolute',
      },
      position
        ? {}
        : {
            display: 'inline-flex',
            width,
            height,
            top,
            position: 'relative',
          },
      style || {}
    )
  }

  savePanel = node => {
    this.panel = node
  }

  animate() {
    const { container, position } = this.props
    setTimeout(() => {
      container.classList.add(modalClass('show'))
      if (!position) container.classList.add(modalClass('start'))
    })
  }

  updateOrigin() {
    const { position, zoom } = this.props
    if (position || !zoom) return
    const node = this.panel
    setTransformOrigin(node, '')
    if (node) {
      if (mousePosition) {
        const { left, top } = node.getBoundingClientRect()
        const ol = mousePosition.x - left
        const ot = mousePosition.y - top
        setTransformOrigin(node, `${ol}px ${ot}px`)
      } else {
        setTransformOrigin(node, '')
      }
    }
  }

  // eslint-disable-next-line
  lockWheel(event) {
    event.preventDefault()
  }

  handleClose(e) {
    const { maskCloseAble, onClose } = this.props
    const { target } = e
    if (!maskCloseAble) return
    if (target.matches(`.${modalClass('mask')}`) && onClose) onClose()
  }

  renderIcon() {
    const { type } = this.props
    if (type === 'default') return null
    const iconType = type.charAt(0).toUpperCase() + type.slice(1)
    return Icons[iconType]
  }

  renderTitle(justRenderClassComponent = false) {
    const { from, title } = this.props
    if (!title) return null

    // method component
    if (from === 'method') {
      // if just render class Component, return null
      if (justRenderClassComponent) return null
      // for  method function
      return <div className={modalClass('title')}>{title}</div>
    }

    // base Component
    const icon = this.renderIcon()

    return (
      <Card.Header className={modalClass('title', icon && 'with-icon')}>
        {icon && <div className={modalClass('icon')}>{icon}</div>}
        {title}
      </Card.Header>
    )
  }

  renderContent() {
    const { children, noPadding, padding, position, bodyStyle, from = null } = this.props

    let style = { padding: noPadding === true ? 0 : padding }
    if (position) style.overflow = 'auto'

    if (bodyStyle) style = Object.assign(style, bodyStyle)

    if (!from || from !== 'method') return <Card.Body style={style}>{children}</Card.Body>

    const icon = this.renderIcon()

    return (
      <Card.Body className={modalClass('body')} style={style}>
        {icon && <div className={modalClass('icon')}>{icon}</div>}
        {this.renderTitle()}
        <div>{children}</div>
      </Card.Body>
    )
  }

  render() {
    const {
      footer,
      type,
      onClose,
      maskCloseAble,
      position,
      moveable,
      zoom,
      resizable,
      hideClose,
      from,
      top,
      events,
    } = this.props

    const rtl = isRTL()

    const className = classnames(
      modalClass('panel', type, position, zoom && !moveable && 'zoom', rtl && 'rtl'),
      this.props.className
    )
    const showClose = typeof hideClose === 'boolean' ? !hideClose : maskCloseAble || maskCloseAble === null
    const maskStyle = { paddingBottom: top }
    return (
      <ZProvider value>
        <Provider value={{ element: undefined }}>
          <div {...events} style={maskStyle} className={modalClass('mask')} onClick={this.handleClose}>
            <Card
              forwardedRef={this.savePanel}
              moveable={moveable}
              resizable={resizable}
              shadow
              className={className}
              style={this.getStyle()}
            >
              {showClose && (
                <a className={modalClass('close', rtl && 'rtl')} onClick={onClose}>
                  {Icons.Close}
                </a>
              )}
              {this.renderTitle(true)}
              {this.renderContent()}
              {footer && (
                <Card.Footer className={modalClass('footer', from)} align="right">
                  {footer}
                </Card.Footer>
              )}
            </Card>
          </div>
        </Provider>
      </ZProvider>
    )
  }
}

Panel.displayName = 'ShineoutModalPanel'

Panel.propTypes = {
  ...getProps(PropTypes),
  footer: PropTypes.any,
  maskCloseAble: PropTypes.bool,
  noPadding: PropTypes.bool,
  onClose: PropTypes.func,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  position: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  moveable: PropTypes.bool,
  resizable: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  hideClose: PropTypes.bool,
  from: PropTypes.string,
  zoom: PropTypes.bool,
  container: PropTypes.any,
  events: PropTypes.object,
}

Panel.defaultProps = {
  ...defaultProps,
  top: '10vh',
  maskCloseAble: true,
  width: 500,
  events: {},
}
