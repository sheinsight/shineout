import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
export default function (Origin) {
  var Toggle =
  /*#__PURE__*/
  function (_PureComponent) {
    _inheritsLoose(Toggle, _PureComponent);

    function Toggle(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.nodes = new Map();
      _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.bindNode = _this.bindNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.unbindNode = _this.unbindNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
          props = _objectWithoutPropertiesLoose(_this$props2, ["expanded", "onExpand"]);

      var onToggle = onExpand ? this.handleToggle : undefined;
      return React.createElement(Origin, _extends({}, props, {
        bindNode: this.bindNode,
        unbindNode: this.unbindNode,
        onToggle: onToggle
      }));
    };

    return Toggle;
  }(PureComponent);

  Toggle.propTypes = {
    defaultExpanded: PropTypes.array,
    expanded: PropTypes.array,
    onExpand: PropTypes.func
  };
  Toggle.defaultProps = {
    defaultExpanded: []
  };
  return Toggle;
}