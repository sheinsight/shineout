"use strict";

exports.__esModule = true;
exports.default = void 0;

var _default = function _default(color) {
  if (color.from) {
    return [{
      pos: '0%',
      color: color.from
    }, {
      pos: '100%',
      color: color.to
    }];
  }

  return Object.keys(color).sort(function (a, b) {
    return window.parseInt(a) - window.parseInt(b);
  }).reduce(function (p, v) {
    p.push({
      pos: v,
      color: color[v]
    });
    return p;
  }, []);
};

exports.default = _default;