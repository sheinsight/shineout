import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { uploadClass } from './styles';
import Progress from '../Progress';
import Spin from '../Spin';
import icons from '../icons';
import { ERROR, UPLOADING } from './request';
import { getDirectionClass } from '../utils/classname';
var SPIN = React.createElement("span", {
  style: {
    display: 'inline-block',
    marginRight: 8
  }
}, React.createElement(Spin, {
  size: 10,
  name: "ring"
}));

var File =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(File, _PureComponent);

  function File(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleRemove = _this.handleRemove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = File.prototype;

  _proto.handleRemove = function handleRemove() {
    this.props.onRemove(this.props.id);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        message = _this$props.message,
        name = _this$props.name,
        status = _this$props.status,
        process = _this$props.process;
    var className = uploadClass('view-file', status === ERROR && 'error');
    return React.createElement("div", {
      className: className
    }, React.createElement("div", {
      className: uploadClass(getDirectionClass('text'))
    }, status === UPLOADING && SPIN, " ", name, " ", message && React.createElement("span", null, "(", message, ") ")), React.createElement("a", {
      className: uploadClass('delete'),
      onClick: this.handleRemove
    }, icons.Close), status !== ERROR && React.createElement(Progress, {
      className: uploadClass('progress'),
      background: process >= 0 ? '#e9ecef' : 'transparent',
      value: process,
      strokeWidth: 2
    }));
  };

  return File;
}(PureComponent);

File.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  name: PropTypes.string,
  onRemove: PropTypes.func,
  process: PropTypes.number,
  status: PropTypes.number
};
export default File;