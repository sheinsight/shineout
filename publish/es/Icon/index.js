import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import Icon from './Icon';
var links = {};
var scripts = {};
export default function (url, fontFamily, prefix) {
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
    return React.createElement(Icon, _extends({
      ext: ext,
      fontFamily: fontFamily,
      prefix: prefix
    }, props));
  };

  wrapperIcon.isShineoutIcon = true;
  return wrapperIcon;
}