import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { cardGroupClass } from './styles';
import { PureComponent } from '../component';
import { Provider } from './context';

var CardGroup =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CardGroup, _PureComponent);

  function CardGroup(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      scroller: undefined
    };
    _this.bindScroller = _this.bindScroller.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = CardGroup.prototype;

  _proto.getGap = function getGap() {
    var _this$props = this.props,
        gap = _this$props.gap,
        gutter = _this$props.gutter;
    if (gutter !== undefined) return gutter;
    return gap;
  };

  _proto.bindScroller = function bindScroller(ref) {
    var scroller = this.state.scroller;
    if (scroller || !ref) return;
    this.setState({
      scroller: ref
    });
  };

  _proto.renderBody = function renderBody() {
    var _this$props2 = this.props,
        cardWidth = _this$props2.cardWidth,
        columns = _this$props2.columns,
        children = _this$props2.children,
        other = _objectWithoutPropertiesLoose(_this$props2, ["cardWidth", "columns", "children"]);

    var scroller = this.state.scroller;
    if (!children) return children;
    var gap = this.getGap();
    var context = {
      container: scroller
    };

    var gridStyle = _objectSpread({
      gridRowGap: gap,
      gridColumnGap: gap
    }, other.gridStyle, {
      gridTemplateColumns: cardWidth !== undefined ? "repeat(auto-fill, minmax(" + cardWidth + "px, 1fr))" : "repeat(" + columns + ", 1fr)"
    });

    return React.createElement(Provider, {
      value: context
    }, React.createElement("div", {
      className: cardGroupClass('scroller'),
      ref: this.bindScroller
    }, React.createElement("div", {
      style: gridStyle,
      className: cardGroupClass('grid')
    }, scroller && children)));
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        height = _this$props3.height,
        style = _this$props3.style,
        className = _this$props3.className;
    var cls = classname(cardGroupClass('_'), className);

    var groupStyle = _objectSpread({
      height: height
    }, style);

    return React.createElement("div", {
      style: groupStyle,
      className: cls
    }, this.renderBody());
  };

  return CardGroup;
}(PureComponent);

CardGroup.defaultProps = {
  columns: 3,
  gap: 16
};
CardGroup.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  className: PropTypes.string,
  height: PropTypes.number,
  cardWidth: PropTypes.number,
  columns: PropTypes.number,
  gridStyle: PropTypes.object,
  gap: PropTypes.number,
  gutter: PropTypes.number
};
export default CardGroup;