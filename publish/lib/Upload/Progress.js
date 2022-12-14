"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Spin = _interopRequireDefault(require("../Spin"));

var _component = require("../component");

var _styles = require("./styles");

var _Button = _interopRequireDefault(require("../Button"));

var _Upload = _interopRequireDefault(require("./Upload"));

var _config = require("../config");

var SPIN = function SPIN(color) {
  return _react.default.createElement("span", {
    className: (0, _styles.uploadClass)('bg-spin')
  }, _react.default.createElement(_Spin.default, {
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
  (0, _inheritsLoose2.default)(Progress, _PureComponent);

  function Progress(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      progress: -1
    };
    _this.handleError = _this.handleError.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleSuccess = _this.handleSuccess.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleProgress = _this.handleProgress.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleStart = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 0);
    _this.handleOver = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), -1);
    _this.handleUpload = _this.handleUpload.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
    return (0, _react.isValidElement)(loading) ? _react.default.createElement("span", null, loading) : _react.default.createElement("span", null, SPIN(color), typeof loading === 'string' ? loading : placeholder);
  };

  _proto.render = function render() {
    var _style;

    var _this$props2 = this.props,
        placeholder = _this$props2.placeholder,
        type = _this$props2.type,
        size = _this$props2.size,
        outline = _this$props2.outline,
        others = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["placeholder", "type", "size", "outline"]);
    var uploading = this.state.progress >= 0;
    var style = (_style = {}, _style[(0, _config.isRTL)() ? 'left' : 'right'] = uploading ? 100 - this.state.progress + "%" : '100%', _style);
    return _react.default.createElement(_Upload.default, (0, _extends2.default)({}, others, {
      limit: undefined,
      onProgress: this.handleProgress,
      onStart: this.handleStart,
      showUploadList: false,
      onError: this.handleError,
      onSuccess: this.handleSuccess
    }), _react.default.createElement(_Button.default, {
      tabIndex: others.disabled ? -1 : 0,
      disabled: others.disabled,
      className: (0, _styles.uploadClass)('button', uploading && 'uploading'),
      type: type,
      size: size,
      outline: outline,
      onClick: this.handleUpload,
      onKeyDown: handleKeyDown
    }, uploading && [_react.default.createElement("div", {
      key: "cover",
      className: (0, _styles.uploadClass)('cover')
    }), _react.default.createElement("div", {
      key: "bg",
      style: style,
      className: (0, _styles.uploadClass)('bg')
    }, this.renderLoadingView('#fff'))], _react.default.createElement("span", null, uploading ? this.renderLoadingView() : placeholder)));
  };

  return Progress;
}(_component.PureComponent);

Progress.propTypes = {
  type: _propTypes.default.oneOf(['default', 'primary', 'success', 'link', 'warning', 'error', 'danger']),
  placeholder: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  loading: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  onSuccess: _propTypes.default.func,
  onError: _propTypes.default.func,
  outline: _propTypes.default.bool,
  size: _propTypes.default.oneOf(['small', 'default', 'large'])
};
Progress.defaultProps = {
  type: 'primary',
  size: 'default',
  outline: false
};
var _default = Progress;
exports.default = _default;