"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Modal = _interopRequireDefault(require("./Modal"));

var _events = require("./events");

var _Card = _interopRequireDefault(require("../Card"));

_Modal.default.success = (0, _events.method)('success');
_Modal.default.info = (0, _events.method)('info');
_Modal.default.warn = (0, _events.method)('warning');
_Modal.default.error = (0, _events.method)('error');
_Modal.default.confirm = (0, _events.method)('confirm');
_Modal.default.show = (0, _events.method)('normal');
_Modal.default.Submit = _Card.default.Submit;
_Modal.default.closeAll = _events.closeAll;
var _default = _Modal.default;
exports.default = _default;