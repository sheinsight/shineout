"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.cascaderClass = void 0;

require("../../styles/normalize.css");

var _cascader = _interopRequireDefault(require("./cascader.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var cascaderClass = (0, _classname.default)(_cascader.default, 'cascader');
exports.cascaderClass = cascaderClass;