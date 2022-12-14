"use strict";

exports.__esModule = true;
exports.value2per = value2per;
exports.per2value = per2value;

var _numbers = require("../utils/numbers");

function value2per(value, scale) {
  var range = scale.length - 1;
  var ps = 0;
  scale.forEach(function (s, i) {
    if (value > s) ps = i;
  }); // end

  if (ps >= range) return 1;
  var min = scale[ps];
  var max = scale[ps + 1];
  return (ps + (value - min) / (max - min)) / range;
}

function per2value(per, scale, step) {
  if (step === void 0) {
    step = 1;
  }

  var range = scale.length - 1;
  if (step === 0) return scale[Math.round(per * range)];
  if (per >= 1) return scale[range];
  var ps = Math.floor(per * range);
  var min = scale[ps];
  var max = scale[ps + 1];
  var count = (max - min) / step;
  var sper = (per - ps / range) * range;
  return (0, _numbers.toPrecision)(min + Math.round(sper * count) * step);
}