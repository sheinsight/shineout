"use strict";

exports.__esModule = true;
exports.default = _default;

function _default(callback) {
  if (!callback) return;
  if (document.readyState !== 'loading') callback();else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}