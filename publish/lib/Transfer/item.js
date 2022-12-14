"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _component = require("../component");

var _styles = require("./styles");

var _context = _interopRequireDefault(require("./context"));

var Item =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Item, _PureComponent);

  function Item(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.check = _this.check.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Item.prototype;

  _proto.check = function check(c) {
    var _this$props = this.props,
        index = _this$props.index,
        selecteds = _this$props.selecteds,
        checkKey = _this$props.checkKey,
        setSelecteds = _this$props.setSelecteds;

    if (c) {
      setSelecteds(index, [].concat(selecteds[index], [checkKey]));
    } else {
      setSelecteds(index, selecteds[index].filter(function (ch) {
        return ch !== checkKey;
      }));
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        content = _this$props2.content,
        selecteds = _this$props2.selecteds,
        checkKey = _this$props2.checkKey,
        index = _this$props2.index,
        disabled = _this$props2.disabled,
        itemClass = _this$props2.itemClass;
    return _react.default.createElement("div", {
      className: (0, _classnames.default)((0, _styles.transferClass)('item', disabled && 'item-disabled'), itemClass)
    }, _react.default.createElement(_Checkbox.default, {
      className: (0, _styles.transferClass)('item-check'),
      onChange: this.check,
      disabled: disabled,
      checked: selecteds[index].indexOf(checkKey) > -1
    }, content));
  };

  return Item;
}(_component.PureComponent);

Item.propTypes = {
  index: _propTypes.default.number,
  selecteds: _propTypes.default.array,
  checkKey: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  setSelecteds: _propTypes.default.func,
  content: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  itemClass: _propTypes.default.string
};

var _default = function _default(prop) {
  return _react.default.createElement(_context.default.Consumer, null, function (value) {
    return _react.default.createElement(Item, (0, _extends2.default)({}, prop, {
      selecteds: value.selecteds,
      setSelecteds: value.setSelecteds
    }));
  });
};

exports.default = _default;