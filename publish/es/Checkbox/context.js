import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import createReactContext from '../context';
var context = createReactContext(); // eslint-disable-next-line

export var Provider = context.Provider;
export var consumer = function consumer(Origin) {
  return function (props) {
    return React.createElement(context.Consumer, null, function (value) {
      return React.createElement(Origin, _extends({}, props, value));
    });
  };
};