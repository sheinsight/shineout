"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("../Button"));

var _element = require("../utils/dom/element");

var _formContext = require("./formContext");

var _default = function _default(htmlType) {
  var _class, _temp;

  return (0, _formContext.formConsumer)(['disabled'], (_temp = _class =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inheritsLoose2.default)(FormButton, _PureComponent);

    function FormButton(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      return _this;
    }

    var _proto = FormButton.prototype;

    _proto.bindElement = function bindElement(el) {
      this.button = el;
    };

    _proto.handleClick = function handleClick(e) {
      if (htmlType === 'button') {
        var form = (0, _element.getParent)(this.button, 'form');
        (0, _element.dispatchEvent)(form, 'submit', e.target);
      }

      if (this.props.onClick) this.props.onClick();
    };

    _proto.render = function render() {
      var _this$props = this.props,
          children = _this$props.children,
          onClick = _this$props.onClick,
          other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children", "onClick"]);
      var type = this.props.type || (htmlType === 'reset' ? 'default' : 'primary');
      return _react.default.createElement(_Button.default, (0, _extends2.default)({}, other, {
        type: type,
        htmlType: htmlType,
        onRef: this.bindElement,
        onClick: this.handleClick
      }), children);
    };

    return FormButton;
  }(_react.PureComponent), (0, _defineProperty2.default)(_class, "propTypes", {
    children: _propTypes.default.any,
    disabled: _propTypes.default.bool,
    loading: _propTypes.default.bool,
    onClick: _propTypes.default.func,
    type: _propTypes.default.string
  }), _temp));
};

exports.default = _default;