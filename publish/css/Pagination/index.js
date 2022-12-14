"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Pagination = _interopRequireDefault(require("./Pagination"));

var _default =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(_default, _PureComponent);

  function _default(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      current: props.current || props.defaultCurrent,
      pageSize: props.pageSize
    };
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = _default.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.current !== this.props.current || prevProps.pageSize !== this.props.pageSize) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        current: this.props.current,
        pageSize: this.props.pageSize
      });
    }
  };

  _proto.handleChange = function handleChange(current, pageSize) {
    if (pageSize === void 0) {
      pageSize = this.state.pageSize;
    }

    var sizeChange = pageSize !== this.state.pageSize;
    this.setState({
      current: current,
      pageSize: pageSize
    });

    if (this.props.onChange) {
      this.props.onChange(current, pageSize, sizeChange);
    }
  };

  _proto.render = function render() {
    var current = this.props.current || this.state.current;
    if (this.props.total < 0) return null;
    return _react.default.createElement(_Pagination.default, (0, _extends2.default)({}, this.props, {
      current: current,
      pageSize: this.state.pageSize,
      onChange: this.handleChange
    }));
  };

  return _default;
}(_react.PureComponent);

exports.default = _default;
(0, _defineProperty2.default)(_default, "displayName", 'ShineoutPagination');
(0, _defineProperty2.default)(_default, "propTypes", {
  current: _propTypes.default.number,
  defaultCurrent: _propTypes.default.number,
  onChange: _propTypes.default.func,
  pageSize: _propTypes.default.number,
  total: _propTypes.default.number
});
(0, _defineProperty2.default)(_default, "defaultProps", {
  defaultCurrent: 1,
  pageSize: 10,
  total: 0
});