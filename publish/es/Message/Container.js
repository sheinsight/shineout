import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import immer from 'immer';
import { PureComponent } from '../component';
import Alert from '../Alert';
import { messageClass } from './styles';
import { getUidStr } from '../utils/uid';

var Container =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Container, _PureComponent);

  function Container(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      messages: []
    };
    _this.removeMessage = _this.removeMessage.bind(_assertThisInitialized(_assertThisInitialized(_this)));

    _this.handleClassName = function (position, closeMsg) {
      if (position === void 0) {
        position = 'top';
      }

      return messageClass('item', "item-" + (closeMsg ? 'dismissed' : 'show') + "-" + position);
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

    var id = getUidStr();
    this.setState(immer(function (state) {
      state.messages.push(Object.assign({
        id: id
      }, msg));
    }));

    if (msg.duration > 0) {
      setTimeout(function () {
        _this2.setState(immer(function (state) {
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


    this.setState(immer(function (state) {
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
      return React.createElement("div", {
        key: id,
        className: _this4.handleClassName(position, dismiss) + " " + className,
        style: _this4.handleStyle(dismiss, h, position)
      }, React.createElement(Alert, {
        outAnimation: true,
        className: messageClass('msg'),
        dismiss: dismiss,
        hideClose: hideClose,
        onClose: _this4.closeMessageForAnimation.bind(_this4, id),
        icon: true,
        iconSize: title ? 20 : 14,
        style: {
          top: top
        },
        type: type
      }, title && React.createElement("h3", null, title), content));
    })];
  };

  return Container;
}(PureComponent);

Container.propTypes = {
  onDestory: PropTypes.func.isRequired
};
Container.displayName = 'ShineoutMessage';
export default Container;