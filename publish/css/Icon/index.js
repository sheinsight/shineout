"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("./Icon"));

var links = {};
var scripts = {};

function _default(url, fontFamily, prefix) {
  if (fontFamily === void 0) {
    fontFamily = 'iconfont';
  }

  if (prefix === void 0) {
    prefix = 'icon';
  }

  if (typeof url !== 'string') {
    console.error("Shineout Icon url must be a string, but get " + url);
    return null;
  }

  var ext = url.substr(url.lastIndexOf('.') + 1);

  if (ext === 'css' && !links[url]) {
    links[url] = true;
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }

  if (ext === 'js' && !scripts[url]) {
    var script = document.createElement('script');
    scripts[url] = script;
    script.setAttribute('src', url);
    document.body.appendChild(script);
  }

  var wrapperIcon = function wrapperIcon(props) {
    return _react.default.createElement(_Icon.default, (0, _extends2.default)({
      ext: ext,
      fontFamily: fontFamily,
      prefix: prefix
    }, props));
  };

  wrapperIcon.isShineoutIcon = true;
  return wrapperIcon;
}