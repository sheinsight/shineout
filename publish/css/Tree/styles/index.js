"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.treeClass = void 0;

require("../../styles/normalize.css");

var _tree = _interopRequireDefault(require("./tree.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var treeClass = (0, _classname.default)(_tree.default, 'tree');
exports.treeClass = treeClass;