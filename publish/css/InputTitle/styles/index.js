"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.inputTitleClass = void 0;

var _inputTitle = _interopRequireDefault(require("./inputTitle.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var inputTitleClass = (0, _classname.default)(_inputTitle.default, 'input-title-box');
exports.inputTitleClass = inputTitleClass;