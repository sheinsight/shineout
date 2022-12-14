"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _component = require("../component");

var _Alert = _interopRequireDefault(require("../Alert"));

var _styles = require("./styles");

var _uid = require("../utils/uid");

var Container =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Container, _PureComponent);

  function Container(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      messages: []
    };
    _this.removeMessage = _this.removeMessage.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

    _this.handleClassName = function (position, closeMsg) {
      if (position === void 0) {
        position = 'top';
      }

      return (0, _styles.messageClass)('item', "item-" + (closeMsg ? 'dismissed' : 'show') + "-" + position);
    };

    _this.handleStyle = function (closeMsg, h, position) {
      if (!closeMsg || h == null) {
        return null;
      }

      var styles = {}; // if bottom, switch left or right

      switch (position) {
        case 'bottom-right':
        case 'bottom-left':
          break;

        default:
          styles = {
            zIndex: -1,
            opacity: 0,
            marginTop: -h
          };
          break;
      }

      return styles;
    };

    return _this;
  }

  var _proto = Container.prototype;

  _proto.addMessage = function addMessage(msg) {
    var _this2 = this;

    var id = (0, _uid.getUidStr)();
    this.setState((0, _immer.default)(function (state) {
      state.messages.push(Object.assign({
        id: id
      }, msg));
    }));

    if (msg.duration > 0) {
      setTimeout(function () {
        _this2.setState((0, _immer.default)(function (state) {
          state.messages.forEach(function (m) {
            if (m.id === id) {
              m.dismiss = true;
            }
          });
        }));
      }, msg.duration * 1000);
    }

    return this.closeMessageForAnimation.bind(this, id, 200, 200);
  };

  _proto.removeMessage = function removeMessage(id) {
    var callback;
    var messages = this.state.messages.filter(function (m) {
      if (m.id !== id) return true;

      if (m.onClose) {
        callback = m.onClose;
      }

      return false;
    });

    if (messages.length === 0) {
      this.props.onDestory();
    } else {
      this.setState({
        messages: messages
      });
    }

    if (callback) callback();
  };

  _proto.closeMessageForAnimation = function closeMessageForAnimation() {
    var _this3 = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var id = args[0],
        duration = args[1],
        msgHeight = args[2];

    if (!duration) {
      this.removeMessage(id);
      return;
    } // duration animation duration time


    this.setState((0, _immer.default)(function (state) {
      state.messages.forEach(function (m) {
        if (m.id === id) {
          m.dismiss = true;
          m.h = msgHeight + 20; // messageHeight + messageMargin
        }
      });
    }));
    setTimeout(function () {
      _this3.removeMessage(id);
    }, duration);
  };

  _proto.closeEvent = function closeEvent(id, duration) {
    if (duration === 0) {
      return this.removeMessage.bind(this, id);
    }

    return undefined;
  };

  _proto.render = function render() {
    var _this4 = this;

    var messages = this.state.messages;
    return [messages.map(function (_ref) {
      var id = _ref.id,
          type = _ref.type,
          content = _ref.content,
          dismiss = _ref.dismiss,
          h = _ref.h,
          title = _ref.title,
          top = _ref.top,
          className = _ref.className,
          position = _ref.position,
          hideClose = _ref.hideClose;
      return _react.default.createElement("div", {
        key: id,
        className: _this4.handleClassName(position, dismiss) + " " + className,
        style: _this4.handleStyle(dismiss, h, position)
      }, _react.default.createElement(_Alert.default, {
        outAnimation: true,
        className: (0, _styles.messageClass)('msg'),
        dismiss: dismiss,
        hideClose: hideClose,
        onClose: _this4.closeMessageForAnimation.bind(_this4, id),
        icon: true,
        iconSize: title ? 20 : 14,
        style: {
          top: top
        },
        type: type
      }, title && _react.default.createElement("h3", null, title), content));
    })];
  };

  return Container;
}(_component.PureComponent);

Container.propTypes = {
  onDestory: _propTypes.default.func.isRequired
};
Container.displayName = 'ShineoutMessage';
var _default = Container;
exports.default = _default;