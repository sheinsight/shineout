"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _CardGroup = _interopRequireDefault(require("./CardGroup"));

var _Item = _interopRequireDefault(require("./Item"));

var _context = require("./context");

_CardGroup.default.Item = (0, _context.consumer)(_Item.default);
_Item.default.displayName = 'ShineoutCardGroupItem';
_CardGroup.default.displayName = 'ShineoutCardGroup';
var _default = _CardGroup.default;
exports.default = _default;