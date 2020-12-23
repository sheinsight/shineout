import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { range } from '../utils/numbers'
import { getParent } from '../utils/dom/element'
import { getProps, defaultProps } from '../utils/proptypes'
import { rateClass } from '../styles'
import getDataset from '../utils/dom/getDataset'

const MIN_SIZE = 12
class Rate extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      hover: 0,
      highlight: -1,
    }
  }

  getValue() {
    const { hover } = this.state
    return hover === 0 ? this.props.value : hover
  }

  getStyle() {
    const { size } = this.props
    if (!size) return undefined
    const parsed = Math.max(MIN_SIZE, parseFloat(size))
    return { width: parsed, fontSize: parsed }
  }

  getScale() {
    const { size } = this.props
    if (size >= MIN_SIZE) return undefined
    return {
      transform: `scale(${size / MIN_SIZE})`,
    }
  }

  getIcon(icons, i, isBg) {
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
      <span style={style} className={allowHalf && rateClass('allow-half')}>
        {icon}
      </span>
    )
  }

  handleClick(...args) {
    let value = args[0]
    const e = args[1]
    const { clearable, allowHalf } = this.props
    if (allowHalf && getParent(e.target, `.${rateClass('allow-half')}`)) {
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

  handleHover(hover) {
    this.setState({ hover })
  }

  handleMove(hover, e) {
    const { x, width } = e.target.getBoundingClientRect()
    this.setState({ hover: hover - (x + width / 2 > e.clientX ? 0.5 : 0) })
  }

  renderBackground() {
    const { background, max, disabled, allowHalf } = this.props
    const style = this.getStyle()
    const value = this.getValue()

    return (
      <div className={rateClass('background')}>
        {range(max).map(v => (
          <span
            key={v}
            // the allowHalf only for the front same as background
            style={Object.assign({ visibility: !allowHalf && !disabled && value > v ? 'hidden' : 'visible' }, style)}
          >
            {this.getIcon(background, v, true)}
          </span>
        ))}
      </div>
    )
  }

  renderRate() {
    const { front, max, text, allowHalf } = this.props
    const { highlight } = this.state
    const value = this.getValue()
    const style = this.getStyle()

    return (
      <div className={rateClass('front')}>
        {range(max).map(v => (
          <span
            key={v}
            onClick={this.handleClick.bind(this, v + 1)}
            onMouseLeave={this.handleHover.bind(this, 0)}
            onMouseMove={allowHalf ? this.handleMove.bind(this, v + 1) : undefined}
            onMouseEnter={!allowHalf ? this.handleHover.bind(this, v + 1) : undefined}
            style={style}
          >
            {value > v ? this.getIcon(front, v) : <span>&nbsp;</span>}
            {highlight === v + 1 && <i className={rateClass('highlight')}>{this.getIcon(front, v)}</i>}
          </span>
        ))}
        <span className={rateClass('text')}>{text[Math.ceil(value) - 1]}</span>
      </div>
    )
  }

  renderStatic() {
    const { front, value, max, text } = this.props
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
    const className = classnames(rateClass('_'), this.props.className)
    const ms = Object.assign({}, this.props.style, this.getScale())
    return (
      <div className={className} style={ms} {...getDataset(this.props)}>
        {this.renderBackground()}
        {this.props.disabled ? this.renderStatic() : this.renderRate()}
      </div>
    )
  }
}

Rate.propTypes = {
  ...getProps(PropTypes, 'disabled', 'type'),
  background: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  clearable: PropTypes.bool,
  repeat: PropTypes.bool,
  front: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.array,
  value: PropTypes.number,
}

Rate.defaultProps = {
  ...defaultProps,
  repeat: true,
  max: 5,
  size: 20,
  text: [],
  value: 0,
}

export default Rate
