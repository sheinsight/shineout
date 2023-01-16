import React from 'react'
import immer from 'immer'
import { PureComponent } from '../component'
import shallowEqual from '../utils/shallowEqual'
import utils from './utils'
import { getLocale } from '../locale'
import paramUtils from './paramUtils'
import Picker from './Picker'
import { datepickerClass } from './styles'
import Quick from './Quick'
import { AreaType, QuickSelectType } from './Props'
import { RangeProps, DisabledType, DatePickerValue } from './Props'

interface RangeState {
  rangeDate: Date[]
}

const DefaultValue = {
  value: [],
}
class Range extends PureComponent<RangeProps, RangeState> {
  static defaultProps = DefaultValue

  pickers: Picker[]

  handleFirstChange: (
    date: Date,
    change: boolean | undefined,
    _blur: boolean | undefined,
    _isEnd: boolean | undefined,
    _isQuickSelect: QuickSelectType | undefined,
    areaType: AreaType
  ) => void

  handleSecondChange: (
    date: Date,
    change: boolean | undefined,
    _blur: boolean | undefined,
    _isEnd: boolean | undefined,
    _isQuickSelect: QuickSelectType | undefined,
    areaType: AreaType
  ) => void

  bindFirstPicker: (picker: Picker) => void

  bindSecondPicker: (picker: Picker) => void

  handleDisabledStart: ((date: Date, type?: DisabledType, value?: DatePickerValue) => boolean)

  handleDisabledEnd: ((date: Date, type?: DisabledType, value?: DatePickerValue) => boolean)

  constructor(props: RangeProps) {
    super(props)

    this.state = {
      rangeDate: props.value,
    }

    this.pickers = []

    this.handleChange = this.handleChange.bind(this)
    this.handleFirstChange = this.handleChange.bind(this, 0)
    this.handleSecondChange = this.handleChange.bind(this, 1)
    this.handleDayHover = this.handleDayHover.bind(this)
    this.bindFirstPicker = this.bindPicker.bind(this, 0)
    this.bindSecondPicker = this.bindPicker.bind(this, 1)
    this.handleDisabledStart = this.handleDisabled.bind(this, 'start')
    this.handleDisabledEnd = this.handleDisabled.bind(this, 'end')
    this.changeDateSmart = this.changeDateSmart.bind(this)
    this.handleQuick = this.handleQuick.bind(this)
  }

  componentDidUpdate(prevProps: RangeProps) {
    const { rangeDate } = this.state
    if (
      rangeDate.length !== 1 &&
      !shallowEqual(prevProps.value, this.props.value) &&
      !shallowEqual(this.state.rangeDate, this.props.value)
    ) {
      // eslint-disable-next-line
      this.setState({ rangeDate: this.props.value })
    }
  }

  getOptions() {
    const { timeZone } = this.props
    return { timeZone, weekStartsOn: getLocale('startOfWeek') }
  }

  bindPicker(index: number, el: Picker) {
    this.pickers[index] = el
  }

  resetRange(rangeDate: DatePickerValue) {
    this.setState({ rangeDate })
  }

  handleDayHover(date: Date) {
    if (this.state.rangeDate.length === 1) {
      utils.cloneTime(date, this.props.value[1], this.props.format, this.getOptions())
      // this.setState({ hover: date })
    }
  }

  changeDateSmart(rangeDate: Date[]) {
    if (!rangeDate[0] || !rangeDate[1]) return
    const [s, e] = rangeDate
    const { range } = this.props
    if (typeof range === 'number') {
      if (utils.compareAsc(s, utils.addSeconds(e, -range, this.getOptions())) < 0)
        rangeDate[1] = utils.addSeconds(s, range, this.getOptions())
    }
    if (utils.compareAsc(s, e) > 0) {
      const sWitheTime = utils.toDate(s, this.getOptions())
      utils.setTime(sWitheTime, e)
      rangeDate[1] = utils.compareAsc(s, sWitheTime) > 0 ? s : sWitheTime
    }
  }

  // Be consistent with the parent onChange, expand first params: index
  handleChange(
    index: number,
    date: Date,
    change: boolean | undefined,
    _blur: boolean | undefined,
    _isEnd: boolean | undefined,
    _isQuickSelect: QuickSelectType | undefined,
    areaType: AreaType
  ) {
    const { type, range, min, max } = this.props

    const handleOnChangeParams = paramUtils.handleOnChangeParams(areaType)
    if (!change) {
      const current = immer(this.props.current, draft => {
        draft[index] = date
      })
      this.props.onChange(...handleOnChangeParams(current))
      return
    }

    if (areaType === 'time') {
      let endChangedDate: Date
      this.setState(
        immer(draft => {
          draft.rangeDate[index] = date
          const [s, e] = draft.rangeDate
          if (index !== 0) {
            if (s && s.getHours() === e.getHours()) {
              if (utils.compareAsc(s, e) === 1) {
                e.setMinutes(s.getMinutes())
              }
            }
            return
          }
          if (range && utils.compareAsc(s, e) === 1) {
            endChangedDate = date
            draft.rangeDate[1] = endChangedDate
          }
          if (typeof range === 'number' && utils.compareAsc(s, utils.addSeconds(e, -range, this.getOptions())) < 0) {
            endChangedDate = utils.addSeconds(s, range, this.getOptions())
            draft.rangeDate[1] = endChangedDate
          }
        }),
        () => {
          const current = immer(this.props.value, draft => {
            draft[index] = date
            if (endChangedDate) draft[1] = endChangedDate
            draft[1 - index] = draft[1 - index] || ''
          })
          this.props.onChange(...handleOnChangeParams(current, true))
        }
      )
      return
    }

    if (type === 'month') {
      // eslint-disable-next-line
      const rangeDate = [...this.state.rangeDate]
      rangeDate[index] = date
      rangeDate[1 - index] = rangeDate[1 - index] || ''

      this.changeDateSmart(rangeDate)

      this.setState({ rangeDate })
      this.props.onChange(...handleOnChangeParams(rangeDate, true, true, index === 1))

      return
    }

    utils.cloneTime(date, this.props.value[index], undefined, this.getOptions())
    if (min && utils.compareAsc(date, min) <= 0) {
      utils.setTime(date, min)
    }
    if (max && utils.compareAsc(date, max) >= 0) {
      utils.setTime(date, max)
    }

    this.setState(
      immer(draft => {
        draft.rangeDate[index] = date
        draft.rangeDate[1 - index] = draft.rangeDate[1 - index] || ''
        this.changeDateSmart(draft.rangeDate)
        draft.hover = undefined
      }),
      () => {
        // only 'datetime' don not need close, 'time is up'
        this.props.onChange(...handleOnChangeParams(this.state.rangeDate, true, type !== 'datetime', index === 1))
      }
    )
  }

  handleDisabled(type: DisabledType, date: Date) {
    const { disabled } = this.props
    const { rangeDate } = this.state
    if (disabled) {
      return disabled(date, type, ...rangeDate)
    }
    return false
  }

  handleQuick(quick: QuickSelectType) {
    this.setState({ rangeDate: quick.value })
    this.props.onChange(...paramUtils.quickHandleChangeParams(quick.value, true, false, false, quick))
  }

  render() {
    // min & max can not to child
    const { current, value, range, children, min, max, quicks, ...props } = this.props
    const rangeDate = [...this.state.rangeDate]
    return (
      <div className={datepickerClass('range-picker')}>
        <Quick {...this.props} current={this.state.rangeDate} onChange={this.handleQuick} />
        <Picker
          {...props}
          pos="start"
          disabled={this.handleDisabledStart}
          index={0}
          min={min}
          max={max}
          current={current[0]}
          range={typeof range === 'number' ? range : undefined}
          rangeDate={rangeDate}
          rangeTemp={rangeDate[0]}
          onChange={this.handleFirstChange}
          onChangeSync={this.handleChange}
          onDayHover={this.handleDayHover}
          ref={this.bindFirstPicker}
          value={utils.toDateWithFormat(value[0], props.format, undefined, this.getOptions())}
          showTimePicker={value.length === 2}
        />
        <Picker
          {...props}
          disabled={this.handleDisabledEnd}
          index={1}
          min={rangeDate[0] ? rangeDate[0] : min}
          max={max}
          current={current[1]}
          range={typeof range === 'number' ? range : undefined}
          rangeDate={rangeDate}
          rangeTemp={rangeDate[0]}
          onChange={this.handleSecondChange}
          onChangeSync={this.handleChange}
          onDayHover={this.handleDayHover}
          ref={this.bindSecondPicker}
          value={utils.toDateWithFormat(value[1], props.format, undefined, this.getOptions())}
          showTimePicker={value.length === 2}
        />
      </div>
    )
  }
}

export default Range
