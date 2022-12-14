"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Colgroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Colgroup, _React$Component);

  function Colgroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      didShow: false
    };
    return _this;
  }

  var _proto = Colgroup.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    var _this$props = this.props,
        colgroup = _this$props.colgroup,
        columns = _this$props.columns,
        resizable = _this$props.resizable;

    if (!colgroup && resizable && this.state.didShow) {
      this.setState({
        didShow: false
      });
      return;
    }

    if (!resizable || this.state.didShow) return;
    if (!colgroup || colgroup.length !== columns.length) return;
    this.setState({
      didShow: true
    });
  };

  _proto.render = function render() {
    var didShow = this.state.didShow;
    var _this$props2 = this.props,
        columns = _this$props2.columns,
        colgroup = _this$props2.colgroup;

    if (colgroup && colgroup.length === columns.length) {
      return _react.default.createElement("colgroup", null, colgroup.map(function (c, i) {
        var last = colgroup.length - 1 === i;
        if (didShow && last) return null;
        return _react.default.createElement("col", {
          key: columns[i].key,
          style: {
            width: c
          }
        });
      }));
    }

    return _react.default.createElement("colgroup", null, columns.map(function (c, i) {
      var last = columns.length - 1 === i;
      if (didShow && last) return null;
      return _react.default.createElement("col", {
        key: c.key,
        style: {
          width: c.width
        }
      });
    }));
  };

  return Colgroup;
}(_react.default.Component);

Colgroup.propTypes = {
  columns: _propTypes.default.array.isRequired,
  colgroup: _propTypes.default.array,
  resizable: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.number])
};
Colgroup.defaultProps = {
  colgroup: undefined
};
var _default = Colgroup;
exports.default = _default;