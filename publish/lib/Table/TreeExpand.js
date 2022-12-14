"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _uid = require("../utils/uid");

var _proptypes = require("../utils/proptypes");

var _transform = require("../utils/transform");

var TREE_TABLE_DEFAULT_INDENT = 15;

var _default = function _default(WrappedComponent) {
  var TreeExpand =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inheritsLoose2.default)(TreeExpand, _React$Component);

    function TreeExpand(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        expandKeys: _this.getMapFromArray(props.defaultTreeExpandKeys)
      };
      _this.handleTreeExpand = _this.handleTreeExpand.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
        var key = (0, _uid.getKey)(child, keygen);
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
      return (0, _immer.default)(data, function (draft) {
        var dataCo = draft;

        var _loop = function _loop(i) {
          if (storeExpandKeys.size === 0) return "break";
          var item = dataCo[i];
          var key = (0, _uid.getKey)(item, keygen, i);
          var parentLevel = _this2.expandLevel.get(key) || 0;

          if (storeExpandKeys.get(key) && item[treeColumnsName]) {
            item[treeColumnsName].forEach(function (child) {
              _this2.expandLevel.set((0, _uid.getKey)(child, keygen), parentLevel + 1);
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
      var key = (0, _uid.getKey)(data, keygen, index);
      var changedKeys = (0, _immer.default)(expandKeys, function (draft) {
        // eslint-disable-next-line no-unused-expressions
        expandKeys.get(key) ? draft.delete(key) : draft.set(key, true);
      });

      if (treeExpandKeys && onTreeExpand) {
        onTreeExpand((0, _transform.keysToArray)(changedKeys), data, !!expandKeys.get(key), index);
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
      return _react.default.createElement(WrappedComponent, (0, _extends2.default)({}, this.props, {
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
  }(_react.default.Component);

  TreeExpand.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'keygen'), {
    data: _propTypes.default.arrayOf(_propTypes.default.object),
    treeColumnsName: _propTypes.default.string,
    defaultTreeExpandKeys: _propTypes.default.array,
    treeExpandKeys: _propTypes.default.array,
    onTreeExpand: _propTypes.default.func,
    changedByExpand: _propTypes.default.bool
  });
  TreeExpand.defaultProps = {
    defaultTreeExpandKeys: []
  };
  return TreeExpand;
};

exports.default = _default;