"use strict";

exports.__esModule = true;
exports.default = _default;
exports.ERROR = exports.SUCCESS = exports.UPLOADING = void 0;
var UPLOADING = 1;
exports.UPLOADING = UPLOADING;
var SUCCESS = 2;
exports.SUCCESS = SUCCESS;
var ERROR = 3;
exports.ERROR = ERROR;

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();

  if ('withCredentials' in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== 'undefined') {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }

  return xhr;
}

function _default(args) {
  var url = args.url,
      name = args.name,
      cors = args.cors,
      file = args.file,
      onProgress = args.onProgress,
      onLoad = args.onLoad,
      onError = args.onError,
      withCredentials = args.withCredentials,
      _args$params = args.params,
      params = _args$params === void 0 ? {} : _args$params,
      _args$headers = args.headers,
      headers = _args$headers === void 0 ? {} : _args$headers,
      onStart = args.onStart,
      responseType = args.responseType;

  if (!url) {
    console.error(new Error("action is required, but its value is " + url));
    return undefined;
  }

  var data = new FormData();
  Object.keys(params).forEach(function (k) {
    data.append(k, params[k]);
  });
  data.append(name, file);
  var xhr = createCORSRequest('post', url, cors);
  xhr.withCredentials = withCredentials;

  if (responseType) {
    xhr.responseType = responseType;
  }

  if (onProgress) xhr.upload.addEventListener('progress', onProgress, false);

  xhr.onload = function (e) {
    return onLoad(e.currentTarget);
  };

  xhr.onerror = onError;
  Object.keys(headers).forEach(function (k) {
    xhr.setRequestHeader(k, headers[k]);
  });
  if (onStart) onStart(file);
  xhr.send(data);
  return xhr;
}