import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';
import Spin from '../Spin';
import { PureComponent } from '../component';
import { uploadClass } from './styles';
import Button from '../Button';
import Upload from './Upload';
import { isRTL } from '../config';

var SPIN = function SPIN(color) {
  return React.createElement("span", {
    className: uploadClass('bg-spin')
  }, React.createElement(Spin, {
    size: 10,
    name: "ring",
    color: color
  }));
};

var handleKeyDown = function handleKeyDown(e) {
  if (e.keyCode === 13) e.target.click();
};

var Progress =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Progress, _PureComponent);

  function Progress(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      progress: -1
    };
    _this.handleError = _this.handleError.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSuccess = _this.handleSuccess.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleProgress = _this.handleProgress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleStart = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), 0);
    _this.handleOver = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), -1);
    _this.handleUpload = _this.handleUpload.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Progress.prototype;

  _proto.handleChange = function handleChange(p) {
    this.setState({
      progress: p
    });
  };

  _proto.handleProgress = function handleProgress(file) {
    this.handleChange(file.process);
  };

  _proto.handleError = function handleError(error) {
    var onError = this.props.onError;
    if (onError) onError(error);
    this.handleOver();
  };

  _proto.handleSuccess = function handleSuccess() {
    var onSuccess = this.props.onSuccess;
    if (onSuccess) onSuccess.apply(void 0, arguments);
    this.handleOver();
  };

  _proto.handleUpload = function handleUpload(e) {
    var uploading = this.state.progress >= 0;
    if (uploading) e.stopPropagation();
  };

  _proto.renderLoadingView = function renderLoadingView(color) {
    var _this$props = this.props,
        placeholder = _this$props.placeholder,
        loading = _this$props.loading;
    return isValidElement(loading) ? React.createElement("span", null, loading) : React.createElement("span", null, SPIN(color), typeof loading === 'string' ? loading : placeholder);
  };

  _proto.render = function render() {
    var _style;

    var _this$props2 = this.props,
        placeholder = _this$props2.placeholder,
        type = _this$props2.type,
        size = _this$props2.size,
        outline = _this$props2.outline,
        others = _objectWithoutPropertiesLoose(_this$props2, ["placeholder", "type", "size", "outline"]);

    var uploading = this.state.progress >= 0;
    var style = (_style = {}, _style[isRTL() ? 'left' : 'right'] = uploading ? 100 - this.state.progress + "%" : '100%', _style);
    return React.createElement(Upload, _extends({}, others, {
      limit: undefined,
      onProgress: this.handleProgress,
      onStart: this.handleStart,
      showUploadList: false,
      onError: this.handleError,
      onSuccess: this.handleSuccess
    }), React.createElement(Button, {
      tabIndex: others.disabled ? -1 : 0,
      disabled: others.disabled,
      className: uploadClass('button', uploading && 'uploading'),
      type: type,
      size: size,
      outline: outline,
      onClick: this.handleUpload,
      onKeyDown: handleKeyDown
    }, uploading && [React.createElement("div", {
      key: "cover",
      className: uploadClass('cover')
    }), React.createElement("div", {
      key: "bg",
      style: style,
      className: uploadClass('bg')
    }, this.renderLoadingView('#fff'))], React.createElement("span", null, uploading ? this.renderLoadingView() : placeholder)));
  };

  return Progress;
}(PureComponent);

Progress.propTypes = {
  type: PropTypes.oneOf(['default', 'primary', 'success', 'link', 'warning', 'error', 'danger']),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  loading: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  outline: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large'])
};
Progress.defaultProps = {
  type: 'primary',
  size: 'default',
  outline: false
};
export default Progress;