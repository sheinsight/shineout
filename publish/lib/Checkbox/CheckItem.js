"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _component = require("../component");

var _proptypes = require("../utils/proptypes");

var _uid = require("../utils/uid");

var _classname = require("../utils/classname");

var _is = require("../utils/is");

var _Input = _interopRequireDefault(require("../Input"));

var _styles = require("./styles");

var _config = require("../config");

var _getDataset = _interopRequireDefault(require("../utils/dom/getDataset"));

function _default(type) {
  var CheckItem =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inheritsLoose2.default)(CheckItem, _PureComponent);

    function CheckItem(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.state = {
        checked: props.checked
      };
      _this.id = "cb_" + (0, _uid.getUidStr)();
      _this.input = null;
      _this.el = null;
      _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleInputChange = _this.handleInputChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleEnter = _this.handleEnter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.bindRef = _this.bindRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      return _this;
    }

    var _proto = CheckItem.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          checked = _this$props.checked,
          inputable = _this$props.inputable,
          value = _this$props.value,
          htmlValue = _this$props.htmlValue;

      if (prevProps.value !== value && checked === undefined) {
        // eslint-disable-next-line
        this.setState({
          checked: inputable ? !!value : value === htmlValue
        });
      }
    };

    _proto.getChecked = function getChecked() {
      var _this$props2 = this.props,
          checked = _this$props2.checked,
          value = _this$props2.value,
          htmlValue = _this$props2.htmlValue;
      if (typeof checked === 'function') return checked(htmlValue);
      if (checked !== undefined) return checked;
      if (this.state.checked === undefined) return value === htmlValue;
      return this.state.checked;
    };

    _proto.getProp = function getProp(key) {
      if (this.props[key] !== undefined) return this.props[key];
      return this.state[key];
    };

    _proto.bindRef = function bindRef(el) {
      if (el) this.el = el;
    };

    _proto.handleEnter = function handleEnter(e) {
      if ((0, _is.isEnterPress)(e)) {
        this.handleChange({
          target: {
            checked: !this.getChecked()
          }
        }); // e.target.click()
        // if (this.el) this.el.focus()
      }
    };

    _proto.handleChange = function handleChange(e) {
      var _this2 = this;

      var _this$props3 = this.props,
          onChange = _this$props3.onChange,
          onRawChange = _this$props3.onRawChange,
          index = _this$props3.index,
          inputable = _this$props3.inputable;
      var checked = e.target.checked;
      this.setState({
        checked: checked
      }, function () {
        return _this2.el.focus();
      });

      if (type === 'switch' && onChange) {
        onChange(checked);
        return;
      }

      var value = inputable ? this.props.value : this.props.htmlValue;
      if (onRawChange) onRawChange(value, checked);
      value = checked ? value : undefined;
      if (onChange) onChange(value, checked, index);
    };

    _proto.handleInputChange = function handleInputChange(val) {
      var _this$props4 = this.props,
          onChange = _this$props4.onChange,
          index = _this$props4.index;
      var checked = val.length > 0;
      if (onChange) onChange(val, checked, index);
    };

    _proto.render = function render() {
      var _this$props5 = this.props,
          disabled = _this$props5.disabled,
          style = _this$props5.style,
          content = _this$props5.content,
          size = _this$props5.size,
          children = _this$props5.children,
          inputable = _this$props5.inputable,
          onClick = _this$props5.onClick;
      var rtl = (0, _config.isRTL)();
      var checked = this.getChecked();
      var isSwitch = type === 'switch';
      var className = (0, _classnames.default)((0, _styles.checkinputClass)('_', disabled && 'disabled', checked === true && 'checked', checked === 'indeterminate' && 'indeterminate', isSwitch && 'switch', type + "-container", rtl && 'rtl', {
        large: size === 'large',
        small: size === 'small'
      }), this.props.className);
      var checkedChildren = content[0],
          uncheckedChildren = content[1];
      var switchChildren = isSwitch && size !== 'small' ? _react.default.createElement("span", {
        className: (0, _styles.checkinputClass)('switch-children')
      }, checked ? checkedChildren : uncheckedChildren) : null;
      var value = typeof this.props.value === 'string' ? this.props.value : '';
      return _react.default.createElement("label", (0, _extends2.default)({
        onKeyDown: this.handleEnter,
        className: className,
        style: style,
        htmlFor: this.id,
        tabIndex: disabled ? undefined : 0,
        ref: this.bindRef,
        disabled: disabled
      }, (0, _getDataset.default)(this.props)), switchChildren, _react.default.createElement("input", {
        id: this.id,
        disabled: disabled,
        tabIndex: -1,
        type: isSwitch ? 'checkbox' : type,
        onClick: onClick,
        onChange: this.handleChange,
        checked: checked
      }), _react.default.createElement("i", {
        className: (0, _styles.checkinputClass)('indicator', type)
      }), children && !isSwitch && _react.default.createElement("span", {
        className: (0, _styles.checkinputClass)('desc')
      }, children), inputable && !isSwitch && checked && _react.default.createElement(_Input.default, {
        className: (0, _styles.checkinputClass)('text'),
        onChange: this.handleInputChange,
        value: value
      }), isSwitch && _react.default.createElement("span", {
        className: (0, _styles.checkinputClass)((0, _classname.getDirectionClass)('switch-indicator'))
      }));
    };

    return CheckItem;
  }(_component.PureComponent);

  CheckItem.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'disabled'), {
    checked: _propTypes.default.oneOfType([_propTypes.default.oneOf([true, false, 'indeterminate']), _propTypes.default.func]),
    inputable: _propTypes.default.bool,
    htmlValue: _propTypes.default.any,
    index: _propTypes.default.number,
    onChange: _propTypes.default.func,
    onRawChange: _propTypes.default.func,
    value: _propTypes.default.any,
    onClick: _propTypes.default.func,
    size: _propTypes.default.oneOf(['small', 'default', 'large']),
    content: _propTypes.default.array
  });
  CheckItem.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
    htmlValue: true,
    onClick: undefined,
    content: []
  });
  return CheckItem;
}