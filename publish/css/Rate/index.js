"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Rate = _interopRequireDefault(require("./Rate"));

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _default = function _default(background, front, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var Rate = (0, _inputable.default)(function (props) {
    return _react.default.createElement(_Rate.default, (0, _extends2.default)({}, opts, props, {
      background: background,
      front: front || background
    }));
  });
  Rate.displayName = 'ShineoutRate';
  return Rate;
};

exports.default = _default;