import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import Component from './Rate';
import inputable from '../Form/inputable';
export default (function (background, front, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var Rate = inputable(function (props) {
    return React.createElement(Component, _extends({}, opts, props, {
      background: background,
      front: front || background
    }));
  });
  Rate.displayName = 'ShineoutRate';
  return Rate;
});