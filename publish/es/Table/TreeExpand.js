import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import immer from 'immer';
import { getKey } from '../utils/uid';
import { getProps } from '../utils/proptypes';
import { keysToArray } from '../utils/transform';
var TREE_TABLE_DEFAULT_INDENT = 15;
export default (function (WrappedComponent) {
  var TreeExpand =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(TreeExpand, _React$Component);

    function TreeExpand(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        expandKeys: _this.getMapFromArray(props.defaultTreeExpandKeys)
      };
      _this.handleTreeExpand = _this.handleTreeExpand.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = TreeExpand.prototype;

    _proto.componentDidUpdate = function componentDidUpdate() {
      this.changedByExpand = false;
    };

    _proto.getTreeIndent = function getTreeIndent() {
      var columns = this.props.columns;

      for (var i = 0; i < columns.length; i++) {
        if (typeof columns[i].treeIndent === 'number') return columns[i].treeIndent;
      }

      return TREE_TABLE_DEFAULT_INDENT;
    };

    _proto.getExpandKeys = function getExpandKeys() {
      var treeExpandKeys = this.props.treeExpandKeys;
      if (!treeExpandKeys) return this.state.expandKeys;
      return this.getMapFromArray(treeExpandKeys);
    };

    _proto.getMapFromArray = function getMapFromArray(arr) {
      return arr.reduce(function (map, key) {
        map.set(key, true);
        return map;
      }, new Map());
    };

    _proto.getChildrenLength = function getChildrenLength(children) {
      var _this$props = this.props,
          treeColumnsName = _this$props.treeColumnsName,
          keygen = _this$props.keygen;
      var expandKeys = this.state.expandKeys;
      if (!children) return 0;
      var _children$length = children.length,
          length = _children$length === void 0 ? 0 : _children$length;

      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var key = getKey(child, keygen);
        if (!expandKeys.get(key)) continue;
        expandKeys.delete(key);

        if (child[treeColumnsName] && child[treeColumnsName].length) {
          length += this.getChildrenLength(child[treeColumnsName]);
        }
      }

      return length;
    };

    _proto.getExpandData = function getExpandData() {
      var _this2 = this;

      var _this$props2 = this.props,
          data = _this$props2.data,
          keygen = _this$props2.keygen,
          treeColumnsName = _this$props2.treeColumnsName;
      var expandKeys = this.getExpandKeys();
      this.expandLevel = new Map();
      if (expandKeys.size === 0) return data;
      var storeExpandKeys = new Map();
      expandKeys.forEach(function (value, key) {
        return storeExpandKeys.set(key, value);
      });
      return immer(data, function (draft) {
        var dataCo = draft;

        var _loop = function _loop(i) {
          if (storeExpandKeys.size === 0) return "break";
          var item = dataCo[i];
          var key = getKey(item, keygen, i);
          var parentLevel = _this2.expandLevel.get(key) || 0;

          if (storeExpandKeys.get(key) && item[treeColumnsName]) {
            item[treeColumnsName].forEach(function (child) {
              _this2.expandLevel.set(getKey(child, keygen), parentLevel + 1);
            });
            draft.splice.apply(draft, [i + 1, 0].concat(item[treeColumnsName]));
            dataCo = draft;
            storeExpandKeys.delete(key);
          }
        };

        for (var i = 0; i < dataCo.length; i++) {
          var _ret = _loop(i);

          if (_ret === "break") break;
        }
      });
    };

    _proto.handleTreeExpand = function handleTreeExpand(data, index) {
      var _this$props3 = this.props,
          keygen = _this$props3.keygen,
          treeExpandKeys = _this$props3.treeExpandKeys,
          onTreeExpand = _this$props3.onTreeExpand;
      var expandKeys = this.getExpandKeys();
      var key = getKey(data, keygen, index);
      var changedKeys = immer(expandKeys, function (draft) {
        // eslint-disable-next-line no-unused-expressions
        expandKeys.get(key) ? draft.delete(key) : draft.set(key, true);
      });

      if (treeExpandKeys && onTreeExpand) {
        onTreeExpand(keysToArray(changedKeys), data, !!expandKeys.get(key), index);
        return;
      }

      this.changedByExpand = true;
      this.setState({
        expandKeys: changedKeys
      });
    };

    _proto.render = function render() {
      var treeColumnsName = this.props.treeColumnsName;
      var expandKeys = this.getExpandKeys();
      var data = this.getExpandData();
      var rootTree = data.filter(function (v) {
        return v && v[treeColumnsName] && v[treeColumnsName].length;
      }).length === 0;
      var treeIndent = this.getTreeIndent();
      return React.createElement(WrappedComponent, _extends({}, this.props, {
        changedByExpand: this.changedByExpand || this.props.changedByExpand,
        data: data,
        onTreeExpand: this.handleTreeExpand,
        treeExpandKeys: expandKeys,
        treeExpandLevel: this.expandLevel,
        treeRoot: rootTree,
        treeIndent: treeIndent
      }));
    };

    return TreeExpand;
  }(React.Component);

  TreeExpand.propTypes = _objectSpread({}, getProps(PropTypes, 'keygen'), {
    data: PropTypes.arrayOf(PropTypes.object),
    treeColumnsName: PropTypes.string,
    defaultTreeExpandKeys: PropTypes.array,
    treeExpandKeys: PropTypes.array,
    onTreeExpand: PropTypes.func,
    changedByExpand: PropTypes.bool
  });
  TreeExpand.defaultProps = {
    defaultTreeExpandKeys: []
  };
  return TreeExpand;
});