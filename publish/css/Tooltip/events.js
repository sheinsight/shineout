"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.hide = hide;
exports.show = show;
exports.move = move;
exports.isCurrent = isCurrent;

var _classnames = _interopRequireDefault(require("classnames"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _styles = require("./styles");

var _popContainer = _interopRequireDefault(require("../utils/dom/popContainer"));

var div = document.createElement('div');
var timer;
div.style.display = 'none';
(0, _popContainer.default)().appendChild(div);
var arrow = document.createElement('div');
arrow.className = (0, _styles.tooltipClass)('arrow');
div.appendChild(arrow);
var inner = document.createElement('div');
inner.className = (0, _styles.tooltipClass)('inner');
div.appendChild(inner);
var currentId;

function hide() {
  if (timer) clearTimeout(timer);
  div.style.display = 'none';
  div.className = '';
  currentId = undefined;
}

function clickaway() {
  hide();
  document.removeEventListener('click', clickaway);
}

function show(props, id, innerStyle) {
  var position = props.position,
      style = props.style,
      tip = props.tip,
      trigger = props.trigger,
      animation = props.animation,
      cn = props.className;
  currentId = id;
  div.style.cssText = 'display: none';
  Object.keys(style).forEach(function (k) {
    div.style[k] = style[k];
  });
  var className = (0, _styles.tooltipClass)('_', 'in', position, animation && 'animation'); // fix safari

  timer = setTimeout(function () {
    div.style.display = 'block';
    div.className = (0, _classnames.default)(className, cn);
  }, 0);

  _reactDom.default.render(tip, inner);

  inner.setAttribute('style', false);

  if (innerStyle) {
    Object.keys(innerStyle).forEach(function (k) {
      inner.style[k] = typeof innerStyle[k] === 'number' ? innerStyle[k] + "px" : innerStyle[k];
    });
  }

  if (trigger === 'click') {
    document.addEventListener('click', clickaway);
  }
}

function move(id, pos) {
  if (id === currentId) {
    // eslint-disable-next-line no-return-assign
    Object.keys(pos).map(function (key) {
      return div.style[key] = pos[key];
    });
  }
}

function isCurrent(id) {
  return id === currentId;
}