import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getProps } from '../utils/proptypes';
import { gapClass } from './styles';
import support from './support';
var flexGapSupport = support();

var Gap =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Gap, _PureComponent);

  function Gap() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Gap.prototype;

  _proto.getStyle = function getStyle() {
    var _this$props = this.props,
        row = _this$props.row,
        column = _this$props.column,
        style = _this$props.style;
    var extendStyle = flexGapSupport ? {
      rowGap: row,
      columnGap: column
    } : {
      marginBottom: -row
    };
    return Object.assign({}, style, extendStyle);
  };

  _proto.getItemStyle = function getItemStyle(index) {
    var _this$props2 = this.props,
        row = _this$props2.row,
        column = _this$props2.column,
        itemStyle = _this$props2.itemStyle,
        children = _this$props2.children;
    if (flexGapSupport) return itemStyle;
    var isLast = React.Children.count(children) - 1 === index;
    return Object.assign({}, itemStyle, {
      marginBottom: row
    }, !isLast && {
      marginRight: column
    });
  };

  _proto.render = function render() {
    var _this = this;

    var children = this.props.children;
    var className = classnames(gapClass('_'), this.props.className);
    return React.createElement("div", {
      className: className,
      style: this.getStyle()
    }, React.Children.map(children, function (child, index) {
      return child && React.createElement("div", {
        className: gapClass('item'),
        style: _this.getItemStyle(index)
      }, child);
    }));
  };

  return Gap;
}(PureComponent);

Gap.propTypes = _objectSpread({}, getProps(PropTypes), {
  row: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  column: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  itemStyle: PropTypes.object
});
Gap.defaultProps = {
  row: 8,
  column: 8
};
export default Gap;