import React, { ReactNode } from 'react'
import classnames from 'classnames'
import { isRTL } from '../config'
import { PureComponent } from '../component'
import { range } from '../utils/numbers'
import { defaultProps } from '../utils/proptypes'
import { rateClass } from './styles'
import getDataset from '../utils/dom/getDataset'
import { OriginRateProps } from './Props'

const MIN_SIZE = 12

interface RateState {
  hover: number
  highlight: number
}

const DefaultProps = {
  ...defaultProps,
  repeat: true,
  max: 5,
  size: 20,
  text: [],
  value: 0,
}

class Rate extends PureComponent<OriginRateProps, RateState> {
  static defaultProps = DefaultProps

  highlightTimer: NodeJS.Timeout

  constructor(props: OriginRateProps) {
    super(props)
    this.state = {
      hover: 0,
      highlight: -1,
    }
  }

  getValue() {
    const { hover } = this.state
    return Number(hover === 0 ? this.props.value : hover)
  }

  getStyle() {
    const { size } = this.props
    if (!size) return undefined
    const parsed = Math.max(MIN_SIZE, parseFloat(`${size}`))
    return { width: parsed, fontSize: parsed, position: 'relative' } as React.CSSProperties
  }

  getScale() {
    const { size = DefaultProps.size } = this.props
    if (size >= MIN_SIZE) return undefined
    return {
      transform: `scale(${Number(size) / MIN_SIZE})`,
    }
  }

  getIcon(icons: ReactNode | ReactNode[], i: number, isBg?: boolean) {
    const { repeat, allowHalf } = this.props
    const value = this.getValue()
    const remain = value - i

    let icon
    if (!Array.isArray(icons)) {
      icon = icons
    } else {
      icon = icons[repeat ? value - 1 : i]
      if (!icon) icon = icons[icons.length - 1]
    }

    if (remain <= 0 || remain >= 1 || isBg) return icon

    const style = { width: `${remain * 100}%`, display: 'block', overflow: 'hidden', fontSize: 'inherit' }
    return (
      <span style={style} className={allowHalf ? rateClass('allow-half') : undefined}>
        {icon}
      </span>
    )
  }

  handleClick(value: number, e: React.MouseEvent) {
    const { clearable, allowHalf } = this.props
    if (allowHalf && (e.target as HTMLSpanElement).parentElement!.querySelector(`.${rateClass('allow-half')}`)) {
      value -= 0.5
    }
    if (clearable && this.props.value === value) {
      value = 0
      this.setState({ hover: 0 })
    }
    this.props.onChange(value)
    this.setState({ highlight: value })

    if (this.highlightTimer) clearTimeout(this.highlightTimer)
    this.highlightTimer = setTimeout(() => {
      this.setState({ highlight: -1 })
    }, 300)
  }

  handleHover(hover: number) {
    this.setState({ hover })
  }

  handleMove(hover: number, e: React.MouseEvent<HTMLSpanElement>) {
    const { x, width } = (e.target as HTMLSpanElement).getBoundingClientRect()
    let offset
    if (isRTL()) {
      offset = x + width / 2 < e.clientX ? 0.5 : 0
    } else {
      offset = x + width / 2 > e.clientX ? 0.5 : 0
    }
    this.setState({ hover: hover - offset })
  }

  renderBackground() {
    const { background, max = DefaultProps.max, disabled } = this.props
    const style = this.getStyle()
    const value = this.getValue()

    return (
      <div className={rateClass('background')}>
        {range(max).map(v => (
          <span
            key={v}
            // the allowHalf only for the front same as background
            style={Object.assign({ visibility: !disabled && Math.floor(value) > v ? 'hidden' : 'visible' }, style)}
          >
            {this.getIcon(background, v, true)}
          </span>
        ))}
      </div>
    )
  }

  renderRate() {
    const { front, max = DefaultProps.max, text = DefaultProps.text, allowHalf } = this.props
    const { highlight } = this.state
    const value = this.getValue()
    const style = this.getStyle()

    return (
      <div className={rateClass('front')}>
        {range(max).map(v => (
          <span
            key={v}
            onClick={this.handleClick.bind(this, v + 1)}
            onMouseMove={allowHalf ? this.handleMove.bind(this, v + 1) : undefined}
            onMouseEnter={!allowHalf ? this.handleHover.bind(this, v + 1) : undefined}
            style={style}
          >
            {/* Fix React event onMouseLeave not triggered when moving cursor fast */}
            <div
              style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
              onMouseLeave={this.handleHover.bind(this, 0)}
            />
            {value > v ? this.getIcon(front, v) : <span>&nbsp;</span>}
            {highlight === v + 1 && <i className={rateClass('highlight')}>{this.getIcon(front, v)}</i>}
          </span>
        ))}
        <span className={rateClass('text')}>{text[Math.ceil(value) - 1]}</span>
      </div>
    )
  }

  renderStatic() {
    const { front, value = DefaultProps.value, max = DefaultProps.max, text = DefaultProps.text } = this.props
    const style = this.getStyle()

    return (
      <div className={rateClass('static')}>
        {range(max).map(v => (
          <span key={v} style={style}>
            {value > v && this.getIcon(front, v)}
          </span>
        ))}
        <span className={rateClass('text')}>{text[Math.ceil(value) - 1]}</span>
      </div>
    )
  }

  render() {
    const className = classnames(rateClass('_', isRTL() && 'rtl'), this.props.className)
    const ms = Object.assign({}, this.props.style, this.getScale())
    return (
      <div className={className} style={ms} {...getDataset(this.props)}>
        {this.renderBackground()}
        {this.props.disabled ? this.renderStatic() : this.renderRate()}
      </div>
    )
  }
}

export default Rate
