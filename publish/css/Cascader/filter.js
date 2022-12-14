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

var _uid = require("../utils/uid");

var _component = require("../component");

var _tree = require("../utils/tree");

var _default = function _default(Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inheritsLoose2.default)(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.handleFilter = _this.handleFilter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.state = {
        filterText: '',
        filter: null
      };
      return _this;
    }

    var _proto = _class.prototype;

    _proto.getData = function getData() {
      var _this2 = this;

      var _this$props = this.props,
          data = _this$props.data,
          childrenKey = _this$props.childrenKey,
          keygen = _this$props.keygen;
      var filter = this.state.filter;
      if (!filter) return data;
      return (0, _tree.getFilterTree)(data, filter, undefined, function (node) {
        return (0, _uid.getKey)(node, keygen);
      }, childrenKey, true, function (node) {
        if (_this2.firstMatchNode) return;
        _this2.firstMatchNode = node;
      });
    };

    _proto.handleFilter = function handleFilter(filterText) {
      var _this3 = this;

      var _this$props2 = this.props,
          filterDelay = _this$props2.filterDelay,
          onFilter = _this$props2.onFilter;
      if (this.timer) clearTimeout(this.timer);
      this.firstMatchNode = null;

      if (filterText.length === 0) {
        this.setState({
          filter: null,
          filterText: filterText
        });
        return;
      }

      this.timer = setTimeout(function () {
        var fn = onFilter(filterText);

        if (typeof fn === 'function') {
          _this3.setState({
            filter: fn,
            filterText: filterText
          });
        }
      }, filterDelay);
    };

    _proto.render = function render() {
      var onFilter = this.props.onFilter;
      var _this$state = this.state,
          filterText = _this$state.filterText,
          filter = _this$state.filter;
      if (!onFilter) return _react.default.createElement(Origin, this.props);
      var data = this.getData();
      return _react.default.createElement(Origin, (0, _extends2.default)({}, this.props, {
        data: data,
        filterText: filterText,
        onFilter: this.handleFilter,
        filterDataChange: filter,
        firstMatchNode: this.firstMatchNode
      }));
    };

    return _class;
  }(_component.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    onFilter: _propTypes.default.func,
    filterDelay: _propTypes.default.number,
    data: _propTypes.default.array,
    childrenKey: _propTypes.default.string,
    keygen: _propTypes.default.any,
    mode: _propTypes.default.number
  }), (0, _defineProperty2.default)(_class, "defaultProps", {
    filterDelay: 400
  }), _temp;
};

exports.default = _default;