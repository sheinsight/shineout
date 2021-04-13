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
import { getUidStr } from '../utils/uid'
import { isArray } from '../utils/is'
import { getParent } from '../utils/dom/element'
import absoluteList from '../AnimationList/AbsoluteList'
import { docSize } from '../utils/dom/document'
import { getRTLPosition } from '../utils/strings'
import List from '../AnimationList'
import { getLocale } from '../locale'
import DateFns from './utils'
import { isRTL } from '../config'

const FadeList = List(['fade'], 'fast')
const OptionList = absoluteList(({ focus, ...other }) => <FadeList show={focus} {...other} />)
const getCurrentPosition = position => {
  if (isRTL()) {
    return getRTLPosition(position)
  }
  return position
}

class Container extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      focus: false,
      current: this.getCurrent(),
      position: props.position,
      picker0: false,
      picker1: false,
    }

    this.pickerId = `picker_${getUidStr()}`
    this.bindElement = this.bindElement.bind(this)
    this.bindPicker = this.bindPicker.bind(this)
    this.bindWrappedPicker = this.bindWrappedPicker.bind(this)
    this.bindTextSpan = this.bindTextSpan.bind(this)
    this.handleClick = this.handleToggle.bind(this, true)
    this.handleBlur = this.handleToggle.bind(this, false)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleHover = this.handleHover.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.parseDate = this.parseDate.bind(this)
    this.dateToCurrent = this.dateToCurrent.bind(this)
    this.shouldFocus = this.shouldFocus.bind(this)

    this.bindClickAway = this.bindClickAway.bind(this)
    this.clearClickAway = this.clearClickAway.bind(this)
    this.handleClickAway = this.handleClickAway.bind(this)
    this.getDefaultTime = this.getDefaultTime.bind(this)
    this.getQuick = this.getQuick.bind(this)

    this.firstRender = false
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.clearClickAway()
  }

  getCurrent() {
    let current
    const { defaultRangeMonth, defaultPickerValue, value } = this.props
    if (this.props.range) {
      const defaultPickerRange = defaultRangeMonth || defaultPickerValue || []
      current = (this.props.value || []).map((v, i) => {
        v = this.parseDate(v)
        if (utils.isInvalid(v)) v = utils.newDate(defaultPickerRange[i])
        return v
      })
      if (current.length === 0) current = [utils.newDate(defaultPickerRange[0]), utils.newDate(defaultPickerRange[1])]
    } else {
      current = this.parseDate(value || defaultPickerValue)
    }

    return current
  }

  getFormat() {
    const { format, type } = this.props
    if (format) {
      if (type === 'week' && format.indexOf('I') > -1) return format.replace(/y/g, 'Y')

      return format
    }
    switch (type) {
      case 'date':
        return 'yyyy-MM-dd'
      case 'month':
        return 'yyyy-MM'
      case 'time':
        return 'HH:mm:ss'
      case 'week':
        return 'RRRR II'
      default:
        return 'yyyy-MM-dd HH:mm:ss'
    }
  }

  getQuick(format) {
    const { quickSelect } = this.props

    if (!Array.isArray(quickSelect)) return undefined

    return quickSelect.map(q => {
      if (!q.value || q.value.length !== 2) return { name: q.name, invalid: true }
      const date = q.value.map(v => DateFns.toDateWithFormat(v, format))
      if (DateFns.isInvalid(date[0]) || DateFns.isInvalid(date[1])) return { name: q.name, invalid: true }
      return {
        name: q.name,
        value: date,
      }
    })
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

  bindWrappedPicker(el) {
    this.pickerContainer = el
  }

  bindTextSpan(el) {
    this.textSpan = el
  }

  parseDate(value) {
    return utils.toDateWithFormat(value, this.getFormat(), undefined)
  }

  bindClickAway() {
    document.addEventListener('mousedown', this.handleClickAway)
  }

  clearClickAway() {
    document.removeEventListener('mousedown', this.handleClickAway)
  }

  shouldFocus(el) {
    if (el.getAttribute('data-id') === this.pickerId) return true
    if (getParent(el, `.${datepickerClass('result')}`)) return true
    return false
  }

  handleClickAway(e) {
    const onPicker = e.target === this.element || this.element.contains(e.target)
    const onAbsolutePicker = getParent(e.target, `.${datepickerClass('location')}`)
    if (!onPicker && !onAbsolutePicker) {
      if (this.props.inputable && this.textSpan) this.textSpan.blur()
      this.clearClickAway()
      this.handleToggle(false)
      this.props.onBlur()
    }
  }

  handleFocus(e) {
    if (!this.shouldFocus(e.target)) return
    this.props.onFocus(e)
    this.bindClickAway()
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.handleToggle(!this.state.focus)
    }

    // fot close the list
    if (e.keyCode === 9) {
      this.props.onBlur(e)
      // e.preventDefault()
      if (this.state.focus) this.handleToggle(false)
      else this.clearClickAway()
    }
  }

  handleToggle(focus, e) {
    if (this.props.disabled === true) return
    if (focus === this.state.focus) return
    if (e && focus && getParent(e.target, this.pickerContainer)) return

    // click close icon
    if (focus && e && e.target.classList.contains(datepickerClass('close'))) return
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
      // this.props.onFocus()
      this.bindClickAway()
    } else {
      this.props.onValueBlur()
    }
  }

  triggerValueBlur(cb) {
    const { inputable } = this.props
    const { focus } = this.state
    if (cb && typeof cb === 'function') cb()
    // OnChange is not triggered when handling copy and paste
    if (inputable && focus === false) {
      this.props.onValueBlur()
    }
  }

  handleTextChange(date, index) {
    const format = this.getFormat()
    const val = date ? utils.format(date, format) : ''

    if (!this.props.range) {
      this.props.onChange(val, this.triggerValueBlur.bind(this, this.handleBlur))
      return
    }

    const value = [
      ...immer(this.props.value, draft => {
        draft[index] = val
      }),
    ]
    if (utils.compareAsc(value[0], value[1]) > 0) value.push(value.shift())
    this.props.onChange(
      value,
      this.triggerValueBlur.bind(this, () => {
        this.setState({ current: this.getCurrent() })
      })
    )
  }

  dateToCurrent(date) {
    const { range } = this.props
    if (!range) return date

    const { current } = this.state

    return [date[0] || current[0], date[1] || current[1]]
  }

  handleChange(date, change, blur, isEnd, isQuickSelect, areaType) {
    const { onPickerChange } = this.props
    // is range only select one
    const rangeOne = this.props.range && !(date[0] && date[1])
    const format = this.getFormat()

    let value
    if (this.props.range)
      value = date.map(v =>
        v
          ? utils.format(v, format, {
              weekStartsOn: getLocale('startOfWeek'),
            })
          : v
      )
    else
      value = utils.format(date, format, {
        weekStartsOn: getLocale('startOfWeek'),
      })

    let callback
    if (!this.props.range) callback = blur ? this.handleBlur : undefined
    else {
      callback = blur && isEnd && !rangeOne ? this.handleBlur : undefined
    }

    const newCurrent = this.dateToCurrent(date)
    if (onPickerChange) onPickerChange(value, isQuickSelect, areaType)
    if (change) {
      this.setState({ current: newCurrent })
      this.props.onChange(value, callback, isQuickSelect)
    } else {
      this.setState({ current: newCurrent }, callback)
    }
  }

  handleClear(e) {
    e.stopPropagation()
    const value = this.props.range ? ['', ''] : ''
    this.props.onChange(value, () => {
      this.props.onValueBlur()
      this.handleToggle(false)
      this.element.focus()
    })
  }

  handleHover(index, isEnter) {
    this.setState({
      [`picker${index}`]: isEnter,
    })
  }

  renderText(value, placeholder, key) {
    const { inputable, formatResult, disabled } = this.props
    const date = this.parseDate(value)
    const className = classnames(
      datepickerClass('txt', this.state[`picker${key}`] && 'text-focus'),
      utils.isInvalid(date) && inputClass('placeholder')
    )
    const resultFormat = formatResult || this.getFormat()
    return (
      <Text
        key={key}
        onTextSpanRef={this.bindTextSpan}
        focusElement={this.textSpan}
        className={className}
        focus={this.state.focus}
        format={resultFormat}
        element={this.element}
        index={key}
        inputable={inputable}
        placeholder={placeholder}
        onChange={this.handleTextChange}
        value={utils.isInvalid(date) ? undefined : utils.format(date, resultFormat)}
        disabled={disabled === true}
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
              <span key="-" className={datepickerClass('separate')}>
                ~
              </span>,
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
    const { absolute, zIndex, quickSelect } = this.props
    const props = {
      absolute,
      focus,
      className: datepickerClass(
        'picker',
        'location',
        `absolute-${getCurrentPosition(position)}`,
        quickSelect && 'quick'
      ),
      zIndex,
      getRef: this.bindWrappedPicker,
    }
    // computed absolute position needed
    if (absolute) {
      props.rootClass = datepickerClass('absolute', isRTL() && 'rtl')
      props.parentElement = this.element
      props.position = position
    } else {
      props.position = getCurrentPosition(position)
    }
    return <OptionList {...props}>{this.renderPicker()}</OptionList>
  }

  renderPicker() {
    if (!this.firstRender) return undefined

    const {
      range,
      type,
      value,
      min,
      max,
      disabled,
      allowSingle,
      hourStep,
      minuteStep,
      secondStep,
      disabledTime,
    } = this.props
    const format = this.getFormat()
    const quicks = this.getQuick(format)
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
        quicks={quicks}
        value={range ? (value || []).map(v => this.parseDate(v)) : this.parseDate(value)}
        showTimePicker={!!value}
        allowSingle={allowSingle}
        handleHover={this.handleHover}
        min={DateFns.toDateWithFormat(min, format)}
        max={DateFns.toDateWithFormat(max, format)}
        hourStep={hourStep}
        minuteStep={minuteStep}
        secondStep={secondStep}
        disabledTime={disabledTime}
      >
        {this.props.children}
      </Component>
    )
  }

  render() {
    const { range, size, disabled } = this.props
    const { focus } = this.state

    const rtl = isRTL()

    const className = datepickerClass(
      'inner',
      range && 'range',
      size && `size-${size}`,
      focus && 'focus',
      disabled === true && 'disabled',
      getCurrentPosition(this.state.position),
      rtl && 'rtl'
    )

    return (
      <div
        // eslint-disable-next-line
        tabIndex={ disabled === true ? -1 : 0}
        className={className}
        onFocus={this.handleFocus}
        data-id={this.pickerId}
        ref={this.bindElement}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
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
  formatResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onValueBlur: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  quickSelect: PropTypes.array,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  defaultRangeMonth: PropTypes.array,
  defaultPickerValue: PropTypes.oneOfType([PropTypes.any, PropTypes.array]),
  hourStep: PropTypes.number,
  minuteStep: PropTypes.number,
  secondStep: PropTypes.number,
  onPickerChange: PropTypes.func,
  disabledTime: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

Container.defaultProps = {
  clearable: true,
  placeholder: <span>&nbsp;</span>,
  type: 'date',
  allowSingle: false,
}

export default Container
