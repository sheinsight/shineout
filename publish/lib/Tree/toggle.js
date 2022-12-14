"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _default(Origin) {
  var Toggle =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inheritsLoose2.default)(Toggle, _PureComponent);

    function Toggle(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.nodes = new Map();
      _this.handleToggle = _this.handleToggle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.bindNode = _this.bindNode.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.unbindNode = _this.unbindNode.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      return _this;
    }

    var _proto = Toggle.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (prevProps.expanded !== this.props.expanded) {
        this.handleExpanded(this.props.expanded);
      }
    };

    _proto.bindNode = function bindNode(id, update) {
      if (this.nodes.has(id)) {
        console.error(new Error("Node with '" + id + "' key has already been added. Tree node's key must be unique."));
        return false;
      }

      this.nodes.set(id, update);
      var expanded = this.props.expanded || this.props.defaultExpanded;
      if (!expanded) return false;
      return expanded.indexOf(id) >= 0;
    };

    _proto.unbindNode = function unbindNode(id) {
      this.nodes.delete(id);
    };

    _proto.handleExpanded = function handleExpanded(expanded) {
      var temp = new Set(expanded);

      for (var _iterator = this.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var _ref2 = _ref,
            id = _ref2[0],
            update = _ref2[1];
        update(temp.has(id));
      }
    };

    _proto.handleToggle = function handleToggle(id) {
      var _this$props = this.props,
          expanded = _this$props.expanded,
          onExpand = _this$props.onExpand;
      var newExpanded;

      if (expanded.indexOf(id) >= 0) {
        newExpanded = expanded.filter(function (e) {
          return e !== id;
        });
      } else {
        newExpanded = [].concat(expanded, [id]);
      }

      if (onExpand) onExpand(newExpanded);
    };

    _proto.render = function render() {
      var _this$props2 = this.props,
          expanded = _this$props2.expanded,
          onExpand = _this$props2.onExpand,
          props = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["expanded", "onExpand"]);
      var onToggle = onExpand ? this.handleToggle : undefined;
      return _react.default.createElement(Origin, (0, _extends2.default)({}, props, {
        bindNode: this.bindNode,
        unbindNode: this.unbindNode,
        onToggle: onToggle
      }));
    };

    return Toggle;
  }(_react.PureComponent);

  Toggle.propTypes = {
    defaultExpanded: _propTypes.default.array,
    expanded: _propTypes.default.array,
    onExpand: _propTypes.default.func
  };
  Toggle.defaultProps = {
    defaultExpanded: []
  };
  return Toggle;
}