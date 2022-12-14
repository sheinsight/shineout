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

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _context = require("./context");

var _styles = require("./styles");

var CheckboxGroup =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(CheckboxGroup, _PureComponent);

  function CheckboxGroup(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleUpdate = _this.handleUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleRawChange = _this.handleRawChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = CheckboxGroup.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    this.props.datum.subscribe(_types.CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.props.datum.unsubscribe(_types.CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.getContent = function getContent(d) {
    var renderItem = this.props.renderItem;

    if (typeof renderItem === 'string') {
      return d[renderItem];
    }

    if (typeof renderItem === 'function') {
      return renderItem(d);
    }

    return '';
  };

  _proto.handleUpdate = function handleUpdate() {
    this.forceUpdate();
  };

  _proto.handleClick = function handleClick(val, checked, index) {
    var _this$props = this.props,
        data = _this$props.data,
        datum = _this$props.datum;

    if (checked) {
      datum.add(data[index]);
    } else {
      datum.remove(data[index]);
    }
  };

  _proto.handleRawChange = function handleRawChange(value, checked) {
    var datum = this.props.datum;

    if (checked) {
      datum.add(value);
    } else {
      datum.remove(value);
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        block = _this$props2.block,
        data = _this$props2.data,
        datum = _this$props2.datum,
        keygen = _this$props2.keygen,
        children = _this$props2.children,
        style = _this$props2.style;
    var className = (0, _classnames.default)((0, _styles.checkinputClass)('group', ['no-block', 'block'][Number(block)]), this.props.className);

    if (data === undefined) {
      return _react.default.createElement("div", {
        className: className,
        style: style
      }, _react.default.createElement(_context.Provider, {
        value: {
          onRawChange: this.handleRawChange,
          checked: datum.check.bind(datum)
        }
      }, children));
    }

    return _react.default.createElement("div", {
      className: className,
      style: style
    }, data.map(function (d, i) {
      return _react.default.createElement(_Checkbox.default, {
        checked: datum.check(d),
        disabled: datum.disabled(d),
        key: (0, _uid.getKey)(d, keygen, i),
        htmlValue: i,
        index: i,
        onChange: _this2.handleClick
      }, _this2.getContent(d));
    }), children);
  };

  return CheckboxGroup;
}(_component.PureComponent);

CheckboxGroup.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'children', 'keygen'), {
  block: _propTypes.default.bool,
  data: _propTypes.default.array,
  datum: _propTypes.default.object.isRequired,
  renderItem: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func])
});
CheckboxGroup.defaultProps = {
  renderItem: function renderItem(d) {
    return d;
  }
};
var _default = CheckboxGroup;
exports.default = _default;