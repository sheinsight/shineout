import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getUidStr } from '../utils/uid';
import { paginationClass } from './styles';
import Input from '../Input';
import { getDirectionClass } from '../utils/classname';
var inputStyle = {
  width: 60,
  display: 'inline-block'
};

var nofunc = function nofunc() {};

var Jumper =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Jumper, _PureComponent);

  function Jumper(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderRequire = getUidStr();
    return _this;
  }

  var _proto = Jumper.prototype;

  _proto.getMax = function getMax() {
    var _this$props = this.props,
        total = _this$props.total,
        pageSize = _this$props.pageSize;
    return Math.ceil(total / pageSize) || 1;
  };

  _proto.handleKeyDown = function handleKeyDown(e) {
    if (e.keyCode === 13) {
      var current = parseInt(e.target.value, 10);
      this.autoFocus = true;
      if (!Number.isFinite(current)) return;
      if (current < 1) current = 1;
      this.renderRequire = getUidStr();
      var max = this.getMax();
      if (current > max) current = max;

      if (current === this.props.current) {
        this.forceUpdate();
      }

      this.props.onChange(current);
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        current = _this$props2.current,
        text = _this$props2.text,
        size = _this$props2.size,
        isSimple = _this$props2.isSimple;
    var txt = text.jumper ? text.jumper.split('{input}') : [];

    if (isSimple) {
      var spanClass = paginationClass('simple-span');
      txt = [[], [React.createElement("span", {
        key: "separator",
        className: spanClass
      }, "/"), React.createElement("span", {
        key: "pageMax",
        className: spanClass
      }, this.getMax())]];
    }

    return React.createElement("div", {
      className: paginationClass(getDirectionClass('section'))
    }, txt[0] ? React.createElement("span", null, txt[0]) : undefined, React.createElement(Input, {
      key: this.renderRequire,
      value: current,
      onChange: nofunc,
      autoFocus: this.autoFocus,
      onKeyDown: this.handleKeyDown,
      digits: 0,
      type: "number",
      style: inputStyle,
      size: size,
      className: paginationClass(isSimple && 'simple-input'),
      delay: 400
    }), txt[1] ? React.createElement("span", null, txt[1]) : undefined);
  };

  return Jumper;
}(PureComponent);

Jumper.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  text: PropTypes.object,
  total: PropTypes.number.isRequired,
  size: PropTypes.string,
  isSimple: PropTypes.bool
};
export default Jumper;