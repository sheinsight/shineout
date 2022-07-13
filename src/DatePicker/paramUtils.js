import utils from './utils'

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
const quarterHandleChangeParams = handleOnChangeParams('quarter')
const dayHandleChangeParams = handleOnChangeParams('day')
const weekHandleChangeParams = handleOnChangeParams('week')
const timeHandleChangeParams = handleOnChangeParams('time')
const quickHandleChangeParams = handleOnChangeParams('quick')

function handleTimeDisabled(date, disabledTime, options) {
  if (typeof disabledTime === 'string') return format(date, TIME_FORMAT, options) === disabledTime
  if (typeof disabledTime === 'function') return disabledTime(format(date, TIME_FORMAT, options))
  return undefined
}

function handleDisabled(...args) {
  const [date, min, max, range, disabled, disabledTime, options] = args
  let isDisabled
  if (disabled) isDisabled = disabled(date)
  if (disabledTime) isDisabled = isDisabled || handleTimeDisabled(date, disabledTime)
  if (isDisabled) return true
  if (!isDisabled && min) {
    if (compareAsc(date, min) < 0) return true
    if (range && compareAsc(date, addSeconds(min, range, options)) > 0) return true
  }
  if (!isDisabled && max) {
    if (compareAsc(date, max) > 0) return true
    if (range && compareAsc(date, addSeconds(max, -range, options)) < 0) return true
  }
  return false
}

function judgeTimeByRange(...args) {
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
