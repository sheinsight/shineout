import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { addStack, removeStack } from '../utils/lazyload'
import { imageClass } from '../styles'
import showGellery from './events'

const PLACEHOLDER = 0
const SRC = 1
const ALT = 2
const ERROR = 3

class Image extends PureComponent {
  constructor(props) {
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
    if (!this.props.lazy) this.markToRender()
    else this.lazyId = addStack({ element: this.element, render: this.markToRender })
  }

  componentWillUnmount() {
    removeStack(this.lazyId)
    delete this.image
  }

  bindElement(el) {
    this.element = el
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
    image.onerror = this.handleAlt
    image.src = this.props.src
    this.image = image
  }

  handleAlt() {
    const { alt } = this.props
    if (!alt) {
      this.setState({ status: ERROR })
      return
    }

    const image = new window.Image()
    image.onload = () => this.setState({ status: ALT })
    image.onerror = () => this.setState({ status: ERROR })
    image.src = alt
  }

  handleClick(e) {
    e.preventDefault()
    const { onClick, src, href } = this.props
    if (onClick) onClick()
    else showGellery({ thumb: src, src: href || src })
  }

  renderType(src) {
    const { title, fit } = this.props

    return fit === 'fill' || fit === 'fit'
      ? <div className={imageClass('inner')} title={title} style={{ backgroundImage: `url("${src}")` }} />
      : <div className={imageClass('inner')} title={title}><img alt="" src={src} /></div>
  }

  renderImage() {
    const { status } = this.state
    const {
      alt, placeholder, src, title,
    } = this.props

    switch (status) {
      case PLACEHOLDER:
        return placeholder
          ? <div className={imageClass('inner')}>{placeholder}</div>
          : (
            <div className={imageClass('inner', 'mask')}>
              <div>
                {title}{' '}
                <span className={imageClass('ellipsis')} />
              </div>
            </div>
          )
      case SRC:
        return this.renderType(src)
      case ALT:
        return this.renderType(alt)
      case ERROR:
        return (
          <div className={imageClass('inner', 'mask')}>
            <div>{title || 'no found'}</div>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {
      href, height, style, shape, fit, width, target,
    } = this.props

    const className = classnames(
      imageClass('_', shape, fit),
      this.props.className,
    )

    const Tag = href ? 'a' : 'div'

    return (
      <Tag
        ref={this.bindElement}
        href={href && target === '_modal' ? 'javascript:;' : href}
        onClick={(href && target === '_modal') ? this.handleClick : undefined}
        target={target === '_download' ? '_self' : target}
        download={target === '_download'}
        className={className}
        style={Object.assign({}, style, { width, paddingBottom: height })}
      >
        { this.renderImage() }
      </Tag>
    )
  }
}

Image.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  href: PropTypes.string,
  lazy: PropTypes.bool,
  onClick: PropTypes.func,
  placeholder: PropTypes.element,
  shape: PropTypes.oneOf([
    'rounded',
    'circle',
    'thumbnail',
  ]),
  src: PropTypes.string,
  style: PropTypes.object,
  target: PropTypes.oneOf([
    '_blank',
    '_self',
    '_modal',
    '_download',
  ]),
  title: PropTypes.string,
  fit: PropTypes.oneOf([
    'fill',
    'fit',
    'stretch',
    'center',
  ]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

Image.defaultProps = {
  lazy: false,
  target: '_modal',
  width: '100%',
  height: '100%',
}

export const IMAGE = {}

Image.symbolType = IMAGE

export default Image
