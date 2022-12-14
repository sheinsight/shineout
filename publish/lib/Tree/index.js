"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Tree = _interopRequireDefault(require("./Tree"));

var _inputable = _interopRequireDefault(require("../Form/inputable"));

_Tree.default.Select = (0, _inputable.default)(_Tree.default);
_Tree.default.Field = _Tree.default.Select;
_Tree.default.displayName = 'ShineoutTree';
var _default = _Tree.default;
exports.default = _default;