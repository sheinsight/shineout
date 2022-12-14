import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { listClass } from './styles';

var Extra =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Extra, _PureComponent);

  function Extra() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Extra.prototype;

  _proto.render = function render() {
    var _this = this;

    var render = this.props.extra.map(function (value, index) {
      return React.createElement(React.Fragment, {
        key: index
      }, value, index < _this.props.extra.length - 1 ? React.createElement("div", {
        className: listClass('split')
      }) : null);
    });
    return React.createElement("div", {
      className: listClass('extra')
    }, render);
  };

  return Extra;
}(PureComponent);

Extra.propTypes = {
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.array])
};
export default Extra;