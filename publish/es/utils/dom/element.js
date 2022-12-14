import React from 'react';
import { throttle } from '../func';

if (Element && !Element.prototype.matches) {
  var proto = Element.prototype;
  proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
}

export function getParent(el, target) {
  if (!target) {
    return null;
  }

  var temp = el;

  while (temp) {
    if (typeof target === 'string') {
      if (temp.matches && temp.matches(target)) {
        return temp;
      }
    } else if (temp === target) {
      return temp;
    }

    temp = temp.parentElement;
  }

  return null;
}

var isTwoCNChar = function isTwoCNChar(str) {
  return /^[\u4e00-\u9fa5]{2}$/.test(str);
};

var SPACE = ' ';
export function wrapSpan(children, insertSpace) {
  if (insertSpace === void 0) {
    insertSpace = false;
  }

  if (!children) return children;
  return React.Children.map(children, function (item) {
    if (typeof item === 'string') {
      if (insertSpace && isTwoCNChar(item)) return React.createElement("span", null, item.split('').join(SPACE));
      return React.createElement("span", null, item);
    }

    return item;
  });
}
export function dispatchEvent(form, name, detail) {
  if (!form) return;
  var event;

  if (CustomEvent) {
    event = new CustomEvent(name, {
      bubbles: false,
      cancelable: true,
      detail: detail
    });
  } else {
    event = document.createEvent('HTMLEvents');
    event.initEvent(name, true, true);
  }

  form.dispatchEvent(event);
}
export function cssSupport(attr, value) {
  var element = document.createElement('div');

  if (attr in element.style) {
    element.style[attr] = value;
    return element.style[attr] === value;
  }

  return false;
}
export function copyBoundingClientRect(el) {
  if (!el) return null;
  var rect = el.getBoundingClientRect();
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y
  };
}
export function getCursorOffset(length) {
  if (window.getSelection) {
    return window.getSelection().anchorOffset;
  }

  if (document.selection) {
    var range = document.selection.createRange();
    range.moveStart('character', -length);
    return range.text.length;
  }

  return null;
}

function end(element) {
  if (!element) return;
  element.focus();

  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    element.selectionStart = -1;
    return;
  }

  if (window.getSelection) {
    var range = window.getSelection();
    range.selectAllChildren(element);
    range.collapseToEnd();
  } else if (document.selection) {
    var _range = document.selection.createRange();

    _range.moveToElementText(element);

    _range.collapse(false);

    _range.select();
  }
}

function select(element) {
  if (element && element.innerText && element.innerText.length === 0) {
    element.focus();
    return;
  }

  if (window.getSelection && document.createRange) {
    if (element) element.focus();
    var range = document.createRange();
    if (element) range.selectNodeContents(element);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (document.selection) {
    var _range2 = document.selection.createRange();

    _range2.moveToElementText(element);

    _range2.select();
  }
}

export var focusElement = {
  select: select,
  end: end,
  wrapSpan: wrapSpan,
  copyBoundingClientRect: copyBoundingClientRect
};
export var preventPasteFile = function preventPasteFile(e, beforeHandler, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$noLineBreak = _ref.noLineBreak,
      noLineBreak = _ref$noLineBreak === void 0 ? true : _ref$noLineBreak,
      _ref$convertBr = _ref.convertBr,
      convertBr = _ref$convertBr === void 0 ? ' ' : _ref$convertBr;

  var text = (e.clipboardData || window.clipboardData).getData('text/plain'); // 删除复制的换行符号

  if (noLineBreak && text) {
    if (typeof convertBr === 'function') {
      text = convertBr(text).replace(/([\t\n\f\r\v])+/g, ' ');
    } else {
      text = text.replace(/([\t\n\f\r\v])+/g, convertBr);
    }
  }

  e.preventDefault();

  if (beforeHandler) {
    beforeHandler(text);
  }

  document.execCommand('insertText', false, text);
};
export var parsePxToNumber = function parsePxToNumber(str) {
  return Number(str.replace(/\s+|px/gi, ''));
};
export var addResizeObserver = function addResizeObserver(el, handler, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      direction = _options.direction,
      timer = _options.timer;

  var _throttle = throttle(handler, timer),
      throttleHandler = _throttle[0],
      cleanTimer = _throttle[1];

  var h = throttleHandler;
  var lastWidth;
  var lastHeight;

  if (window.ResizeObserver) {
    if (direction) {
      lastWidth = el.clientWidth;
      lastHeight = el.clientHeight;

      h = function h(entry) {
        var _entry$0$contentRect = entry[0].contentRect,
            width = _entry$0$contentRect.width,
            height = _entry$0$contentRect.height;

        if (width && direction === 'x') {
          if (lastWidth !== width) {
            throttleHandler(entry);
          }
        } else if (direction === 'y') {
          if (height && lastHeight !== height) {
            throttleHandler(entry);
          }
        } else if (width && height) {
          throttleHandler(entry, {
            x: lastWidth !== width,
            y: lastHeight !== height
          });
        }

        lastWidth = width;
        lastHeight = height;
      };
    }

    var observer = new ResizeObserver(h);
    observer.observe(el);
    return function () {
      observer.disconnect();
      cleanTimer();
      observer = null;
    };
  }

  window.addEventListener('resize', throttleHandler);
  return function () {
    window.removeEventListener('resize', handler);
    cleanTimer();
  };
};