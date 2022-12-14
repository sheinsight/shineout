import deepEqual from 'deep-eql';
var hasOwnProperty = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } // eslint-disable-next-line


  return x !== x && y !== y;
}

function getOption(options, key) {
  if (!options[key]) return [];
  var val = options[key];
  return Array.isArray(val) ? val : [val];
}

export function compareColumns(columns1, columns2) {
  if (!columns1 || !columns2) return true;
  if (columns1.length !== columns2.length) return false;
  var simpleCompare = columns1.every(function (c, i) {
    return c.width === columns2[i].width || Number.isNaN(c.width) && Number.isNaN(columns2[i].width);
  });
  if (!simpleCompare) return false;
  var complexCompare = columns1.every(function (c, i) {
    if (Array.isArray(c.group) && Array.isArray(columns2[i].group)) return c.group.every(function (d, index) {
      return d === columns2[i].group[index];
    });
    return c.group === columns2[i].group;
  });
  return complexCompare;
}
export default function (objA, objB, options) {
  if (options === void 0) {
    options = {};
  }

  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  var skip = getOption(options, 'skip');
  var deep = getOption(options, 'deep');

  if (keysA.length !== keysB.length) {
    return false;
  }

  keysA.sort(function (a, b) {
    return deep.indexOf(a) - deep.indexOf(b);
  }); // Test for A's keys different from B.

  for (var i = 0; i < keysA.length; i++) {
    var k = keysA[i];
    if (skip.includes(k)) continue;

    if (!hasOwnProperty.call(objB, k) || !is(objA[k], objB[k])) {
      if (objA[k] instanceof Error && objB[k] instanceof Error) {
        if (objA[k].message !== objB[k].message) return false;
        continue;
      }

      if (deep.includes(k)) {
        if (!deepEqual(objA[k], objB[k])) return false;
      } else {
        return false;
      }
    }
  }

  return true;
}