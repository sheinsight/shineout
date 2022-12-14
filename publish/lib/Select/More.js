"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getResetMore = getResetMore;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _element = require("../utils/dom/element");

var _Popover = _interopRequireDefault(require("../Popover"));

// if num = -1 display all else display num
function getResetMore(onFilter, container, doms) {
  if (!container || !doms || !doms.length) return -1;
  var items = Array.from(doms);
  var style = getComputedStyle(container);
  var clientWidth = container.clientWidth;
  var paddingLeft = (0, _element.parsePxToNumber)(style.paddingLeft);
  var paddingRight = (0, _element.parsePxToNumber)(style.paddingRight);
  var minFilterWidth = onFilter ? 16 : 0;
  var contentWidth = clientWidth - paddingLeft - paddingRight - minFilterWidth - 1;
  var hideEl = items.pop();
  var hideElStyle = getComputedStyle(hideEl);
  var hideMargin = (0, _element.parsePxToNumber)(hideElStyle.marginLeft) + (0, _element.parsePxToNumber)(hideElStyle.marginRight);
  var num = 0;
  var sumWidth = 0;
  var itemWidthArr = items.map(function (item) {
    var itemStyle = getComputedStyle(item);
    var itemLen = item.offsetWidth + (0, _element.parsePxToNumber)(itemStyle.marginLeft) + (0, _element.parsePxToNumber)(itemStyle.marginRight);
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
  (0, _inheritsLoose2.default)(More, _Component);

  function More(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      status: false
    };
    _this.changeStatus = _this.changeStatus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
    if (showNum < 0 || showNum >= data.length) return _react.default.createElement(_react.default.Fragment, null, data, _react.default.createElement("a", {
      key: "hidden",
      className: className,
      style: {
        position: 'absolute',
        zIndex: '-100',
        userSelect: 'none',
        msUserSelect: 'none',
        contain: 'layout'
      }
    }, _react.default.createElement("span", null, "+")));
    var before = new Array(showNum).fill().map(function (item, index) {
      return data[index];
    });
    var after = new Array(data.length - showNum).fill().map(function (item, index) {
      return data[showNum + index];
    });
    var itemsLength = after.length;
    return _react.default.createElement(_react.default.Fragment, null, before, _react.default.createElement("a", {
      tabIndex: -1,
      key: "more",
      className: (0, _classnames.default)(className, cls && status && cls('item-more'))
    }, _react.default.createElement("span", null, "+" + itemsLength), _react.default.createElement(_Popover.default, {
      showArrow: false,
      trigger: trigger,
      visible: status,
      onVisibleChange: this.changeStatus,
      className: popoverClassName
    }, _react.default.createElement("div", {
      className: contentClassName,
      "data-id": dataId
    }, compressed === 'no-repeat' ? null : before, after))));
  };

  return More;
}(_react.Component);

More.defaultProps = {
  trigger: 'hover'
};
More.propTypes = {
  className: _propTypes.default.string,
  data: _propTypes.default.array,
  popoverClassName: _propTypes.default.string,
  contentClassName: _propTypes.default.string,
  dataId: _propTypes.default.string,
  trigger: _propTypes.default.string,
  compressed: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  cls: _propTypes.default.func,
  showNum: _propTypes.default.number
};
var _default = More;
exports.default = _default;