import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import addYears from 'date-fns/addYears'
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

export default {
  addDays,
  addMonths,
  addYears,
  getDaysOfMonth,
  format,
  parse,
  toDate,
  isSameDay,
  isSameMonth,
  isSameWeek,
}
