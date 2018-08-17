import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import addSeconds from 'date-fns/addSeconds'
import addYears from 'date-fns/addYears'
import compareAsc from 'date-fns/compareAsc'
import endOfMonth from 'date-fns/endOfMonth'
import endOfWeek from 'date-fns/endOfWeek'
import format from 'date-fns/format'
import isSameDay from 'date-fns/isSameDay'
import isSameMonth from 'date-fns/isSameMonth'
import isSameWeek from 'date-fns/isSameWeek'
import isValid from 'date-fns/isValid'
import parse from 'date-fns/parse'
import startOfMonth from 'date-fns/startOfMonth'
import startOfWeek from 'date-fns/startOfWeek'
import toDate from 'date-fns/toDate'

function getDaysOfMonth(dirtyDate) {
  const date = toDate(dirtyDate)
  const end = endOfWeek(endOfMonth(date))
  let current = startOfWeek(startOfMonth(date))
  current.setHours(dirtyDate.getHours())
  current.setMinutes(dirtyDate.getMinutes())
  current.setSeconds(dirtyDate.getSeconds())

  const days = []

  while (current.getTime() < end.getTime()) {
    days.push(current)
    current = addDays(current, 1)
  }

  return days
}

function isInvalid(date) {
  // eslint-disable-next-line
  return isNaN(date)
}

function toDateWithFormat(dirtyDate, fmt, def) {
  let date
  if (typeof dirtyDate === 'string') date = parse(dirtyDate, fmt, new Date())
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

function newDate() {
  const date = new Date()
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function cloneTime(date, old, fmt) {
  old = toDateWithFormat(old, fmt)
  if (isInvalid(old)) return date

  date.setHours(old.getHours())
  date.setMinutes(old.getMinutes())
  date.setSeconds(old.getSeconds())

  return date
}

export default {
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
  parse,
  toDate,
  toDateWithFormat,
}
