"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uid = require("../utils/uid");

var _default = function _default(Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inheritsLoose2.default)(_class, _React$Component);

    function _class(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        data: []
      };
      _this.groupByData = _this.groupByData.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.groupKey = (0, _uid.getUidStr)();
      return _this;
    }

    var _proto = _class.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this.groupByData();
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (prevProps.data !== this.props.data) this.groupByData();
    };

    _proto.groupByData = function groupByData() {
      var _this2 = this;

      var _this$props = this.props,
          groupBy = _this$props.groupBy,
          data = _this$props.data;

      if (typeof groupBy !== 'function') {
        this.setState({
          data: data
        });
        return;
      }

      var groupData = {};
      data.forEach(function (d, i) {
        var _ref;

        var g = groupBy(d, i, data);
        if (!groupData[g]) groupData[g || ''] = g ? [(_ref = {}, _ref[_this2.groupKey] = g, _ref)] : [];
        groupData[g].push(d);
      });
      this.setState({
        data: Object.keys(groupData).reduce(function (p, v) {
          return v ? p.concat(groupData[v]) : groupData[v].concat(p);
        }, [])
      });
    };

    _proto.render = function render() {
      var _this$props2 = this.props,
          groupBy = _this$props2.groupBy,
          data = _this$props2.data,
          props = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["groupBy", "data"]);
      return _react.default.createElement(Origin, (0, _extends2.default)({}, props, {
        data: this.state.data,
        groupKey: this.groupKey
      }));
    };

    return _class;
  }(_react.default.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    data: _propTypes.default.array,
    groupBy: _propTypes.default.func
  }), (0, _defineProperty2.default)(_class, "defaultProps", {
    data: []
  }), _temp;
};

exports.default = _default;