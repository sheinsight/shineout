import utils from './utils'
import { isNumber } from '../utils/is'
import { AreaType, DatePickerValue, BaseProps, QuickSelectType, DisabledType } from './Props'

const { TIME_FORMAT, compareAsc, addSeconds, format } = utils

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

function handleDisabled(
  date: Date,
  min: Date | undefined | null,
  max: Date | undefined | null,
  range: BaseProps['range'],
  disabled: ((date: Date, type?: DisabledType, value?: DatePickerValue) => boolean) | boolean | undefined,
  disabledTime: BaseProps['disabledTime'],
  options?: any
) {
  let isDisabled
  if (disabled && typeof disabled === 'function') isDisabled = disabled(date)
  if (disabledTime) isDisabled = isDisabled || handleTimeDisabled(date, disabledTime)
  if (isDisabled) return true
  if (!isDisabled && min) {
    if (compareAsc(date, min) < 0) return true
    if (range && typeof range === 'number' && compareAsc(date, addSeconds(min, range, options)) > 0) return true
  }
  if (!isDisabled && max) {
    if (compareAsc(date, max) > 0) return true
    if (range && isNumber(range) && compareAsc(date, addSeconds(max, -range, options)) < 0) return true
  }
  return false
}

function judgeTimeByRange(
  target: number,
  value: Date,
  mode: 'H' | 'h' | 'm' | 'minute' | 's' | 'second' | 'ampm',
  min: Date | null | undefined,
  max: Date | null | undefined,
  range: BaseProps['range'],
  disabled: ((date: Date, type?: DisabledType, value?: DatePickerValue) => boolean) | boolean | undefined,
  disabledTime: BaseProps['disabledTime'],
  options?: any
): [boolean, Date] {
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

  const isDisabled = handleDisabled(date, min, max, range, disabled, disabledTime, options)
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
