import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps } from '../utils/proptypes'
import { sliderClass } from '../styles'
import Slider from './Slider'
import { per2value } from './utils'
import getDataset from '../utils/dom/getDataset'

class Container extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}

    this.bindElement = this.bindElement.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFirstDrag = this.handleDrag.bind(this, 0)
    this.handleSecondDrag = this.handleDrag.bind(this, 1)
  }

  getValue() {
    const { range, value, scale } = this.props
    const from = scale[0]
    if (!range) return value || from

    let val = value
    if (range && !Array.isArray(value)) val = [from, from]
    if (val[0] > val[1]) val = [val[1], val[0]]
    return val
  }

  bindElement(el) {
    this.innerElement = el
  }

  handleClick(e) {
    if (e.target.className.indexOf(sliderClass('indicator')) >= 0) return
    if (this.props.disabled) return

    const { scale, step, vertical, range } = this.props
    const rect = this.innerElement.getBoundingClientRect()
    const per = vertical ? 1 - (e.clientY - rect.top) / rect.height : (e.clientX - rect.left) / rect.width

    const val = per2value(per, scale, step)

    if (!range) {
      this.props.onChange(val)
      return
    }

    const value = [...this.getValue()]
    if (val < value[0]) value[0] = val
    else value[1] = val

    this.props.onChange(value)
  }

  handleChange(index, val) {
    const { range } = this.props
    if (!range) {
      this.props.onChange(val)
      return
    }

    const value = [...this.getValue()]
    value[index] = val
    this.props.onChange(value)
  }

  handleDrag(index, value) {
    const { range } = this.props
    if (!range) this.props.onDrag(value)
  }

  renderScale() {
    const { autoHide, formatScale, scale } = this.props
    if (!formatScale) return null

    return (
      <div className={sliderClass('scale', !autoHide && 'show')}>
        {scale.map((s, i) => (
          <div key={s}>
            <span>{formatScale(s, i)}</span>
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { range, height, style, vertical, ...other } = this.props
    const className = classnames(
      sliderClass('_', vertical && 'vertical', this.props.disabled && 'disabled'),
      this.props.className
    )

    let value = this.getValue()
    if (!Array.isArray(value)) value = [0, value]

    let newStyle = style
    if (vertical) newStyle = Object.assign({ height }, style)

    return (
      <div style={newStyle} className={className} {...getDataset(other)}>
        <div className={sliderClass('background')} />
        <div ref={this.bindElement} onClick={this.handleClick} className={sliderClass('inner')}>
          {range && (
            <Slider
              {...other}
              index={0}
              max={value[1]}
              onChange={this.handleChange}
              value={value[0]}
              vertical={vertical}
            />
          )}

          <Slider
            {...other}
            index={1}
            min={value[0]}
            onChange={this.handleChange}
            value={value[1]}
            vertical={vertical}
          />
        </div>
        {this.renderScale()}
      </div>
    )
  }
}

Container.propTypes = {
  ...getProps(PropTypes, 'disabled', 'type'),
  autoHide: PropTypes.bool,
  formatScale: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  onDrag: PropTypes.func,
  scale: PropTypes.arrayOf(PropTypes.number),
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  vertical: PropTypes.bool,
}

Container.defaultProps = {
  height: 200,
  scale: [0, 100],
  step: 1,
  vertical: false,
  formatScale: v => v,
}

export default Container
