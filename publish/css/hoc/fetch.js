"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

// obsolete code
var _default = function _default(Component) {
  var Fetch =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inheritsLoose2.default)(Fetch, _PureComponent);

    function Fetch(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.state = {
        loading: !!props.fetch
      };
      return _this;
    }

    var _proto = Fetch.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var fetch = this.props.fetch;
      if (fetch) this.fetchData(fetch);
    };

    _proto.fetchData = function fetchData(fetch) {
      var _this2 = this;

      fetch.then(function (data) {
        _this2.setState({
          data: data,
          loading: false
        });
      });
    };

    _proto.render = function render() {
      var _this$props = this.props,
          fetch = _this$props.fetch,
          props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["fetch"]);
      var _this$state = this.state,
          data = _this$state.data,
          loading = _this$state.loading;
      return _react.default.createElement(Component, (0, _extends2.default)({
        data: data
      }, props, {
        loading: loading
      }));
    };

    return Fetch;
  }(_react.PureComponent);

  Fetch.propTypes = {
    fetch: _propTypes.default.object
  };
  Fetch.defaultProps = {
    fetch: undefined
  };
  return Fetch;
};

exports.default = _default;