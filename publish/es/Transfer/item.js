import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Checkbox from '../Checkbox';
import { PureComponent } from '../component';
import { transferClass } from './styles';
import Context from './context';

var Item =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Item, _PureComponent);

  function Item(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.check = _this.check.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Item.prototype;

  _proto.check = function check(c) {
    var _this$props = this.props,
        index = _this$props.index,
        selecteds = _this$props.selecteds,
        checkKey = _this$props.checkKey,
        setSelecteds = _this$props.setSelecteds;

    if (c) {
      setSelecteds(index, [].concat(selecteds[index], [checkKey]));
    } else {
      setSelecteds(index, selecteds[index].filter(function (ch) {
        return ch !== checkKey;
      }));
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        content = _this$props2.content,
        selecteds = _this$props2.selecteds,
        checkKey = _this$props2.checkKey,
        index = _this$props2.index,
        disabled = _this$props2.disabled,
        itemClass = _this$props2.itemClass;
    return React.createElement("div", {
      className: classnames(transferClass('item', disabled && 'item-disabled'), itemClass)
    }, React.createElement(Checkbox, {
      className: transferClass('item-check'),
      onChange: this.check,
      disabled: disabled,
      checked: selecteds[index].indexOf(checkKey) > -1
    }, content));
  };

  return Item;
}(PureComponent);

Item.propTypes = {
  index: PropTypes.number,
  selecteds: PropTypes.array,
  checkKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setSelecteds: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  itemClass: PropTypes.string
};
export default (function (prop) {
  return React.createElement(Context.Consumer, null, function (value) {
    return React.createElement(Item, _extends({}, prop, {
      selecteds: value.selecteds,
      setSelecteds: value.setSelecteds
    }));
  });
});