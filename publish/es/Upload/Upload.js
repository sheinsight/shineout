import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import immer from 'immer';
import Gap from '../Gap';
import { PureComponent } from '../component';
import { getUidStr } from '../utils/uid';
import { FormError } from '../utils/errors';
import { uploadClass } from './styles';
import defaultRequest, { ERROR, UPLOADING } from './request';
import FileInput from './FileInput';
import File from './File';
import ImageFile from './ImageFile';
import Result from './Result';
import ImageResult from './ImageResult';
import { Provider } from './context';
import Drop from './Drop';
import attrAccept from '../utils/accept';
import { isFunc } from '../utils/is';
import { getLocale } from '../locale';
import acceptHOC from './accept';
import getDataset from '../utils/dom/getDataset';
import { isRTL } from '../config';
var VALIDATORITEMS = [{
  key: 'size',
  param: function param(blob) {
    return blob.size;
  }
}, {
  key: 'ext',
  param: function param(blob) {
    var exts = blob.name.split('.');
    return exts[exts.length - 1];
  }
}, {
  key: 'customValidator',
  param: function param(blob) {
    return blob;
  }
}];

var promised = function promised(action) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var res = action.apply(void 0, args);
  if (res && typeof res.then === 'function') return res;
  return new Promise(function (resolve, reject) {
    if (res instanceof Error) reject(res);
    resolve(true);
  });
};

var Upload =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Upload, _PureComponent);

  function Upload(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      files: {},
      recycle: []
    };
    _this.addFile = _this.addFile.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleAddClick = _this.handleAddClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.removeFile = _this.removeFile.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.removeValue = _this.removeValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.recoverValue = _this.recoverValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.validatorHandle = _this.validatorHandle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.useValidator = _this.useValidator.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleFileDrop = _this.handleFileDrop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleReplace = _this.handleReplace.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    props.validateHook(_this.validate.bind(_assertThisInitialized(_assertThisInitialized(_this))));
    return _this;
  }

  var _proto = Upload.prototype;

  _proto.getCanDelete = function getCanDelete(item, index) {
    var canDelete = this.props.canDelete;

    if (isFunc(canDelete)) {
      return canDelete(item, index);
    }

    return canDelete;
  };

  _proto.getAction = function getAction(file) {
    var action = this.props.action;
    if (typeof action === 'string') return action;
    if (typeof action === 'function') return action(file);
    return '';
  };

  _proto.validatorHandle = function validatorHandle(error, file) {
    var vth = this.props.validatorHandle;
    if (typeof vth === 'function') return vth(error, file);
    return vth;
  };

  _proto.bindElement = function bindElement(input) {
    this.input = input;
  };

  _proto.handleAddClick = function handleAddClick() {
    var disabled = this.props.disabled;
    if (disabled) return;
    this.input.click();
  };

  _proto.validate = function validate() {
    var files = this.state.files;
    return new Promise(function (resolve, reject) {
      if (Object.keys(files).length > 0) reject(new FormError(''));
      resolve(true);
    });
  };

  _proto.removeFile = function removeFile(id) {
    var _this$props = this.props,
        beforeCancel = _this$props.beforeCancel,
        onErrorRemove = _this$props.onErrorRemove;
    var file = this.state.files[id];
    if (beforeCancel && isFunc(beforeCancel)) beforeCancel(file);

    if (file) {
      if (file.xhr && file.xhr.abort) file.xhr.abort();
      this.setState(immer(function (draft) {
        delete draft.files[id];
      }), function () {
        if (file.status === ERROR && onErrorRemove) {
          onErrorRemove(file.xhr, file.blob, file);
        }
      });
    }
  };

  _proto.removeValue = function removeValue(index) {
    var _this2 = this;

    var _this$props2 = this.props,
        recoverAble = _this$props2.recoverAble,
        disabled = _this$props2.disabled,
        beforeRemove = _this$props2.beforeRemove;
    if (disabled) return;
    var current = this.props.value[index];
    var startRemove = typeof beforeRemove === 'function' ? beforeRemove(current) : Promise.resolve();
    startRemove.then(function () {
      _this2.setState(immer(function (draft) {
        draft.recycle.push(_this2.props.value[index]);

        if (typeof recoverAble === 'number' && draft.recycle.length > recoverAble) {
          draft.recycle.shift();
        }
      }));

      var value = immer(_this2.props.value, function (draft) {
        draft.splice(index, 1);
      });

      _this2.props.onChange(value);
    }).catch(function () {});
  };

  _proto.recoverValue = function recoverValue(index, value) {
    var disabled = this.props.disabled;
    if (disabled) return;
    this.props.onChange(immer(this.props.value, function (draft) {
      draft.push(value);
    }));
    this.setState(immer(function (draft) {
      draft.recycle.splice(index, 1);
    }));
  };

  _proto.useValidator =
  /*#__PURE__*/
  function () {
    var _useValidator = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(blob) {
      var _this$props3, validator, accept, forceAccept, forceAcceptErrorMsg, files, error, i, acceptRes, item;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props3 = this.props, validator = _this$props3.validator, accept = _this$props3.accept, forceAccept = _this$props3.forceAccept, forceAcceptErrorMsg = _this$props3.forceAcceptErrorMsg;
              files = this.state.files;
              error = null;
              i = 0;

              if (!forceAccept) {
                _context.next = 8;
                break;
              }

              acceptRes = attrAccept(blob, accept);

              if (acceptRes) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", new Error(forceAcceptErrorMsg || getLocale('invalidAccept')));

            case 8:
              if (!VALIDATORITEMS[i]) {
                _context.next = 24;
                break;
              }

              item = VALIDATORITEMS[i];

              if (!(typeof validator[item.key] === 'function')) {
                _context.next = 21;
                break;
              }

              _context.prev = 11;
              _context.next = 14;
              return promised(validator[item.key], item.param(blob), files);

            case 14:
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](11);
              error = _context.t0 instanceof Error ? _context.t0 : new Error(_context.t0);

            case 19:
              if (!(error instanceof Error)) {
                _context.next = 21;
                break;
              }

              return _context.abrupt("return", error);

            case 21:
              i += 1;
              _context.next = 8;
              break;

            case 24:
              return _context.abrupt("return", null);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[11, 16]]);
    }));

    function useValidator(_x) {
      return _useValidator.apply(this, arguments);
    }

    return useValidator;
  }();

  _proto.addFile =
  /*#__PURE__*/
  function () {
    var _addFile = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(e) {
      var _this3 = this;

      var _this$props4, beforeUpload, value, limit, filesFilter, files, finishedCode, fileList, addLength, list, _loop, i, _ret;

      return _regeneratorRuntime.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$props4 = this.props, beforeUpload = _this$props4.beforeUpload, value = _this$props4.value, limit = _this$props4.limit, filesFilter = _this$props4.filesFilter; // eslint-disable-next-line

              files = _objectSpread({}, this.state.files);
              finishedCode = false;
              fileList = e.fromDragger && e.files ? e.files : e.target.files;
              if (filesFilter) fileList = filesFilter(Array.from(fileList)) || [];
              addLength = limit - value.length - Object.keys(this.state.files).length;

              if (!(addLength <= 0)) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return");

            case 8:
              list = Array.from({
                length: Math.min(fileList.length, addLength)
              });
              _loop =
              /*#__PURE__*/
              _regeneratorRuntime.mark(function _loop(i) {
                var blob, id, file, error;
                return _regeneratorRuntime.wrap(function _loop$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        blob = fileList[i];
                        id = getUidStr();
                        file = {
                          name: blob.name,
                          process: -1,
                          status: UPLOADING,
                          blob: blob
                        };
                        files[id] = file; // eslint-disable-next-line no-await-in-loop

                        _context2.next = 6;
                        return _this3.useValidator(blob);

                      case 6:
                        error = _context2.sent;

                        if (!(error instanceof Error)) {
                          _context2.next = 15;
                          break;
                        }

                        if (_this3.validatorHandle(error, file.blob)) {
                          _context2.next = 11;
                          break;
                        }

                        delete files[id];
                        return _context2.abrupt("return", "continue");

                      case 11:
                        file.message = error.message;
                        file.status = ERROR;

                        if (beforeUpload) {
                          beforeUpload(blob, _this3.validatorHandle) // eslint-disable-next-line no-loop-func
                          .then(function (args) {
                            if (finishedCode) {
                              _this3.setState(immer(function (draft) {
                                draft.files[id] = Object.assign({}, draft.files[id], args);
                              }));
                            } else {
                              files[id] = Object.assign({}, files[id], args);
                            }
                          }).catch(function () {
                            return true;
                          });
                        }

                        return _context2.abrupt("return", "continue");

                      case 15:
                        if (beforeUpload) {
                          beforeUpload(blob, _this3.validatorHandle) // eslint-disable-next-line no-loop-func
                          .then(function (args) {
                            if (args.status !== ERROR) files[id].xhr = _this3.uploadFile(id, blob, args.data);

                            if (finishedCode) {
                              _this3.setState(immer(function (draft) {
                                draft.files[id] = Object.assign({}, draft.files[id], args);
                              }));
                            } else {
                              files[id] = Object.assign({}, files[id], args);
                            }
                          }) // eslint-disable-next-line no-loop-func
                          .catch(function () {
                            if (finishedCode) {
                              _this3.setState(immer(function (draft) {
                                delete draft.files[id];
                              }));
                            } else {
                              delete files[id];
                            }
                          });
                        } else {
                          files[id].xhr = _this3.uploadFile(id, blob);
                        }

                      case 16:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _loop, this);
              });
              i = 0;

            case 11:
              if (!(i < list.length)) {
                _context3.next = 19;
                break;
              }

              return _context3.delegateYield(_loop(i), "t0", 13);

            case 13:
              _ret = _context3.t0;

              if (!(_ret === "continue")) {
                _context3.next = 16;
                break;
              }

              return _context3.abrupt("continue", 16);

            case 16:
              i++;
              _context3.next = 11;
              break;

            case 19:
              finishedCode = true;
              this.setState({
                files: files
              });

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2, this);
    }));

    function addFile(_x2) {
      return _addFile.apply(this, arguments);
    }

    return addFile;
  }();

  _proto.uploadFile = function uploadFile(id, file, data) {
    var _this4 = this;

    var _this$props5 = this.props,
        onSuccess = _this$props5.onSuccess,
        name = _this$props5.name,
        htmlName = _this$props5.htmlName,
        cors = _this$props5.cors,
        params = _this$props5.params,
        withCredentials = _this$props5.withCredentials,
        headers = _this$props5.headers,
        request = _this$props5.request,
        _onProgress = _this$props5.onProgress,
        onStart = _this$props5.onStart,
        responseType = _this$props5.responseType;
    var req = request || defaultRequest;
    var throttle = false;
    var options = {
      url: this.getAction(file),
      name: htmlName || name,
      cors: cors,
      params: params,
      withCredentials: withCredentials,
      file: file,
      headers: headers,
      responseType: responseType,
      onStart: onStart,
      onProgress: function onProgress(e, msg) {
        var percent = typeof e.percent === 'number' ? e.percent : e.loaded / e.total * 100;
        if (throttle) return;
        throttle = true;
        setTimeout(function () {
          throttle = false;
        }, 16);

        if (_this4.state.files[id]) {
          _this4.setState(immer(function (draft) {
            draft.files[id].process = percent;
            if (msg) draft.files[id].message = msg;
          }), // expose the file progress to Upload.Button
          function () {
            if (typeof _onProgress === 'function') {
              _onProgress(_this4.state.files[id]);
            }
          });
        }
      },
      onSuccess: onSuccess,
      onLoad: function onLoad(xhr) {
        if (!/^2|1223/.test(xhr.status)) {
          _this4.handleError(id, xhr, file);

          return;
        }

        var value;
        if (xhr.responseType === 'text' || !xhr.responseType) value = xhr.responseText;
        if (!value) value = xhr.response;

        if (onSuccess) {
          value = onSuccess(value, file, data, xhr);
        }

        if (value instanceof Error) {
          _this4.setState(immer(function (draft) {
            draft.files[id].status = ERROR;
            draft.files[id].name = file.name;
            draft.files[id].message = value.message;
          }));
        } else {
          _this4.setState(immer(function (draft) {
            delete draft.files[id];
          })); // add value


          var values = immer(_this4.props.value, function (draft) {
            draft.push(value);
          });

          _this4.props.onChange(values);
        }
      },
      onError: function onError(xhr) {
        return _this4.handleError(id, xhr, file);
      }
    };

    if (_onProgress === false || _onProgress === null) {
      delete options.onProgress;
    }

    return req(options);
  };

  _proto.handleFileDrop = function handleFileDrop(files) {
    this.addFile({
      files: files,
      fromDragger: true
    });
  };

  _proto.handleReplace = function handleReplace(files, index) {
    var _this5 = this;

    this.removeValue(index);
    setTimeout(function () {
      _this5.addFile({
        files: files,
        fromDragger: true
      });
    });
  };

  _proto.handleError = function handleError(id, xhr, file) {
    var _this$props6 = this.props,
        onError = _this$props6.onError,
        onHttpError = _this$props6.onHttpError;
    var message = xhr.statusText;
    if (onError) message = onError(xhr, file);
    if (onHttpError) message = onHttpError(xhr, file) || message;
    this.setState(immer(function (draft) {
      if (!draft.files[id]) return;
      draft.files[id].status = ERROR;
      draft.files[id].message = message;
    }));
  };

  _proto.renderHandle = function renderHandle() {
    var _this$props7 = this.props,
        limit = _this$props7.limit,
        value = _this$props7.value,
        children = _this$props7.children,
        accept = _this$props7.accept,
        multiple = _this$props7.multiple,
        disabled = _this$props7.disabled,
        webkitdirectory = _this$props7.webkitdirectory,
        drop = _this$props7.drop;
    var count = value.length + Object.keys(this.state.files).length;
    if (limit > 0 && limit <= count) return null;
    var dragProps = {
      multiple: multiple,
      addFile: this.addFile,
      accept: accept,
      disabled: disabled,
      limit: limit
    };
    return React.createElement(Drop, {
      drop: drop,
      accept: accept,
      disabled: disabled,
      onDrop: this.handleFileDrop,
      multiple: multiple || limit > 1
    }, React.createElement("span", {
      className: uploadClass('handle', disabled && 'disabled'),
      onClick: this.handleAddClick
    }, React.createElement(Provider, {
      value: dragProps
    }, children), React.createElement(FileInput, {
      webkitdirectory: webkitdirectory,
      accept: accept,
      ref: this.bindElement,
      multiple: multiple,
      onChange: this.addFile
    })));
  };

  _proto.render = function render() {
    var _this6 = this;

    var _this$props8 = this.props,
        limit = _this$props8.limit,
        value = _this$props8.value,
        renderResult = _this$props8.renderResult,
        style = _this$props8.style,
        imageStyle = _this$props8.imageStyle,
        recoverAble = _this$props8.recoverAble,
        showUploadList = _this$props8.showUploadList,
        CustomResult = _this$props8.customResult,
        disabled = _this$props8.disabled,
        renderContent = _this$props8.renderContent,
        accept = _this$props8.accept,
        drop = _this$props8.drop,
        leftHandler = _this$props8.leftHandler,
        onPreview = _this$props8.onPreview,
        removeConfirm = _this$props8.removeConfirm,
        GapProps = _this$props8.GapProps;
    var _this$state = this.state,
        files = _this$state.files,
        recycle = _this$state.recycle;
    var fileDrop = drop && !imageStyle;
    var className = classnames(uploadClass('_', isRTL() && 'rtl', disabled && 'disabled', showUploadList === false && 'hide-list', fileDrop && 'file-drop'), this.props.className);
    var FileComponent = imageStyle ? ImageFile : File;
    var ResultComponent = imageStyle ? ImageResult : Result;

    if (CustomResult) {
      return React.createElement("div", {
        className: className,
        style: style
      }, this.renderHandle(), React.createElement(CustomResult, {
        value: value,
        files: files,
        onValueRemove: this.removeValue,
        onFileRemove: this.removeFile
      }));
    }

    var Wrapper = imageStyle ? Gap : React.Fragment;
    return React.createElement("div", _extends({
      className: className,
      style: style
    }, getDataset(this.props)), React.createElement(Wrapper, imageStyle ? GapProps : null, !imageStyle && this.renderHandle(), imageStyle && leftHandler && this.renderHandle(), showUploadList && value.map(function (v, i) {
      return React.createElement(Drop, {
        drop: drop,
        multiple: false,
        key: i,
        accept: accept,
        dropData: i,
        disabled: disabled,
        onDrop: _this6.handleReplace
      }, React.createElement(ResultComponent, {
        renderContent: renderContent,
        value: v,
        values: value,
        index: i,
        style: imageStyle,
        renderResult: renderResult,
        onRemove: _this6.getCanDelete(v, i) ? _this6.removeValue : undefined,
        removeConfirm: removeConfirm,
        onPreview: onPreview
      }));
    }), showUploadList && Object.keys(files).map(function (id) {
      return React.createElement(FileComponent, _extends({}, files[id], {
        key: id,
        id: id,
        style: imageStyle,
        onRemove: _this6.removeFile
      }));
    }), imageStyle && !leftHandler && this.renderHandle(), recoverAble && recycle.map(function (v, i) {
      return React.createElement(ResultComponent, {
        renderContent: renderContent,
        key: i,
        value: v,
        values: recycle,
        index: i,
        renderResult: renderResult,
        recoverAble: !!recoverAble,
        showRecover: recoverAble && limit > value.length,
        onRecover: _this6.recoverValue,
        style: imageStyle
      });
    })));
  };

  return Upload;
}(PureComponent);

Upload.propTypes = {
  accept: PropTypes.string,
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  beforeUpload: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  cors: PropTypes.bool,
  imageStyle: PropTypes.object,
  headers: PropTypes.object,
  htmlName: PropTypes.string,
  limit: PropTypes.number,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onProgress: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onHttpError: PropTypes.func,
  beforeCancel: PropTypes.func,
  params: PropTypes.object,
  recoverAble: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  renderResult: PropTypes.func,
  request: PropTypes.func,
  validateHook: PropTypes.func,
  validator: PropTypes.object,
  value: PropTypes.array,
  customResult: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  style: PropTypes.object,
  withCredentials: PropTypes.bool,
  onStart: PropTypes.func,
  showUploadList: PropTypes.bool,
  validatorHandle: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  disabled: PropTypes.bool,
  webkitdirectory: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  renderContent: PropTypes.func,
  drop: PropTypes.bool,
  filesFilter: PropTypes.func,
  onErrorRemove: PropTypes.func,
  forceAccept: PropTypes.bool,
  leftHandler: PropTypes.bool,
  onPreview: PropTypes.func,
  removeConfirm: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  beforeRemove: PropTypes.func,
  forceAcceptErrorMsg: PropTypes.string,
  canDelete: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  GapProps: PropTypes.shape({}),
  responseType: PropTypes.string
};
Upload.defaultProps = {
  cors: false,
  limit: 100,
  recoverAble: false,
  validator: {},
  value: [],
  withCredentials: false,
  showUploadList: true,
  validatorHandle: true,
  canDelete: true,
  GapProps: {
    column: 12,
    row: 12
  }
};
export default acceptHOC(Upload);