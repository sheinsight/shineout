"use strict";

exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.docSize = exports.docScroll = void 0;
var docScroll = {
  get top() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  },

  get left() {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
  },

  set top(value) {
    document.documentElement.scrollTop = value;
    document.body.scrollTop = value;
  },

  set left(value) {
    document.documentElement.scrollLeft = value;
    document.body.scrollLeft = value;
  }

};
exports.docScroll = docScroll;
var docSize = {
  get width() {
    return document.documentElement.clientWidth || document.body.clientWidth;
  },

  get height() {
    return document.documentElement.clientHeight || document.body.clientHeight;
  }

};
exports.docSize = docSize;

function addEventListener(target, eventType, cb, option) {
  if (target.addEventListener) {
    target.addEventListener(eventType, cb, option);
  }

  return {
    remove: function remove() {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, cb);
      }
    }
  };
}