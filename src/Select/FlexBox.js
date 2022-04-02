import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Component } from '../component'
import { selectClass } from './styles'

export default class FlexBox extends Component {
  constructor(props) {
    super(props)
    this.handleReadapta = this.handleReadapta.bind(this)
    this.state = {
      maxCount: Infinity,
    }
  }

  componentDidMount() {
    this.adapta()
    this.addResizeObserver()
  }

  componentDidUpdate(prevProps) {
    const { children } = this.props
    if (React.Children.count(prevProps.children) !== React.Children.count(children)) {
      this.handleReadapta()
    }
  }

  componentWillUnmount() {
    this.removeResizeObserver()
  }

  bindContainer = el => {
    this.container = el
  }

  adapta = () => {
    if (!this.container) return
    const { onFlex, addition } = this.props
    const maxRight = this.container.getBoundingClientRect().right
    const children = Array.from(this.container.children)
    let maxCount = children.length
    const additionWidth = typeof addition === 'function' ? addition() : addition
    for (let i = 0; i < children.length; i++) {
      const item = children[i]
      if (item.getBoundingClientRect().right + additionWidth > maxRight) {
        maxCount = i
        break
      }
    }
    if (maxCount === 0) maxCount = 1
    const lastItem = children[maxCount - 1]
    if (lastItem && onFlex) onFlex(maxCount, lastItem.offsetLeft + lastItem.clientWidth)
    this.setState({ maxCount })
  }

  handleReadapta() {
    this.setState({ maxCount: Infinity }, this.adapta)
  }

  removeResizeObserver() {
    if (this.observer) this.observer.disconnect()
    else window.removeEventListener('resize', this.handleReadapta)
  }

  addResizeObserver() {
    if (window.ResizeObserver) {
      this.observer = new ResizeObserver(this.handleReadapta)
      this.observer.observe(this.container)
    } else {
      window.addEventListener('resize', this.handleReadapta)
    }
  }

  render() {
    const { children, className, style } = this.props
    const { maxCount } = this.state
    const mc = classnames(selectClass('flex-box'), className)
    return (
      <div className={mc} style={style} ref={this.bindContainer}>
        {React.Children.map(children, (item, index) => (index < maxCount ? item : null))}
      </div>
    )
  }
}

FlexBox.defaultProps = {
  addition: 0,
}

FlexBox.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.object,
  onFlex: PropTypes.func,
  addition: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
}
