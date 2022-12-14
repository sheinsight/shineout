import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import createReactContext from '../context';
var context = createReactContext(); // eslint-disable-next-line

export var Provider = context.Provider;

function filterProps(props, keys) {
  if (!props) return {};
  var value = {};
  keys.forEach(function (k) {
    value[k] = props[k];
  });
  return value;
}

export var consumer = function consumer(Origin, keys) {
  if (keys === void 0) {
    keys = [];
  }

  return function (props) {
    return React.createElement(context.Consumer, null, function (value) {
      return React.createElement(Origin, _extends({}, props, filterProps(value, keys)));
    });
  };
};