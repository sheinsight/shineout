import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import { getDirectionClass } from '../utils/classname';
import Jumper from './Jumper';
import Prev from './Prev';
import Next from './Next';
import { paginationClass } from './styles';

var Simple =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Simple, _PureComponent);

  function Simple() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Simple.prototype;

  _proto.render = function render() {
    return React.createElement("div", {
      className: paginationClass('links', getDirectionClass('section'))
    }, React.createElement(Prev, _extends({}, this.props, {
      isSimple: true
    })), React.createElement(Jumper, _extends({}, this.props, {
      isSimple: true,
      size: "small"
    })), React.createElement(Next, _extends({}, this.props, {
      isSimple: true
    })));
  };

  return Simple;
}(PureComponent);

Simple.propTypes = {};
export default Simple;