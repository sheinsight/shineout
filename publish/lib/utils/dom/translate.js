"use strict";

exports.__esModule = true;
exports.setTranslate = setTranslate;
exports.setTranslate3D = setTranslate3D;

var _detect = require("./detect");

var _config = require("../../config");

var use3d;

var getDirectionX = function getDirectionX(x) {
  var xs = String(x);
  var num = Number.parseFloat(xs);
  var numStr = String(num);
  var start = xs.indexOf(numStr) + numStr.length;
  var u = xs.slice(start);
  var result = String(((0, _config.isRTL)() ? -1 : 1) * num) + u;
  return result;
};

function setTranslate(el, x, y) {
  var tn = (0, _detect.getTransformName)();
  el.style[tn] = "translate(" + getDirectionX(x) + "," + y + ")";
}

function setTranslate3D(el, x, y) {
  if (use3d === undefined) use3d = (0, _detect.has3d)();
  var tn = (0, _detect.getTransformName)();
  var xd = getDirectionX(x);

  if (use3d) {
    el.style[tn] = "translate3d(" + xd + "," + y + ",0)";
  } else {
    el.style[tn] = "translate(" + xd + "," + y + ")";
  }
}