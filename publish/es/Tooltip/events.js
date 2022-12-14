import classnames from 'classnames';
import ReactDOM from 'react-dom';
import { tooltipClass } from './styles';
import getCommonContainer from '../utils/dom/popContainer';
var div = document.createElement('div');
var timer;
div.style.display = 'none';
getCommonContainer().appendChild(div);
var arrow = document.createElement('div');
arrow.className = tooltipClass('arrow');
div.appendChild(arrow);
var inner = document.createElement('div');
inner.className = tooltipClass('inner');
div.appendChild(inner);
var currentId;
export function hide() {
  if (timer) clearTimeout(timer);
  div.style.display = 'none';
  div.className = '';
  currentId = undefined;
}

function clickaway() {
  hide();
  document.removeEventListener('click', clickaway);
}

export function show(props, id, innerStyle) {
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
  var className = tooltipClass('_', 'in', position, animation && 'animation'); // fix safari

  timer = setTimeout(function () {
    div.style.display = 'block';
    div.className = classnames(className, cn);
  }, 0);
  ReactDOM.render(tip, inner);
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