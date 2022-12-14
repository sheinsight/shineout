import React from 'react';
import pagable from '../hoc/pagable';
export default function (Origin) {
  return function (props) {
    // eslint-disable-next-line react/prop-types
    var pagination = props.pagination;
    var Render = pagination ? pagable(Origin) : Origin;
    return React.createElement(Render, props);
  };
}