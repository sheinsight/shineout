"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _component = require("../component");

var _config = require("../config");

var _default = function _default(Com, name) {
  return (
    /*#__PURE__*/
    function (_Component) {
      (0, _inheritsLoose2.default)(_class, _Component);

      function _class(props) {
        var _this;

        _this = _Component.call(this, props) || this;
        _this.handleUpdate = _this.forceUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

        _config.noti.subscribe(name, _this.handleUpdate);

        return _this;
      }

      var _proto = _class.prototype;

      _proto.componentWillUnmount = function componentWillUnmount() {
        _config.noti.unsubscribe(name, this.handleUpdate);
      };

      _proto.render = function render() {
        return _react.default.createElement(Com, this.props);
      };

      return _class;
    }(_component.Component)
  );
};

exports.default = _default;