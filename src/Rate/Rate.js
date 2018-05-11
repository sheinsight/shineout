import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { range } from '../utils/numbers'
import { getProps, defaultProps } from '../utils/proptypes'
import { rateClass } from '../styles'

function getIcon(icons, i, value) {
  const remain = value - i

  let icon
  if (!Array.isArray(icons)) {
    icon = icons
  } else {
    icon = icons[i]
    if (!icon) icon = icons[icons.length - 1]
  }

  if (remain <= 0 || remain >= 1) return icon
  return <span style={{ width: `${remain * 100}%`, display: 'block', overflow: 'hidden' }}>{icon}</span>
}

class Rate extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      hover: 0,
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

  handleClick(value) {
    this.props.onChange(value)
  }

  handleHover(hover) {
    this.setState({ hover })
  }

  renderBackground() {
    const { background, max } = this.props
    const style = this.getStyle()

    return (
      <div className={rateClass('background')}>
        {
          range(max).map(v => (
            <span key={v} style={style}>
              {getIcon(background, v)}
            </span>
          ))
        }
      </div>
    )
  }

  renderRate() {
    const { front, max, text } = this.props
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
              { value > v ? getIcon(front, v) : <span>&nbsp;</span> }
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
              { value > v && getIcon(front, v, value) }
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
  ...getProps('disabled', 'type'),
  background: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  onChange: PropTypes.func.isRequired,
  front: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  max: PropTypes.number,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  text: PropTypes.array,
  value: PropTypes.number,
}

Rate.defaultProps = {
  ...defaultProps,
  max: 5,
  size: 20,
  text: [],
  value: 0,
}

export default Rate
