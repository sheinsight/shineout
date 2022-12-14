import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { Component } from '../component';
import shallowEqual from '../utils/shallowEqual';
import { CHANGE_TOPIC } from '../Datum/types';
import Checkbox from '../Checkbox/Checkbox';
import { isFunc } from '../utils/is';

var TableCheckboxAll =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TableCheckboxAll, _Component);

  function TableCheckboxAll(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleUpdate = _this.forceUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = TableCheckboxAll.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _Component.prototype.componentDidMount.call(this);

    this.props.datum.subscribe(CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var datum = nextProps.datum;
    if (!shallowEqual(this.props, nextProps)) return true;
    if (this.lastValueLength !== (datum.getValue() || []).length) return true;
    return false;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _Component.prototype.componentWillUnmount.call(this);

    this.props.datum.unsubscribe(CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.getFilterData = function getFilterData() {
    var _this$props = this.props,
        _this$props$col = _this$props.col,
        col = _this$props$col === void 0 ? {} : _this$props$col,
        data = _this$props.data;
    var filterAll = col.filterAll;

    if (data && filterAll && Array.isArray(data) && isFunc(filterAll)) {
      return filterAll(data);
    }

    return data;
  };

  _proto.getChecked = function getChecked() {
    var datum = this.props.datum;
    var filterData = this.getFilterData();
    if (datum.length === 0 || !filterData) return false;
    var checked;

    for (var _iterator = filterData, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var d = _ref;
      if (datum.disabled(d)) continue;
      var p = this.check(d);
      if (p === 'indeterminate') return p;

      if (checked === undefined) {
        checked = p;
      } else if (checked !== p) {
        return 'indeterminate';
      }
    }

    return checked;
  };

  _proto.check = function check(d) {
    var _this$props2 = this.props,
        datum = _this$props2.datum,
        treeColumnsName = _this$props2.treeColumnsName;
    var p = datum.check(d);
    var children = d[treeColumnsName];
    var isArray = children && Array.isArray(children);

    if (isArray) {
      for (var _iterator2 = children, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var c = _ref2;
        if (this.check(c) !== p) return 'indeterminate';
      }
    }

    return p;
  };

  _proto.handleChange = function handleChange(_, checked, index) {
    var _this$props3 = this.props,
        datum = _this$props3.datum,
        treeColumnsName = _this$props3.treeColumnsName;
    var filterData = this.getFilterData();

    if (checked) {
      datum.add(filterData, index, treeColumnsName);
    } else {
      datum.remove(filterData, index, treeColumnsName);
    }
  };

  _proto.render = function render() {
    var datum = this.props.datum;
    this.lastValueLength = (datum.getValue() || []).length;
    if (datum.limit === 1) return null;
    return React.createElement(Checkbox, _extends({}, this.props, {
      checked: this.getChecked(),
      onChange: this.handleChange
    }));
  };

  return TableCheckboxAll;
}(Component);

_defineProperty(TableCheckboxAll, "propTypes", {
  data: PropTypes.array,
  col: PropTypes.object,
  datum: PropTypes.object.isRequired,
  treeColumnsName: PropTypes.string
});

export { TableCheckboxAll as default };