"use strict";

exports.__esModule = true;
exports.hexToRgb = hexToRgb;
exports.hslToRgb = hslToRgb;
exports.hexToHsl = hexToHsl;
exports.hslToHex = hslToHex;
exports.judgeDark = judgeDark;
exports.isDark = isDark;
exports.isLight = isLight;
exports.darken = darken;
exports.fade = fade;
exports.rgbTohsl = exports.rgbToHex = void 0;

var _is = require("./is");

var CSS_INTEGER = '[-\\+]?\\d+%?'; // <http://www.w3.org/TR/css3-values/#number-value>

var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var floor = Math.floor; // all color RegExp

var MATCH = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};

function parseIntFromHex(val) {
  return parseInt(val, 16);
}

function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
} // string to rgba {}


var parse = function parse(color) {
  color = color.toLowerCase();
  var match;

  if (match = MATCH.rgb.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3]
    };
  }

  if (match = MATCH.rgba.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4]
    };
  }

  if (match = MATCH.hex8.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4])
    };
  }

  if (match = MATCH.hex6.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3])
    };
  }

  if (match = MATCH.hex4.exec(color)) {
    return {
      r: parseIntFromHex("" + match[1] + match[1]),
      g: parseIntFromHex("" + match[2] + match[2]),
      b: parseIntFromHex("" + match[3] + match[3]),
      a: convertHexToDecimal("" + match[4] + match[4])
    };
  }

  if (match = MATCH.hex3.exec(color)) {
    return {
      r: parseIntFromHex("" + match[1] + match[1]),
      g: parseIntFromHex("" + match[2] + match[2]),
      b: parseIntFromHex("" + match[3] + match[3])
    };
  }

  return false;
};

var toRGB = function toRGB(input) {
  if (!input || typeof input !== 'string') return '';
  var color = parse(input);
  if (!color) return '';
  return color.a ? "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")" : "rgb(" + color.r + "," + color.g + "," + color.b + ")";
};

var isString = function isString(string) {
  if (!string) {
    console.error(new Error('the color is empty'));
    return false;
  }

  if (typeof string !== 'string') {
    console.error(new Error("the color is get a " + typeof string + ", expect string"));
    return false;
  }

  return true;
};

var dealPointZero = function dealPointZero(string) {
  var num = string.toFixed(1);
  var reg = /\.0*$/;
  if (reg.test(num)) return floor(num);
  return num;
};
/**
 * parse Hex to int
 * @param {*} value Hex number
 */


var parseHex = function parseHex(value) {
  return parseInt(value, 16);
};
/**
 * format the hex array
 * @param {Array} array hex array
 */


var formatHexArray = function formatHexArray(array, length) {
  if (length === 6) return ["" + array[1], "" + array[2], "" + array[3]];
  if (length === 3) return ["" + array[1] + array[1], "" + array[2] + array[2], "" + array[3] + array[3]];
  if (length === 8) return ["" + array[1], "" + array[2], "" + array[3], "" + array[4]];
  return ["" + array[1] + array[1], "" + array[2] + array[2], "" + array[3] + array[3], "" + array[4] + array[4]];
};

var getRgb = function getRgb(arr, length) {
  var array = formatHexArray(arr, length);
  return "rgb(" + parseHex(array[0]) + ", " + parseHex(array[1]) + ", " + parseHex(array[2]) + ")";
};

var getRgba = function getRgba(arr, length) {
  var array = formatHexArray(arr, length);
  return "rgba(" + parseHex(array[0]) + ", " + parseHex(array[1]) + ", " + parseHex(array[2]) + ", " + dealPointZero(parseHex(array[3]) / 255) + ")";
};

var toBound01 = function toBound01(val, max) {
  if ((0, _is.isOne)(val)) {
    val = '100%';
  }

  var processPercent = (0, _is.isPercent)(val);
  val = Math.min(max, Math.max(0, parseInt(val, 10))); // Automatically convert percentage into number

  if (processPercent) {
    val = parseInt(val * max, 10) / 100;
  } // Handle floating point rounding errors


  if (Math.abs(val - max) < 0.000001) {
    return 1;
  } // Convert into [0, 1] range if it isn't already


  return val % max / parseInt(max, 10);
};

var hueToRgb = function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

var translateHsl = function translateHsl(matchs, a) {
  var h = matchs[1],
      s = matchs[2],
      l = matchs[3];
  var r;
  var g;
  var b;
  h = toBound01(h, 360);
  s = toBound01(s, 100);
  l = toBound01(l, 100);

  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  r = floor(r * 255);
  g = floor(g * 255);
  b = floor(b * 255);
  return a ? "rgba(" + r + ", " + g + ", " + b + ", " + a + ")" : "rgb(" + r + ", " + g + ", " + b + ")";
};

var isDarkRgb = function isDarkRgb(color) {
  var matchs = MATCH.rgb.exec(color) || MATCH.rgba.exec(color);

  if (matchs) {
    var r = matchs[1],
        g = matchs[2],
        b = matchs[3];
    return r * 0.299 + g * 0.578 + b * 0.114 < 192;
  }

  console.error(new Error("the string '" + color + "' is not a legal color"));
  return undefined;
};

var toHex = function toHex(rgb, noAlpha, a) {
  var r = rgb[1],
      g = rgb[2],
      b = rgb[3];
  var o;
  var calAlhpa = !noAlpha && a;
  r = floor(r).toString(16);
  g = floor(g).toString(16);
  b = floor(b).toString(16);
  if (r.length !== 2) r = "0" + r;
  if (g.length !== 2) g = "0" + g;
  if (b.length !== 2) b = "0" + b;
  if (calAlhpa) o = floor(a * 255).toString(16);
  return calAlhpa ? "#" + r + g + b + o : "#" + r + g + b;
}; // third parameter, to keep same with toHex


var toHsl = function toHsl(rgb, _, a) {
  var r = rgb[1],
      g = rgb[2],
      b = rgb[3];
  r = toBound01(r, 255);
  g = toBound01(g, 255);
  b = toBound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h;
  var s;
  var l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;

      default:
        break;
    }

    h /= 6;
  }

  h = floor(h * 360);
  s = floor(s * 100);
  l = floor(l * 100);
  return a ? "hsla(" + h + ", " + s + ", " + l + ", " + a + ")" : "hsl(" + h + ", " + s + ", " + l + ")";
};

var rgbTranlate = function rgbTranlate(target) {
  return function (rgb, noAlpha) {
    if (!isString(rgb)) return '';
    var matchs;
    matchs = MATCH.rgb.exec(rgb);

    if (matchs) {
      return target(matchs, noAlpha);
    }

    matchs = MATCH.rgba.exec(rgb);

    if (matchs) {
      return target(matchs, noAlpha, matchs[4]);
    }

    console.error(new Error("the string '" + rgb + "' is not a rgb color"));
    return '';
  };
};

function hexToRgb(hex) {
  if (!isString(hex)) return '';
  var matchs;
  matchs = MATCH.hex3.exec(hex);

  if (matchs) {
    return getRgb(matchs, 3);
  }

  matchs = MATCH.hex6.exec(hex);

  if (matchs) {
    return getRgb(matchs, 6);
  }

  matchs = MATCH.hex4.exec(hex);

  if (matchs) {
    return getRgba(matchs, 4);
  }

  matchs = MATCH.hex8.exec(hex);

  if (matchs) {
    return getRgba(matchs, 8);
  }

  console.error(new Error("the string '" + hex + "' is not a hex color"));
  return '';
}

function hslToRgb(hsl) {
  if (!isString(hsl)) return '';
  var matchs;
  matchs = MATCH.hsl.exec(hsl);

  if (matchs) {
    return translateHsl(matchs);
  }

  matchs = MATCH.hsla.exec(hsl);

  if (matchs) {
    return translateHsl(matchs, matchs[4]);
  }

  console.error(new Error("the string '" + hsl + "' is not a hsl color"));
  return '';
}

var rgbToHex = rgbTranlate(toHex);
exports.rgbToHex = rgbToHex;
var rgbTohsl = rgbTranlate(toHsl);
exports.rgbTohsl = rgbTohsl;

function hexToHsl(hex) {
  var temp = hexToRgb(hex);
  if (!temp) return '';
  return rgbTohsl(temp);
}

function hslToHex(hsl, noAlpha) {
  var temp = hslToRgb(hsl);
  if (!temp) return '';
  return rgbToHex(temp, noAlpha);
} // dark or light


function judgeDark(color) {
  if (!isString(color)) return undefined;
  var rgbString = color;

  if (MATCH.hsl.test(color) || MATCH.hsla.test(color)) {
    rgbString = hslToRgb(color);
  }

  if (MATCH.hex3.test(color) || MATCH.hex4.test(color) || MATCH.hex6.test(color) || MATCH.hex8.test(color)) {
    rgbString = hexToRgb(color);
  }

  return isDarkRgb(rgbString);
}

function isDark(color) {
  var result = judgeDark(color);
  if (result === undefined) return false;
  return result;
}

function isLight(color) {
  var result = judgeDark(color);
  if (result === undefined) return false;
  return !result;
}
/**
 * get hsla h s l a
 * @param color hsl
 */


function getHSLA(color) {
  var hslReg = new RegExp(/hsla?\((\d{1,3}), (\d{1,3}), (\d{1,3})(, (\d{1,3}))?\)$/);
  hslReg.test(color);
  var h = RegExp.$1;
  var s = RegExp.$2;
  var l = RegExp.$3;
  var a = RegExp.$5.length ? RegExp.$5 : 1;
  return {
    h: h,
    s: s,
    l: parseInt(l, 10),
    a: a
  };
}
/**
 * darken color
 * @param color format rgb | rgba
 * @param value -100 ~ 100
 */


function darken(color, value) {
  if (!color) return '';
  if (!value) value = 0;
  value = parseInt(value, 10);
  color = toRGB(color);
  var hsl = rgbTohsl(color);

  var _getHSLA = getHSLA(hsl),
      h = _getHSLA.h,
      s = _getHSLA.s,
      l = _getHSLA.l,
      a = _getHSLA.a;

  return hslToRgb("hsla(" + h + "," + s + "%," + (l - value) + "%," + a + ")");
}
/**
 * fade color
 * @param color format rgb
 * @param alpha 0-1
 */


function fade(color, alpha) {
  if (alpha === void 0) {
    alpha = 1;
  }

  if (!color) return '';
  color = toRGB(color);
  var hsl = rgbTohsl(color);

  var _getHSLA2 = getHSLA(hsl),
      h = _getHSLA2.h,
      s = _getHSLA2.s,
      l = _getHSLA2.l;

  return hslToRgb("hsla(" + h + "," + s + "%," + l + "%," + alpha + ")");
}