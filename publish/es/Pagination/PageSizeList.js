import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import { paginationClass } from './styles';
import { getDirectionClass } from '../utils/classname';

var PageSizeList =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(PageSizeList, _PureComponent);

  function PageSizeList(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = PageSizeList.prototype;

  _proto.handleChange = function handleChange(pageSize) {
    var _this$props = this.props,
        current = _this$props.current,
        onChange = _this$props.onChange;
    var start = (current - 1) * this.props.pageSize + 1;
    onChange(Math.ceil(start / pageSize), pageSize);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        pageSize = _this$props2.pageSize,
        pageSizeList = _this$props2.pageSizeList,
        text = _this$props2.text,
        disabled = _this$props2.disabled,
        size = _this$props2.size,
        _this$props2$sizeList = _this$props2.sizeListProps,
        sizeListProps = _this$props2$sizeList === void 0 ? {} : _this$props2$sizeList;
    return React.createElement(Select, _extends({
      onChange: this.handleChange,
      disabled: disabled,
      absolute: true,
      autoAdapt: true,
      keygen: true,
      value: pageSize,
      size: size,
      className: paginationClass(getDirectionClass('section'), 'pagesize'),
      data: pageSizeList,
      renderItem: function renderItem(d) {
        return d + " " + (text.page || '');
      }
    }, sizeListProps));
  };

  return PageSizeList;
}(PureComponent);

PageSizeList.propTypes = {
  current: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizeList: PropTypes.array,
  text: PropTypes.object.isRequired,
  size: PropTypes.string,
  sizeListProps: PropTypes.object
};
PageSizeList.defaultProps = {
  pageSizeList: [10, 20, 30, 50, 100]
};
export default PageSizeList;