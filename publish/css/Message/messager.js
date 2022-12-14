"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.destroy = destroy;
exports.getComponent = getComponent;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _styles = require("./styles");

var _Container = _interopRequireDefault(require("./Container"));

var elements = {};
var components = {};

function getElement(type) {
  var div = document.createElement('div');
  div.className = (0, _styles.messageClass)('_', type);
  document.body.appendChild(div);
  elements[type] = div;
  return div;
}

function destroy(type) {
  if (elements[type]) {
    _reactDom.default.unmountComponentAtNode(elements[type]);

    document.body.removeChild(elements[type]);
    delete elements[type];
  }

  if (components[type]) {
    delete components[type];
  }
}

function getComponent(type) {
  return new Promise(function (resolve) {
    var component = components[type];

    if (component) {
      resolve(component);
    } else {
      _reactDom.default.render(_react.default.createElement(_Container.default, {
        ref: function ref(comp) {
          components[type] = comp;
          resolve(comp);
        },
        onDestory: destroy.bind(null, type)
      }), getElement(type));
    }
  });
}