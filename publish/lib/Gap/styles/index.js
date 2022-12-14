"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.gapClass = void 0;

require("../../styles/normalize.less");

var _gap = _interopRequireDefault(require("./gap.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var gapClass = (0, _classname.default)(_gap.default, 'gap');
exports.gapClass = gapClass;