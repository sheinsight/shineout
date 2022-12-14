"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _func = require("../utils/func");

var _delay = _interopRequireDefault(require("../hoc/delay"));

var _trim = _interopRequireDefault(require("../hoc/trim"));

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _inputBorder = _interopRequireDefault(require("../hoc/inputBorder"));

var _Textarea = _interopRequireDefault(require("./Textarea"));

var _styles = require("../Input/styles");

var input = (0, _func.compose)(_inputable.default, (0, _inputBorder.default)({
  className: function className(props) {
    var value = props.value,
        renderFooter = props.renderFooter;
    var footer = null;

    if (renderFooter && typeof renderFooter === 'function') {
      footer = renderFooter(value);
    }

    return footer && (0, _styles.inputClass)('with-footer');
  }
}), (0, _delay.default)(400), _trim.default);
var Textarea = input(_Textarea.default);
Textarea.displayName = 'ShineoutTextarea';
var _default = Textarea;
exports.default = _default;