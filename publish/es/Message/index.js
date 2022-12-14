import { destroy, getComponent } from './messager';
var defaultOptions = {};

var create = function create(type) {
  return function (content, duration, options) {
    var mo = Object.assign({}, defaultOptions, options);
    duration = [duration, defaultOptions.duration, 3].find(function (d) {
      return typeof d === 'number';
    });
    var onClose = mo.onClose,
        _mo$position = mo.position,
        position = _mo$position === void 0 ? 'top' : _mo$position,
        title = mo.title,
        _mo$className = mo.className,
        className = _mo$className === void 0 ? '' : _mo$className,
        _mo$top = mo.top,
        top = _mo$top === void 0 ? 'auto' : _mo$top,
        hideClose = mo.hideClose;
    return getComponent(position).then(function (messager) {
      return messager.addMessage({
        content: content,
        duration: duration,
        type: type,
        onClose: onClose,
        title: title,
        className: className,
        top: top,
        position: position,
        hideClose: hideClose
      });
    });
  };
};

export default {
  show: create('default'),
  success: create('success'),
  info: create('info'),
  warn: create('warning'),
  warning: create('warning'),
  danger: create('danger'),
  error: create('danger'),
  close: function close(key) {
    if (key) destroy(key);else {
      ;
      ['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach(function (k) {
        destroy(k);
      });
    }
  },
  setOptions: function setOptions(options) {
    defaultOptions = options;
  }
};