"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.treeSelectClass = void 0;

require("../../styles/normalize.css");

var _treeSelect = _interopRequireDefault(require("./treeSelect.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var treeSelectClass = (0, _classname.default)(_treeSelect.default, 'treeSelect');
exports.treeSelectClass = treeSelectClass;