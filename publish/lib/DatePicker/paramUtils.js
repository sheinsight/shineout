"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _is = require("../utils/is");

var TIME_FORMAT = _utils.default.TIME_FORMAT,
    compareAsc = _utils.default.compareAsc,
    addSeconds = _utils.default.addSeconds,
    format = _utils.default.format;

var handleOnChangeParams = function handleOnChangeParams(type) {
  return function (date, change, blur, isEnd, isQuickSelect) {
    if (blur === void 0) {
      blur = undefined;
    }

    if (isEnd === void 0) {
      isEnd = undefined;
    }

    if (isQuickSelect === void 0) {
      isQuickSelect = undefined;
    }

    return [date, change, blur, isEnd, isQuickSelect, type];
  };
};

var yearHandleChangeParams = handleOnChangeParams('year');
var monthHandleChangeParams = handleOnChangeParams('month');
var quarterHandleChangeParams = handleOnChangeParams('quarter');
var dayHandleChangeParams = handleOnChangeParams('day');
var weekHandleChangeParams = handleOnChangeParams('week');
var timeHandleChangeParams = handleOnChangeParams('time');
var quickHandleChangeParams = handleOnChangeParams('quick');

function handleTimeDisabled(date, disabledTime, options) {
  if (typeof disabledTime === 'string') return format(date, TIME_FORMAT, options) === disabledTime;
  if (typeof disabledTime === 'function') return disabledTime(format(date, TIME_FORMAT, options));
  return undefined;
}

function handleDisabled() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var date = args[0],
      min = args[1],
      max = args[2],
      range = args[3],
      disabled = args[4],
      disabledTime = args[5],
      options = args[6];
  var isDisabled;
  if (disabled) isDisabled = disabled(date);
  if (disabledTime) isDisabled = isDisabled || handleTimeDisabled(date, disabledTime);
  if (isDisabled) return true;

  if (!isDisabled && min) {
    if (compareAsc(date, min) < 0) return true;
    if (range && (0, _is.isNumber)(range) && compareAsc(date, addSeconds(min, range, options)) > 0) return true;
  }

  if (!isDisabled && max) {
    if (compareAsc(date, max) > 0) return true;
    if (range && (0, _is.isNumber)(range) && compareAsc(date, addSeconds(max, -range, options)) < 0) return true;
  }

  return false;
}

function judgeTimeByRange() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var target = args[0],
      value = args[1],
      mode = args[2],
      min = args[3],
      max = args[4],
      range = args[5],
      disabled = args[6],
      disabledTime = args[7],
      options = args[8];
  var date = new Date(value.getTime());

  switch (mode) {
    case 'H':
      date = _utils.default.changeDate(date, 'hour', target, options);
      break;

    case 'h':
      if (_utils.default.getDateInfo(date, 'hour', options) >= 12) {
        date = _utils.default.changeDate(date, 'hour', target + 12, options);
        break;
      }

      date = _utils.default.changeDate(date, 'hour', target, options);
      break;

    case 'm':
    case 'minute':
      date = _utils.default.changeDate(date, 'minute', target, options);
      break;

    case 's':
    case 'second':
      date = _utils.default.changeDate(date, 'second', target, options);
      break;

    case 'ampm':
      {
        var hours = _utils.default.getDateInfo(date, 'hour', options);

        if (target === 1 && hours < 12) {
          date = _utils.default.changeDate(date, 'hour', hours + 12, options);
        } else if (target === 0 && hours >= 12) {
          date = _utils.default.changeDate(date, 'hour', hours - 12, options);
        }
      }
      break;

    default:
      break;
  }

  var isDisabled = handleDisabled(date, min, max, range, disabled, disabledTime, options);
  return [isDisabled, date];
}

var _default = {
  handleOnChangeParams: handleOnChangeParams,
  yearHandleChangeParams: yearHandleChangeParams,
  monthHandleChangeParams: monthHandleChangeParams,
  dayHandleChangeParams: dayHandleChangeParams,
  timeHandleChangeParams: timeHandleChangeParams,
  quickHandleChangeParams: quickHandleChangeParams,
  weekHandleChangeParams: weekHandleChangeParams,
  quarterHandleChangeParams: quarterHandleChangeParams,
  judgeTimeByRange: judgeTimeByRange,
  handleTimeDisabled: handleTimeDisabled,
  handleDisabled: handleDisabled
};
exports.default = _default;