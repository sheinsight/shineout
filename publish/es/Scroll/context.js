import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import createReactContext from '../context';
var context = createReactContext();
var Consumer = context.Consumer; // eslint-disable-next-line

export var Provider = context.Provider;
export var scrollConsumer = function scrollConsumer(Origin) {
  return function (props) {
    return React.createElement(Consumer, null, function (value) {
      if (value === void 0) {
        value = {};
      }

      return React.createElement(Origin, _extends({}, props, {
        scrollElement: value.element,
        scrollLeft: value.left,
        scrollTop: value.top
      }));
    });
  };
};