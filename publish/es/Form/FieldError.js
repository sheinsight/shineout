import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formClass } from './styles';

var FieldError =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(FieldError, _PureComponent);

  function FieldError() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = FieldError.prototype;

  _proto.render = function render() {
    var error = this.props.error; // eslint-disable-next-line

    if (Array.isArray(error)) error = error[0];
    if (!(error instanceof Error)) return null;
    return React.createElement("div", {
      className: formClass('error')
    }, error.message);
  };

  return FieldError;
}(PureComponent);

FieldError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export default FieldError;