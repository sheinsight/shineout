"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ready = _interopRequireDefault(require("./ready"));

/**
 * 最外层容器
 */
var Container = null;

var getContainer = function getContainer() {
  if (Container) return Container;
  Container = document.createElement('div');
  Container.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; contain: size');
  (0, _ready.default)(function () {
    document.body.appendChild(Container);
  });
  return Container;
};

var _default = getContainer;
exports.default = _default;