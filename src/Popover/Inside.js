import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { popoverClass } from '../styles'

let root
function initRoot() {
  root = document.createElement('div')
  root.className = popoverClass('root')
  document.body.appendChild(root)
}

class Inside extends PureComponent {
  constructor(props) {
    super(props)

    if (!root) initRoot()

    this.state = { show: false }
    this.isRendered = false

    this.elementRef = this.placeholderRef.bind(this)
    this.handleShow = this.toggle.bind(this, true)
    this.handleHide = this.toggle.bind(this, false)

    this.element = document.createElement('div')
  }

  componentDidMount() {
    this.parentElement = this.placeholder.parentElement
    if (this.props.trigger === 'hover') {
      this.parentElement.addEventListener('mouseenter', this.handleShow)
      // this.parentElement.addEventListener('mouseleave', this.handleHide)
    } else {
      this.parentElement.addEventListener('click', this.handleShow)
    }

    root.appendChild(this.element)
  }

  componentWillUnmount() {
    this.parentElement.removeEventListener('mouseenter', this.handleShow)
    this.parentElement.removeEventListener('mouseleave', this.handleHide)
    this.parentElement.removeEventListener('click', this.handleShow)
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
    const style = Object.assign({}, this.props.style, { display: show ? 'block' : 'none', background })
    const className = popoverClass('_', position, type)

    return (
      <div className={className} style={colorStyle}>
        <div className={popoverClass('arrow')} style={colorStyle} />
        <div className={popoverClass('content')} style={style}>
          {children}
        </div>
      </div>
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
