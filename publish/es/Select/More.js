import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { parsePxToNumber } from '../utils/dom/element';
import Popover from '../Popover'; // if num = -1 display all else display num

export function getResetMore(onFilter, container, doms) {
  if (!container || !doms || !doms.length) return -1;
  var items = Array.from(doms);
  var style = getComputedStyle(container);
  var clientWidth = container.clientWidth;
  var paddingLeft = parsePxToNumber(style.paddingLeft);
  var paddingRight = parsePxToNumber(style.paddingRight);
  var minFilterWidth = onFilter ? 16 : 0;
  var contentWidth = clientWidth - paddingLeft - paddingRight - minFilterWidth - 1;
  var hideEl = items.pop();
  var hideElStyle = getComputedStyle(hideEl);
  var hideMargin = parsePxToNumber(hideElStyle.marginLeft) + parsePxToNumber(hideElStyle.marginRight);
  var num = 0;
  var sumWidth = 0;
  var itemWidthArr = items.map(function (item) {
    var itemStyle = getComputedStyle(item);
    var itemLen = item.offsetWidth + parsePxToNumber(itemStyle.marginLeft) + parsePxToNumber(itemStyle.marginRight);
    sumWidth += itemLen;
    return itemLen;
  });

  if (sumWidth <= contentWidth) {
    num = -1;
  } else {
    var len = 0;

    for (var i = 0; i < itemWidthArr.length; i++) {
      var itemLen = itemWidthArr[i]; // number length

      var resetNum = items.length - 1 - i;
      var moreWidth = void 0;

      if (resetNum <= 0) {
        moreWidth = 0;
      } else {
        var reset = "+" + resetNum;
        hideEl.childNodes[0].innerText = reset; // (+num) width

        moreWidth = hideEl.offsetWidth + hideMargin;
      }

      len += itemLen;

      if (len > contentWidth - moreWidth) {
        break;
      }

      num += 1;

      if (i === items.length - 1) {
        // not show more
        num = -1;
      }
    }
  } // at least show one


  if (num === 0 && itemWidthArr[0]) {
    num = 1;
  }

  return num;
}

var More =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(More, _Component);

  function More(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      status: false
    };
    _this.changeStatus = _this.changeStatus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = More.prototype;

  _proto.changeStatus = function changeStatus(status) {
    this.setState({
      status: status
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        data = _this$props.data,
        className = _this$props.className,
        popoverClassName = _this$props.popoverClassName,
        contentClassName = _this$props.contentClassName,
        dataId = _this$props.dataId,
        trigger = _this$props.trigger,
        compressed = _this$props.compressed,
        cls = _this$props.cls,
        showNum = _this$props.showNum;
    var status = this.state.status;
    if (showNum < 0 || showNum >= data.length) return React.createElement(React.Fragment, null, data, React.createElement("a", {
      key: "hidden",
      className: className,
      style: {
        position: 'absolute',
        zIndex: '-100',
        userSelect: 'none',
        msUserSelect: 'none',
        contain: 'layout'
      }
    }, React.createElement("span", null, "+")));
    var before = new Array(showNum).fill().map(function (item, index) {
      return data[index];
    });
    var after = new Array(data.length - showNum).fill().map(function (item, index) {
      return data[showNum + index];
    });
    var itemsLength = after.length;
    return React.createElement(React.Fragment, null, before, React.createElement("a", {
      tabIndex: -1,
      key: "more",
      className: classnames(className, cls && status && cls('item-more'))
    }, React.createElement("span", null, "+" + itemsLength), React.createElement(Popover, {
      showArrow: false,
      trigger: trigger,
      visible: status,
      onVisibleChange: this.changeStatus,
      className: popoverClassName
    }, React.createElement("div", {
      className: contentClassName,
      "data-id": dataId
    }, compressed === 'no-repeat' ? null : before, after))));
  };

  return More;
}(Component);

More.defaultProps = {
  trigger: 'hover'
};
More.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  popoverClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  dataId: PropTypes.string,
  trigger: PropTypes.string,
  compressed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  cls: PropTypes.func,
  showNum: PropTypes.number
};
export default More;