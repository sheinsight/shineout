"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _proptypes = require("../utils/proptypes");

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

var _uid = require("../utils/uid");

var _events = require("./events");

var Modal =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Modal, _Component);

  function Modal(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.id = (0, _uid.getUidStr)();
    _this.visible = props.visible;
    _this.handleUpdate = _this.handleUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Modal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.visible && !this.props.usePortal) {
      (0, _events.open)(this.getOption(), false);
    }
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    if ((0, _shallowEqual.default)(this.props, nextProps)) return false;
    if (nextProps.visible) return true;
    (0, _events.close)((0, _objectSpread2.default)({}, this.props, {
      id: this.id
    }), this.handleUpdate);
    return !(0, _shallowEqual.default)(this.props, nextProps) && nextProps.visible;
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.props.visible && !this.props.usePortal) {
      (0, _events.open)(this.getOption(), false);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var usePortal = this.props.usePortal;
    (0, _events.close)({
      id: this.id
    });
    (0, _events.destroy)(this.id, !usePortal);
  };

  _proto.getOption = function getOption() {
    var _this$props = this.props,
        children = _this$props.children,
        usePortal = _this$props.usePortal,
        visible = _this$props.visible,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children", "usePortal", "visible"]);
    return (0, _objectSpread2.default)({}, props, {
      content: children,
      id: this.id,
      from: 'modal' // overwrite props from

    });
  };

  _proto.handleUpdate = function handleUpdate() {
    var destroyProps = this.props.destroy;
    if (destroyProps) this.forceUpdate();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        usePortal = _this$props2.usePortal,
        visible = _this$props2.visible;
    var option = this.getOption();
    if (visible && usePortal) return (0, _events.open)(option, true);
    return null;
  };

  return Modal;
}(_react.Component);

Modal.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default), {
  usePortal: _propTypes.default.bool,
  destroy: _propTypes.default.bool
});
Modal.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  usePortal: true,
  visible: false,
  esc: true
});
Modal.displayName = 'ShineoutModal';
var _default = Modal;
exports.default = _default;