"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _List = _interopRequireDefault(require("./List"));

var _hidable = _interopRequireDefault(require("../hoc/hidable"));

var List = function List(type, duration, display) {
  switch (duration) {
    case 'fast':
      duration = 240;
      break;

    case 'slow':
      duration = 480;
      break;

    default:
      if (typeof duration !== 'number') duration = 360;
      break;
  }

  if (typeof type === 'string') type = [type];
  return (0, _hidable.default)(_List.default, {
    type: type,
    duration: duration,
    display: display
  });
};

var _default = List;
exports.default = _default;