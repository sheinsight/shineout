"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _is = require("../utils/is");

var _styles = require("./styles");

var _Image = _interopRequireDefault(require("../Image"));

var metaClass = function metaClass() {
  for (var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++) {
    a[_key] = arguments[_key];
  }

  return _styles.listClass.apply(void 0, a.map(function (v) {
    return "meta-" + v;
  }));
};

var Meta =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Meta, _Component);

  function Meta() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Meta.prototype;

  _proto.renderAvatar = function renderAvatar() {
    var avatar = this.props.avatar;
    if (!avatar) return null;

    if ((0, _react.isValidElement)(avatar)) {
      return _react.default.createElement("div", {
        className: metaClass('avatar')
      }, avatar);
    }

    if ((0, _is.isFunc)(avatar)) {
      return _react.default.createElement("div", {
        className: metaClass('avatar')
      }, avatar());
    }

    if ((0, _is.isString)(avatar)) return _react.default.createElement("div", {
      className: metaClass('avatar')
    }, _react.default.createElement(_Image.default, {
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
    return _react.default.createElement("div", {
      className: metaClass('title', flag && 'center')
    }, title);
  };

  _proto.renderDesc = function renderDesc() {
    var _this$props2 = this.props,
        desc = _this$props2.desc,
        title = _this$props2.title;
    if (!desc) return null;
    var flag = !title;
    return _react.default.createElement("div", {
      className: metaClass('desc', flag && 'center')
    }, desc);
  };

  _proto.renderContent = function renderContent() {
    var content = this.props.content;
    if (!content) return null;
    if ((0, _is.isFunc)(content)) return _react.default.createElement("div", {
      className: metaClass('content')
    }, content());
    return _react.default.createElement("div", {
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
      return _react.default.createElement("div", {
        className: (0, _classnames.default)((0, _styles.listClass)('meta'), className)
      }, this.renderAvatar());
    } // if title && desc is null, render classic layout


    if (!title && !desc) {
      return _react.default.createElement("div", {
        className: (0, _classnames.default)((0, _styles.listClass)('meta', 'includes'), className)
      }, this.renderAvatar(), this.renderContent());
    } // full layout


    return _react.default.createElement("div", {
      className: (0, _classnames.default)((0, _styles.listClass)('meta'), className)
    }, _react.default.createElement("div", {
      className: metaClass('container')
    }, this.renderAvatar(), _react.default.createElement("div", {
      className: metaClass('meta')
    }, this.renderTitle(), this.renderDesc())), this.renderContent());
  };

  return Meta;
}(_react.Component);

Meta.propTypes = {
  avatar: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node, _propTypes.default.func]),
  title: _propTypes.default.string,
  desc: _propTypes.default.string,
  content: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node, _propTypes.default.func]),
  className: _propTypes.default.string
};
var _default = Meta;
exports.default = _default;