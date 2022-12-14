import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { getKey } from '../utils/uid';
import { Component } from '../component';
import { getFilterTree } from '../utils/tree';
export default (function (Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.handleFilter = _this.handleFilter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {
        filterText: '',
        filter: null
      };
      return _this;
    }

    var _proto = _class.prototype;

    _proto.getData = function getData() {
      var _this2 = this;

      var _this$props = this.props,
          data = _this$props.data,
          childrenKey = _this$props.childrenKey,
          keygen = _this$props.keygen;
      var filter = this.state.filter;
      if (!filter) return data;
      return getFilterTree(data, filter, undefined, function (node) {
        return getKey(node, keygen);
      }, childrenKey, true, function (node) {
        if (_this2.firstMatchNode) return;
        _this2.firstMatchNode = node;
      });
    };

    _proto.handleFilter = function handleFilter(filterText) {
      var _this3 = this;

      var _this$props2 = this.props,
          filterDelay = _this$props2.filterDelay,
          onFilter = _this$props2.onFilter;
      if (this.timer) clearTimeout(this.timer);
      this.firstMatchNode = null;

      if (filterText.length === 0) {
        this.setState({
          filter: null,
          filterText: filterText
        });
        return;
      }

      this.timer = setTimeout(function () {
        var fn = onFilter(filterText);

        if (typeof fn === 'function') {
          _this3.setState({
            filter: fn,
            filterText: filterText
          });
        }
      }, filterDelay);
    };

    _proto.render = function render() {
      var onFilter = this.props.onFilter;
      var _this$state = this.state,
          filterText = _this$state.filterText,
          filter = _this$state.filter;
      if (!onFilter) return React.createElement(Origin, this.props);
      var data = this.getData();
      return React.createElement(Origin, _extends({}, this.props, {
        data: data,
        filterText: filterText,
        onFilter: this.handleFilter,
        filterDataChange: filter,
        firstMatchNode: this.firstMatchNode
      }));
    };

    return _class;
  }(Component), _defineProperty(_class, "propTypes", {
    onFilter: PropTypes.func,
    filterDelay: PropTypes.number,
    data: PropTypes.array,
    childrenKey: PropTypes.string,
    keygen: PropTypes.any,
    mode: PropTypes.number
  }), _defineProperty(_class, "defaultProps", {
    filterDelay: 400
  }), _temp;
});