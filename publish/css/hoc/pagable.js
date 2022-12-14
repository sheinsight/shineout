"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _Pagination = _interopRequireDefault(require("../Pagination"));

function getData(data, pager) {
  if (!Array.isArray(data)) return data;
  if (data.length <= pager.pageSize) return data;
  var start = (pager.current - 1) * pager.pageSize;
  return data.slice(start, start + pager.pageSize);
}

function _default(Component) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inheritsLoose2.default)(_class, _PureComponent);

    function _class(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      var pp = props.pagination;
      _this.state = {
        current: pp.current || pp.defaultCurrent || 1,
        pageSize: pp.pageSize || 10
      };
      _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      return _this;
    }

    var _proto = _class.prototype;

    _proto.getProp = function getProp(key) {
      return this.props.pagination[key] || this.state[key];
    };

    _proto.getPager = function getPager(data, pagination) {
      var loading = this.props.loading;
      var total = Array.isArray(data) ? data.length : 0;
      return Object.assign({
        current: this.getProp('current'),
        pageSize: this.getProp('pageSize'),
        total: total,
        disabled: !!loading
      }, pagination, {
        onChange: this.handleChange
      });
    };

    _proto.handleChange = function handleChange(current, pageSize) {
      var onChange = this.props.pagination.onChange;
      this.setState({
        current: current,
        pageSize: pageSize
      });
      if (onChange) onChange(current, pageSize);
    };

    _proto.render = function render() {
      var _this$props = this.props,
          pagination = _this$props.pagination,
          data = _this$props.data,
          props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["pagination", "data"]);
      var pager = this.getPager(data, pagination);
      return [_react.default.createElement(Component, (0, _extends2.default)({
        key: "origin",
        data: getData(data, pager)
      }, props)), _react.default.createElement(_Pagination.default, (0, _extends2.default)({
        key: "pager"
      }, pager))];
    };

    return _class;
  }(_component.PureComponent), (0, _defineProperty2.default)(_class, "propTypes", {
    data: _propTypes.default.any,
    loading: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.node]),
    pagination: _propTypes.default.object.isRequired
  }), _temp;
}