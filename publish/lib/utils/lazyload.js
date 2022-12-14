"use strict";

exports.__esModule = true;
exports.dispatch = dispatch;
exports.removeStack = removeStack;
exports.addStack = addStack;
exports.throttleWrapper = throttleWrapper;

var _detect = require("./dom/detect");

var _uid = require("./uid");

var _document = require("./dom/document");

var throttle = 80;
var components = {};
var timeout = null;
var isLock = false;
var winHeight = _document.docSize.height;

var getRect = function getRect(el) {
  // document or invalid element
  if (!el || !el.getBoundingClientRect) {
    if (el) console.error("the " + el + " is not a element");
    return {
      top: 0,
      bottom: winHeight
    };
  }

  return el.getBoundingClientRect();
};

function dispatch() {
  if (isLock) return;
  isLock = true; // handle

  Object.keys(components).forEach(function (k) {
    var _components$k = components[k],
        element = _components$k.element,
        render = _components$k.render,
        container = _components$k.container,
        offset = _components$k.offset,
        noRemove = _components$k.noRemove;
    var rect = element.getBoundingClientRect();
    var containerRect = getRect(container);
    if (rect.bottom + offset < containerRect.top || rect.top - offset > containerRect.bottom) return;
    if (!noRemove) delete components[k];
    render();
  });
  isLock = false;
}

var handleScroll = function handleScroll() {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(function () {
    dispatch();
    timeout = null;
  }, throttle);
};

function removeStack(id, removeListener) {
  if (!id || !components[id]) return;
  var _components$id = components[id],
      observer = _components$id.observer,
      container = _components$id.container;
  var scrollEl = container || document;

  if (window.IntersectionObserver) {
    if (observer && observer.disconnect) observer.disconnect();
  } else if (removeListener) {
    scrollEl.removeEventListener('scroll', handleScroll);
  }

  delete components[id];
}

function getObserver(obj, id) {
  var _obj$container = obj.container,
      container = _obj$container === void 0 ? null : _obj$container,
      offset = obj.offset,
      render = obj.render,
      noRemove = obj.noRemove;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting || en.intersectionRatio > 0) {
        render();
        if (!noRemove) removeStack(id);
      }
    });
  }, {
    root: container,
    rootMargin: offset + "px"
  });
  obj.observer = observer;
  return observer;
}

function addStack(obj) {
  var id = (0, _uid.getUidStr)();
  var scrollEl = obj.container || document;
  obj.offset = obj.offset || 0;

  if (window.IntersectionObserver) {
    components[id] = obj;
    var observer = getObserver(obj, id);
    observer.observe(obj.element);
    return id;
  }

  scrollEl.addEventListener('scroll', handleScroll, _detect.eventPassive);
  var rect = obj.element.getBoundingClientRect();
  var containerRect = getRect(obj.container);

  if (rect.bottom + obj.offset < containerRect.top || rect.top - obj.offset > containerRect.bottom) {
    components[id] = obj;
    return id;
  }

  obj.render();

  if (obj.noRemove) {
    components[id] = obj;
    return id;
  }

  return null;
}

function throttleWrapper(cb) {
  var _this = this;

  var timer = null;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var ctx = _this;

    if (!timer) {
      timer = setTimeout(function () {
        cb.apply(ctx, args);
        timer = null;
      }, throttle);
    }
  };
}