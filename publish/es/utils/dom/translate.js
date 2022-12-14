import { has3d, getTransformName } from './detect';
import { isRTL } from '../../config';
var use3d;

var getDirectionX = function getDirectionX(x) {
  var xs = String(x);
  var num = Number.parseFloat(xs);
  var numStr = String(num);
  var start = xs.indexOf(numStr) + numStr.length;
  var u = xs.slice(start);
  var result = String((isRTL() ? -1 : 1) * num) + u;
  return result;
};

export function setTranslate(el, x, y) {
  var tn = getTransformName();
  el.style[tn] = "translate(" + getDirectionX(x) + "," + y + ")";
}
export function setTranslate3D(el, x, y) {
  if (use3d === undefined) use3d = has3d();
  var tn = getTransformName();
  var xd = getDirectionX(x);

  if (use3d) {
    el.style[tn] = "translate3d(" + xd + "," + y + ",0)";
  } else {
    el.style[tn] = "translate(" + xd + "," + y + ")";
  }
}