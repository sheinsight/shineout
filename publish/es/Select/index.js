import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import inputable from '../Form/inputable';
import { compose } from '../utils/func';
import Datum from '../Datum';
import inputBorder from '../hoc/inputBorder';
import { selectClass } from './styles';
import tiled, { advancedFilterHOC } from '../TreeSelect/tiled';
import Select from './Select';
import filter from './filter';
import group from './group';
import absolute from '../Table/context';

var limitWrap = function limitWrap(Origin) {
  return function (props) {
    // eslint-disable-next-line
    var limit = props.multiple ? 0 : 1;
    return React.createElement(Origin, _extends({}, props, {
      limit: limit
    }));
  };
};

var exportSelect = compose(inputable, inputBorder({
  className: selectClass('_'),
  tag: 'div'
}), limitWrap, Datum.hoc({
  bindProps: ['disabled', 'limit', 'format', 'prediction', 'separator'],
  pure: false
}), advancedFilterHOC, filter, tiled({
  dataKey: 'treeData'
}), group, absolute)(Select);
exportSelect.displayName = 'ShineoutSelect';
export default exportSelect;