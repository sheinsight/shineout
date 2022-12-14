"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getGrid = getGrid;

var _config = _interopRequireDefault(require("../config"));

var CACHES = {};
var RESPONSIVE = {
  sm: '568',
  md: '768',
  lg: '992',
  xl: '1200'
};
var GridClassName = _config.default.prefix + "-grid";
var GridFullClassName = _config.default.prefix + "-grid-full";
var defaultResponsive = 'md';

function createStyle(text, id) {
  var style = document.head.querySelector("#" + id);

  if (style) {
    return;
  }

  style = document.createElement('style');
  style.type = 'text/css';
  style.id = id;
  style.innerHTML = text;
  document.head.appendChild(style);
}

function generateGrid(width, className, responsive) {
  var minWidth = RESPONSIVE[responsive];
  var text = "@media screen and (min-width: " + minWidth + "px) { ." + className + "{width: " + width + "%} }";
  createStyle(text, className);
}

function generateOffset(width, className, responsive) {
  var minWidth = RESPONSIVE[responsive];
  var text = "@media screen and (min-width: " + minWidth + "px) { ." + className + "{margin-left: " + width + "%} }";
  createStyle(text, className);
}

function generate(w, type, res) {
  var width = w;
  var responsive = res || defaultResponsive;

  if (!width || width <= 0) {
    return '';
  }

  if (width > 1) {
    width = 1;
  }

  width = (width * 100).toFixed(4);
  width = width.substr(0, width.length - 1);
  var className = _config.default.prefix + "-" + type + "-" + responsive + "-" + width.replace('.', '-');

  if (!CACHES[className]) {
    if (type === 'grid') {
      generateGrid(width, className, responsive);
    } else {
      generateOffset(width, className, responsive);
    }

    CACHES[className] = true;
  }

  return className;
}

function getGrid(opt) {
  var options = opt;

  if (!options) {
    return '';
  }

  if (typeof options === 'number') {
    options = {
      width: options
    };
  }

  var _options = options,
      width = _options.width,
      offset = _options.offset,
      responsive = _options.responsive;
  var gridClass = generate(width, 'grid', responsive);
  var offsetClass = generate(offset, 'offset', responsive);
  return GridClassName + " " + GridFullClassName + " " + gridClass + " " + offsetClass;
}

function init() {
  var text = [];
  text.push("\n." + GridClassName + " {\n  position: relative;\n  display: inline-block;\n  zoom: 1;\n  letter-spacing: normal;\n  word-spacing: normal;\n  vertical-align: top;\n  text-rendering: auto;\n  box-sizing: border-box;\n}");
  text.push("." + GridFullClassName + "{width:100%}");
  createStyle(text.join(''), GridClassName);
}

init();