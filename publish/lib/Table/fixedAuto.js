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

var _styles = require("../Scroll/styles");

var _shallowEqual = require("../utils/shallowEqual");

var _component = require("../component");

var _default = function _default(Table) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inheritsLoose2.default)(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        fixed: null
      };
      _this.bindWrapper = _this.bindWrapper.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.resetAutoFixedState = _this.resetAutoFixedState.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      return _this;
    }

    var _proto = _class.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var _this2 = this;

      var diff = ['fixed', 'width', 'height', 'data'].find(function (k) {
        return _this2.props[k] && prevProps[k] !== _this2.props[k];
      });
      var reset = !(0, _shallowEqual.compareColumns)(prevProps.columns, this.props.columns) || diff;

      if (reset) {
        this.setState({
          fixed: null
        });
      }
    };

    _proto.getFixed = function getFixed() {
      if (this.state.fixed !== null) return this.state.fixed;
      if (this.props.fixed === 'auto') return 'both';
      return this.props.fixed;
    };

    _proto.bindWrapper = function bindWrapper(wrapper) {
      this.wrapper = wrapper;
    };

    _proto.resetFixed = function resetFixed() {
      if (!this.wrapper) return;
      var verticalHandle = this.wrapper.querySelector("." + (0, _styles.scrollClass)('y') + "." + (0, _styles.scrollClass)('show'));
      var horizontalHandle = this.wrapper.querySelector("." + (0, _styles.scrollClass)('x') + "." + (0, _styles.scrollClass)('show'));
      if (verticalHandle && horizontalHandle) return;
      var fixed;
      if (horizontalHandle) fixed = 'x';else if (verticalHandle) fixed = 'y';
      this.setState({
        fixed: fixed
      });
    };

    _proto.fixedAuto = function fixedAuto() {
      if (this.props.fixed !== 'auto' || this.state.fixed !== null) return;
      this.resetFixed();
    };

    _proto.resetAutoFixedState = function resetAutoFixedState() {
      this.setState({
        fixed: null
      });
    };

    _proto.render = function render() {
      var fixed = this.getFixed();
      setTimeout(this.fixedAuto.bind(this));
      return _react.default.createElement(Table, (0, _extends2.default)({}, this.props, {
        fixed: fixed,
        bindWrapper: this.bindWrapper,
        resetFixAuto: this.resetAutoFixedState
      }));
    };

    return _class;
  }(_component.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    fixed: _propTypes.default.oneOf(['x', 'y', 'both', 'auto']),
    data: _propTypes.default.array,
    columns: _propTypes.default.array
  }), _temp;
};

exports.default = _default;