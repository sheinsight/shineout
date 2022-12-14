"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _implementation = _interopRequireDefault(require("./implementation"));

// copy from https://github.com/jamiebuilds/create-react-context
// Solve the version conflict between create-react-context and react17
var _default = _react.default.createContext || _implementation.default;

exports.default = _default;