import React, { Children, ComponentType } from 'react'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { range } from '../utils/numbers'
import { carouselClass } from './styles'
import Item from './Item'
import getDataset from '../utils/dom/getDataset'
import { isRTL } from '../config'
import { CarouselProps } from './Props'

interface CarouselState {
  current: number
  direction: 'forward' | 'stop' | 'backward'
  pre: number
}

const CarouselDefaultProps = {
  animation: 'slide',
  indicatorPosition: 'center',
  indicatorType: 'circle',
  interval: 0,
  className: '',
  style: {},
}

type CarouselPropsWithDefault = CarouselProps & Required<Pick<CarouselProps, keyof typeof CarouselDefaultProps>>

class Carousel extends PureComponent<CarouselPropsWithDefault, CarouselState> {
  static defaultProps = CarouselDefaultProps

  static displayName = 'ShineoutCarousel'

  count: number

  $timeout: NodeJS.Timeout | null

  mouseInView: boolean

  constructor(props: CarouselPropsWithDefault) {
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

  componentWillUnmount() {
    super.componentWillUnmount()
    if (this.$timeout) {
      clearTimeout(this.$timeout)
      this.$timeout = null
    }
  }

  setNext(next: number) {
    const { interval } = this.props
    if (interval > 0 && this.count > 1) {
      if (this.$timeout) {
        clearTimeout(this.$timeout)
        this.$timeout = null
      }
      this.$timeout = setTimeout(() => {
        this.moveTo(next)
      }, interval)
    }
  }

  moveTo(next: number) {
    const { onMove } = this.props
    const { current } = this.state
    if (next === current) return

    let direction: 'forward' | 'backward' = next > current ? 'forward' : 'backward'
    if (next >= this.count) {
      direction = 'forward'
      next = 0
    }

    this.setState({ pre: current, current: next, direction })
    this.setNext(next + 1)
    if (onMove)
      onMove(next, {
        prev: current,
        direction,
        moveTo: this.moveTo,
      })
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
    if (typeof indicatorType === 'function') {
      return <div className={className}>{indicatorType(current, this.moveTo)}</div>
    }
    return null
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
    if (isRTL()) {
      inds.reverse()
    }
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

export default Carousel as ComponentType<CarouselProps>
