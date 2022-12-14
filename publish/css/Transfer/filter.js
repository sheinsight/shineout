"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _default = function _default(Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inheritsLoose2.default)(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        text: ''
      };
      _this.handleFilter = _this.handleFilter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      return _this;
    }

    var _proto = _class.prototype;

    _proto.getData = function getData() {
      var _this2 = this;

      var _this$props = this.props,
          onFilter = _this$props.onFilter,
          data = _this$props.data,
          index = _this$props.index;
      if (!onFilter || !this.state.text) return data;
      return data.filter(function (d) {
        return onFilter(_this2.state.text, d, !index);
      });
    };

    _proto.handleFilter = function handleFilter(text) {
      var _this$props2 = this.props,
          onSearch = _this$props2.onSearch,
          index = _this$props2.index;
      if (onSearch) onSearch(text, !index);
      this.setState({
        text: text
      });
    };

    _proto.render = function render() {
      var onFilter = this.props.onFilter;
      var data = this.getData();
      var filter = onFilter ? this.handleFilter : undefined;
      return _react.default.createElement(Origin, (0, _extends2.default)({}, this.props, {
        onFilter: filter,
        filterText: this.state.text,
        data: data
      }));
    };

    return _class;
  }(_component.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    data: _propTypes.default.array,
    onFilter: _propTypes.default.func,
    onSearch: _propTypes.default.func,
    index: _propTypes.default.number
  }), _temp;
};

exports.default = _default;