"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.cardClass = void 0;

require("../../styles/normalize.less");

var _card = _interopRequireDefault(require("./card.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var cardClass = (0, _classname.default)(_card.default, 'card');
exports.cardClass = cardClass;