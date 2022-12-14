"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = cleanProps;

var _immer = _interopRequireDefault(require("immer"));

var names = ['delay', 'onDatumBind', 'rules', 'formDatum', 'forceChange', 'trim', 'beforeChange', 'validateHook', 'innerFormNamePath', 'fieldSetValidate', 'combineRules', 'popoverProps', 'inputFocus', 'placeTitle', 'cancelChange', 'integerLimit', 'autoSelect', 'autoFix', 'numType'];
/**
 * delete some props if needed, will not modify the pass argument
 * @param props
 * @returns {Produced<*, *>}
 */

function cleanProps(props) {
  return (0, _immer.default)(props, function (draft) {
    names.forEach(function (p) {
      return delete draft[p];
    });
  });
}