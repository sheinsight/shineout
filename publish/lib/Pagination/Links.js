"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _icons = _interopRequireDefault(require("../icons"));

var _styles = require("./styles");

var _Item = _interopRequireDefault(require("./Item"));

var _Prev = _interopRequireDefault(require("./Prev"));

var _Next = _interopRequireDefault(require("./Next"));

var _config = require("../config");

var _classname = require("../utils/classname");

var renderIcon = function renderIcon(isPrev) {
  var rtl = (0, _config.isRTL)();

  if (isPrev && rtl || !isPrev && !rtl) {
    return _icons.default.AngleDoubleRight;
  }

  return _icons.default.AngleDoubleLeft;
};

var Links =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Links, _PureComponent);

  function Links() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Links.prototype;

  _proto.getLinks = function getLinks() {
    var _this$props = this.props,
        current = _this$props.current,
        total = _this$props.total,
        pageSize = _this$props.pageSize,
        span = _this$props.span;
    if (total === 0) return {
      links: [],
      max: 0
    };
    var max = Math.ceil(total / pageSize);
    var links = [];
    var right;
    var left = current - Math.floor(span / 2);

    if (left < 3) {
      left = 3;
    }

    right = left + span;

    if (right + 1 >= max) {
      right = max - 1;
      left = right - span;

      if (left < 1) {
        left = 1;
      }
    } else {
      right -= left > 1 ? 1 : 0;
    }

    if (left > 1) {
      links.push(1);
    }

    if (left === 3) {
      links.push(2);
    } else if (left > 3) {
      links.push('<<');
    }

    for (var i = left; i < right + 1; i++) {
      links.push(i);
    }

    if (right === max - 2) {
      links.push(max - 1);
    } else if (right < max - 1) {
      links.push('>>');
    }

    if (right < max) {
      links.push(max);
    }

    return {
      links: links,
      max: max
    };
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        current = _this$props2.current,
        onChange = _this$props2.onChange,
        span = _this$props2.span,
        disabled = _this$props2.disabled;

    var _this$getLinks = this.getLinks(),
        links = _this$getLinks.links,
        max = _this$getLinks.max;

    return _react.default.createElement("div", {
      className: (0, _styles.paginationClass)('links', (0, _classname.getDirectionClass)('section'))
    }, _react.default.createElement(_Prev.default, this.props), links.map(function (p) {
      if (typeof p === 'number') {
        return _react.default.createElement(_Item.default, {
          key: p,
          disabled: disabled,
          isCurrent: current === p,
          page: p,
          onClick: onChange
        }, p);
      }

      var isPrev = p === '<<';
      var page = isPrev ? current - span : current + span;
      if (page < 1) page = 1;
      if (page > max) page = max;
      return _react.default.createElement(_Item.default, {
        key: p,
        disabled: disabled,
        page: page,
        className: "no-border " + (isPrev ? 'more-left' : 'more-right'),
        onClick: onChange
      }, renderIcon(isPrev));
    }), _react.default.createElement(_Next.default, this.props));
  };

  return Links;
}(_react.PureComponent);

Links.propTypes = {
  current: _propTypes.default.number.isRequired,
  disabled: _propTypes.default.bool,
  onChange: _propTypes.default.func.isRequired,
  pageSize: _propTypes.default.number.isRequired,
  span: _propTypes.default.number,
  text: _propTypes.default.object,
  total: _propTypes.default.number.isRequired
};
Links.defaultProps = {
  span: 5,
  text: {}
};
var _default = Links;
exports.default = _default;