import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import addSeconds from 'date-fns/addSeconds'
import addYears from 'date-fns/addYears'
import compareAsc from 'date-fns/compareAsc'
import format from 'date-fns/format'
import isSameDay from 'date-fns/isSameDay'
import isSameMonth from 'date-fns/isSameMonth'
import isSameWeek from 'date-fns/isSameWeek'
import isValid from 'date-fns/isValid'
import parse from 'date-fns/parse'
import startOfMonth from 'date-fns/startOfMonth'
import startOfWeek from 'date-fns/startOfWeek'
import toDate from 'date-fns/toDate'
import { getLocale } from '../locale'

const TIME_FORMAT = 'HH:mm:ss'

function getDaysOfMonth(dirtyDate) {
  const date = toDate(dirtyDate)
  let current = startOfWeek(startOfMonth(date), {
    weekStartsOn: getLocale('startOfWeek'),
  })
  current.setHours(dirtyDate.getHours())
  current.setMinutes(dirtyDate.getMinutes())
  current.setSeconds(dirtyDate.getSeconds())

  const days = []
  let index = 0

  while (index < 42) {
    days.push(current)
    current = addDays(current, 1)
    index += 1
  }

  return days
}

function isInvalid(date) {
  // eslint-disable-next-line
  return isNaN(date)
}

function toDateWithFormat(dirtyDate, fmt, def) {
  let date
  if (typeof dirtyDate === 'string')
    date = parse(dirtyDate, fmt, new Date(), {
      weekStartsOn: getLocale('startOfWeek'),
    })
  else date = toDate(dirtyDate)

  if (isInvalid(date)) date = toDate(dirtyDate)
  if (isInvalid(date)) date = def

  return date
}

function compareMonth(dateLeft, dateRight, pad = 0) {
  if (!dateLeft || !dateRight) return 0
  const left = new Date(dateLeft.getFullYear(), dateLeft.getMonth(), 1)
  const right = new Date(dateRight.getFullYear(), dateRight.getMonth() + pad, 1)
  return compareAsc(left, right)
}

function newDate(defaultDate) {
  const date = defaultDate ? new Date(defaultDate) : new Date()
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function setTime(date, old) {
  date.setHours(old.getHours())
  date.setMinutes(old.getMinutes())
  date.setSeconds(old.getSeconds())

  return date
}

function cloneTime(date, old, fmt) {
  if (!date) return date
  old = toDateWithFormat(old, fmt)
  if (isInvalid(old)) return date

  return setTime(date, old)
}

function formatDateWithDefaultTime(date, value, defaultTime, fmt) {
  if (!date) return date
  if (value) return setTime(date, value)
  if (!defaultTime) return date

  const dateHMS = toDateWithFormat(defaultTime, TIME_FORMAT)
  if (isInvalid(dateHMS)) return date

  const nDate = cloneTime(date, defaultTime, TIME_FORMAT)
  return format(nDate, fmt)
}

function clearHMS(date) {
  if (!isValid(date)) return date
  return new Date(new Date(date.toLocaleDateString()).getTime())
}

function compareDateArray(arr1, arr2) {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false
  return arr1.every((v, i) => {
    if (!v || !arr2[i]) return false
    return v.getTime() === arr2[i].getTime()
  })
}

export default {
  clearHMS,
  addDays,
  addMonths,
  addYears,
  addSeconds,
  cloneTime,
  compareAsc,
  compareMonth,
  getDaysOfMonth,
  format,
  isInvalid,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isValid,
  newDate,
  setTime,
  parse,
  toDate,
  toDateWithFormat,
  formatDateWithDefaultTime,
  compareDateArray,
  TIME_FORMAT,
}
