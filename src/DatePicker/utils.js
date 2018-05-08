import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import addYears from 'date-fns/addYears'
import compareAsc from 'date-fns/compareAsc'
import endOfMonth from 'date-fns/endOfMonth'
import endOfWeek from 'date-fns/endOfWeek'
import format from 'date-fns/format'
import isSameDay from 'date-fns/isSameDay'
import isSameMonth from 'date-fns/isSameMonth'
import isSameWeek from 'date-fns/isSameWeek'
import parse from 'date-fns/parse'
import startOfMonth from 'date-fns/startOfMonth'
import startOfWeek from 'date-fns/startOfWeek'
import toDate from 'date-fns/toDate'

function getDaysOfMonth(dirtyDate) {
  const date = toDate(dirtyDate)
  const end = endOfWeek(endOfMonth(date))
  let current = startOfWeek(startOfMonth(date))
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
  const left = new Date(dateLeft.getFullYear(), dateLeft.getMonth(), 1)
  const right = new Date(dateRight.getFullYear(), dateRight.getMonth() + pad, 1)
  return compareAsc(left, right)
}

export default {
  addDays,
  addMonths,
  addYears,
  compareAsc,
  compareMonth,
  getDaysOfMonth,
  format,
  parse,
  toDate,
  toDateWithFormat,
  isInvalid,
  isSameDay,
  isSameMonth,
  isSameWeek,
}
