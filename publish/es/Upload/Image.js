import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import immer from 'immer';
import classname from 'classnames';
import { uploadClass } from './styles';
import Upload from './Upload';
import { ERROR } from './request';
import { getLocale } from '../locale';
export var Handler = function Handler(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      urlInvalid = _ref.urlInvalid,
      children = _ref.children,
      style = _ref.style,
      width = _ref.width,
      height = _ref.height,
      otherProps = _objectWithoutPropertiesLoose(_ref, ["className", "disabled", "urlInvalid", "children", "style", "width", "height"]);

  var mc = classname(uploadClass('image-plus', 'image-item', disabled && 'disabled', urlInvalid && 'url-invalid-border'), className);
  var ms = Object.assign({}, {
    width: width,
    height: height
  }, style);
  return React.createElement("div", _extends({}, otherProps, {
    style: ms,
    tabIndex: disabled ? -1 : 0,
    className: mc
  }), children || React.createElement("div", {
    className: uploadClass('indicator', urlInvalid && 'url-invalid-indicator')
  }));
};
Handler.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  urlInvalid: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
};
Handler.defaultProps = {
  width: 80,
  height: 80
};

var Image =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Image, _PureComponent);

  function Image(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.beforeUpload = _this.beforeUpload.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
          _this2.setState(immer(function (draft) {
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
            file.status = ERROR;
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
        others = _objectWithoutPropertiesLoose(_this$props, ["children", "width", "height", "ignorePreview"]);

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
    return React.createElement(Upload, _extends({}, others, {
      imageStyle: style,
      beforeUpload: ignorePreview ? undefined : this.beforeUpload
    }), React.createElement(Handler, {
      disabled: this.props.disabled,
      style: style,
      onKeyDown: this.handleKeyDown,
      onMouseDown: this.handleMouseDown,
      urlInvalid: urlInvalid
    }, children), urlInvalid && React.createElement("div", {
      style: {
        width: '100%',
        position: 'relative'
      }
    }, React.createElement("div", {
      className: uploadClass('url-invalid-message')
    }, getLocale('urlInvalidMsg'))));
  };

  return Image;
}(PureComponent);

Image.propTypes = {
  accept: PropTypes.string,
  children: PropTypes.any,
  height: PropTypes.number,
  recoverAble: PropTypes.bool,
  validator: PropTypes.shape({
    imageSize: PropTypes.func,
    size: PropTypes.func
  }),
  width: PropTypes.number,
  disabled: PropTypes.bool,
  ignorePreview: PropTypes.bool,
  GapProps: PropTypes.shape({})
};
Image.defaultProps = {
  accept: 'image/*',
  height: 80,
  validator: {},
  width: 80
};
export default Image;