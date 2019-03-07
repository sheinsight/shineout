import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { getPosition } from '../utils/dom/popover'
import { popoverClass } from '../styles'

class Inside extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { show: false }
    this.isRendered = false

    this.placeholderRef = this.placeholderRef.bind(this)
    this.handleShow = this.toggle.bind(this, true)
    this.handleHide = () => {
      setTimeout(() => {
        this.toggle(false)
      }, 500)
    }

    this.element = document.createElement('div')
  }

  componentDidMount() {
    this.parentElement = this.placeholder.parentElement
    if (this.props.trigger === 'hover') {
      this.parentElement.addEventListener('mouseenter', this.handleShow)
      this.parentElement.addEventListener('mouseleave', this.handleHide)
    } else {
      this.parentElement.addEventListener('click', this.handleShow)
    }

    document.body.appendChild(this.element)
  }

  componentWillUnmount() {
    this.parentElement.removeEventListener('mouseenter', this.handleShow)
    this.parentElement.removeEventListener('mouseleave', this.handleHide)
    this.parentElement.removeEventListener('click', this.handleShow)

    document.body.removeChild(this.element)
  }

  placeholderRef(el) {
    this.placeholder = el
  }

  toggle(show) {
    this.setState({ show })
  }

  render() {
    const { background, border, children, position, type } = this.props
    const { show } = this.state

    if (!show && !this.isRendered) return <noscript ref={this.placeholderRef} />
    this.isRendered = true

    const colorStyle = { background, borderColor: border }
    const innerStyle = Object.assign({}, this.props.style, { background })
    const pos = getPosition(position, this.parentElement)
    this.element.className = popoverClass('_', position, type)
    // eslint-disable-next-line
    const style = this.element.style
    style.left = `${pos.left}px`
    style.top = `${pos.top}px`
    style.display = show ? 'block' : 'none'
    if (background) style.background = background
    if (border) style.borderColor = border

    return ReactDOM.createPortal(
      [
        <div key="arrow" className={popoverClass('arrow')} style={colorStyle} />,
        <div key="content" className={popoverClass('content')} style={innerStyle}>
          {children}
        </div>,
      ],
      this.element
    )
  }
}

Inside.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.any,
  position: PropTypes.string,
  style: PropTypes.object,
  trigger: PropTypes.oneOf(['click', 'hover']),
  type: PropTypes.string,
}

Inside.defaultProps = {
  background: '#fff',
  position: 'top',
  trigger: 'hover',
}

export default Inside
