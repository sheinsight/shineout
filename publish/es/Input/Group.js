import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

function Group(props) {
  var children = props.children,
      style = props.style,
      inputFocus = props.inputFocus,
      other = _objectWithoutPropertiesLoose(props, ["children", "style", "inputFocus"]);

  return Children.toArray(children).map(function (child, i) {
    if (typeof child === 'string') {
      return React.createElement("span", {
        key: i
      }, child);
    }

    return cloneElement(child, other);
  });
}

Group.propTypes = {
  children: PropTypes.any
};
export default Group;