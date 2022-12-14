import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getProps } from '../utils/proptypes';
import { treeClass } from './styles';
import List from './List';
import { isRTL } from '../config';

function Root(props) {
  var className = classnames(treeClass('_', props.line ? 'with-line' : 'no-line', isRTL() && 'rtl'), props.className);
  return React.createElement(List, _extends({}, props, {
    className: className,
    expanded: true,
    path: "",
    isRoot: true,
    deepIndex: 0
  }));
}

Root.propTypes = _objectSpread({}, getProps(PropTypes), {
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  data: PropTypes.array,
  line: PropTypes.bool
});
Root.defaultProps = {
  data: [],
  line: true
};
export default Root;