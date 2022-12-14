import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { PureComponent } from '../component';
import Button from '../Button';
import { getUidStr } from '../utils/uid';
import { modalClass } from './styles';
import Panel from './Panel';
import { getLocale } from '../locale';
import { getParent } from '../utils/dom/element';
import ready from '../utils/dom/ready';
import { docSize } from '../utils/dom/document';
import { isRTL } from '../config';
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

export function destroy(id, unmount) {
  var div = getDiv(id);
  var container = getContainer(id);
  if (!div || !container) return;
  delete containers[id];
  if (unmount) ReactDOM.unmountComponentAtNode(div);
  container.removeChild(div);
}
export function close(props, callback) {
  var id = props.id;
  var modal = containers[props.id];
  if (!modal || modal.visible === false) return;
  modal.visible = false;
  var div = modal.div;
  div.classList.remove(modalClass('show'), modalClass('start'));
  if (!props.position) div.classList.add(modalClass('end'));
  setTimeout(function () {
    div.style.display = 'none';
    div.classList.remove(modalClass('end'));
    if (props.destroy) destroy(id, !props.usePortal);

    if (!hasVisible()) {
      var doc = document.body.parentNode;
      doc.style.overflow = '';
      doc.style.paddingRight = '';
    }

    if (callback) callback();
  }, DURATION);
}
export function createDiv(props) {
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
  div.className = classnames(modalClass('_', position && 'position', isRTL() && 'rtl', fullScreen && 'full-screen'), props.rootClassName);
  containers[id] = {
    div: div,
    container: parent,
    props: props
  };
  return div;
} // eslint-disable-next-line

export function open(props, isPortal) {
  var content = props.content,
      onClose = props.onClose,
      zIndex = props.zIndex,
      forceMask = props.forceMask,
      otherProps = _objectWithoutPropertiesLoose(props, ["content", "onClose", "zIndex", "forceMask"]);

  var div = createDiv(props);
  div.style.display = 'block';
  var parsed = parseInt(zIndex, 10);
  if (!Number.isNaN(parsed)) div.style.zIndex = parsed;
  var doc = document.body.parentNode;

  if (!doc.style.paddingRight) {
    var scrollWidth = window.innerWidth - docSize.width;
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
  var panel = React.createElement(Panel, _extends({}, otherProps, {
    onClose: handleClose,
    container: div
  }), content);
  if (isPortal) return ReactDOM.createPortal(panel, div);
  if (document.activeElement && !getParent(document.activeElement, div)) document.activeElement.blur();
  ReactDOM.render(panel, div);
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
  _inheritsLoose(LoadingOk, _PureComponent);

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
    return React.createElement(Button, {
      loading: loading,
      key: "ok",
      id: option.id + "-ok",
      onClick: onClick,
      type: "primary"
    }, getLocale('ok', option.text));
  };

  return LoadingOk;
}(PureComponent); // const btnOk = option => {
//   const onClick = closeCallback(option.onOk, option)
//   return (
//     <Button.Once key="ok" id={`${option.id}-ok`} onClick={onClick} type="primary">
//       {getLocale('ok', option.text)}
//     </Button.Once>
//   )
// }


var btnCancel = function btnCancel(option) {
  var onClick = closeCallback(option.onCancel, option);
  return React.createElement(Button.Once, {
    id: option.id + "-cancel",
    key: "cancel",
    onClick: onClick
  }, getLocale('cancel', option.text));
};

export var method = function method(type) {
  return function (option) {
    var props = Object.assign({
      width: 420,
      esc: true
    }, option, {
      id: getUidStr(),
      destroy: true,
      type: type,
      from: 'method'
    });

    if (type === 'confirm') {
      props.footer = [btnCancel(props), React.createElement(LoadingOk, {
        option: props,
        key: "ok"
      })];
    } else {
      props.footer = 'footer' in props ? props.footer : [React.createElement(LoadingOk, {
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
export var closeAll = function closeAll() {
  Object.keys(containers).filter(function (id) {
    return containers[id].visible;
  }).forEach(function (id) {
    close(containers[id].props);
  });
};
ready(function () {
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