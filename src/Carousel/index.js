import React, { Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { getProps, defaultProps } from '../utils/proptypes'
import { range } from '../utils/numbers'
import { carouselClass } from '../styles'
import Item from './Item'
import getDataset from '../utils/dom/getDataset'

class Carousel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      direction: 'stop',
      pre: 0,
    }

    this.handleMouseIn = this.handleMouseIn.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.moveTo = this.moveTo.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    this.setNext(1)
  }

  componentDidUpdate() {
    if (this.count > 1 && !this.$timeout) {
      this.setNext(this.state.current + 1)
    }
  }

  setNext(next) {
    const { interval } = this.props
    if (interval > 0 && this.count > 1) {
      if (this.$timeout) {
        clearTimeout(this.$timeout)
        this.$timeout = null
      }
      this.$timeout = setTimeout(() => {
        this.moveTo(next)
        this.$timeout = null
      }, interval)
    }
  }

  moveTo(next) {
    const { current } = this.state
    if (next === current) return

    let direction = next > current ? 'forward' : 'backward'
    if (next >= this.count) {
      direction = 'forward'
      next = 0
    }

    this.setState({ pre: current, current: next, direction })
    this.setNext(next + 1)
  }

  handleMouseIn() {
    this.mouseInView = true
  }

  handleMouseOut() {
    this.mouseInView = false
    this.setNext(this.state.current + 1)
  }

  renderItems() {
    const { current, pre } = this.state
    return Children.toArray(this.props.children).map((child, i) => (
      <Item key={i} current={i === current} pre={i === pre && pre !== current}>
        {child}
      </Item>
    ))
  }

  renderCustomIndicator() {
    const { indicatorType, indicatorPosition } = this.props
    const { current } = this.state
    const className = carouselClass('indicator', `indicator-${indicatorPosition}`)
    return <div className={className}>{indicatorType(current, this.moveTo)}</div>
  }

  renderIndicator() {
    const { indicatorPosition, indicatorType } = this.props
    if (typeof indicatorType === 'function') {
      return this.renderCustomIndicator()
    }
    const { current } = this.state
    const className = carouselClass('indicator', `indicator-${indicatorPosition}`, `indicator-${indicatorType}`)

    const inds = range(this.count).map(i => (
      <a key={i} onClick={this.moveTo.bind(this, i)} className={carouselClass(current === i && 'indicator-active')}>
        {indicatorType === 'number' ? i + 1 : ''}
      </a>
    ))
    return <div className={className}>{inds}</div>
  }

  render() {
    this.count = Children.toArray(this.props.children).length

    const { animation, style } = this.props
    const { direction } = this.state
    const className = classnames(carouselClass('_', animation, direction), this.props.className)

    return (
      <div className={className} style={style} {...getDataset(this.props)}>
        {this.renderItems()}
        {this.count > 1 && this.renderIndicator()}
      </div>
    )
  }
}

Carousel.propTypes = {
  ...getProps(PropTypes, 'size', 'type'),
  animation: PropTypes.oneOf(['slide', 'slide-y', 'fade']),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  indicatorPosition: PropTypes.oneOf(['left', 'center', 'right']),
  indicatorType: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(['number', 'circle', 'line'])]),
  interval: PropTypes.number,
}

Carousel.defaultProps = {
  ...defaultProps,
  animation: 'slide',
  indicatorPosition: 'center',
  indicatorType: 'circle',
  interval: 0,
}

Carousel.displayName = 'ShineoutCarousel'

export default Carousel
