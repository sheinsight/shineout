"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.editableAreaClass = void 0;

require("../../styles/normalize.css");

var _editableArea = _interopRequireDefault(require("./editableArea.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var editableAreaClass = (0, _classname.default)(_editableArea.default, 'editableArea');
exports.editableAreaClass = editableAreaClass;