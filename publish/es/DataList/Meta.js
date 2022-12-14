import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isFunc, isString } from '../utils/is';
import { listClass } from './styles';
import Image from '../Image';

var metaClass = function metaClass() {
  for (var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++) {
    a[_key] = arguments[_key];
  }

  return listClass.apply(void 0, a.map(function (v) {
    return "meta-" + v;
  }));
};

var Meta =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Meta, _Component);

  function Meta() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Meta.prototype;

  _proto.renderAvatar = function renderAvatar() {
    var avatar = this.props.avatar;
    if (!avatar) return null;

    if (isValidElement(avatar)) {
      return React.createElement("div", {
        className: metaClass('avatar')
      }, avatar);
    }

    if (isFunc(avatar)) {
      return React.createElement("div", {
        className: metaClass('avatar')
      }, avatar());
    }

    if (isString(avatar)) return React.createElement("div", {
      className: metaClass('avatar')
    }, React.createElement(Image, {
      lazy: true,
      src: avatar
    }));
    return null;
  };

  _proto.renderTitle = function renderTitle() {
    var _this$props = this.props,
        title = _this$props.title,
        desc = _this$props.desc;
    if (!title) return null;
    var flag = !desc;
    return React.createElement("div", {
      className: metaClass('title', flag && 'center')
    }, title);
  };

  _proto.renderDesc = function renderDesc() {
    var _this$props2 = this.props,
        desc = _this$props2.desc,
        title = _this$props2.title;
    if (!desc) return null;
    var flag = !title;
    return React.createElement("div", {
      className: metaClass('desc', flag && 'center')
    }, desc);
  };

  _proto.renderContent = function renderContent() {
    var content = this.props.content;
    if (!content) return null;
    if (isFunc(content)) return React.createElement("div", {
      className: metaClass('content')
    }, content());
    return React.createElement("div", {
      className: metaClass('content')
    }, content);
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        className = _this$props3.className,
        content = _this$props3.content,
        title = _this$props3.title,
        desc = _this$props3.desc; // if content && title && desc is all null, just render avatar

    if (!content && !title && !desc) {
      return React.createElement("div", {
        className: classnames(listClass('meta'), className)
      }, this.renderAvatar());
    } // if title && desc is null, render classic layout


    if (!title && !desc) {
      return React.createElement("div", {
        className: classnames(listClass('meta', 'includes'), className)
      }, this.renderAvatar(), this.renderContent());
    } // full layout


    return React.createElement("div", {
      className: classnames(listClass('meta'), className)
    }, React.createElement("div", {
      className: metaClass('container')
    }, this.renderAvatar(), React.createElement("div", {
      className: metaClass('meta')
    }, this.renderTitle(), this.renderDesc())), this.renderContent());
  };

  return Meta;
}(Component);

Meta.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  title: PropTypes.string,
  desc: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  className: PropTypes.string
};
export default Meta;