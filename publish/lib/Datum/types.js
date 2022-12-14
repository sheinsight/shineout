"use strict";

exports.__esModule = true;
exports.SUBMIT_TOPIC = exports.IGNORE_BIND = exports.WITH_OUT_DISPATCH = exports.REMOVE_ERROR = exports.ERROR_TYPE = exports.IGNORE_VALIDATE = exports.FORCE_PASS = exports.RESET_TOPIC = exports.VALIDATE_TOPIC = exports.CHANGE_TOPIC = exports.updateSubscribe = exports.errorSubscribe = exports.changeSubscribe = void 0;

// FLow chagne
var changeSubscribe = function changeSubscribe(name) {
  return "__CHANGE_SUBSCRIBE_" + name + "__";
}; // setError


exports.changeSubscribe = changeSubscribe;

var errorSubscribe = function errorSubscribe(name) {
  return "__ERROR_SUBSCRIBE_" + name + "__";
}; // value chagne


exports.errorSubscribe = errorSubscribe;

var updateSubscribe = function updateSubscribe(name) {
  return "__UPDATE_SUBSCRIBE_" + name + "__";
};

exports.updateSubscribe = updateSubscribe;
var CHANGE_TOPIC = '__CHANGE_TOPIC__';
exports.CHANGE_TOPIC = CHANGE_TOPIC;
var VALIDATE_TOPIC = '__VALIDATE_TOPIC__';
exports.VALIDATE_TOPIC = VALIDATE_TOPIC;
var RESET_TOPIC = '__RESET_TOPIC__';
exports.RESET_TOPIC = RESET_TOPIC;
var FORCE_PASS = '__VALIDATE_FORCE_PASS__';
exports.FORCE_PASS = FORCE_PASS;
var IGNORE_VALIDATE = '__IGNORE_VALIDATE__';
exports.IGNORE_VALIDATE = IGNORE_VALIDATE;
var ERROR_TYPE = '__UPDATE_ERROR_TYPE__';
exports.ERROR_TYPE = ERROR_TYPE;
var REMOVE_ERROR = '__REMOVE_ERROR_TYPE__';
exports.REMOVE_ERROR = REMOVE_ERROR;
var WITH_OUT_DISPATCH = '__WITH_OUT_DISPATCH__';
exports.WITH_OUT_DISPATCH = WITH_OUT_DISPATCH;
var IGNORE_BIND = '__IGNORE_BIND__';
exports.IGNORE_BIND = IGNORE_BIND;
var SUBMIT_TOPIC = '__SUBMIT_TOPIC__';
exports.SUBMIT_TOPIC = SUBMIT_TOPIC;