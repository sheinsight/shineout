import _objectSpread from "@babel/runtime/helpers/objectSpread";
// https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
import { isEmpty, isObject } from './is';
import { deepClone } from './clone';
export function insertPoint(name) {
  var reg = /(\[\d+\])/gi;
  return name.replace(reg, function (s, m, i) {
    return s.replace(m, i === 0 ? m : "." + m);
  });
}
export function flatten(data, skipArray) {
  if (isEmpty(data)) return data;
  var result = {};

  function recurse(cur, prop) {
    if (Object(cur) !== cur || typeof cur === 'function' || cur instanceof Date || cur instanceof Error || skipArray && Array.isArray(cur)) {
      if (!(cur === undefined && /\[\d+\]$/.test(prop))) {
        result[prop] = cur;
      }
    } else if (Array.isArray(cur)) {
      if (cur.length === 0) {
        result[prop] = [];
      } else {
        for (var i = 0, l = cur.length; i < l; i++) {
          recurse(cur[i], prop ? prop + "[" + i + "]" : "[" + i + "]");
        }
      }
    } else {
      var empty = true; // eslint-disable-next-line

      for (var p in cur) {
        empty = false;
        recurse(cur[p], prop ? prop + "." + p : p);
      }

      if (empty) {
        result[prop] = {};
      }
    }
  }

  recurse(data, '');
  return result;
}
export function unflatten(rawdata) {
  if (Object(rawdata) !== rawdata || isEmpty(rawdata) || Array.isArray(rawdata)) {
    return rawdata;
  }

  var data = _objectSpread({}, rawdata);

  var result = {};
  var _ref = {},
      cur = _ref.cur,
      prop = _ref.prop,
      idx = _ref.idx,
      last = _ref.last,
      temp = _ref.temp,
      match = _ref.match; // eslint-disable-next-line

  Object.keys(data).sort().forEach(function (p) {
    var pathWithPoint = insertPoint(p);
    cur = result;
    prop = '';
    last = 0;

    do {
      idx = pathWithPoint.indexOf('.', last);
      temp = pathWithPoint.substring(last, idx !== -1 ? idx : undefined);
      match = /^\[(\d+)\]$/.exec(temp);
      cur = cur[prop] || (cur[prop] = match ? [] : {});
      prop = match ? match[1] : temp;
      last = idx + 1;
    } while (idx >= 0);

    cur[prop] = deepClone(data[p]);
  });
  return result[''];
}
export function insertValue(obj, name, index, value) {
  var _flatten;

  Object.keys(obj).filter(function (n) {
    return n.indexOf(name + "[") === 0;
  }).sort().reverse().forEach(function (n) {
    // const reg = new RegExp(`${name}\\[(\\d+)\\]`)
    var reg = new RegExp(name.replace(/\[/g, '\\[').replace(/\]/g, '\\]') + "\\[(\\d+)\\]");
    var match = reg.exec(n);
    var i = parseInt(match[1], 10);
    if (i < index) return;
    var newName = n.replace(reg, name + "[" + (i + 1) + "]");
    if (obj[n]) obj[newName] = obj[n];
    delete obj[n];
  });
  var newValue = flatten((_flatten = {}, _flatten[name + "[" + index + "]"] = value, _flatten));
  Object.keys(newValue).forEach(function (k) {
    if (newValue[k] !== undefined) obj[k] = newValue[k];
  });
}
export function spliceValue(obj, name, index) {
  var names = Object.keys(obj).filter(function (n) {
    return n === name || n.indexOf(name + "[") === 0;
  }).sort();
  names.forEach(function (n) {
    if (n === name && !Array.isArray(obj[name])) return;

    if (n === name) {
      obj[name].splice(index, 1);
      return;
    }

    var reg = new RegExp(name.replace(/\[/g, '\\[').replace(/\]/g, '\\]') + "\\[(\\d+)\\]");
    var match = reg.exec(n);
    var i = parseInt(match[1], 10);
    if (i < index) return;

    if (i === index) {
      delete obj[n];
      return;
    }

    var newName = n.replace(reg, name + "[" + (i - 1) + "]");
    obj[newName] = obj[n];
    delete obj[n];
  });
}

var isNameWithPath = function isNameWithPath(name, path) {
  if (name.indexOf(path) !== 0) return false;
  var remain = name.replace(path, '')[0];
  return [undefined, '[', '.'].includes(remain);
};

export var getSthByName = function getSthByName(name, source) {
  if (source === void 0) {
    source = {};
  }

  if (source[name]) return source[name];
  var result = unflatten(source);
  name = insertPoint(name);
  name.split('.').forEach(function (n) {
    var match = /^\[(\d+)\]$/.exec(n); // eslint-disable-next-line

    if (match) n = match[1];
    if (result) result = result[n];else result = undefined;
  }); // get from form-error

  if (!result && isObject(source[''])) result = source[''][name];
  return result;
};
export var removeSthByName = function removeSthByName(name, source) {
  var match = /(.*)\[(\d+)\]$/.exec(name);

  if (match) {
    spliceValue(source, match[1], parseInt(match[2], 10));
  } else {
    Object.keys(source).forEach(function (n) {
      if (isNameWithPath(n, name)) delete source[n];
    });
  }
};
export var flattenArray = function flattenArray(arr1) {
  return arr1.reduce(function (acc, val) {
    return Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val);
  }, []);
};