import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
export default function (Bar) {
  var FixedLength =
  /*#__PURE__*/
  function (_PureComponent) {
    _inheritsLoose(FixedLength, _PureComponent);

    function FixedLength() {
      return _PureComponent.apply(this, arguments) || this;
    }

    var _proto = FixedLength.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          length = _this$props.length,
          scrollLength = _this$props.scrollLength;
      var barLength = length / scrollLength * length;
      if (barLength < 20) barLength = 20;
      return React.createElement(Bar, _extends({}, this.props, {
        length: length,
        barLength: barLength
      }));
    };

    return FixedLength;
  }(PureComponent);

  FixedLength.propTypes = {
    direction: PropTypes.string,
    length: PropTypes.number.isRequired,
    scrollLength: PropTypes.number.isRequired
  };
  FixedLength.defaultProps = {
    direction: 'y'
  };
  return FixedLength;
}