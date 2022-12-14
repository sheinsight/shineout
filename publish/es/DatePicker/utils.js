import _objectSpread from "@babel/runtime/helpers/objectSpread";
import dayjs from 'dayjs';
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import weekYear from 'dayjs/plugin/weekYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import enLocale from 'dayjs/locale/en';

var en2Locate = _objectSpread({}, enLocale, {
  name: 'en2',
  weekStart: 1
});

dayjs.locale(en2Locate, null, true);
dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);
dayjs.extend(relativeTime);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(customParseFormat);
dayjs.extend(quarterOfYear);
var TIME_FORMAT = 'HH:mm:ss';

var compatibleFmt = function compatibleFmt(fmt) {
  if (typeof fmt !== 'string') return fmt;
  var trans = {
    yy: 'YY',
    d: 'D',
    a: 'A',
    t: 'X',
    T: 'x',
    RRRR: 'GGGG',
    II: 'WW'
  };
  var result = fmt;
  Object.keys(trans).forEach(function (key) {
    result = result.replace(new RegExp(key, 'g'), trans[key]);
  });
  return result;
};

function getDayJsLocate(options) {
  if (options && options.weekStartsOn === 1) return 'en2';
  return 'en';
}

function transDateWithZone(dd, options, back) {
  if (options === void 0) {
    options = {};
  }

  if (back === void 0) {
    back = false;
  }

  if (options.timeZone) {
    var timezoneHH = /^([+-]\d{2})$/; // 只放开两位时区

    if (timezoneHH.test(options.timeZone)) {
      var num = +options.timeZone;

      if (num <= 13 && num >= -12) {
        return back ? zonedTimeToUtc(dd, options.timeZone) : utcToZonedTime(dd, options.timeZone);
      }
    }

    console.error("\u4E0D\u652F\u6301\u4F20\u5165\u7684\u65F6\u533A\u683C\u5F0F\uFF1A" + options.timeZone);
  }

  return dd;
}

function addDays(date, offset, options) {
  var zd = transDateWithZone(date, options);
  var d = dayjs(zd).add(offset, 'day').toDate();
  var ud = transDateWithZone(d, options, true);
  return ud;
}

function addMonths(date, offset, options) {
  var zd = transDateWithZone(date, options);
  var d = dayjs(zd).add(offset, 'month').toDate();
  var ud = transDateWithZone(d, options, true);
  return ud;
}

function addSeconds(date, offset, options) {
  var zd = transDateWithZone(date, options);
  var d = dayjs(zd).add(offset, 'seconds').toDate();
  var ud = transDateWithZone(d, options, true);
  return ud;
}

function addYears(date, offset, options) {
  var zd = transDateWithZone(date, options);
  var d = dayjs(zd).add(offset, 'year').toDate();
  var ud = transDateWithZone(d, options, true);
  return ud;
}

function changeDate(date, type, num, options) {
  var zd = transDateWithZone(date, options); // type is year month ...

  var d = dayjs(zd)[type](num).toDate();
  var ud = transDateWithZone(d, options, true);
  return ud;
}

function getDateInfo(date, type, options) {
  var zd = transDateWithZone(date, options);
  return dayjs(zd)[type]();
}

function compareAsc(dateA, dateB) {
  if (!dateA || !dateB) return NaN;
  var a = dayjs(dateA).valueOf();
  var b = dayjs(dateB).valueOf();
  if (!a || !b) return NaN;
  if (a === b) return 0;
  return a > b ? 1 : -1;
}

function format(date, fmt, options) {
  if (options === void 0) {
    options = {};
  }

  if (!date) return 'Invalid Date';
  var fmt2 = compatibleFmt(fmt);
  var zd = date;

  if (fmt2 !== 'X' && fmt2 !== 'x') {
    zd = transDateWithZone(date, options);
  }

  var dd = dayjs(zd).locale(getDayJsLocate(options));
  var result = dd.format(fmt2);
  return result;
}

function isSameMonth(date1, date2, options) {
  if (options === void 0) {
    options = {};
  }

  return date1 && date2 && format(date1, 'YYYY-MM', options) === format(date2, 'YYYY-MM', options);
}

function isSameDay(date1, date2, options) {
  return date1 && date2 && format(date1, 'YYYY-MM-dd', options) === format(date2, 'YYYY-MM-dd', options);
}

function isSameWeek(date1, date2, options) {
  if (!date1 || !date2) return false;
  return date1 && date2 && format(date1, 'gggg-ww', options) === format(date2, 'gggg-ww', options);
}

function isSameQuarter(date1, date2, options) {
  if (!date1 || !date2) return false;
  return date1 && date2 && format(date1, 'YYYY Q', options) === format(date2, 'YYYY Q', options);
}

function isValid(date) {
  if (!date) return false;
  if (!(date instanceof Date)) return false;
  return dayjs(date).isValid();
}

function parse(d, fmt, options) {
  if (!d) return new Date(''); // should clear[xxx]

  var reg = /[[]([^[^\]]+?)[\]]/g;
  var date = d && d.replace ? d.replace(reg, ' ') : d;
  var fmt2 = compatibleFmt(fmt).replace(reg, ' '); // handle IOS Year Week

  var index = fmt2.indexOf('GGGG');

  if (index >= 0) {
    var year = date.slice(index, index + 5);
    var weekIndex = fmt2.indexOf('WW');
    var week = weekIndex >= 0 ? date.slice(weekIndex, weekIndex + 3) : 1;

    var _result = dayjs(year + "-06-15", 'YYYY-MM-dd').locale(getDayJsLocate(options)).isoWeek(Number(week)).toDate();

    return transDateWithZone(_result, options, true);
  } // handle Quarter


  var quarterIndex = fmt2.indexOf('Q');

  if (quarterIndex >= 0) {
    var quarter = date.slice(quarterIndex, quarterIndex + 2);

    var _result2 = dayjs(date, fmt2).locale(getDayJsLocate(options)).quarter(quarter).toDate();

    return transDateWithZone(_result2, options, true);
  } // dayjs parse stamp with  timeZone have bug


  if (fmt2 === 'x' || fmt2 === 'X') {
    var stamp = +date;
    if (fmt2 === 'X') stamp *= 1000;
    return new Date(stamp);
  }

  var result = dayjs(date, fmt2, getDayJsLocate(options)).toDate();
  return transDateWithZone(result, options, true);
}

function toDate(day, options) {
  if (!day) return new Date('');
  if (day instanceof Date) return dayjs(day).toDate();
  if (typeof day === 'number') return new Date(day);
  if (typeof day === 'string') return transDateWithZone(dayjs(day).toDate(), options, true);
  return dayjs(day).toDate();
}

function getDaysOfMonth(dirtyDate, options) {
  var date = toDate(dirtyDate, options);
  var temp = dayjs(transDateWithZone(date, options));
  var current = dayjs(transDateWithZone(date, options)).locale(getDayJsLocate(options)).startOf('month').startOf('week').hour(temp.hour()).minute(temp.minute()).second(temp.second()).millisecond(temp.millisecond());
  var days = [];
  var index = 0;

  while (index < 42) {
    days.push(transDateWithZone(current.toDate(), options, true));
    current = current.add(1, 'day');
    index += 1;
  }

  return days;
}

function isInvalid(date) {
  // eslint-disable-next-line
  return isNaN(date);
}

function toDateWithFormat(dirtyDate, fmt, def, options) {
  var date;

  if (typeof dirtyDate === 'string') {
    date = parse(dirtyDate, fmt, options);
    var str = format(date, fmt, options);

    if (str !== dirtyDate) {
      date = toDate(dirtyDate, options);
    }
  } else date = toDate(dirtyDate, options);

  if (isInvalid(date)) date = def;
  return date;
}

function compareDay(dateLeft, dateRight, pad, options) {
  if (pad === void 0) {
    pad = 0;
  }

  if (!dateLeft || !dateRight) return NaN;
  var left = dayjs(transDateWithZone(dateLeft, options)).startOf('date').toDate();
  var right = dayjs(transDateWithZone(dateRight, options)).startOf('date').add(pad, 'day').toDate();
  return compareAsc(left, right);
}

function compareMonth(dateLeft, dateRight, pad, options) {
  if (pad === void 0) {
    pad = 0;
  }

  if (!dateLeft || !dateRight) return 0;
  var left = dayjs(transDateWithZone(dateLeft, options)).startOf('month').toDate();
  var right = dayjs(transDateWithZone(dateRight, options)).startOf('month').add(pad, 'month').toDate();
  return compareAsc(left, right);
}

function compareYear(dateLeft, dateRight, pad, options) {
  if (pad === void 0) {
    pad = 0;
  }

  if (!dateLeft || !dateRight) return 0;
  var left = dayjs(transDateWithZone(dateLeft, options)).startOf('year').toDate();
  var right = dayjs(transDateWithZone(dateRight, options)).startOf('year').add(pad, 'year').toDate();
  return compareAsc(left, right);
}

function compareQuarter(dateLeft, dateRight, pad, options) {
  if (pad === void 0) {
    pad = 0;
  }

  if (!dateLeft || !dateRight) return 0;
  var left = dayjs(transDateWithZone(dateLeft, options)).startOf('quarter').toDate();
  var right = dayjs(transDateWithZone(dateRight, options)).startOf('quarter').add(pad, 'quarter').toDate();
  return compareAsc(left, right);
}

function newDate(defaultDate, options) {
  var date = defaultDate ? toDate(defaultDate, options) : new Date();
  var zd = transDateWithZone(date, options);
  var dd = dayjs(zd).startOf('date').toDate();
  var ud = transDateWithZone(dd, options, true);
  return ud;
}

function setTime(date, old) {
  date.setHours(old.getHours());
  date.setMinutes(old.getMinutes());
  date.setSeconds(old.getSeconds());
  date.setMilliseconds(old.getMilliseconds());
  return date;
}

function cloneTime(date, old, fmt, options) {
  if (!date) return date;
  var oldDate = toDateWithFormat(old, fmt, undefined, options);
  if (isInvalid(oldDate)) return date;
  return setTime(date, oldDate);
}

function formatDateWithDefaultTime(date, value, defaultTime, fmt, options) {
  if (!date) return date;
  if (value) return setTime(date, value);
  if (!defaultTime) return date;
  var dateHMS = toDateWithFormat(defaultTime, TIME_FORMAT, undefined, options);
  if (isInvalid(dateHMS)) return date;
  var nDate = cloneTime(date, defaultTime, TIME_FORMAT, options);
  return format(nDate, fmt, options);
}

function clearHMS(date, options) {
  if (!isValid(date)) return date;
  var zd = transDateWithZone(date, options);
  var dd = dayjs(zd).startOf('date').toDate();
  var ud = transDateWithZone(dd, options, true);
  return ud;
}

function compareDateArray(arr1, arr2, type, options) {
  if (type === void 0) {
    type = 'date';
  }

  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  return arr1.every(function (v, i) {
    if (!v || !arr2[i]) return false;
    if (type === 'week') return format(v, 'RRRR II', options) === format(arr2[i], 'RRRR II', options);
    return v.getTime() === arr2[i].getTime();
  });
}

function getFormat(fo) {
  var defaultFormat = 'yyyy-MM-dd HH:mm:ss.SSS';
  ['H', 'm', 's', 'S', 'h'].map(function (v) {
    if (fo.indexOf(v) <= -1) {
      var reg = new RegExp("" + v, 'g');
      defaultFormat = defaultFormat.replace(reg, '0');
    }

    return v;
  });
  return defaultFormat;
}

function resetTimeByFormat(value, fo, options) {
  if (!value) return null;
  var date = toDate(value, options);
  return toDate(format(date, getFormat(fo), options), options);
}

function formatted(date, fmt, options) {
  if (typeof fmt === 'function') return fmt(date);
  return format(date, fmt, options);
}

export default {
  clearHMS: clearHMS,
  addDays: addDays,
  addMonths: addMonths,
  addYears: addYears,
  addSeconds: addSeconds,
  cloneTime: cloneTime,
  compareAsc: compareAsc,
  compareMonth: compareMonth,
  compareDay: compareDay,
  compareQuarter: compareQuarter,
  getDaysOfMonth: getDaysOfMonth,
  format: formatted,
  isInvalid: isInvalid,
  isSameDay: isSameDay,
  isSameMonth: isSameMonth,
  isSameWeek: isSameWeek,
  isSameQuarter: isSameQuarter,
  isValid: isValid,
  newDate: newDate,
  setTime: setTime,
  parse: parse,
  toDate: toDate,
  toDateWithFormat: toDateWithFormat,
  formatDateWithDefaultTime: formatDateWithDefaultTime,
  compareDateArray: compareDateArray,
  compareYear: compareYear,
  TIME_FORMAT: TIME_FORMAT,
  resetTimeByFormat: resetTimeByFormat,
  changeDate: changeDate,
  getDateInfo: getDateInfo
};