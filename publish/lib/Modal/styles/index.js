"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.modalClass = void 0;

require("../../styles/normalize.less");

var _modal = _interopRequireDefault(require("./modal.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var modalClass = (0, _classname.default)(_modal.default, 'modal');
exports.modalClass = modalClass;