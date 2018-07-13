import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import PureComponent from '../PureComponent'
import { range } from '../utils/numbers'
import { getProps, defaultProps } from '../utils/proptypes'
import { rateClass } from '../styles'

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

    return { width: size, fontSize: size }
  }

  getIcon(icons, i, isBg) {
    const { repeat } = this.props
    const value = this.getValue()
    const remain = value - i

    let icon
    if (!Array.isArray(icons)) {
      icon = icons
    } else {
      icon = icons[repeat ? (value - 1) : i]
      if (!icon) icon = icons[icons.length - 1]
    }

    if (remain <= 0 || remain >= 1 || isBg) return icon

    const style = { width: `${remain * 100}%`, display: 'block', overflow: 'hidden' }
    return <span style={style}>{icon}</span>
  }

  handleClick(value) {
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

  renderBackground() {
    const { background, max, disabled } = this.props
    const style = this.getStyle()
    const value = this.getValue()

    return (
      <div className={rateClass('background')}>
        {
          range(max).map(v => (
            <span key={v} style={Object.assign({ visibility: (!disabled && value > v) ? 'hidden' : 'visible' }, style)}>
              {this.getIcon(background, v, true)}
            </span>
          ))
        }
      </div>
    )
  }

  renderRate() {
    const { front, max, text } = this.props
    const { highlight } = this.state
    const value = this.getValue()
    const style = this.getStyle()

    return (
      <div className={rateClass('front')}>
        {
          range(max).map(v => (
            <span
              key={v}
              onClick={this.handleClick.bind(this, v + 1)}
              onMouseEnter={this.handleHover.bind(this, v + 1)}
              onMouseLeave={this.handleHover.bind(this, 0)}
              style={style}
            >
              { value > v ? this.getIcon(front, v) : <span>&nbsp;</span> }
              { highlight === v + 1 && <i className={rateClass('highlight')}>{this.getIcon(front, v)}</i> }
            </span>
          ))
        }
        <span className={rateClass('text')}>{ text[Math.ceil(value) - 1] }</span>
      </div>
    )
  }

  renderStatic() {
    const {
      front, value, max, text,
    } = this.props
    const style = this.getStyle()

    return (
      <div className={rateClass('static')}>
        {
          range(max).map(v => (
            <span key={v} style={style}>
              { value > v && this.getIcon(front, v) }
            </span>
          ))
        }
        <span className={rateClass('text')}>{ text[Math.ceil(value) - 1] }</span>
      </div>
    )
  }

  render() {
    const className = classnames(
      rateClass('_'),
      this.props.className,
    )

    return (
      <div className={className}>
        { this.renderBackground() }
        { this.props.disabled ? this.renderStatic() : this.renderRate() }
      </div>
    )
  }
}

Rate.propTypes = {
  ...getProps(PropTypes, 'disabled', 'type'),
  background: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  repeat: PropTypes.bool,
  front: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
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
