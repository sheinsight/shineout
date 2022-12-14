"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.lazyloadClass = void 0;

require("../../styles/normalize.less");

var _lazyload = _interopRequireDefault(require("./lazyload.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var lazyloadClass = (0, _classname.default)(_lazyload.default, 'lazyload');
exports.lazyloadClass = lazyloadClass;