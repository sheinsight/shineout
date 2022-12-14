"use strict";

exports.__esModule = true;
exports.default = _default;

function _default(el) {
  return typeof HTMLElement === 'function' ? el instanceof HTMLElement : el && typeof el === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string';
}