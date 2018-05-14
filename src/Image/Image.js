import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { addStack, removeStack } from '../utils/lazyload'
import { imageClass } from '../styles'

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
  }

  componentDidMount() {
    if (this.props.lazy) this.markToRender()
    else this.lazyId = addStack({ element: this.element, render: this.markToRender })
  }

  componentWillUnmount() {
    removeStack(this.lazyId)
    delete this.image
  }

  markToRender() {
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

  renderType(src) {
    const { title, type } = this.props

    return type === 'fill' || type === 'fit'
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
              <div style={{ padding: '0 10px', textAlign: 'center' }}>{title || 'Loading'}{' '}
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
            <div style={{ padding: '0 10px', textAlign: 'center' }}>{title || 'no found'}</div>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {
      href, height, style, shape, type, width, target,
    } = this.props

    const className = classnames(
      imageClass('_', shape, type),
      this.props.className,
    )

    const Tag = href ? 'a' : 'div'

    return (
      <Tag
        href={href}
        onClick={(href && target === '_modal') ? this.handleClick : undefined}
        target={target}
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
  ]),
  title: PropTypes.string,
  type: PropTypes.oneOf([
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
}

export default Image
