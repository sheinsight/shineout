import utils from './utils'
import { AreaType, DatePickerValue, BaseProps, QuickSelectType, DisabledType } from './Props'

const { TIME_FORMAT, compareAsc, format } = utils

type HandleOnChangeParams = (
  type: AreaType
) => (<U>(
  date: U,
  change?: boolean,
  blur?: boolean,
  isEnd?: boolean,
  isQuickSelect?: QuickSelectType
) => [U, boolean | undefined, boolean | undefined, boolean | undefined, QuickSelectType | undefined, AreaType])
const handleOnChangeParams: HandleOnChangeParams = (type: AreaType) => <U>(
  date: U,
  change?: boolean,
  blur?: boolean,
  isEnd?: boolean,
  isQuickSelect?: QuickSelectType
) => [date, change, blur, isEnd, isQuickSelect, type]

const yearHandleChangeParams = handleOnChangeParams('year')
const monthHandleChangeParams = handleOnChangeParams('month')
const quarterHandleChangeParams = handleOnChangeParams('quarter')
const dayHandleChangeParams = handleOnChangeParams('day')
const weekHandleChangeParams = handleOnChangeParams('week')
const timeHandleChangeParams = handleOnChangeParams('time')
const quickHandleChangeParams = handleOnChangeParams('quick')

function handleTimeDisabled(date: Date, disabledTime: BaseProps['disabledTime'], options?: any) {
  if (typeof disabledTime === 'string') return format(date, TIME_FORMAT, options) === disabledTime
  if (typeof disabledTime === 'function') return disabledTime(format(date, TIME_FORMAT, options))
  return undefined
}

function handleDisabled(params: {
  date: Date
  min?: Date | null
  max?: Date | null
  range: BaseProps['range']
  disabled?: ((date: Date, type?: DisabledType, value?: DatePickerValue) => boolean) | boolean
  disabledTime: BaseProps['disabledTime']
  options?: any
  index?: number
  rangeDate?: Date[]
}) {
  const { date, min, max, range, disabled, disabledTime, options, index, rangeDate } = params
  let isDisabled
  if (disabled && typeof disabled === 'function') isDisabled = disabled(date)
  if (disabledTime) isDisabled = isDisabled || handleTimeDisabled(date, disabledTime)
  if (isDisabled) return true
  if (!isDisabled && min) {
    if (compareAsc(date, min) < 0) return true
  }
  if (!isDisabled && max) {
    if (compareAsc(date, max) > 0) return true
  }
  if (!isDisabled && index === 1 && rangeDate && rangeDate[0]) {
    if (typeof range === 'number' && utils.compareAsc(date, utils.addSeconds(rangeDate[0], range, options)) > 0) {
      return true
    }
  }
  return false
}

function judgeTimeByRange(params: {
  target: number
  value: Date
  mode: 'H' | 'h' | 'm' | 'minute' | 's' | 'second' | 'ampm'
  min?: Date | null
  max?: Date | null
  range: BaseProps['range']
  disabled?: ((date: Date, type?: DisabledType, value?: DatePickerValue) => boolean) | boolean
  disabledTime: BaseProps['disabledTime']
  options?: any
  index?: number
  rangeDate?: Date[]
}): [boolean, Date] {
  const { target, value, mode, min, max, range, disabled, disabledTime, index, rangeDate, options } = params
  let date = new Date(value.getTime())
  switch (mode) {
    case 'H':
      date = utils.changeDate(date, 'hour', target, options)
      break
    case 'h':
      if (utils.getDateInfo(date, 'hour', options) >= 12) {
        date = utils.changeDate(date, 'hour', target + 12, options)
        break
      }
      date = utils.changeDate(date, 'hour', target, options)
      break
    case 'm':
    case 'minute':
      date = utils.changeDate(date, 'minute', target, options)
      break
    case 's':
    case 'second':
      date = utils.changeDate(date, 'second', target, options)
      break
    case 'ampm':
      {
        const hours = utils.getDateInfo(date, 'hour', options)
        if (target === 1 && hours < 12) {
          date = utils.changeDate(date, 'hour', hours + 12, options)
        } else if (target === 0 && hours >= 12) {
          date = utils.changeDate(date, 'hour', hours - 12, options)
        }
      }
      break
    default:
      break
  }

  const isDisabled = handleDisabled({
    date,
    min,
    max,
    range,
    disabled,
    disabledTime,
    options,
    index,
    rangeDate,
  })
  return [isDisabled, date]
}

export default {
  handleOnChangeParams,
  yearHandleChangeParams,
  monthHandleChangeParams,
  dayHandleChangeParams,
  timeHandleChangeParams,
  quickHandleChangeParams,
  weekHandleChangeParams,
  quarterHandleChangeParams,
  judgeTimeByRange,
  handleTimeDisabled,
  handleDisabled,
}
