import React from 'react'
import { PureComponent } from '../component'
import Indicator from './Indicator'
import { sliderClass } from './styles'
import { per2value, value2per } from './utils'
import { isRTL } from '../config'
import { isFunc } from '../utils/is'
import { BaseSliderProps } from './Props'

interface SliderState {
  dragging: boolean
  length: number
}

const DefaultValue = {
  formatValue: (v: number) => v,
}

class Slider<Value extends number | number[]> extends PureComponent<BaseSliderProps<Value>, SliderState> {
  static defaultProps = DefaultValue

  parentElement: HTMLElement

  constructor(props: BaseSliderProps<Value>) {
    super(props)

    this.state = {
      dragging: false,
      length: value2per(props.value, props.scale),
    }

    this.bindElement = this.bindElement.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
  }

  componentDidUpdate(prevProps: BaseSliderProps<Value>) {
    const { value, scale } = this.props
    const { dragging } = this.state
    const len = scale.length
    if (prevProps.value !== value || (!dragging && prevProps.scale[len - 1] !== scale[len - 1])) {
      // eslint-disable-next-line
      this.setState({ length: value2per(value, scale) })
    }
  }

  bindElement(el: HTMLDivElement) {
    if (el && el.parentElement) this.parentElement = el.parentElement
  }

  length2value(length: number) {
    const { scale, step } = this.props
    return per2value(length, scale, step)
  }

  handleDrag(mx: number, my: number) {
    const { scale, onDrag, value, vertical, onIncrease } = this.props
    const m = vertical
      ? my / this.parentElement.clientHeight
      : (mx / this.parentElement.clientWidth) * (isRTL() ? -1 : 1)
    const { length } = this.state

    const min = this.props.min ? value2per(this.props.min, scale) : 0
    const max = this.props.max ? value2per(this.props.max, scale) : 1

    let newLength = length + (vertical ? -m : m)
    const needIncrease = newLength > 1

    if (newLength < min) newLength = min
    if (newLength > max) newLength = max

    if (needIncrease && onIncrease) onIncrease()

    this.setState({ length: newLength, dragging: true })

    if (onDrag) {
      const newValue = this.length2value(newLength)
      if (newValue !== value) onDrag(newValue)
    }
  }

  handleDragEnd() {
    const { length } = this.state
    const { scale } = this.props
    const value = this.length2value(length)

    this.setState({ length: value2per(value, scale), dragging: false })
    this.props.onChange(this.props.index, value)
  }

  renderResult() {
    const { autoHide, formatValue = DefaultValue.formatValue } = this.props
    if (!formatValue || !isFunc(formatValue)) return null

    const { dragging } = this.state
    const className = sliderClass('result', (!autoHide || dragging) && 'show')
    const value = formatValue(this.length2value(this.state.length))
    return <div className={className}>{value}</div>
  }

  render() {
    const { index, disabled, vertical } = this.props
    let { length } = this.state

    if (index === 1) length = 1 - length
    const style = { [vertical ? 'height' : 'width']: `${length * 100}%` }
    const className = sliderClass(
      'bar',
      vertical && (index === 1 ? 'top' : 'bottom'),
      !vertical && index === 1 && 'right'
    )

    return (
      <div ref={this.bindElement} style={style} className={className}>
        {this.renderResult()}
        <div className={sliderClass('bar-bg')} />
        <Indicator disabled={disabled} onDrag={this.handleDrag} onDragEnd={this.handleDragEnd} />
      </div>
    )
  }
}

export default Slider
