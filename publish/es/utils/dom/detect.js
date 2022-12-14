export var TRANSFORMS = {
  webkitTransform: '-webkit-transform',
  OTransform: '-o-transform',
  msTransform: '-ms-transform',
  MozTransform: '-moz-transform',
  transform: 'transform'
};
var transform = 'transform';
export function getTransformName() {
  return transform;
}
export function has3d() {
  if (!window.getComputedStyle) {
    return false;
  }

  var el = document.createElement('p');
  var result; // Add it to the body to get the computed style.

  document.body.insertBefore(el, null);
  Object.keys(TRANSFORMS).forEach(function (t) {
    if (el.style[t] !== undefined) {
      el.style[t] = 'translate3d(1px,1px,1px)';
      transform = t;
      result = window.getComputedStyle(el).getPropertyValue(TRANSFORMS[t]);
    }
  });
  document.body.removeChild(el);
  return result !== undefined && result.length > 0 && result !== 'none';
}
/* eslint-disable */
// check support passive

var supportsPassive = false;

try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('test', null, opts);
} catch (e) {}
/* eslint-enable */


export var eventPassive = supportsPassive ? {
  passive: true
} : false;