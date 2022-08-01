import utils from './utils'
import { isNumber } from '../utils/is'

const { TIME_FORMAT, compareAsc, addSeconds, format } = utils

const handleOnChangeParams = type => (date, change, blur = undefined, isEnd = undefined, isQuickSelect = undefined) => [
  date,
  change,
  blur,
  isEnd,
  isQuickSelect,
  type,
]

const yearHandleChangeParams = handleOnChangeParams('year')
const monthHandleChangeParams = handleOnChangeParams('month')
const dayHandleChangeParams = handleOnChangeParams('day')
const weekHandleChangeParams = handleOnChangeParams('week')
const timeHandleChangeParams = handleOnChangeParams('time')
const quickHandleChangeParams = handleOnChangeParams('quick')

function handleTimeDisabled(date, disabledTime) {
  if (typeof disabledTime === 'string') return format(date, TIME_FORMAT) === disabledTime
  if (typeof disabledTime === 'function') return disabledTime(format(date, TIME_FORMAT))
  return undefined
}

function handleDisabled(...args) {
  const [date, min, max, range, disabled, disabledTime] = args

  let isDisabled
  if (disabled) isDisabled = disabled(date)
  if (disabledTime) isDisabled = isDisabled || handleTimeDisabled(date, disabledTime)
  if (isDisabled) return true
  if (!isDisabled && min) {
    if (compareAsc(date, min) < 0) return true
    if (range && isNumber(range) && compareAsc(date, addSeconds(min, range)) > 0) return true
  }
  if (!isDisabled && max) {
    if (compareAsc(date, max) > 0) return true
    if (range && isNumber(range) && compareAsc(date, addSeconds(max, -range)) < 0) return true
  }
  return false
}

function judgeTimeByRange(...args) {
  const [target, value, mode, min, max, range, disabled, disabledTime] = args
  const date = new Date(value.getTime())
  switch (mode) {
    case 'H':
      date.setHours(target)
      break
    case 'h':
      if (date.getHours() >= 12) {
        date.setHours(target + 12)
        break
      }
      date.setHours(target)
      break
    case 'm':
    case 'minute':
      date.setMinutes(target)
      break
    case 's':
    case 'second':
      date.setSeconds(target)
      break
    case 'ampm':
      {
        const hours = date.getHours()
        if (target === 1 && hours < 12) {
          date.setHours(hours + 12)
        } else if (target === 0 && hours >= 12) {
          date.setHours(hours - 12)
        }
      }
      break
    default:
      break
  }
  const isDisabled = handleDisabled(date, min, max, range, disabled, disabledTime)
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
  judgeTimeByRange,
  handleTimeDisabled,
  handleDisabled,
}
