"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _react = _interopRequireDefault(require("react"));

var _pagable = _interopRequireDefault(require("../hoc/pagable"));

function _default(Origin) {
  return function (props) {
    // eslint-disable-next-line react/prop-types
    var pagination = props.pagination;
    var Render = pagination ? (0, _pagable.default)(Origin) : Origin;
    return _react.default.createElement(Render, props);
  };
}