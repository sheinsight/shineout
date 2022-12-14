"use strict";

exports.__esModule = true;
exports.getUid = getUid;
exports.getUidStr = getUidStr;
exports.getKey = getKey;
exports.defer = void 0;
var uid = Date.now();

function getUid() {
  uid += 1;
  return uid;
}

function getUidStr() {
  return getUid().toString(36);
}

function $getKey(d, gen, index) {
  if (gen === true) return d;
  if (typeof gen === 'string') return d[gen];
  if (typeof gen === 'function') return gen(d, index);
  return index;
}

function getKey() {
  var key = $getKey.apply(void 0, arguments);

  if (typeof key !== 'string' && typeof key !== 'number') {
    console.error(new Error("keygen result expect a string or a number, get '" + typeof key + "'"));
  }

  return key;
}

var defer = typeof Promise === 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
exports.defer = defer;