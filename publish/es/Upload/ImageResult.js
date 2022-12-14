import _createClass from "@babel/runtime/helpers/createClass";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import icons from '../icons';
import Image from '../Image';
import RemoveConfirm from './RemoveConfirm';
import { uploadClass } from './styles';

var ImageResult =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(ImageResult, _PureComponent);

  function ImageResult(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      confirm: false
    };
    _this.handleRemove = _this.handleRemove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleRecover = _this.handleRecover.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindImage = _this.bindImage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handlePreview = _this.handlePreview.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleConfirmChange = _this.handleConfirmChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.preview = _this.preview.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = ImageResult.prototype;

  _proto.bindImage = function bindImage(image) {
    this.image = image;
  };

  _proto.handleRemove = function handleRemove() {
    this.props.onRemove(this.props.index);
  };

  _proto.handleRecover = function handleRecover() {
    var _this$props = this.props,
        onRecover = _this$props.onRecover,
        value = _this$props.value,
        index = _this$props.index;
    onRecover(index, value);
  };

  _proto.handleConfirmChange = function handleConfirmChange(confirm) {
    this.setState({
      confirm: confirm
    });
  };

  _proto.preview = function preview() {
    if (!this.image) return;
    this.image.preview();
  };

  _proto.handlePreview = function handlePreview() {
    var _this2 = this;

    var _this$props2 = this.props,
        onPreview = _this$props2.onPreview,
        renderResult = _this$props2.renderResult,
        value = _this$props2.value,
        index = _this$props2.index,
        values = _this$props2.values;

    if (onPreview) {
      var url = renderResult(value);
      onPreview(url, value, index, values, {
        preview: function preview() {
          return _this2.preview();
        }
      });
      return;
    }

    this.preview();
  };

  _proto.renderOptions = function renderOptions() {
    var removeConfirm = this.props.removeConfirm;
    var confirm = this.state.confirm;
    return React.createElement("div", {
      className: uploadClass('image-options', confirm && 'image-active')
    }, React.createElement("a", {
      className: uploadClass('options-item'),
      onClick: this.handlePreview
    }, icons.Preview), this.props.onRemove && React.createElement("a", {
      className: uploadClass('options-item', 'options-remove'),
      onClick: removeConfirm ? undefined : this.handleRemove
    }, icons.Delete, React.createElement(RemoveConfirm, {
      onVisibleChange: this.handleConfirmChange,
      onRemove: this.handleRemove,
      confirm: removeConfirm
    })));
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        value = _this$props3.value,
        renderResult = _this$props3.renderResult,
        recoverAble = _this$props3.recoverAble,
        renderContent = _this$props3.renderContent,
        style = _this$props3.style,
        showRecover = _this$props3.showRecover,
        index = _this$props3.index,
        values = _this$props3.values;
    var className = uploadClass('image-item', 'image-result', recoverAble && 'to-be-delete');
    var url = renderResult(value);
    return React.createElement("div", {
      style: style,
      className: className
    }, url && (renderContent ? renderContent(url, value, index, values) : React.createElement(Image, {
      ref: this.bindImage,
      src: url,
      href: url,
      fit: "center",
      width: "auto",
      height: 0,
      className: uploadClass('image-bg')
    })), showRecover && React.createElement("a", {
      className: uploadClass('recover'),
      onClick: this.handleRecover
    }, icons.Recovery), this.showRemove && React.createElement("span", {
      className: uploadClass('delete'),
      onClick: this.handleRemove
    }), !renderContent && this.renderOptions());
  };

  _createClass(ImageResult, [{
    key: "showRemove",
    get: function get() {
      var _this$props4 = this.props,
          onRemove = _this$props4.onRemove,
          renderContent = _this$props4.renderContent;
      return onRemove && renderContent;
    }
  }]);

  return ImageResult;
}(PureComponent);

ImageResult.propTypes = {
  index: PropTypes.number,
  onRemove: PropTypes.func,
  onRecover: PropTypes.func,
  recoverAble: PropTypes.bool,
  renderResult: PropTypes.func,
  showRecover: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.any,
  renderContent: PropTypes.func,
  values: PropTypes.array,
  onPreview: PropTypes.func,
  removeConfirm: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
ImageResult.defaultProps = {
  renderResult: function renderResult(a) {
    return a;
  }
};
export default ImageResult;