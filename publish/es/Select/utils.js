import { isFunc } from '../utils/is';
export var getCustomList = function getCustomList(list, renderOptionList, loading) {
  if (renderOptionList && isFunc(renderOptionList)) return renderOptionList(list, {
    loading: loading
  });
  return list;
};