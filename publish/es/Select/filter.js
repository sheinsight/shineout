import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { getKey } from '../utils/uid';
import { getFilterTree } from '../utils/tree';
import { IS_NOT_MATCHED_VALUE } from './Result';
export default (function (Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(_class, _React$Component);

    function _class(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        innerFilter: undefined,
        innerData: undefined,
        filterText: '',
        text: ''
      };
      _this.handleCreate = _this.handleCreate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleFilter = _this.handleFilter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.getResultByValues = _this.getResultByValues.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.resultCache = new Map();
      return _this;
    }

    var _proto = _class.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          datum = _this$props.datum,
          multiple = _this$props.multiple;

      if (prevProps.multiple !== multiple) {
        datum.limit = multiple ? 0 : 1;
      }
    };

    _proto.getTreeResult = function getTreeResult(value, prediction) {
      var _this$props2 = this.props,
          treeData = _this$props2.treeData,
          _this$props2$children = _this$props2.childrenKey,
          childrenKey = _this$props2$children === void 0 ? 'children' : _this$props2$children;
      var finded;

      var treeNode = function treeNode(children) {
        if (finded) return false;
        if (!children || children.length === 0) return false;

        for (var i = 0; i < children.length; i++) {
          var d = children[i];
          if (prediction(value, d)) finded = d;
          treeNode(d[childrenKey]);
        }

        return false;
      };

      treeNode(treeData);
      return finded;
    };

    _proto.getResult = function getResult(value) {
      var _this$props3 = this.props,
          data = _this$props3.data,
          treeData = _this$props3.treeData,
          datum = _this$props3.datum,
          onCreate = _this$props3.onCreate;

      var prediction = datum.prediction || function (v, d) {
        return v === datum.format(d);
      };

      if (treeData) return this.getTreeResult(value, prediction);

      for (var i = 0, count = data.length; i < count; i++) {
        var d = data[i];
        if (prediction(value, d)) return d;
      }

      if (onCreate) return this.handleCreate(value);
      return undefined;
    };

    _proto.getResultByValues = function getResultByValues() {
      var _this2 = this;

      var _this$props4 = this.props,
          datum = _this$props4.datum,
          noCache = _this$props4.noCache;
      var _datum$values = datum.values,
          values = _datum$values === void 0 ? [] : _datum$values;
      var result = [];
      values.forEach(function (v) {
        var res = noCache ? undefined : _this2.resultCache.get(v);

        if (!res) {
          var _res;

          res = _this2.getResult(v);
          if (res !== undefined && !noCache) _this2.resultCache.set(v, res);else if (res === undefined) res = (_res = {}, _res[IS_NOT_MATCHED_VALUE] = true, _res.value = v, _res);
        }

        if (res !== undefined) {
          result.push(res);
        }
      });
      return result;
    };

    _proto.handleFilter = function handleFilter(text, from) {
      var _this3 = this;

      if (from === void 0) {
        from = 'edit';
      }

      var _this$props5 = this.props,
          filterDelay = _this$props5.filterDelay,
          onFilter = _this$props5.onFilter,
          onCreate = _this$props5.onCreate;
      this.setState({
        text: text
      }); // not filter

      if (!text) {
        this.setState({
          filterText: '',
          innerFilter: undefined,
          innerData: undefined
        });
        if (this.timer) clearTimeout(this.timer);
        if (onFilter) onFilter(text, from);
        return;
      }

      if (onCreate) {
        var innerData = this.handleCreate(text);
        this.setState({
          innerData: innerData
        });
      }

      if (!onFilter) return;
      this.setState({
        filterText: text
      });
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        var fn = onFilter(text, from);

        if (typeof fn === 'function') {
          _this3.setState({
            innerFilter: fn
          });
        }
      }, filterDelay);
    };

    _proto.handleCreate = function handleCreate(text) {
      var onCreate = this.props.onCreate;
      var createFn = typeof onCreate === 'boolean' ? function (t) {
        return t;
      } : onCreate;
      return createFn(text);
    };

    _proto.filterTreeData = function filterTreeData() {
      var _this$props6 = this.props,
          treeData = _this$props6.treeData,
          expanded = _this$props6.expanded,
          showHitDescendants = _this$props6.showHitDescendants,
          onAdvancedFilter = _this$props6.onAdvancedFilter,
          other = _objectWithoutPropertiesLoose(_this$props6, ["treeData", "expanded", "showHitDescendants", "onAdvancedFilter"]);

      var innerFilter = this.state.innerFilter;
      var filterExpandedKeys = expanded;
      var newData = treeData;

      if (innerFilter) {
        filterExpandedKeys = [];
        newData = getFilterTree(treeData, innerFilter, filterExpandedKeys, function (node) {
          return getKey(node, other.keygen);
        }, other.childrenKey, showHitDescendants, undefined, {
          advanced: onAdvancedFilter
        });
      }

      return {
        treeData: newData,
        expanded: filterExpandedKeys,
        rawData: treeData
      };
    };

    _proto.filterData = function filterData() {
      var _this$props7 = this.props,
          data = _this$props7.data,
          hideCreateOption = _this$props7.hideCreateOption,
          other = _objectWithoutPropertiesLoose(_this$props7, ["data", "hideCreateOption"]);

      var _this$state = this.state,
          innerFilter = _this$state.innerFilter,
          innerData = _this$state.innerData;
      var newData = data;
      if (innerFilter) newData = data.filter(function (d) {
        return innerFilter(d);
      });

      if (innerData && !hideCreateOption) {
        var newKey = getKey(innerData, other.keygen, innerData);

        if (!newData.find(function (d) {
          return getKey(d, other.keygen, d) === newKey;
        })) {
          newData = [innerData].concat(newData);
        }
      }

      return {
        data: newData
      };
    };

    _proto.render = function render() {
      var _this$props8 = this.props,
          treeData = _this$props8.treeData,
          onFilter = _this$props8.onFilter,
          onCreate = _this$props8.onCreate,
          other = _objectWithoutPropertiesLoose(_this$props8, ["treeData", "onFilter", "onCreate"]);

      var _this$state2 = this.state,
          filterText = _this$state2.filterText,
          innerData = _this$state2.innerData,
          text = _this$state2.text;
      var filterFn = onFilter || onCreate ? this.handleFilter : undefined;
      var dataGenerator = treeData ? this.filterTreeData : this.filterData;

      var props = _objectSpread({}, other, {
        filterText: filterText,
        inputText: text,
        result: this.getResultByValues(),
        inputable: !!onCreate,
        onCreate: onCreate ? this.handleCreate : undefined,
        onFilter: filterFn,
        innerData: innerData
      }, dataGenerator.call(this));

      return React.createElement(Origin, props);
    };

    return _class;
  }(React.Component), _defineProperty(_class, "propTypes", {
    expanded: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.array,
    treeData: PropTypes.array,
    datum: PropTypes.object,
    filterDelay: PropTypes.number,
    keygen: PropTypes.any,
    onFilter: PropTypes.func,
    onCreate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    value: PropTypes.any,
    noCache: PropTypes.bool,
    multiple: PropTypes.bool,
    showHitDescendants: PropTypes.bool,
    hideCreateOption: PropTypes.bool,
    onAdvancedFilter: PropTypes.bool
  }), _defineProperty(_class, "defaultProps", {
    data: [],
    filterDelay: 300,
    showHitDescendants: false
  }), _temp;
});