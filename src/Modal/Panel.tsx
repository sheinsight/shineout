import React, { CSSProperties, PureComponent } from 'react'
import classnames from 'classnames'
import Icons from '../icons'
import Card from '../Card'
import { defaultProps } from '../utils/proptypes'
import { modalClass } from './styles'
import { Provider } from '../Scroll/context'
import { Provider as ZProvider } from './context'
import { ModalPanelProps } from './Props'

const DefaultValue = {
  ...defaultProps,
  top: '10vh',
  maskCloseAble: true,
  width: 500,
  events: {},
  drawer: false,
}

function setTransformOrigin(node: HTMLDivElement | null, value: string) {
  const { style } = node!
  style.transformOrigin = value
}

let mousePosition: { x: number; y: number } | null = null

const getClickPosition: EventListener = (e: any) => {
  mousePosition = {
    x: e.clientX,
    y: e.clientY,
  }
  setTimeout(() => {
    mousePosition = null
  }, 100)
}

document.addEventListener('click', getClickPosition, true)

export default class Panel extends PureComponent<ModalPanelProps> {
  static defaultProps = DefaultValue

  static displayName: string

  panel: HTMLDivElement | null

  handleMaskDown: () => void

  handleMaskUp: () => void

  maskDownTarget: EventTarget | null

  maskUpTarget: EventTarget | null

  constructor(props: ModalPanelProps) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleMaskDown = this.handleMaskClick.bind(this, 'maskDownTarget')
    this.handleMaskUp = this.handleMaskClick.bind(this, 'maskUpTarget')
  }

  componentDidMount() {
    const { container } = this.props
    this.updateOrigin()
    this.animate()

    const { autoFocusButton, id } = this.props
    if (!autoFocusButton) return
    const el = container!.querySelector(`#${id}-${autoFocusButton}`)
    if (!el) return
    ;(el as HTMLElement).focus()
  }

  componentDidUpdate() {
    if (this.getShow()) return
    this.updateOrigin()
    this.animate()
  }

  getShow() {
    const { container } = this.props
    if (container!.classList.contains(modalClass('show'))) return true
    return false
  }

  getStyle() {
    const { width, height, top, position, style, fullScreen, drawer } = this.props
    const w = fullScreen ? '100vw' : width
    const h = fullScreen ? '100vh' : height
    return Object.assign(
      {
        position: 'absolute',
      },
      position
        ? {
            width: drawer && ['left', 'right'].includes(position) ? w : undefined,
            height: drawer && ['top', 'bottom'].includes(position) ? h : undefined,
          }
        : {
            display: 'inline-flex',
            width: w,
            height: h,
            top: fullScreen ? 0 : top,
            position: 'relative',
          },
      style || {}
    )
  }

  savePanel = (node: HTMLDivElement) => {
    this.panel = node
  }

  animate() {
    const { container, position } = this.props
    setTimeout(() => {
      container!.classList.add(modalClass('show'))
      if (!position) container!.classList.add(modalClass('start'))
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
  // lockWheel(event) {
  //   event.preventDefault()
  // }

  handleMaskClick(type: 'maskDownTarget' | 'maskUpTarget', e: Event) {
    this[type] = e.target
  }

  handleClose(e: any) {
    e.stopPropagation()
    const { maskCloseAble, onClose } = this.props
    const { target } = e
    if (!maskCloseAble) return
    if (this.maskDownTarget !== this.maskUpTarget) return
    if (target.matches(`.${modalClass('mask')}`) && onClose) onClose()
  }

  renderIcon() {
    const { type } = this.props
    if (type === 'default') return null
    const iconType = type!.charAt(0).toUpperCase() + type!.slice(1)
    return Icons[iconType as keyof typeof Icons]
  }

  renderTitle(justRenderClassComponent = false) {
    const { from, title } = this.props
    if (!title) return null

    // method component
    if (from === 'method') {
      // if just render class Component, return null
      if (justRenderClassComponent) return null
      // for  method function
      return <div className={modalClass('title', 'method-title')}>{title}</div>
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

    let style: CSSProperties = { padding: noPadding === true ? 0 : padding }
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
      fullScreen,
    } = this.props
    const className = classnames(modalClass('panel', type, position, zoom && !moveable && 'zoom'), this.props.className)
    const showClose = typeof hideClose === 'boolean' ? !hideClose : maskCloseAble || maskCloseAble === null
    const maskStyle = { paddingBottom: fullScreen ? 0 : top }
    return (
      <ZProvider value>
        <Provider value={{ element: undefined }}>
          <div
            {...events}
            style={maskStyle}
            className={modalClass('mask')}
            onMouseDown={this.handleMaskDown}
            onMouseUp={this.handleMaskUp}
            onClick={this.handleClose}
          >
            <Card
              forwardedRef={this.savePanel}
              moveable={moveable}
              resizable={resizable}
              shadow
              className={className}
              style={this.getStyle()}
            >
              {showClose && (
                <a className={modalClass('close')} onClick={onClose}>
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
