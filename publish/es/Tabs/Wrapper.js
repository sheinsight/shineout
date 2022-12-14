import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Panel from './Panel';
import { Provider } from '../Sticky/context';

var Wrapper =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Wrapper, _PureComponent);

  function Wrapper() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Wrapper.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        active = _this$props.active,
        id = _this$props.id,
        other = _objectWithoutPropertiesLoose(_this$props, ["active", "id"]);

    return React.createElement(Provider, {
      value: {
        needResetPostion: id === active
      }
    }, React.createElement(Panel, _extends({}, other, {
      isActive: id === active
    })));
  };

  return Wrapper;
}(PureComponent);

Wrapper.propTypes = {
  active: PropTypes.any,
  children: PropTypes.any,
  id: PropTypes.any
};
export default Wrapper;