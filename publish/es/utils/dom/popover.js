import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { docScroll, docSize } from './document';
var posKeys = ['left', 'top', 'bottom', 'right'];
export var getPosition = function getPosition(position, el, container) {
  if (container === void 0) {
    container = document.body;
  }

  var rect = el.getBoundingClientRect();
  var containerRect = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  };
  if (container.tagName === 'BODY') container = undefined;
  if (container) containerRect = container.getBoundingClientRect();
  var scrollTop = container ? 0 : docScroll.top;
  var scrollLeft = container ? 0 : docScroll.left;
  var pos = {};

  switch (position) {
    case 'top-left':
      pos.left = scrollLeft + rect.left - containerRect.left;
      pos.top = scrollTop + rect.top - containerRect.top;
      break;

    case 'top':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width / 2;
      pos.top = scrollTop + rect.top - containerRect.top;
      break;

    case 'top-right':
      pos.right = (containerRect.right || docSize.width) - rect.right - scrollLeft;
      pos.top = scrollTop + rect.top - containerRect.top;
      break;

    case 'left-top':
      pos.left = scrollLeft + rect.left - containerRect.left;
      pos.top = scrollTop + rect.top - containerRect.top;
      break;

    case 'left':
      pos.left = scrollLeft + rect.left - containerRect.left;
      pos.top = scrollTop + rect.top - containerRect.top + rect.height / 2;
      break;

    case 'left-bottom':
      pos.left = scrollLeft + rect.left - containerRect.left;
      pos.top = scrollTop + rect.bottom - containerRect.bottom;
      break;

    case 'right-top':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width;
      pos.top = scrollTop + rect.top - containerRect.top;
      break;

    case 'right':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width;
      pos.top = scrollTop + rect.top - containerRect.top + rect.height / 2;
      break;

    case 'right-bottom':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width;
      pos.top = scrollTop + rect.bottom - containerRect.bottom;
      break;

    case 'bottom-left':
      pos.left = scrollLeft + rect.left - containerRect.left;
      pos.top = scrollTop + rect.top - containerRect.top + rect.height;
      break;

    case 'bottom':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width / 2;
      pos.top = scrollTop + rect.top - containerRect.top + rect.height;
      break;

    case 'bottom-right':
      pos.right = (containerRect.right || docSize.width) - rect.right - scrollLeft;
      pos.top = scrollTop + rect.top - containerRect.top + rect.height;
      break;

    case 'cover':
      pos.left = scrollLeft + rect.left - containerRect.left;
      pos.top = scrollTop + rect.top - containerRect.top;
      break;

    default:
  }

  return posKeys.reduce(function (data, key) {
    var _objectSpread2;

    return _objectSpread({}, data, (_objectSpread2 = {}, _objectSpread2[key] = typeof pos[key] === 'number' ? Math.round(pos[key]) + "px" : 'auto', _objectSpread2));
  }, {});
};