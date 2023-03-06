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

const CarouselDefaultProps: CarouselProps = {
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

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.moveTo = this.moveTo.bind(this)
    this.forward = this.forward.bind(this)
    this.backward = this.backward.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    this.start()
  }

  componentDidUpdate() {
    if (this.count > 1 && !this.$timeout) {
      this.start()
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.stop()
  }

  setNext(next: number) {
    if (this.mouseInView) return
    const { interval } = this.props
    if (interval > 0 && this.count > 1) {
      this.stop()
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
    } else if (next < 0) {
      direction = 'backward'
      next = this.count - 1
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

  forward() {
    this.moveTo(this.state.current + 1)
  }

  backward() {
    this.moveTo(this.state.current - 1)
  }

  stop() {
    if (this.$timeout) {
      clearTimeout(this.$timeout)
      this.$timeout = null
    }
  }

  start() {
    this.setNext(this.state.current + 1)
  }

  mouseEnterHandler = () => {
    this.mouseInView = true
    this.stop()
  }

  mouseLeaveHandler = () => {
    this.mouseInView = false
    this.start()
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

  renderArrow() {
    const { arrowClassName, showArrow } = this.props
    if (!showArrow) return null
    return (
      <div className={classnames(carouselClass('arrow', showArrow === 'hover' && 'arrow-hover'), arrowClassName)}>
        <div className={carouselClass('arrow-left')} onClick={this.backward} />
        <div className={carouselClass('arrow-right')} onClick={this.forward} />
      </div>
    )
  }

  render() {
    this.count = Children.toArray(this.props.children).length

    const { animation, style } = this.props
    const { direction } = this.state
    const className = classnames(carouselClass('_', animation, direction), this.props.className)

    return (
      <div
        className={className}
        style={style}
        onMouseEnter={this.mouseEnterHandler}
        onMouseLeave={this.mouseLeaveHandler}
        {...getDataset(this.props)}
      >
        {this.renderItems()}
        {this.renderArrow()}
        {this.count > 1 && this.renderIndicator()}
      </div>
    )
  }
}

export default Carousel as ComponentType<CarouselProps>
