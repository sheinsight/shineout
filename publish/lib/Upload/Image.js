"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.Handler = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _Upload = _interopRequireDefault(require("./Upload"));

var _request = require("./request");

var _locale = require("../locale");

var Handler = function Handler(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      urlInvalid = _ref.urlInvalid,
      children = _ref.children,
      style = _ref.style,
      width = _ref.width,
      height = _ref.height,
      otherProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["className", "disabled", "urlInvalid", "children", "style", "width", "height"]);
  var mc = (0, _classnames.default)((0, _styles.uploadClass)('image-plus', 'image-item', disabled && 'disabled', urlInvalid && 'url-invalid-border'), className);
  var ms = Object.assign({}, {
    width: width,
    height: height
  }, style);
  return _react.default.createElement("div", (0, _extends2.default)({}, otherProps, {
    style: ms,
    tabIndex: disabled ? -1 : 0,
    className: mc
  }), children || _react.default.createElement("div", {
    className: (0, _styles.uploadClass)('indicator', urlInvalid && 'url-invalid-indicator')
  }));
};

exports.Handler = Handler;
Handler.propTypes = {
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  urlInvalid: _propTypes.default.bool,
  children: _propTypes.default.node,
  style: _propTypes.default.object,
  width: _propTypes.default.number,
  height: _propTypes.default.number
};
Handler.defaultProps = {
  width: 80,
  height: 80
};

var Image =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Image, _PureComponent);

  function Image(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.beforeUpload = _this.beforeUpload.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleMouseDown = _this.handleMouseDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      urlInvalid: false
    };
    _this.timeout = null;
    return _this;
  }

  var _proto = Image.prototype;

  _proto.beforeUpload = function beforeUpload(blob, validatorHandle) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      var imageSize = _this2.props.validator.imageSize;
      var file = {};
      var reader = new FileReader();

      reader.onload = function (e) {
        var data = e.target.result;
        file.data = data;
        var image = new window.Image();

        image.onerror = function () {
          _this2.setState((0, _immer.default)(function (draft) {
            draft.urlInvalid = true;
          }));

          reject();
        };

        image.onload = function () {
          if (!imageSize) {
            resolve(file);
            return;
          }

          var res = imageSize(image);

          if (res instanceof Error) {
            if (!validatorHandle(res, blob)) reject();
            file.status = _request.ERROR;
            file.message = res.message;
          }

          resolve(file);
        };

        image.src = data;
      };

      reader.readAsDataURL(blob);
    });
  };

  _proto.handleKeyDown = function handleKeyDown(e) {
    this.setState({
      urlInvalid: false
    });
    if (e.keyCode === 13) e.target.click();
  };

  _proto.handleMouseDown = function handleMouseDown() {
    this.setState({
      urlInvalid: false
    });
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props = this.props,
        children = _this$props.children,
        width = _this$props.width,
        height = _this$props.height,
        ignorePreview = _this$props.ignorePreview,
        others = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children", "width", "height", "ignorePreview"]);
    var urlInvalid = this.state.urlInvalid;

    if (urlInvalid) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        _this3.setState({
          urlInvalid: false
        });
      }, 3000);
    }

    var style = {
      width: width,
      height: height
    };
    return _react.default.createElement(_Upload.default, (0, _extends2.default)({}, others, {
      imageStyle: style,
      beforeUpload: ignorePreview ? undefined : this.beforeUpload
    }), _react.default.createElement(Handler, {
      disabled: this.props.disabled,
      style: style,
      onKeyDown: this.handleKeyDown,
      onMouseDown: this.handleMouseDown,
      urlInvalid: urlInvalid
    }, children), urlInvalid && _react.default.createElement("div", {
      style: {
        width: '100%',
        position: 'relative'
      }
    }, _react.default.createElement("div", {
      className: (0, _styles.uploadClass)('url-invalid-message')
    }, (0, _locale.getLocale)('urlInvalidMsg'))));
  };

  return Image;
}(_react.PureComponent);

Image.propTypes = {
  accept: _propTypes.default.string,
  children: _propTypes.default.any,
  height: _propTypes.default.number,
  recoverAble: _propTypes.default.bool,
  validator: _propTypes.default.shape({
    imageSize: _propTypes.default.func,
    size: _propTypes.default.func
  }),
  width: _propTypes.default.number,
  disabled: _propTypes.default.bool,
  ignorePreview: _propTypes.default.bool,
  GapProps: _propTypes.default.shape({})
};
Image.defaultProps = {
  accept: 'image/*',
  height: 80,
  validator: {},
  width: 80
};
var _default = Image;
exports.default = _default;