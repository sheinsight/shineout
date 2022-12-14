"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _types = require("../Datum/types");

var _is = require("../utils/is");

var Flow =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Flow, _Component);

  function Flow(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.update = _this.forceUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.events = [];
    var _this$props = _this.props,
        names = _this$props.names,
        formDatum = _this$props.formDatum;

    if (names) {
      names.forEach(function (n) {
        var nc = (0, _types.changeSubscribe)(n);
        formDatum.subscribe(nc, _this.update);

        _this.events.push(nc);
      });
    } else {
      formDatum.subscribe(_types.CHANGE_TOPIC, _this.update);

      _this.events.push(_types.CHANGE_TOPIC);
    }

    return _this;
  }

  var _proto = Flow.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    _Component.prototype.componentWillUnmount.call(this);

    var formDatum = this.props.formDatum;
    this.events.forEach(function (n) {
      return formDatum.unsubscribe(n);
    });
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        formDatum = _this$props2.formDatum;
    if ((0, _is.isFunc)(children)) return children(formDatum) || null;
    return children;
  };

  return Flow;
}(_component.Component);

Flow.propTypes = {
  children: _propTypes.default.any,
  formDatum: _propTypes.default.object.isRequired,
  names: _propTypes.default.array
};
var _default = Flow;
exports.default = _default;