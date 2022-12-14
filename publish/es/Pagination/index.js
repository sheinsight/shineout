import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';

var _default =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(_default, _PureComponent);

  function _default(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      current: props.current || props.defaultCurrent,
      pageSize: props.pageSize
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = _default.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.current !== this.props.current || prevProps.pageSize !== this.props.pageSize) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        current: this.props.current,
        pageSize: this.props.pageSize
      });
    }
  };

  _proto.handleChange = function handleChange(current, pageSize) {
    if (pageSize === void 0) {
      pageSize = this.state.pageSize;
    }

    var sizeChange = pageSize !== this.state.pageSize;
    this.setState({
      current: current,
      pageSize: pageSize
    });

    if (this.props.onChange) {
      this.props.onChange(current, pageSize, sizeChange);
    }
  };

  _proto.render = function render() {
    var current = this.props.current || this.state.current;
    if (this.props.total < 0) return null;
    return React.createElement(Pagination, _extends({}, this.props, {
      current: current,
      pageSize: this.state.pageSize,
      onChange: this.handleChange
    }));
  };

  return _default;
}(PureComponent);

_defineProperty(_default, "displayName", 'ShineoutPagination');

_defineProperty(_default, "propTypes", {
  current: PropTypes.number,
  defaultCurrent: PropTypes.number,
  onChange: PropTypes.func,
  pageSize: PropTypes.number,
  total: PropTypes.number
});

_defineProperty(_default, "defaultProps", {
  defaultCurrent: 1,
  pageSize: 10,
  total: 0
});

export { _default as default };