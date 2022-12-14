import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import Panel from './Panel';

function Content(props) {
  // eslint-disable-next-line
  return React.createElement(Panel, _extends({}, props, {
    useTextStyle: true
  }));
}

export default Content;