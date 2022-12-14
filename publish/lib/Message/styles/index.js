"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.messageClass = void 0;

require("../../styles/normalize.less");

require("../../Alert/styles/alert.less");

var _message = _interopRequireDefault(require("./message.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

// rely Alert
var messageClass = (0, _classname.default)(_message.default, 'message');
exports.messageClass = messageClass;