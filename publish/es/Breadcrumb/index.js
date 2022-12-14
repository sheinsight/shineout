import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Popover from '../Popover';
import { getProps, defaultProps } from '../utils/proptypes';
import { breadcrumbClass } from './styles';
import { getKey } from '../utils/uid';
import Caret from '../icons/Caret';

var Breadcrumb =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Breadcrumb, _React$PureComponent);

  function Breadcrumb() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Breadcrumb.prototype;

  _proto.renderArray = function renderArray(data) {
    var _this = this;

    var first = data[0];
    return React.createElement("span", null, this.renderItem(first), React.createElement("span", {
      className: breadcrumbClass('down')
    }, React.createElement(Caret, null)), React.createElement(Popover, {
      position: "bottom"
    }, data.slice(1).map(function (d, i) {
      return React.createElement("div", {
        className: breadcrumbClass('dropdown-item'),
        key: i
      }, _this.renderItem(d));
    })));
  };

  _proto.renderItem = function renderItem(d) {
    var renderItem = this.props.renderItem;
    var item = d.title;

    if (!React.isValidElement(item)) {
      if (d.onClick || d.url) {
        var props = {
          onClick: d.onClick
        };
        if (d.url) props.href = d.url;
        item = React.createElement("a", props, d.icon, "\xA0", d.title);
      } else {
        item = React.createElement("b", null, d.title);
      }
    }

    return renderItem ? renderItem(d) : item;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        data = _this$props.data,
        separator = _this$props.separator,
        keygen = _this$props.keygen;
    var className = classnames(breadcrumbClass('_'), this.props.className);
    return React.createElement("div", {
      className: className,
      style: this.props.style
    }, data.map(function (d, index) {
      return React.createElement("span", {
        key: keygen ? getKey(d, keygen, index) : index
      }, Array.isArray(d) ? _this2.renderArray(d) : _this2.renderItem(d), index !== data.length - 1 ? React.createElement("span", {
        className: breadcrumbClass('separator')
      }, separator) : null);
    }));
  };

  return Breadcrumb;
}(React.PureComponent);

Breadcrumb.propTypes = _objectSpread({}, getProps(PropTypes), {
  data: PropTypes.array,
  renderItem: PropTypes.func,
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
});
Breadcrumb.defaultProps = _objectSpread({}, defaultProps, {
  data: [],
  separator: '/'
});
Breadcrumb.displayName = 'ShineoutBreadcrumb';
export default Breadcrumb;