"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.cardGroupClass = void 0;

require("../../styles/normalize.css");

var _cardGroup = _interopRequireDefault(require("./cardGroup.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var cardGroupClass = (0, _classname.default)(_cardGroup.default, 'card-group');
exports.cardGroupClass = cardGroupClass;