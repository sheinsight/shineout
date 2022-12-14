var htmlDom;
var lastStyle = null;

var getHtml = function getHtml() {
  if (!htmlDom) htmlDom = document.body.parentElement;
  return htmlDom;
};

var setScrollBehavior = function setScrollBehavior() {
  if (lastStyle !== null) return;
  lastStyle = getHtml().style.overscrollBehaviorX;
  htmlDom.style.overscrollBehaviorX = 'none';
};

var resetScrollBehavior = function resetScrollBehavior() {
  htmlDom.style.overscrollBehaviorX = lastStyle;
  lastStyle = null;
};

export var banOverScrollX = function banOverScrollX(el) {
  el.addEventListener('mouseenter', setScrollBehavior);
  el.addEventListener('mouseleave', resetScrollBehavior);
  return function () {
    el.removeEventListener('mouseenter', setScrollBehavior);
    el.removeEventListener('mouseleave', resetScrollBehavior);
  };
};