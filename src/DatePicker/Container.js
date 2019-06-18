import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import immer from 'immer'
import { PureComponent } from '../component'
import { datepickerClass, inputClass } from '../styles'
import Icon from './Icon'
import utils from './utils'
import Picker from './Picker'
import Range from './Range'
import Text from './Text'
import { isArray } from '../utils/is'
import { getParent } from '../utils/dom/element'
import absoluteList from '../List/AbsoluteList'
import { docSize } from '../utils/dom/document'
import List from '../List'

const FadeList = List(['fade'], 'fast')
const OptionList = absoluteList(({ focus, ...other }) => <FadeList show={focus} {...other} />)

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
    this.handleTextChange = this.handleTextChange.bind(this)
    this.parseDate = this.parseDate.bind(this)
    this.dateToCurrent = this.dateToCurrent.bind(this)

    this.bindClickAway = this.bindClickAway.bind(this)
    this.clearClickAway = this.clearClickAway.bind(this)
    this.handleClickAway = this.handleClickAway.bind(this)
    this.getDefaultTime = this.getDefaultTime.bind(this)

    this.firstRender = false
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.clearClickAway()
  }

  getCurrent() {
    let current
    if (this.props.range) {
      current = (this.props.value || []).map(v => {
        v = this.parseDate(v)
        if (utils.isInvalid(v)) v = utils.newDate()
        return v
      })
      if (current.length === 0) current = [utils.newDate(), utils.newDate()]

      // if (utils.compareMonth(current[0], current[1], -1) >= 0) {
      //   current[1] = utils.addMonths(current[0], 1)
      // }
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
        return 'yyyy-MM-dd'
      case 'month':
        return 'yyyy-MM'
      case 'time':
        return 'HH:mm:ss'
      case 'week':
        return 'yyyy WW'
      default:
        return 'yyyy-MM-dd HH:mm:ss'
    }
  }

  getDefaultTime() {
    const { defaultTime } = this.props
    if (typeof defaultTime === 'string') return [defaultTime]
    if (isArray(defaultTime)) return defaultTime
    return []
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

  bindClickAway() {
    document.addEventListener('click', this.handleClickAway)
  }

  clearClickAway() {
    document.removeEventListener('click', this.handleClickAway)
  }

  handleClickAway(e) {
    const onPicker = e.target === this.element || this.element.contains(e.target)
    const onAbsolutePicker = getParent(e.target, `.${datepickerClass('location')}`)
    if (!onPicker && !onAbsolutePicker) {
      this.handleToggle(false)
    }
  }

  handleToggle(focus) {
    if (this.props.disabled === true) return
    if (focus === this.state.focus) return

    this.setState(
      immer(state => {
        state.focus = focus
        if (focus === true) {
          const rect = this.element.getBoundingClientRect()
          const windowHeight = docSize.height
          const windowWidth = docSize.width
          const pickerWidth = this.props.range ? 540 : 270
          if (!this.props.position) {
            if (rect.bottom + 300 > windowHeight) {
              if (rect.left + pickerWidth > windowWidth) state.position = 'right-top'
              else state.position = 'left-top'
            } else if (rect.left + pickerWidth > windowWidth) state.position = 'right-bottom'
            else state.position = 'left-bottom'
          }
          state.current = this.getCurrent()
        }
      })
    )

    if (focus && this.picker && this.picker.resetRange) {
      this.picker.resetRange((this.props.value || []).map(this.parseDate))
    }

    if (focus === true) {
      this.firstRender = true
      this.props.onFocus()
      this.bindClickAway()
    } else {
      this.props.onBlur()
      this.clearClickAway()
    }
  }

  handleTextChange(date, index) {
    const format = this.getFormat()
    const val = date ? utils.format(date, format) : ''

    if (!this.props.range) {
      this.props.onChange(val, this.handleBlur)
      return
    }

    const value = [
      ...immer(this.props.value, draft => {
        draft[index] = val
      }),
    ]
    if (utils.compareAsc(value[0], value[1]) > 0) value.push(value.shift())
    this.props.onChange(value, () => {
      this.setState({ current: this.getCurrent() })
    })
  }

  dateToCurrent(date) {
    const { range } = this.props
    if (!range) return date

    const { current } = this.state

    return [date[0] || current[0], date[1] || current[1]]
  }

  handleChange(date, change, blur, isEnd) {
    // is range only select one
    const rangeOne = this.props.range && !(date[0] && date[1])

    const format = this.getFormat()

    let value
    if (this.props.range) value = date.map(v => (v ? utils.format(v, format) : v))
    else value = utils.format(date, format)

    let callback
    if (!this.props.range) callback = blur ? this.handleBlur : undefined
    else {
      callback = blur && isEnd && !rangeOne ? this.handleBlur : undefined
    }

    const newCurrent = this.dateToCurrent(date)

    if (change) {
      this.setState({ current: newCurrent })
      this.props.onChange(value, callback)
    } else {
      this.setState({ current: newCurrent }, callback)
    }
  }

  handleClear(e) {
    e.stopPropagation()
    const value = this.props.range ? ['', ''] : ''
    this.props.onChange(value, () => {
      this.props.onBlur()
      this.handleToggle(false)
    })
  }

  renderText(value, placeholder, key) {
    const { inputable, formatResult } = this.props
    const date = this.parseDate(value)
    const className = classnames(datepickerClass('txt'), utils.isInvalid(date) && inputClass('placeholder'))
    const resultFormat = formatResult || this.getFormat()
    return (
      <Text
        key={key}
        className={className}
        focus={this.state.focus}
        format={resultFormat}
        index={key}
        inputable={inputable}
        placeholder={placeholder}
        onChange={this.handleTextChange}
        value={utils.isInvalid(date) ? undefined : utils.format(date, resultFormat)}
      />
    )
  }

  renderResult() {
    const { disabled, range, placeholder, type } = this.props

    let { value } = this.props
    if (!value && range) value = []

    const isEmpty = !value || value.length === 0
    let { clearable } = this.props
    if (disabled === true) clearable = false

    return (
      <div className={datepickerClass('result')}>
        {range
          ? [
              this.renderText(value[0], placeholder[0], 0),
              <span key="-">~</span>,
              this.renderText(value[1], placeholder[1], 1),
            ]
          : this.renderText(value, placeholder)}
        <Icon className={isEmpty || !clearable ? '' : 'indecator'} name={type === 'time' ? 'Clock' : 'Calendar'} />
        {!isEmpty && clearable && <Icon name="CloseCircle" className="close" tag="a" onClick={this.handleClear} />}
      </div>
    )
  }

  renderWrappedPicker() {
    const { focus, position } = this.state
    const { absolute } = this.props
    const props = {
      absolute,
      focus,
      className: datepickerClass('picker', 'location', `absolute-${position}`),
      position,
    }
    // computed absolute position needed
    if (absolute) {
      props.rootClass = datepickerClass('absolute')
      props.parentElement = this.element
    }
    return <OptionList {...props}>{this.renderPicker()}</OptionList>
  }

  renderPicker() {
    if (!this.firstRender) return undefined

    const { range, type, value, disabled, allowSingle } = this.props
    const format = this.getFormat()
    const Component = range ? Range : Picker

    return (
      <Component
        ref={this.bindPicker}
        defaultTime={this.getDefaultTime()}
        current={this.state.current}
        format={format}
        disabled={typeof disabled === 'function' ? disabled : undefined}
        onChange={this.handleChange}
        type={type}
        range={range}
        value={range ? (value || []).map(v => this.parseDate(v)) : this.parseDate(value)}
        showTimePicker={!!value}
        allowSingle={allowSingle}
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
      this.state.position
    )

    return (
      <div className={className} tabIndex={-1} ref={this.bindElement} onClick={this.handleFocus}>
        {this.renderResult()}
        {this.renderWrappedPicker()}
      </div>
    )
  }
}

Container.propTypes = {
  clearable: PropTypes.bool,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  format: PropTypes.string,
  formatResult: PropTypes.string,
  inputable: PropTypes.bool,
  placeholder: PropTypes.any,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  position: PropTypes.string,
  range: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  size: PropTypes.string,
  type: PropTypes.string,
  allowSingle: PropTypes.bool,
  defaultTime: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array]),
  absolute: PropTypes.bool,
}

Container.defaultProps = {
  clearable: true,
  placeholder: <span>&nbsp;</span>,
  type: 'date',
  allowSingle: false,
}

export default Container
