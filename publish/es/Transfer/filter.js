import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { Component } from '../component';
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
        text: ''
      };
      _this.handleFilter = _this.handleFilter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = _class.prototype;

    _proto.getData = function getData() {
      var _this2 = this;

      var _this$props = this.props,
          onFilter = _this$props.onFilter,
          data = _this$props.data,
          index = _this$props.index;
      if (!onFilter || !this.state.text) return data;
      return data.filter(function (d) {
        return onFilter(_this2.state.text, d, !index);
      });
    };

    _proto.handleFilter = function handleFilter(text) {
      var _this$props2 = this.props,
          onSearch = _this$props2.onSearch,
          index = _this$props2.index;
      if (onSearch) onSearch(text, !index);
      this.setState({
        text: text
      });
    };

    _proto.render = function render() {
      var onFilter = this.props.onFilter;
      var data = this.getData();
      var filter = onFilter ? this.handleFilter : undefined;
      return React.createElement(Origin, _extends({}, this.props, {
        onFilter: filter,
        filterText: this.state.text,
        data: data
      }));
    };

    return _class;
  }(Component), _defineProperty(_class, "propTypes", {
    data: PropTypes.array,
    onFilter: PropTypes.func,
    onSearch: PropTypes.func,
    index: PropTypes.number
  }), _temp;
});