import React from 'react';
import ReactDOM from 'react-dom';
import getCommonContainer from '../utils/dom/popContainer';
import { popoverClass } from './styles';
var currentProps = null;
var div = document.createElement('div');
div.style.display = 'none';
getCommonContainer().appendChild(div);
var arrow = document.createElement('div');
arrow.className = popoverClass('arrow');
div.appendChild(arrow);
var inner = document.createElement('div');
inner.className = popoverClass('content');
div.appendChild(inner);
var timer = null;
var currentId;
export function hide(delay) {
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
export function show(props, id) {
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
  var className = popoverClass('_', position, type);
  arrow.style.display = noArrow ? 'none' : 'block'; // fix safari

  setTimeout(function () {
    div.style.display = 'block';
    div.className = className;
  }, 0);
  var newContent = typeof content === 'function' ? content(hide0) : content;
  if (typeof newContent === 'string') newContent = React.createElement("span", {
    className: popoverClass('text')
  }, newContent);
  ReactDOM.render(newContent, inner);
  document.addEventListener('click', clickaway);
}
export function move(id, pos) {
  if (id === currentId) {
    // eslint-disable-next-line no-return-assign
    Object.keys(pos).map(function (key) {
      return div.style[key] = pos[key];
    });
  }
}
export function isCurrent(id) {
  return id === currentId;
}