import utils from './utils'
import { isNumber } from '../utils/is'
import { AreaType, DateTimeType, DatePickerValue, DatePickerProps } from './interface'

const { TIME_FORMAT, compareAsc, addSeconds, format } = utils

const handleOnChangeParams: (
  type: AreaType
) => (
  date: DatePickerValue,
  change?: boolean,
  blur?: boolean | null,
  isEnd?: boolean | null,
  isQuickSelect?: any,
  areaType?: string
) => [
  DatePickerValue,
  boolean | null | undefined,
  boolean | null | undefined,
  boolean | null | undefined,
  any,
  string
] = type => (date, change, blur = undefined, isEnd = undefined, isQuickSelect = undefined) => [
  date,
  change,
  blur,
  isEnd,
  isQuickSelect,
  type,
]

const yearHandleChangeParams = handleOnChangeParams('year')
const monthHandleChangeParams = 'month'
const quarterHandleChangeParams = handleOnChangeParams('quarter')
const dayHandleChangeParams = handleOnChangeParams('day')
const weekHandleChangeParams = handleOnChangeParams('week')
const timeHandleChangeParams = handleOnChangeParams('time')
const quickHandleChangeParams = handleOnChangeParams('quick')

function handleTimeDisabled(date: DateTimeType, disabledTime: DatePickerProps['disabledTime'], options?: any) {
  if (typeof disabledTime === 'string') return format(date, TIME_FORMAT, options) === disabledTime
  if (typeof disabledTime === 'function') return disabledTime(format(date, TIME_FORMAT, options))
  return undefined
}

function handleDisabled(
  ...args: [
    Date,
    DatePickerProps['min'],
    DatePickerProps['max'],
    DatePickerProps['range'],
    (date: Date) => boolean,
    DatePickerProps['disabledTime'],
    any
  ]
) {
  const [date, min, max, range, disabled, disabledTime, options] = args
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
  ...args: [
    number,
    Date,
    'H' | 'h' | 'm' | 'minute' | 's' | 'second' | 'ampm',
    DatePickerProps['min'],
    DatePickerProps['max'],
    DatePickerProps['range'],
    (date: Date) => boolean,
    DatePickerProps['disabledTime'],
    any
  ]
) {
  const [target, value, mode, min, max, range, disabled, disabledTime, options] = args
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
