"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uid = require("../utils/uid");

var _Button = _interopRequireDefault(require("../Button"));

var _component = require("../component");

var _styles = require("./styles");

var _icons = _interopRequireDefault(require("../icons"));

var _config = require("../config");

var Btns =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Btns, _Component);

  function Btns(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.toSource = _this.change.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 0);
    _this.toTarget = _this.change.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 1);
    return _this;
  }

  var _proto = Btns.prototype;

  _proto.getDataMap = function getDataMap() {
    var _this$props = this.props,
        data = _this$props.data,
        keygen = _this$props.keygen;
    var dataMap = new Map();

    for (var i = 0; i < data.length; i++) {
      dataMap.set((0, _uid.getKey)(data[i], keygen, i), data[i]);
    }

    return dataMap;
  };

  _proto.change = function change(index) {
    var _this$props2 = this.props,
        setSelecteds = _this$props2.setSelecteds,
        selecteds = _this$props2.selecteds,
        datum = _this$props2.datum;
    var dataMap = this.getDataMap();
    var newValue = selecteds[1 - index].map(function (c) {
      return dataMap.get(c);
    }); // const newValue = selecteds[1 - index].map(c => data.find((d, i) => getKey(d, keygen, i) === c))

    setSelecteds(1 - index, []);
    datum[index ? 'add' : 'remove'](newValue, undefined, undefined, true);
  };

  _proto.renderButtonText = function renderButtonText(mode) {
    if (mode === void 0) {
      mode = 'left';
    }

    var _this$props3 = this.props,
        operations = _this$props3.operations,
        operationIcon = _this$props3.operationIcon;

    if (mode === 'left') {
      var left = [_react.default.createElement(_react.default.Fragment, {
        key: "operationIcon"
      }, operationIcon && _icons.default.AngleLeft), _react.default.createElement(_react.default.Fragment, {
        key: "operations"
      }, operations[1])];
      if ((0, _config.isRTL)()) return left.reverse();
      return left;
    }

    var right = [_react.default.createElement(_react.default.Fragment, {
      key: "operationIcon"
    }, operationIcon && _icons.default.AngleRight), _react.default.createElement(_react.default.Fragment, {
      key: "operations"
    }, operations[0])];
    if ((0, _config.isRTL)()) return right.reverse();
    return right;
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        selecteds = _this$props4.selecteds,
        disabled = _this$props4.disabled;
    var disable = disabled === true;
    return _react.default.createElement("div", {
      className: (0, _styles.transferClass)('btns')
    }, _react.default.createElement("div", null, _react.default.createElement(_Button.default, {
      type: "primary",
      disabled: disable || !selecteds[0].length,
      size: "small",
      className: (0, _styles.transferClass)('btns-button', 'btns-bottom'),
      onClick: this.toTarget
    }, this.renderButtonText('right')), _react.default.createElement("br", null), _react.default.createElement(_Button.default, {
      type: "primary",
      disabled: disable || !selecteds[1].length,
      size: "small",
      className: (0, _styles.transferClass)('btns-button'),
      onClick: this.toSource
    }, this.renderButtonText('left'))));
  };

  return Btns;
}(_component.Component);

Btns.propTypes = {
  datum: _propTypes.default.object,
  selecteds: _propTypes.default.array,
  data: _propTypes.default.array,
  setSelecteds: _propTypes.default.func,
  keygen: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  operations: _propTypes.default.array,
  operationIcon: _propTypes.default.bool,
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func])
};
var _default = Btns;
exports.default = _default;