"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _component = require("../component");

var _proptypes = require("../utils/proptypes");

var _uid = require("../utils/uid");

var _types = require("../Datum/types");

var _context = require("../Checkbox/context");

var _styles = require("../Checkbox/styles");

var _Radio = _interopRequireDefault(require("./Radio"));

var _config = require("../config");

var RadioGroup =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(RadioGroup, _PureComponent);

  function RadioGroup(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleUpdate = _this.forceUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleRawChange = _this.handleRawChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = RadioGroup.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    this.props.datum.subscribe(_types.CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.props.datum.unsubscribe(_types.CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.getContent = function getContent(d, index) {
    var renderItem = this.props.renderItem;

    if (typeof renderItem === 'string') {
      return d[renderItem];
    }

    if (typeof renderItem === 'function') {
      return renderItem(d, index);
    }

    return '';
  };

  _proto.handleClick = function handleClick(val, checked, index) {
    var _this$props = this.props,
        data = _this$props.data,
        datum = _this$props.datum;
    datum.set(data[index]);
  };

  _proto.handleRawChange = function handleRawChange(value) {
    this.props.datum.set(value);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        block = _this$props2.block,
        data = _this$props2.data,
        datum = _this$props2.datum,
        keygen = _this$props2.keygen,
        children = _this$props2.children,
        button = _this$props2.button,
        size = _this$props2.size;
    var rtl = (0, _config.isRTL)();
    var className = (0, _classnames.default)((0, _styles.checkinputClass)('group', block && 'block', button && 'button', button === 'outline' && 'outline', button && size, rtl && 'rtl'), this.props.className);

    if (data === undefined) {
      return _react.default.createElement("div", {
        className: className
      }, _react.default.createElement(_context.Provider, {
        value: {
          onRawChange: this.handleRawChange,
          checked: datum.check.bind(datum)
        }
      }, children));
    }

    return _react.default.createElement("div", {
      className: className
    }, data.map(function (d, i) {
      return _react.default.createElement(_Radio.default, {
        checked: datum.check(d),
        disabled: datum.disabled(d),
        key: (0, _uid.getKey)(d, keygen, i),
        htmlValue: i,
        index: i,
        onChange: _this2.handleClick
      }, _this2.getContent(d, i));
    }), children);
  };

  return RadioGroup;
}(_component.PureComponent);

RadioGroup.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'children', 'keygen', 'size'), {
  block: _propTypes.default.bool,
  data: _propTypes.default.array,
  button: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  datum: _propTypes.default.object.isRequired,
  renderItem: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func])
});
RadioGroup.defaultProps = {
  renderItem: function renderItem(d) {
    return d;
  }
};
var _default = RadioGroup;
exports.default = _default;