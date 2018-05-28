import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import immer from 'immer'
import List from '../List'
import Icon from './Icon'
import utils from './utils'
import Picker from './Picker'
import Range from './Range'
import { datepickerClass, inputClass } from '../styles'

const FadeList = List(['fade'], 'fast')

class Container extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      focus: false,
      current: this.getCurrent(),
      position: props.position,
    }

    this.bindElement = this.bindElement.bind(this)
    this.bindPicker = this.bindPicker.bind(this)
    this.handleFocus = this.handleToggle.bind(this, true)
    this.handleBlur = this.handleToggle.bind(this, false)
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.parseDate = this.parseDate.bind(this)

    this.firstRender = false
  }

  componentDidMount() {
    const { range, value } = this.props
    if (!value) return
    const format = this.getFormat()
    if (range) {
      const newValue = value.map((v) => {
        if (!v) return undefined
        return utils.format(this.parseDate(v), format)
      })
      this.props.onChange(newValue)
    } else {
      const newValue = utils.format(this.parseDate(value), format)
      if (newValue !== value) this.props.onChange(newValue)
    }
  }

  getCurrent() {
    let current
    if (this.props.range) {
      current = (this.props.value || []).map((v) => {
        v = this.parseDate(v)
        if (utils.isInvalid(v)) v = utils.newDate()
        return v
      })
      if (current.length === 0) current = [utils.newDate(), utils.newDate()]

      if (utils.compareMonth(current[0], current[1], -1) >= 0) {
        current[1] = utils.addMonths(current[0], 1)
      }
    } else {
      current = this.parseDate(this.props.value)
    }

    return current
  }

  getFormat() {
    const { format, type } = this.props
    if (format) return format
    switch (type) {
      case 'date':
        return 'YYYY-MM-DD'
      case 'month':
        return 'YYYY-MM'
      case 'time':
        return 'HH:mm:ss'
      case 'week':
        return 'YYYY WW'
      default:
        return 'YYYY-MM-DD HH:mm:ss'
    }
  }

  bindElement(el) {
    this.element = el
  }

  bindPicker(picker) {
    this.picker = picker
  }

  parseDate(value) {
    return utils.toDateWithFormat(value, this.getFormat(), undefined)
  }

  handleToggle(focus, event) {
    if (this.props.disabled === true) return
    if (focus === this.state.focus) return
    if (focus === true && event && event.target.className.indexOf(datepickerClass('close')) >= 0) return

    if (focus === true) this.firstRender = true

    this.setState(immer((state) => {
      state.focus = focus
      if (focus === true) {
        const rect = this.element.getBoundingClientRect()
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
        const windowWidth = window.innerWidth || document.documentElement.clientWidth
        const pickerWidth = this.props.range ? 540 : 270
        if (this.props.position) {
          if (rect.bottom + 300 > windowHeight) {
            if (rect.left + pickerWidth > windowWidth) state.position = 'right-top'
            else state.position = 'left-top'
          } else if (rect.left + pickerWidth > windowWidth) state.position = 'right-bottom'
          else state.position = 'left-bottom'
        }
        state.current = this.getCurrent()
      }
    }))

    if (focus && this.picker && this.picker.resetRange) {
      this.picker.resetRange((this.props.value || []).map(this.parseDate))
    }

    if (focus) this.props.onFocus()
    else this.props.onBlur()
  }

  handleChange(date, change, blur) {
    const format = this.getFormat()

    let value
    if (this.props.range) value = date.map(v => utils.format(v, format))
    else value = utils.format(date, format)

    if (change) this.props.onChange(value)
    else this.setState({ current: date })

    if (blur) this.element.blur()
  }

  handleClear() {
    this.props.onChange(undefined)
    this.element.blur()
  }

  renderText(value, placeholder, key) {
    const date = this.parseDate(value)
    if (utils.isInvalid(date)) {
      return (
        <span key={key} className={classnames(inputClass('placeholder'), datepickerClass('txt'))}>
          {placeholder}
        </span>
      )
    }
    return (
      <span key={key} className={datepickerClass('txt')}>
        {utils.format(date, this.getFormat())}
      </span>
    )
  }

  renderResult() {
    const { range, placeholder, type } = this.props

    let { value } = this.props
    if (!value && range) value = []

    const isEmpty = !value || value.length === 0

    return (
      <div className={datepickerClass('result')}>
        {
          range
            ? [
              this.renderText(value[0], placeholder[0], 0),
              <span key="-">~</span>,
              this.renderText(value[1], placeholder[1], 1),
            ]
            : this.renderText(value, placeholder)
        }
        <Icon
          className={isEmpty ? '' : 'indecator'}
          name={type === 'time' ? 'Clock' : 'Calendar'}
        />
        {
          !isEmpty &&
          <Icon
            name="CloseCircle"
            className="close"
            tag="a"
            onClick={this.handleClear}
          />
        }
      </div>
    )
  }

  renderPicker() {
    if (!this.firstRender) return undefined

    const {
      range, type, value, disabled,
    } = this.props
    const format = this.getFormat()
    const Component = range ? Range : Picker

    return (
      <Component
        ref={this.bindPicker}
        current={this.state.current}
        format={format}
        disabled={typeof disabled === 'function' ? disabled : undefined}
        onChange={this.handleChange}
        type={type}
        value={range ? (value || []).map(v => this.parseDate(v)) : this.parseDate(value)}
      />
    )
  }

  render() {
    const { range, size } = this.props
    const { focus } = this.state

    const className = datepickerClass(
      'inner',
      range && 'range',
      size && `size-${size}`,
      focus && 'focus',
      this.state.position,
    )

    return (
      <div
        className={className}
        tabIndex={-1}
        ref={this.bindElement}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        { this.renderResult() }
        <FadeList show={focus} className={datepickerClass('picker')}>
          { this.renderPicker() }
        </FadeList>
      </div>
    )
  }
}

Container.propTypes = {
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  format: PropTypes.string,
  placeholder: PropTypes.any,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  position: PropTypes.string,
  range: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
}

Container.defaultProps = {
  placeholder: <span>&nbsp;</span>,
  position: 'left-bottom',
  type: 'date',
}

export default Container
