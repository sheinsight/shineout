"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.destroy = destroy;
exports.close = close;
exports.createDiv = createDiv;
exports.open = open;
exports.closeAll = exports.method = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _component = require("../component");

var _Button = _interopRequireDefault(require("../Button"));

var _uid = require("../utils/uid");

var _styles = require("./styles");

var _Panel = _interopRequireDefault(require("./Panel"));

var _locale = require("../locale");

var _element = require("../utils/dom/element");

var _ready = _interopRequireDefault(require("../utils/dom/ready"));

var _document = require("../utils/dom/document");

var _config = require("../config");

var containers = {};
var DURATION = 300;

function getDiv(id) {
  var mod = containers[id];
  return mod ? mod.div : null;
}

function getContainer(id) {
  var mod = containers[id];
  return mod ? mod.container : null;
}

function hasVisible() {
  return Object.keys(containers).some(function (k) {
    return containers[k].visible;
  });
}

function isMask(id) {
  var ids = Object.keys(containers).filter(function (k) {
    return containers[k].visible;
  });
  if (ids.length === 0) return true;
  return ids[0] === id;
}

function destroy(id, unmount) {
  var div = getDiv(id);
  var container = getContainer(id);
  if (!div || !container) return;
  delete containers[id];
  if (unmount) _reactDom.default.unmountComponentAtNode(div);
  container.removeChild(div);
}

function close(props, callback) {
  var id = props.id;
  var modal = containers[props.id];
  if (!modal || modal.visible === false) return;
  modal.visible = false;
  var div = modal.div;
  div.classList.remove((0, _styles.modalClass)('show'), (0, _styles.modalClass)('start'));
  if (!props.position) div.classList.add((0, _styles.modalClass)('end'));
  setTimeout(function () {
    div.style.display = 'none';
    div.classList.remove((0, _styles.modalClass)('end'));
    if (props.destroy) destroy(id, !props.usePortal);

    if (!hasVisible()) {
      var doc = document.body.parentNode;
      doc.style.overflow = '';
      doc.style.paddingRight = '';
    }

    if (callback) callback();
  }, DURATION);
}

function createDiv(props) {
  var id = props.id,
      position = props.position,
      fullScreen = props.fullScreen,
      _props$container = props.container,
      container = _props$container === void 0 ? document.body : _props$container;
  var div = getDiv(props.id);
  if (div) return div;
  var parent = typeof container === 'function' ? container() : container;
  div = document.createElement('div');
  parent.appendChild(div);
  div.className = (0, _classnames.default)((0, _styles.modalClass)('_', position && 'position', (0, _config.isRTL)() && 'rtl', fullScreen && 'full-screen'), props.rootClassName);
  containers[id] = {
    div: div,
    container: parent,
    props: props
  };
  return div;
} // eslint-disable-next-line


function open(props, isPortal) {
  var content = props.content,
      onClose = props.onClose,
      zIndex = props.zIndex,
      forceMask = props.forceMask,
      otherProps = (0, _objectWithoutPropertiesLoose2.default)(props, ["content", "onClose", "zIndex", "forceMask"]);
  var div = createDiv(props);
  div.style.display = 'block';
  var parsed = parseInt(zIndex, 10);
  if (!Number.isNaN(parsed)) div.style.zIndex = parsed;
  var doc = document.body.parentNode;

  if (!doc.style.paddingRight) {
    var scrollWidth = window.innerWidth - _document.docSize.width;
    doc.style.overflow = 'hidden';
    doc.style.paddingRight = scrollWidth + "px";
  }

  var handleClose = function handleClose() {
    if (onClose) onClose();
    if (!isPortal) close(props);
  };

  var opacityDefault = props.maskOpacity === undefined ? 0.25 : props.maskOpacity;
  var maskOpacity = isMask(props.id) || forceMask ? opacityDefault : 0.01;
  div.style.background = props.maskBackground || "rgba(0,0,0," + maskOpacity + ")";
  containers[props.id].visible = true;

  var panel = _react.default.createElement(_Panel.default, (0, _extends2.default)({}, otherProps, {
    onClose: handleClose,
    container: div
  }), content);

  if (isPortal) return _reactDom.default.createPortal(panel, div);
  if (document.activeElement && !(0, _element.getParent)(document.activeElement, div)) document.activeElement.blur();

  _reactDom.default.render(panel, div);

  return null;
}

var closeCallback = function closeCallback(fn, option, setLoading) {
  return function () {
    var callback;
    if (fn) callback = fn();

    if (callback && typeof callback.then === 'function') {
      if (setLoading) {
        setLoading(true);
      }

      callback.then(function () {
        close(option);
      }).catch(function () {
        if (setLoading) {
          setLoading(false);
        }
      });
    } else {
      close(option);
    }
  };
}; // eslint-disable-next-line react/prop-types


var LoadingOk =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(LoadingOk, _PureComponent);

  function LoadingOk(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      loading: false
    };

    _this.setLoading = function (loading) {
      _this.setState({
        loading: loading
      });
    };

    return _this;
  }

  var _proto = LoadingOk.prototype;

  _proto.render = function render() {
    // eslint-disable-next-line react/prop-types
    var option = this.props.option;
    var loading = this.state.loading;
    var onClick = closeCallback(option.onOk, option, this.setLoading);
    return _react.default.createElement(_Button.default, {
      loading: loading,
      key: "ok",
      id: option.id + "-ok",
      onClick: onClick,
      type: "primary"
    }, (0, _locale.getLocale)('ok', option.text));
  };

  return LoadingOk;
}(_component.PureComponent); // const btnOk = option => {
//   const onClick = closeCallback(option.onOk, option)
//   return (
//     <Button.Once key="ok" id={`${option.id}-ok`} onClick={onClick} type="primary">
//       {getLocale('ok', option.text)}
//     </Button.Once>
//   )
// }


var btnCancel = function btnCancel(option) {
  var onClick = closeCallback(option.onCancel, option);
  return _react.default.createElement(_Button.default.Once, {
    id: option.id + "-cancel",
    key: "cancel",
    onClick: onClick
  }, (0, _locale.getLocale)('cancel', option.text));
};

var method = function method(type) {
  return function (option) {
    var props = Object.assign({
      width: 420,
      esc: true
    }, option, {
      id: (0, _uid.getUidStr)(),
      destroy: true,
      type: type,
      from: 'method'
    });

    if (type === 'confirm') {
      props.footer = [btnCancel(props), _react.default.createElement(LoadingOk, {
        option: props,
        key: "ok"
      })];
    } else {
      props.footer = 'footer' in props ? props.footer : [_react.default.createElement(LoadingOk, {
        option: props,
        key: "ok"
      })];
    }

    open(props);
    return function () {
      return close(props);
    };
  };
};

exports.method = method;

var closeAll = function closeAll() {
  Object.keys(containers).filter(function (id) {
    return containers[id].visible;
  }).forEach(function (id) {
    close(containers[id].props);
  });
};

exports.closeAll = closeAll;
(0, _ready.default)(function () {
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var ids = Object.keys(containers).reverse();
    var opened = ids.find(function (id) {
      return containers[id].visible && containers[id].props.esc;
    });
    if (!opened) return;
    var props = containers[opened].props;
    var onClose = props.onClose,
        isPortal = props.isPortal;
    if (onClose) onClose();
    if (!isPortal) close(props);
  });
});