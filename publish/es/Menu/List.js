import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getKey } from '../utils/uid';
import { menuClass } from './styles';
import Item from './Item';

var List =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(List, _PureComponent);

  function List() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = List.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        data = _this$props.data,
        level = _this$props.level,
        keygen = _this$props.keygen,
        mode = _this$props.mode,
        renderItem = _this$props.renderItem,
        style = _this$props.style,
        bottomLine = _this$props.bottomLine,
        topLine = _this$props.topLine,
        onClick = _this$props.onClick,
        path = _this$props.path,
        inlineIndent = _this$props.inlineIndent,
        disabled = _this$props.disabled,
        toggleOpenKeys = _this$props.toggleOpenKeys,
        linkKey = _this$props.linkKey,
        toggleDuration = _this$props.toggleDuration,
        frontCaret = _this$props.frontCaret,
        looseChildren = _this$props.looseChildren,
        parentSelectable = _this$props.parentSelectable,
        frontCaretType = _this$props.frontCaretType,
        caretColor = _this$props.caretColor;
    var isVertical = mode.indexOf('vertical') === 0;
    var className = classnames(menuClass('list', isVertical ? 'vertical' : mode), this.props.className);
    return React.createElement("ul", {
      className: className,
      style: style
    }, data.map(function (d, i) {
      return React.createElement(Item, {
        bottomLine: bottomLine,
        topLine: topLine,
        disabled: disabled,
        key: getKey(d, keygen, i),
        index: i,
        keygen: keygen,
        data: d,
        renderItem: renderItem,
        inlineIndent: inlineIndent,
        level: level,
        mode: mode,
        onClick: onClick,
        path: path,
        toggleOpenKeys: toggleOpenKeys,
        linkKey: linkKey,
        toggleDuration: toggleDuration,
        frontCaret: frontCaret,
        frontCaretType: frontCaretType,
        caretColor: caretColor,
        looseChildren: looseChildren,
        parentSelectable: parentSelectable
      });
    }));
  };

  return List;
}(PureComponent);

List.propTypes = {
  bottomLine: PropTypes.number,
  topLine: PropTypes.number,
  className: PropTypes.string,
  disabled: PropTypes.func,
  inlineIndent: PropTypes.number,
  keygen: PropTypes.any,
  level: PropTypes.number,
  data: PropTypes.array,
  mode: PropTypes.string,
  onClick: PropTypes.func,
  path: PropTypes.string,
  renderItem: PropTypes.func,
  style: PropTypes.object,
  toggleOpenKeys: PropTypes.func,
  linkKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  toggleDuration: PropTypes.number,
  frontCaret: PropTypes.bool,
  looseChildren: PropTypes.bool,
  parentSelectable: PropTypes.bool,
  frontCaretType: PropTypes.oneOf(['hollow', 'solid']),
  caretColor: PropTypes.string
};
export default List;