import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../component';
import Pagination from '../Pagination';

function getData(data, pager) {
  if (!Array.isArray(data)) return data;
  if (data.length <= pager.pageSize) return data;
  var start = (pager.current - 1) * pager.pageSize;
  return data.slice(start, start + pager.pageSize);
}

export default function (Component) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_PureComponent) {
    _inheritsLoose(_class, _PureComponent);

    function _class(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      var pp = props.pagination;
      _this.state = {
        current: pp.current || pp.defaultCurrent || 1,
        pageSize: pp.pageSize || 10
      };
      _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = _class.prototype;

    _proto.getProp = function getProp(key) {
      return this.props.pagination[key] || this.state[key];
    };

    _proto.getPager = function getPager(data, pagination) {
      var loading = this.props.loading;
      var total = Array.isArray(data) ? data.length : 0;
      return Object.assign({
        current: this.getProp('current'),
        pageSize: this.getProp('pageSize'),
        total: total,
        disabled: !!loading
      }, pagination, {
        onChange: this.handleChange
      });
    };

    _proto.handleChange = function handleChange(current, pageSize) {
      var onChange = this.props.pagination.onChange;
      this.setState({
        current: current,
        pageSize: pageSize
      });
      if (onChange) onChange(current, pageSize);
    };

    _proto.render = function render() {
      var _this$props = this.props,
          pagination = _this$props.pagination,
          data = _this$props.data,
          props = _objectWithoutPropertiesLoose(_this$props, ["pagination", "data"]);

      var pager = this.getPager(data, pagination);
      return [React.createElement(Component, _extends({
        key: "origin",
        data: getData(data, pager)
      }, props)), React.createElement(Pagination, _extends({
        key: "pager"
      }, pager))];
    };

    return _class;
  }(PureComponent), _defineProperty(_class, "propTypes", {
    data: PropTypes.any,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    pagination: PropTypes.object.isRequired
  }), _temp;
}