"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Select = _interopRequireDefault(require("../Select"));

var _styles = require("./styles");

var _classname = require("../utils/classname");

var PageSizeList =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(PageSizeList, _PureComponent);

  function PageSizeList(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = PageSizeList.prototype;

  _proto.handleChange = function handleChange(pageSize) {
    var _this$props = this.props,
        current = _this$props.current,
        onChange = _this$props.onChange;
    var start = (current - 1) * this.props.pageSize + 1;
    onChange(Math.ceil(start / pageSize), pageSize);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        pageSize = _this$props2.pageSize,
        pageSizeList = _this$props2.pageSizeList,
        text = _this$props2.text,
        disabled = _this$props2.disabled,
        size = _this$props2.size,
        _this$props2$sizeList = _this$props2.sizeListProps,
        sizeListProps = _this$props2$sizeList === void 0 ? {} : _this$props2$sizeList;
    return _react.default.createElement(_Select.default, (0, _extends2.default)({
      onChange: this.handleChange,
      disabled: disabled,
      absolute: true,
      autoAdapt: true,
      keygen: true,
      value: pageSize,
      size: size,
      className: (0, _styles.paginationClass)((0, _classname.getDirectionClass)('section'), 'pagesize'),
      data: pageSizeList,
      renderItem: function renderItem(d) {
        return d + " " + (text.page || '');
      }
    }, sizeListProps));
  };

  return PageSizeList;
}(_react.PureComponent);

PageSizeList.propTypes = {
  current: _propTypes.default.number.isRequired,
  disabled: _propTypes.default.bool,
  onChange: _propTypes.default.func.isRequired,
  pageSize: _propTypes.default.number.isRequired,
  pageSizeList: _propTypes.default.array,
  text: _propTypes.default.object.isRequired,
  size: _propTypes.default.string,
  sizeListProps: _propTypes.default.object
};
PageSizeList.defaultProps = {
  pageSizeList: [10, 20, 30, 50, 100]
};
var _default = PageSizeList;
exports.default = _default;