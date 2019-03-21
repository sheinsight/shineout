import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import { getPosition } from '../utils/dom/popover'
import { isFunc } from '../utils/is'
import { popoverClass } from '../styles'
import { docSize } from '../utils/dom/document'

const emptyEvent = e => e.stopPropagation()

class Panel extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { show: false }
    this.isRendered = false

    this.placeholderRef = this.placeholderRef.bind(this)
    this.clickAway = this.clickAway.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleHide0 = this.handleHide.bind(this, 0)
    this.handleHide500 = this.handleHide.bind(this, 500)

    this.element = document.createElement('div')
  }

  componentDidMount() {
    super.componentDidMount()

    this.parentElement = this.placeholder.parentElement
    if (this.props.trigger === 'hover') {
      this.parentElement.addEventListener('mouseenter', this.handleShow)
      this.parentElement.addEventListener('mouseleave', this.handleHide500)
      this.element.addEventListener('mouseenter', this.handleShow)
      this.element.addEventListener('mouseleave', this.handleHide500)
    } else {
      this.parentElement.addEventListener('click', this.handleShow)
    }

    document.body.appendChild(this.element)
  }

  componentWillUnmount() {
    this.parentElement.removeEventListener('mouseenter', this.handleShow)
    this.parentElement.removeEventListener('mouseleave', this.handleHide500)
    this.parentElement.removeEventListener('click', this.handleShow)

    document.removeEventListener('click', this.clickAway)
    document.body.removeChild(this.element)
  }

  getPositionStr() {
    let { position } = this.props
    if (position) return position

    const rect = this.parentElement.getBoundingClientRect()
    const windowHeight = docSize.height
    const windowWidth = docSize.width
    if (rect.top + rect.height / 2 > windowHeight / 2) {
      position = 'top'
    } else {
      position = 'bottom'
    }

    if (rect.left < 100) position += '-right'
    else if (rect.right > windowWidth - 100) position += '-left'

    return position
  }

  placeholderRef(el) {
    this.placeholder = el
  }

  clickAway(e) {
    if (this.parentElement.contains(e.target)) return
    if (this.element.contains(e.target)) return
    this.handleHide(0)
  }

  handleShow() {
    if (this.closeTimer) clearTimeout(this.closeTimer)
    if (this.state.show) return
    document.addEventListener('click', this.clickAway)
    this.setState({ show: true })
    if (this.props.onOpen) this.props.onOpen()
  }

  handleHide(delay = 500) {
    this.closeTimer = setTimeout(() => {
      document.removeEventListener('click', this.clickAway)
      this.setState({ show: false })
      if (this.props.onClose) this.props.onClose()
    }, delay)
  }

  toggle(show) {
    if (this.closeTimer) clearTimeout(this.closeTimer)
    this.setState({ show })
  }

  render() {
    const { background, border, children, type } = this.props
    const { show } = this.state

    if (!show && !this.isRendered) return <noscript ref={this.placeholderRef} />
    this.isRendered = true

    const colorStyle = { background, borderColor: border }
    const innerStyle = Object.assign({}, this.props.style, { background })
    const position = this.getPositionStr()
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
        <div key="content" onClick={emptyEvent} className={popoverClass('content')} style={innerStyle}>
          {isFunc(children) ? children(this.handleHide0) : children}
        </div>,
      ],
      this.element
    )
  }
}

Panel.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.any,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  position: PropTypes.string,
  style: PropTypes.object,
  trigger: PropTypes.oneOf(['click', 'hover']),
  type: PropTypes.string,
}

Panel.defaultProps = {
  background: '',
  trigger: 'hover',
}

export default Panel
