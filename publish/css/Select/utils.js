"use strict";

exports.__esModule = true;
exports.getCustomList = void 0;

var _is = require("../utils/is");

var getCustomList = function getCustomList(list, renderOptionList, loading) {
  if (renderOptionList && (0, _is.isFunc)(renderOptionList)) return renderOptionList(list, {
    loading: loading
  });
  return list;
};

exports.getCustomList = getCustomList;