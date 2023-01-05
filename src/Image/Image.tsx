import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { addStack, removeStack } from '../utils/lazyload'
import { imageClass } from './styles'
import showGallery from './events'
import { getLocale } from '../locale'
import config from '../config'
import { removeProtocol } from '../utils/strings'
import getDataset from '../utils/dom/getDataset'
import { ImageProps } from './Props'
import Group from './Group'

interface State {
  status: number
}

const DefaultProps = {
  lazy: false,
  target: '_modal',
  width: '100%',
  height: '100%',
}

const PLACEHOLDER = 0
const SRC = 1
const ALT = 2
const ERROR = 3

export const IMAGE = {}

export class Image extends PureComponent<ImageProps, State> {
  static symbolType = IMAGE

  static defaultProps = DefaultProps

  static displayName: string

  static Group: typeof Group

  lazyId: string | null

  image?: HTMLImageElement

  element: HTMLElement | null

  constructor(props: ImageProps) {
    super(props)

    this.state = {
      status: PLACEHOLDER,
    }

    this.bindElement = this.bindElement.bind(this)
    this.markToRender = this.markToRender.bind(this)
    this.handleAlt = this.handleAlt.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    this.fetchImage()
  }

  componentDidUpdate(prevProps: ImageProps) {
    const { src, alt } = this.props
    if (prevProps.src !== src || prevProps.alt !== alt) {
      this.fetchImage()
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    removeStack(this.lazyId)
    delete this.image
  }

  getUrl(url: string) {
    const autoSSL = 'autoSSL' in this.props ? this.props.autoSSL : config.autoSSL
    if (autoSSL) return removeProtocol(url)
    return url
  }

  preview() {
    const { src, href } = this.props
    showGallery({ thumb: src, src: href || src, key: 'key' })
  }

  bindElement(el: HTMLElement | null) {
    this.element = el
  }

  fetchImage() {
    if (this.lazyId) removeStack(this.lazyId)
    if (!this.props.lazy) {
      this.markToRender()
    } else {
      const { container } = this.props
      this.lazyId = addStack({
        offset: typeof this.props.lazy === 'number' ? this.props.lazy : 0,
        element: this.element!,
        render: this.markToRender,
        container: typeof container === 'string' ? document.querySelector(container) : container,
      })
    }
  }

  markToRender() {
    const { src } = this.props
    if (!src) {
      this.handleAlt()
      return
    }

    delete this.image
    const image = new window.Image()
    image.onload = () => this.setState({ status: SRC })
    image.onerror = this.handleError.bind(this, SRC)
    image.src = this.getUrl(src)
    this.image = image
  }

  handleError(type: number, e: Event) {
    const { onError } = this.props
    if (onError) onError(e, type)
    if (type === SRC) this.handleAlt()
    else if (type === ALT) this.setState({ status: ERROR })
  }

  handleAlt() {
    const { alt } = this.props
    if (!alt) {
      this.setState({ status: ERROR })
      return
    }

    const image = new window.Image()
    image.onload = () => this.setState({ status: ALT })
    image.onerror = this.handleError.bind(this, ALT)
    image.src = this.getUrl(alt)
  }

  handleClick(e: React.MouseEvent) {
    const { onClick, target, src, href } = this.props
    if (onClick) {
      onClick(e)
      return
    }
    if (href && target === '_modal') {
      e.preventDefault()
      showGallery({ thumb: src, src: href || src, key: 'key' })
    }
  }

  renderType(src?: string) {
    const { title, fit } = this.props

    return fit === 'fill' || fit === 'fit' ? (
      <div className={imageClass('inner')} title={title} style={{ backgroundImage: `url("${src}")` }} />
    ) : (
      <div className={imageClass('inner')} title={title}>
        <img alt="" src={src} />
      </div>
    )
  }

  renderPlaceholder() {
    const { placeholder, title } = this.props
    if (React.isValidElement(placeholder)) {
      return <div className={imageClass('inner')}>{placeholder}</div>
    }
    return (
      <div className={imageClass('inner', 'mask')}>
        <div>
          {title}
          <span className={imageClass('placeholder')}>{placeholder || getLocale('loading')}</span>
        </div>
      </div>
    )
  }

  renderImage() {
    const { status } = this.state
    const { alt, src, title, error } = this.props

    switch (status) {
      case PLACEHOLDER:
        return this.renderPlaceholder()
      case SRC:
        return this.renderType(src)
      case ALT:
        return this.renderType(alt)
      case ERROR:
        return (
          <div className={imageClass('inner', 'mask')}>
            <div>{error || title || getLocale('notFound')}</div>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const { href, height, style, shape, fit, width, target } = this.props

    const className = classnames(imageClass('_', shape, fit), this.props.className)

    const Tag = href ? 'a' : 'div'

    const props = {
      ref: this.bindElement,
      onClick: this.handleClick,
      target: target === '_download' ? '_self' : target,
      download: target === '_download',
      className,
      style: Object.assign({}, style, { width, paddingBottom: height }),
      ...getDataset(this.props),
    }
    if (!href || target !== '_modal') (props as typeof props & { href?: string }).href = href
    return <Tag {...props}>{this.renderImage()}</Tag>
  }
}
