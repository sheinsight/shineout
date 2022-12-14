"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.hide = hide;
exports.show = show;
exports.move = move;
exports.isCurrent = isCurrent;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _popContainer = _interopRequireDefault(require("../utils/dom/popContainer"));

var _styles = require("./styles");

var currentProps = null;
var div = document.createElement('div');
div.style.display = 'none';
(0, _popContainer.default)().appendChild(div);
var arrow = document.createElement('div');
arrow.className = (0, _styles.popoverClass)('arrow');
div.appendChild(arrow);
var inner = document.createElement('div');
inner.className = (0, _styles.popoverClass)('content');
div.appendChild(inner);
var timer = null;
var currentId;

function hide(delay) {
  if (delay === void 0) {
    delay = 500;
  }

  timer = setTimeout(function () {
    div.style.display = 'none';
    div.className = '';
    currentId = undefined;
  }, delay);
}

var hide0 = hide.bind(null, 0);

function clickaway(e) {
  if (div.contains(e.target)) return;
  hide(0);
  document.removeEventListener('click', clickaway);
}

div.addEventListener('mouseenter', function () {
  if (!timer) return;
  clearTimeout(timer);
  document.addEventListener('click', clickaway);
});
div.addEventListener('mouseleave', function () {
  clearTimeout(timer);
  if (currentProps && currentProps.trigger === 'click') return;
  hide();
});

function show(props, id) {
  var position = props.position,
      style = props.style,
      content = props.content,
      background = props.background,
      border = props.border,
      noArrow = props.noArrow,
      type = props.type;
  currentProps = props; // set current id

  currentId = id;
  if (timer) clearTimeout(timer);
  div.style.cssText = 'display: none';
  Object.keys(style).forEach(function (k) {
    div.style[k] = style[k];
  });
  if (style.right) div.setAttribute('raw-right', style.right);
  if (style.left) div.setAttribute('raw-left', style.left);
  div.setAttribute('raw-top', style.top);
  div.style.background = background || '';
  inner.style.background = background || '';
  arrow.style.background = background || '';
  div.style.borderColor = border || '';
  arrow.style.borderColor = border || '';
  var className = (0, _styles.popoverClass)('_', position, type);
  arrow.style.display = noArrow ? 'none' : 'block'; // fix safari

  setTimeout(function () {
    div.style.display = 'block';
    div.className = className;
  }, 0);
  var newContent = typeof content === 'function' ? content(hide0) : content;
  if (typeof newContent === 'string') newContent = _react.default.createElement("span", {
    className: (0, _styles.popoverClass)('text')
  }, newContent);

  _reactDom.default.render(newContent, inner);

  document.addEventListener('click', clickaway);
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