import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getGrid } from './utils';

var Grid =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Grid, _PureComponent);

  function Grid() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Grid.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$width = _this$props.width,
        width = _this$props$width === void 0 ? 1 : _this$props$width,
        offset = _this$props.offset,
        responsive = _this$props.responsive,
        stretch = _this$props.stretch,
        children = _this$props.children,
        gutter = _this$props.gutter,
        other = _objectWithoutPropertiesLoose(_this$props, ["width", "offset", "responsive", "stretch", "children", "gutter"]);

    var autoCount = 0;
    var settleWidth = 0;
    Children.toArray(children).forEach(function (child) {
      if (child.type && child.type.isGrid) {
        if (child.props.width) settleWidth += child.props.width;else autoCount += 1;
      }
    });
    var autoWidth = autoCount > 0 ? (1 - settleWidth) / autoCount : 0;
    var className = classnames(this.props.className, getGrid({
      width: width,
      offset: offset,
      responsive: responsive
    }));
    var style = Object.assign({}, this.props.style);

    if (gutter && gutter > 0) {
      style.width = 'auto';
      style.display = 'block';
      style.marginLeft = 0 - gutter / 2 + "px";
      style.marginRight = 0 - gutter / 2 + "px";
    }

    return React.createElement("div", _extends({}, other, {
      style: style,
      className: className
    }), Children.toArray(children).map(function (child) {
      if (child.type && child.type.isGrid) {
        var pps = {
          style: Object.assign({}, child.props.style)
        };
        if (!child.props.width) pps.width = autoWidth;
        if (stretch) pps.style = _objectSpread({}, pps.style, {
          minHeight: '100%',
          height: '100%'
        });

        if (gutter && gutter > 0) {
          pps.style = _objectSpread({}, pps.style, {
            paddingLeft: gutter / 2,
            paddingRight: gutter / 2
          });
        }

        return cloneElement(child, pps);
      }

      return child;
    }));
  };

  return Grid;
}(PureComponent);

_defineProperty(Grid, "isGrid", true);

_defineProperty(Grid, "displayName", 'ShineoutGrid');

_defineProperty(Grid, "propTypes", {
  children: PropTypes.any,
  className: PropTypes.string,
  gutter: PropTypes.number,
  offset: PropTypes.number,
  responsive: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  stretch: PropTypes.bool,
  style: PropTypes.object,
  width: PropTypes.number
});

export { Grid as default };