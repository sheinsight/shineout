import immer from 'immer';
var names = ['delay', 'onDatumBind', 'rules', 'formDatum', 'forceChange', 'trim', 'beforeChange', 'validateHook', 'innerFormNamePath', 'fieldSetValidate', 'combineRules', 'popoverProps', 'inputFocus', 'placeTitle', 'cancelChange', 'integerLimit', 'autoSelect', 'autoFix', 'numType'];
/**
 * delete some props if needed, will not modify the pass argument
 * @param props
 * @returns {Produced<*, *>}
 */

export default function cleanProps(props) {
  return immer(props, function (draft) {
    names.forEach(function (p) {
      return delete draft[p];
    });
  });
}