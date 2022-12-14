"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _proptypes = require("../utils/proptypes");

var _styles = require("./styles");

var _Links = _interopRequireDefault(require("./Links"));

var _Jumper = _interopRequireDefault(require("./Jumper"));

var _Simple = _interopRequireDefault(require("./Simple"));

var _PageSizeList = _interopRequireDefault(require("./PageSizeList"));

var _config = require("../config");

var _getDataset = _interopRequireDefault(require("../utils/dom/getDataset"));

var _classname = require("../utils/classname");

var Pagination =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Pagination, _PureComponent);

  function Pagination() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Pagination.prototype;

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        align = _this$props.align,
        layout = _this$props.layout,
        size = _this$props.size,
        style = _this$props.style;
    var rtl = (0, _config.isRTL)();
    var className = (0, _classnames.default)((0, _styles.paginationClass)('_', size, align, rtl && 'rtl'), this.props.className);
    var sectionClassName = (0, _styles.paginationClass)((0, _classname.getDirectionClass)('section'));
    return _react.default.createElement("div", (0, _extends2.default)({
      className: className,
      style: style
    }, (0, _getDataset.default)(this.props)), layout.map(function (section, i) {
      switch (section) {
        case 'links':
          return _react.default.createElement(_Links.default, (0, _extends2.default)({
            key: section
          }, _this.props));

        case 'list':
          return _react.default.createElement(_PageSizeList.default, (0, _extends2.default)({
            key: section
          }, _this.props));

        case 'jumper':
          return _react.default.createElement(_Jumper.default, (0, _extends2.default)({
            key: section
          }, _this.props));

        case 'simple':
          return _react.default.createElement(_Simple.default, (0, _extends2.default)({
            key: section
          }, _this.props));

        default:
          if (typeof section === 'function') {
            return _react.default.createElement("div", {
              key: i,
              className: sectionClassName
            }, _react.default.createElement("span", null, section(_this.props)));
          }

          return null;
      }
    }));
  };

  return Pagination;
}(_react.PureComponent);

Pagination.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'size', 'type'), {
  align: _propTypes.default.string,
  current: _propTypes.default.number.isRequired,
  layout: _propTypes.default.array,
  onChange: _propTypes.default.func.isRequired,
  pageSize: _propTypes.default.number.isRequired,
  span: _propTypes.default.number,
  text: _propTypes.default.object,
  total: _propTypes.default.number.isRequired
});
Pagination.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  layout: ['links'],
  span: 5,
  text: {}
});
var _default = Pagination;
exports.default = _default;