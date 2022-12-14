"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var _Node = _interopRequireDefault(require("./Node"));

var _locale = require("../locale");

var _classname = require("../utils/classname");

var List =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(List, _Component);

  function List(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {};
    _this.getText = _this.getText.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = List.prototype;

  _proto.getKey = function getKey(data, index) {
    var _this$props = this.props,
        keygen = _this$props.keygen,
        parentId = _this$props.parentId;
    if (typeof keygen === 'function') return keygen(data, parentId);
    if (keygen) return data[keygen];
    return parentId + (parentId ? ',' : '') + index;
  };

  _proto.getText = function getText(key) {
    return this.props.text[key] || (0, _locale.getLocale)(key);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        data = _this$props2.data,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["data"]);
    if (!data || data.length === 0) return _react.default.createElement("span", {
      className: (0, _styles.cascaderClass)('no-data')
    }, this.getText('noData'));
    return _react.default.createElement("div", {
      className: (0, _styles.cascaderClass)((0, _classname.getDirectionClass)('list'))
    }, data.map(function (d, i) {
      var id = _this2.getKey(d, i);

      return _react.default.createElement(_Node.default, (0, _extends2.default)({}, other, {
        key: id,
        active: other.id === id,
        id: id,
        data: d
      }));
    }));
  };

  return List;
}(_react.Component);

List.propTypes = {
  data: _propTypes.default.array,
  id: _propTypes.default.string,
  keygen: _propTypes.default.any,
  onNodeClick: _propTypes.default.func,
  parentId: _propTypes.default.string,
  text: _propTypes.default.object
};
List.defaultProps = {
  id: '',
  parentId: '',
  text: {}
};
var _default = List;
exports.default = _default;