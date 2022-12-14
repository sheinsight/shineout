"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Popover = _interopRequireDefault(require("../Popover"));

var _proptypes = require("../utils/proptypes");

var _styles = require("./styles");

var _uid = require("../utils/uid");

var _Caret = _interopRequireDefault(require("../icons/Caret"));

var Breadcrumb =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(Breadcrumb, _React$PureComponent);

  function Breadcrumb() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Breadcrumb.prototype;

  _proto.renderArray = function renderArray(data) {
    var _this = this;

    var first = data[0];
    return _react.default.createElement("span", null, this.renderItem(first), _react.default.createElement("span", {
      className: (0, _styles.breadcrumbClass)('down')
    }, _react.default.createElement(_Caret.default, null)), _react.default.createElement(_Popover.default, {
      position: "bottom"
    }, data.slice(1).map(function (d, i) {
      return _react.default.createElement("div", {
        className: (0, _styles.breadcrumbClass)('dropdown-item'),
        key: i
      }, _this.renderItem(d));
    })));
  };

  _proto.renderItem = function renderItem(d) {
    var renderItem = this.props.renderItem;
    var item = d.title;

    if (!_react.default.isValidElement(item)) {
      if (d.onClick || d.url) {
        var props = {
          onClick: d.onClick
        };
        if (d.url) props.href = d.url;
        item = _react.default.createElement("a", props, d.icon, "\xA0", d.title);
      } else {
        item = _react.default.createElement("b", null, d.title);
      }
    }

    return renderItem ? renderItem(d) : item;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        data = _this$props.data,
        separator = _this$props.separator,
        keygen = _this$props.keygen;
    var className = (0, _classnames.default)((0, _styles.breadcrumbClass)('_'), this.props.className);
    return _react.default.createElement("div", {
      className: className,
      style: this.props.style
    }, data.map(function (d, index) {
      return _react.default.createElement("span", {
        key: keygen ? (0, _uid.getKey)(d, keygen, index) : index
      }, Array.isArray(d) ? _this2.renderArray(d) : _this2.renderItem(d), index !== data.length - 1 ? _react.default.createElement("span", {
        className: (0, _styles.breadcrumbClass)('separator')
      }, separator) : null);
    }));
  };

  return Breadcrumb;
}(_react.default.PureComponent);

Breadcrumb.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default), {
  data: _propTypes.default.array,
  renderItem: _propTypes.default.func,
  separator: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element])
});
Breadcrumb.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  data: [],
  separator: '/'
});
Breadcrumb.displayName = 'ShineoutBreadcrumb';
var _default = Breadcrumb;
exports.default = _default;