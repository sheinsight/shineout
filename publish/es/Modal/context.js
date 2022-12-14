import React from 'react';
import createReactContext from '../context';
var context = createReactContext(); // eslint-disable-next-line

export var Provider = context.Provider;

var consumer = function consumer(Origin) {
  return function (props) {
    return React.createElement(context.Consumer, null, function (value) {
      // eslint-disable-next-line react/prop-types
      var mp = Object.assign({}, props, value && props.absolute && props.zIndex === undefined && {
        zIndex: 1051
      });
      return React.createElement(Origin, mp);
    });
  };
};

export default consumer;