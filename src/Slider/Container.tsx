import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { isRTL } from '../config'
import { sliderClass } from './styles'
import Slider from './Slider'
import { per2value } from './utils'
import getDataset from '../utils/dom/getDataset'
import { getDirectionClass } from '../utils/classname'
import { ContainerProps } from './Props'
import { isFunc, isArray } from '../utils/is'

interface ContainerState {}

const DefaultValue = {
  height: 200,
  scale: [0, 100],
  step: 1,
  vertical: false,
  formatScale: (v: number) => v,
}

class Container<Value extends number | number[]> extends PureComponent<ContainerProps<Value>, ContainerState> {
  static defaultProps = DefaultValue

  innerElement: HTMLDivElement

  constructor(props: ContainerProps<Value>) {
    super(props)

    this.state = {}

    this.bindElement = this.bindElement.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.handleFirstDrag = this.handleDrag.bind(this, 0)
    // this.handleSecondDrag = this.handleDrag.bind(this, 1)
  }

  getValue() {
    const { range, value, scale = DefaultValue.scale } = this.props
    const from = scale[0]
    if (!range) return value || from

    let val: number | number[] | undefined = value
    if (range && !isArray(value)) val = [from, from]
    if (isArray(val) && val[0] > val[1]) val = [val[1], val[0]]
    return val as number[]
  }

  bindElement(el: HTMLDivElement) {
    this.innerElement = el
  }

  handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLDivElement).className.indexOf(sliderClass('indicator')) >= 0) return
    if (this.props.disabled) return

    const { scale = DefaultValue.scale, step = DefaultValue.step, vertical, range } = this.props
    const rect = this.innerElement.getBoundingClientRect()
    let per = vertical ? 1 - (e.clientY - rect.top) / rect.height : (e.clientX - rect.left) / rect.width
    if (isRTL() && !vertical) {
      per = 1 - per
    }

    const val: number | number[] = per2value(per, scale, step)

    if (!range) {
      this.props.onChange(val as Value)
      return
    }
    const values = this.getValue()
    if (!isArray(values)) return
    const value = [...values]
    if (val < value[0]) value[0] = val
    else value[1] = val

    this.props.onChange(value as Value)
  }

  handleChange(index: 0 | 1, val: number) {
    const { range } = this.props
    if (!range) {
      this.props.onChange(val as Value)
      return
    }
    const values = this.getValue()
    if (!isArray(values)) return
    const value = [...values]
    value[index] = val
    this.props.onChange(value as Value)
  }

  // handleDrag(index, value) {
  //   const { range } = this.props
  //   if (!range) this.props.onDrag(value)
  // }

  renderScale() {
    const { autoHide, formatScale, scale = DefaultValue.scale } = this.props
    if (!formatScale || !isFunc(formatScale)) return null

    return (
      <div className={sliderClass(getDirectionClass('scale'), !autoHide && 'show')}>
        {scale.map((s, i) => (
          <div key={s}>
            <span>{formatScale(s, i)}</span>
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { range, height, style, vertical, scale = DefaultValue.scale, ...other } = this.props
    const className = classnames(
      sliderClass('_', vertical && 'vertical', this.props.disabled && 'disabled', isRTL() && 'rtl'),
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
              scale={scale}
              max={value[1]}
              onChange={this.handleChange}
              value={value[0]}
              vertical={vertical}
            />
          )}

          <Slider
            {...other}
            index={1}
            scale={scale}
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

export default Container
