import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { Component } from '../component';
import { getFilterTree } from '../utils/tree';
import { IS_NOT_MATCHED_VALUE } from './Result';
export default (function (Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        innerFilter: undefined,
        innerData: undefined,
        filterText: ''
      };
      _this.handleFilter = _this.handleFilter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.getResultByValues = _this.getResultByValues.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.resultCache = new Map();
      return _this;
    }

    var _proto = _class.prototype;

    _proto.getResultByValues = function getResultByValues() {
      var _this2 = this;

      var _this$props = this.props,
          datum = _this$props.datum,
          noCache = _this$props.noCache,
          renderUnmatched = _this$props.renderUnmatched;
      var value = datum.getValue() || [];

      if (renderUnmatched) {
        value = value.concat([].concat(this.props.value).filter(function (v) {
          return v && value.indexOf(v) === -1;
        }));
      }

      var result = [];
      value.forEach(function (v) {
        var res = noCache ? undefined : _this2.resultCache.get(v);

        if (!res) {
          var _res;

          res = datum.getDataById(v);
          if (res && !noCache && !res[IS_NOT_MATCHED_VALUE]) _this2.resultCache.set(v, res);else if (!res) res = (_res = {}, _res[IS_NOT_MATCHED_VALUE] = true, _res.value = v, _res);
        }

        if (res) {
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

      var _this$props2 = this.props,
          filterDelay = _this$props2.filterDelay,
          onFilter = _this$props2.onFilter; // not filter

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

    _proto.render = function render() {
      var _this4 = this;

      var _this$props3 = this.props,
          data = _this$props3.data,
          onFilter = _this$props3.onFilter,
          expanded = _this$props3.expanded,
          showHitDescendants = _this$props3.showHitDescendants,
          other = _objectWithoutPropertiesLoose(_this$props3, ["data", "onFilter", "expanded", "showHitDescendants"]);

      var _this$state = this.state,
          innerFilter = _this$state.innerFilter,
          filterText = _this$state.filterText;
      var filterFn = onFilter ? this.handleFilter : undefined;
      var newData = data;
      var newExpanded = expanded;

      if (innerFilter) {
        var filterExpandedKeys = [];
        newData = getFilterTree(data, innerFilter, filterExpandedKeys, function (node) {
          return _this4.props.datum.getKey(node);
        }, other.childrenKey, showHitDescendants, undefined, {
          advanced: other.onAdvancedFilter
        });
        newExpanded = filterExpandedKeys;
      }

      return React.createElement(Origin, _extends({}, other, {
        filterText: filterText,
        result: this.getResultByValues(),
        data: newData,
        rawData: data,
        onFilter: filterFn,
        expanded: newExpanded
      }));
    };

    return _class;
  }(Component), _defineProperty(_class, "propTypes", {
    datum: PropTypes.object,
    data: PropTypes.array,
    filterDelay: PropTypes.number,
    keygen: PropTypes.any,
    onFilter: PropTypes.func,
    value: PropTypes.any,
    noCache: PropTypes.bool,
    expanded: PropTypes.arrayOf(PropTypes.string),
    showHitDescendants: PropTypes.bool,
    renderUnmatched: PropTypes.func,
    onAdvancedFilter: PropTypes.bool
  }), _defineProperty(_class, "defaultProps", {
    data: [],
    filterDelay: 300,
    showHitDescendants: false
  }), _temp;
});