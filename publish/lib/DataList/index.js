"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _func = require("../utils/func");

var _Datum = _interopRequireDefault(require("../Datum"));

var _List = _interopRequireDefault(require("./List"));

var _BaseItem = _interopRequireDefault(require("./BaseItem"));

var _Pagination = _interopRequireDefault(require("./Pagination"));

var List = (0, _func.compose)(_Datum.default.hoc({
  bindProps: ['disabled', 'limit', 'format', 'prediction', 'distinct'],
  ignoreUndefined: true,
  setValueType: null,
  pure: false
}), _Pagination.default)(_List.default);
List.BaseItem = _BaseItem.default;
var _default = List;
exports.default = _default;