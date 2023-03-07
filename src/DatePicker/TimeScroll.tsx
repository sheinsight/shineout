import React, { PureComponent } from 'react'
import { range } from '../utils/numbers'
import { datepickerClass } from './styles'
import paramUtils from './paramUtils'
import { getLocale } from '../locale'
import { TimeScrollProps } from './Props'

const lineHeight = 30
const grayStyle = {
  1: { color: '#888' },
  2: { color: '#ccc' },
  3: { color: '#eee' },
}

const DefaultValue = {
  total: 60,
}

class TimeScroll extends PureComponent<TimeScrollProps> {
  static defaultProps = DefaultValue

  element: HTMLDivElement

  constructor(props: TimeScrollProps) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.updateScrollTop()
  }

  componentDidUpdate() {
    this.updateScrollTop()
  }

  getOptions() {
    const { timeZone } = this.props
    return { timeZone, weekStartsOn: getLocale('startOfWeek') }
  }

  getValue(v: number) {
    const { step, ampm } = this.props
    if (!step || ampm) return v
    return Math.ceil(v / step)
  }

  getItemStyle(num: number, isDisabled: boolean): React.CSSProperties | null {
    if (isDisabled) return null
    if (this.props.ampm || (typeof this.props.step === 'number' && this.props.step > 0)) {
      if (this.props.value % this.props.step!) return null

      return grayStyle[Math.ceil(Math.abs(this.props.value - num) / this.props.step!) as keyof typeof grayStyle]
    }
    return grayStyle[Math.abs(this.props.value - num) as keyof typeof grayStyle]
  }

  bindElement(el: HTMLDivElement) {
    this.element = el
  }

  updateScrollTop() {
    const { value } = this.props
    if (!this.element) return
    if (typeof this.props.step === 'number' && this.props.step > 0 && value % this.props.step) return
    if (this.element.scrollTop !== lineHeight * value) {
      setTimeout(() => {
        if (this.element) this.scrollToValue()
      })
    }
  }

  scrollToValue() {
    const { value } = this.props
    this.element.scrollTop = lineHeight * this.getValue(value)
  }

  handleClick(value: number) {
    this.props.onChange(value)
    this.element.scrollTop = lineHeight * this.getValue(value)
  }

  handleMouseLeave() {
    const value = Math.round(this.element.scrollTop / lineHeight)
    this.element.scrollTop = lineHeight * value
  }

  handleScroll() {
    const { step, ampm } = this.props
    const value = Math.round(this.element.scrollTop / lineHeight)
    if (value * step! === this.props.value) return
    if (typeof step === 'number' && step > 0 && !ampm && value !== this.props.value) {
      this.props.onChange(value * step)
      return
    }
    if (value !== this.props.value) this.props.onChange(value)
  }

  renderItem(num: number) {
    const {
      ampm,
      total = DefaultValue.total,
      value,
      step,
      mode,
      min,
      max,
      range: ra,
      current,
      disabled,
      disabledTime,
      index,
      rangeDate,
    } = this.props

    if (typeof step === 'number' && step <= 0) return null
    if (!ampm && typeof step === 'number' && num % step !== 0) return null

    let text: number | string = num
    if (ampm) text = ['am', 'pm'][num]
    else if (total === 12 && num === 0) text = '12'
    else if (num < 10) text = `0${num}`

    const [isDisabled] = paramUtils.judgeTimeByRange({
      target: num,
      value: current,
      mode,
      min,
      max,
      range: ra,
      disabled,
      disabledTime,
      options: this.getOptions(),
      index,
      rangeDate,
    })

    const className = datepickerClass(!isDisabled && value === num && 'time-active')
    return (
      <span
        key={num}
        className={className}
        style={this.getItemStyle(num, isDisabled)!}
        onClick={this.handleClick.bind(this, num)}
      >
        {text}
      </span>
    )
  }

  render() {
    const { total } = this.props
    return (
      <div
        ref={this.bindElement}
        className={datepickerClass('time-list')}
        onMouseLeave={this.handleMouseLeave}
        onScroll={this.handleScroll}
      >
        <div className={datepickerClass('pad')} />
        {range(total, 0).map(v => this.renderItem(v))}
        <div className={datepickerClass('pad')} />
      </div>
    )
  }
}

TimeScroll.defaultProps = {
  total: 60,
}

export default TimeScroll
