"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _icons = _interopRequireDefault(require("../icons"));

var _Image = _interopRequireDefault(require("../Image"));

var _RemoveConfirm = _interopRequireDefault(require("./RemoveConfirm"));

var _styles = require("./styles");

var ImageResult =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(ImageResult, _PureComponent);

  function ImageResult(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      confirm: false
    };
    _this.handleRemove = _this.handleRemove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleRecover = _this.handleRecover.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindImage = _this.bindImage.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handlePreview = _this.handlePreview.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleConfirmChange = _this.handleConfirmChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.preview = _this.preview.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
    return _react.default.createElement("div", {
      className: (0, _styles.uploadClass)('image-options', confirm && 'image-active')
    }, _react.default.createElement("a", {
      className: (0, _styles.uploadClass)('options-item'),
      onClick: this.handlePreview
    }, _icons.default.Preview), this.props.onRemove && _react.default.createElement("a", {
      className: (0, _styles.uploadClass)('options-item', 'options-remove'),
      onClick: removeConfirm ? undefined : this.handleRemove
    }, _icons.default.Delete, _react.default.createElement(_RemoveConfirm.default, {
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
    var className = (0, _styles.uploadClass)('image-item', 'image-result', recoverAble && 'to-be-delete');
    var url = renderResult(value);
    return _react.default.createElement("div", {
      style: style,
      className: className
    }, url && (renderContent ? renderContent(url, value, index, values) : _react.default.createElement(_Image.default, {
      ref: this.bindImage,
      src: url,
      href: url,
      fit: "center",
      width: "auto",
      height: 0,
      className: (0, _styles.uploadClass)('image-bg')
    })), showRecover && _react.default.createElement("a", {
      className: (0, _styles.uploadClass)('recover'),
      onClick: this.handleRecover
    }, _icons.default.Recovery), this.showRemove && _react.default.createElement("span", {
      className: (0, _styles.uploadClass)('delete'),
      onClick: this.handleRemove
    }), !renderContent && this.renderOptions());
  };

  (0, _createClass2.default)(ImageResult, [{
    key: "showRemove",
    get: function get() {
      var _this$props4 = this.props,
          onRemove = _this$props4.onRemove,
          renderContent = _this$props4.renderContent;
      return onRemove && renderContent;
    }
  }]);
  return ImageResult;
}(_react.PureComponent);

ImageResult.propTypes = {
  index: _propTypes.default.number,
  onRemove: _propTypes.default.func,
  onRecover: _propTypes.default.func,
  recoverAble: _propTypes.default.bool,
  renderResult: _propTypes.default.func,
  showRecover: _propTypes.default.bool,
  style: _propTypes.default.object,
  value: _propTypes.default.any,
  renderContent: _propTypes.default.func,
  values: _propTypes.default.array,
  onPreview: _propTypes.default.func,
  removeConfirm: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
};
ImageResult.defaultProps = {
  renderResult: function renderResult(a) {
    return a;
  }
};
var _default = ImageResult;
exports.default = _default;