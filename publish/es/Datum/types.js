// FLow chagne
export var changeSubscribe = function changeSubscribe(name) {
  return "__CHANGE_SUBSCRIBE_" + name + "__";
}; // setError

export var errorSubscribe = function errorSubscribe(name) {
  return "__ERROR_SUBSCRIBE_" + name + "__";
}; // value chagne

export var updateSubscribe = function updateSubscribe(name) {
  return "__UPDATE_SUBSCRIBE_" + name + "__";
};
export var CHANGE_TOPIC = '__CHANGE_TOPIC__';
export var VALIDATE_TOPIC = '__VALIDATE_TOPIC__';
export var RESET_TOPIC = '__RESET_TOPIC__';
export var FORCE_PASS = '__VALIDATE_FORCE_PASS__';
export var IGNORE_VALIDATE = '__IGNORE_VALIDATE__';
export var ERROR_TYPE = '__UPDATE_ERROR_TYPE__';
export var REMOVE_ERROR = '__REMOVE_ERROR_TYPE__';
export var WITH_OUT_DISPATCH = '__WITH_OUT_DISPATCH__';
export var IGNORE_BIND = '__IGNORE_BIND__';
export var SUBMIT_TOPIC = '__SUBMIT_TOPIC__';