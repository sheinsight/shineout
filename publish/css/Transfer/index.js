"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Transfer = _interopRequireDefault(require("./Transfer"));

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _func = require("../utils/func");

var _Datum = _interopRequireDefault(require("../Datum"));

var exportTransfer = (0, _func.compose)(_inputable.default, _Datum.default.hoc({
  bindProps: ['disabled', 'limit', 'format', 'prediction', 'separator']
}))(_Transfer.default);
exportTransfer.displayName = 'ShineoutTransfer';
var _default = exportTransfer;
exports.default = _default;