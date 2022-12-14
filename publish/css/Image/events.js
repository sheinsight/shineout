"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Gallery = _interopRequireDefault(require("./Gallery"));

var _styles = require("./styles");

var container;

function close() {
  // eslint-disable-next-line
  document.removeEventListener('keydown', keyClose);

  _reactDom.default.unmountComponentAtNode(container);

  document.body.removeChild(container);
  container = null;
}

function keyClose(e) {
  if (e.keyCode === 27) close();
}

function getContainer() {
  if (container) return container;
  container = document.createElement('div');
  document.body.appendChild(container);
  container.className = (0, _styles.imageClass)('gallery');
  return container;
}

function _default(images, current) {
  if (current === void 0) {
    current = 0;
  }

  if (!Array.isArray(images)) images = [images];
  var div = getContainer();
  document.addEventListener('keydown', keyClose);

  _reactDom.default.render(_react.default.createElement(_Gallery.default, {
    onClose: close,
    current: current,
    images: images
  }), div);
}