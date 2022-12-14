"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.transferClass = void 0;

require("../../styles/normalize.css");

var _transfer = _interopRequireDefault(require("./transfer.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var transferClass = (0, _classname.default)(_transfer.default, 'transfer');
exports.transferClass = transferClass;