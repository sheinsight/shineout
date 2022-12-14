import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getProps, defaultProps } from '../utils/proptypes';
import { paginationClass } from './styles';
import Links from './Links';
import Jumper from './Jumper';
import Simple from './Simple';
import PageSizeList from './PageSizeList';
import { isRTL } from '../config';
import getDataset from '../utils/dom/getDataset';
import { getDirectionClass } from '../utils/classname';

var Pagination =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Pagination, _PureComponent);

  function Pagination() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Pagination.prototype;

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        align = _this$props.align,
        layout = _this$props.layout,
        size = _this$props.size,
        style = _this$props.style;
    var rtl = isRTL();
    var className = classnames(paginationClass('_', size, align, rtl && 'rtl'), this.props.className);
    var sectionClassName = paginationClass(getDirectionClass('section'));
    return React.createElement("div", _extends({
      className: className,
      style: style
    }, getDataset(this.props)), layout.map(function (section, i) {
      switch (section) {
        case 'links':
          return React.createElement(Links, _extends({
            key: section
          }, _this.props));

        case 'list':
          return React.createElement(PageSizeList, _extends({
            key: section
          }, _this.props));

        case 'jumper':
          return React.createElement(Jumper, _extends({
            key: section
          }, _this.props));

        case 'simple':
          return React.createElement(Simple, _extends({
            key: section
          }, _this.props));

        default:
          if (typeof section === 'function') {
            return React.createElement("div", {
              key: i,
              className: sectionClassName
            }, React.createElement("span", null, section(_this.props)));
          }

          return null;
      }
    }));
  };

  return Pagination;
}(PureComponent);

Pagination.propTypes = _objectSpread({}, getProps(PropTypes, 'size', 'type'), {
  align: PropTypes.string,
  current: PropTypes.number.isRequired,
  layout: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  span: PropTypes.number,
  text: PropTypes.object,
  total: PropTypes.number.isRequired
});
Pagination.defaultProps = _objectSpread({}, defaultProps, {
  layout: ['links'],
  span: 5,
  text: {}
});
export default Pagination;