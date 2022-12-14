import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import icons from '../icons';
import { paginationClass } from './styles';
import Item from './Item';
import Prev from './Prev';
import Next from './Next';
import { isRTL } from '../config';
import { getDirectionClass } from '../utils/classname';

var renderIcon = function renderIcon(isPrev) {
  var rtl = isRTL();

  if (isPrev && rtl || !isPrev && !rtl) {
    return icons.AngleDoubleRight;
  }

  return icons.AngleDoubleLeft;
};

var Links =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Links, _PureComponent);

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

    return React.createElement("div", {
      className: paginationClass('links', getDirectionClass('section'))
    }, React.createElement(Prev, this.props), links.map(function (p) {
      if (typeof p === 'number') {
        return React.createElement(Item, {
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
      return React.createElement(Item, {
        key: p,
        disabled: disabled,
        page: page,
        className: "no-border " + (isPrev ? 'more-left' : 'more-right'),
        onClick: onChange
      }, renderIcon(isPrev));
    }), React.createElement(Next, this.props));
  };

  return Links;
}(PureComponent);

Links.propTypes = {
  current: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  span: PropTypes.number,
  text: PropTypes.object,
  total: PropTypes.number.isRequired
};
Links.defaultProps = {
  span: 5,
  text: {}
};
export default Links;