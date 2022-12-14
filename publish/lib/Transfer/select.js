"use strict";

exports.__esModule = true;
exports.default = splitSelecteds;

var _uid = require("../utils/uid");

function splitSelecteds(selecteds, props) {
  if (!selecteds) return null;
  var data = props.data,
      keygen = props.keygen,
      datum = props.datum;
  var left = [];
  var right = [];
  selecteds.forEach(function (s) {
    var v = data.find(function (d, i) {
      return (0, _uid.getKey)(d, keygen, i) === s;
    });

    if (v) {
      if (datum.check(v)) right.push(s);else left.push(s);
    }
  });
  return [left, right];
}