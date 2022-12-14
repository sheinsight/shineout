"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _component = require("../component");

var _proptypes = require("../utils/proptypes");

var _translate = require("../utils/dom/translate");

var _numbers = require("../utils/numbers");

var _shallowEqual = require("../utils/shallowEqual");

var _element = require("../utils/dom/element");

var _styles = require("./styles");

var _Scroll = _interopRequireDefault(require("../Scroll"));

var _Scroll2 = require("../Scroll/Scroll");

var _Colgroup = _interopRequireDefault(require("./Colgroup"));

var _Thead = _interopRequireDefault(require("./Thead"));

var _Tbody = _interopRequireDefault(require("./Tbody"));

var _is = require("../utils/is");

var _context = require("./context");

var _Td = require("./Td");

var _Sticky = _interopRequireDefault(require("../Sticky"));

var _scrollBehavior = require("../utils/dom/scrollBehavior");

var SeperateTable =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(SeperateTable, _PureComponent);

  function SeperateTable(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      currentIndex: 0,
      scrollLeft: 0,
      scrollTop: 0,
      floatFixed: true,
      resize: false
    };
    _this.bindTbody = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'tbody');
    _this.bindRealTbody = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'realTbody');
    _this.bindThead = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'thead');
    _this.bindHeadWrapper = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'headWrapper');
    _this.setRowHeight = _this.setRowHeight.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleColgroup = _this.handleColgroup.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleScroll = _this.handleScroll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleSortChange = _this.handleSortChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.scrollToTop = _this.scrollToTop.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.cachedRowHeight = [];
    _this.lastScrollArgs = {};
    _this.lastScrollTop = 0;
    if (props.tableRef) props.tableRef((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = SeperateTable.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    this.adjustScrollLeft();
  } // reset scrollTop when data changed
  ;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!this.tbody) return;
    var dataChange = this.props.data !== prevProps.data;

    if (dataChange) {
      var resize = prevProps.data.length === 0 && this.props.data.length;
      if (resize || this.props.dataChangeResize) this.setState({
        resize: true,
        colgroup: undefined
      });
      this.resetHeight();
    }

    this.updateScrollLeft();

    if (!(0, _shallowEqual.compareColumns)(prevProps.columns, this.props.columns)) {
      this.resetWidth();
      this.setState({
        colgroup: undefined
      });
    }

    this.ajustBottom(dataChange);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    if (this.rmOverScrollListener) this.rmOverScrollListener();
  };

  _proto.getIndex = function getIndex(scrollTop) {
    if (scrollTop === void 0) {
      scrollTop = this.state.scrollTop;
    }

    var _this$props = this.props,
        data = _this$props.data,
        rowsInView = _this$props.rowsInView;
    var max = data.length;
    var mcf = scrollTop > 0.5 ? Math.ceil : Math.floor;
    var index = mcf(scrollTop * max - rowsInView * scrollTop);
    if (index > max - rowsInView) index = max - rowsInView;
    if (index < 0) index = 0;
    return index;
  };

  _proto.getContentHeight = function getContentHeight() {
    if (!this.props.data) return 0;
    return this.getSumHeight(0, this.props.data.length);
  };

  _proto.getContentWidth = function getContentWidth() {
    if (this.props.width) return this.props.width;
    if (this.tbody) return this.tbody.offsetWidth;
    return 0;
  };

  _proto.getSumHeight = function getSumHeight(start, end) {
    var rowHeight = this.props.rowHeight;
    var height = 0;

    for (var i = start; i < end; i++) {
      height += this.cachedRowHeight[i] || rowHeight;
    }

    return height;
  };

  _proto.getLastRowHeight = function getLastRowHeight(index) {
    var _this$props2 = this.props,
        rowHeight = _this$props2.rowHeight,
        data = _this$props2.data,
        rowsInView = _this$props2.rowsInView;
    if (index + rowsInView >= data.length) return 0;
    var lastRowHeight = 0;

    if (index >= 1 && index < data.length / 2) {
      lastRowHeight = this.cachedRowHeight[index - 1] || rowHeight;
    }

    return lastRowHeight;
  };

  _proto.setRowHeight = function setRowHeight(height, index, expand) {
    var oldHeight = this.cachedRowHeight[index];
    this.cachedRowHeight[index] = height;

    if (!this.renderByExpand && expand) {
      this.renderByExpand = true;
    }

    if (!this.tbody) return;
    var _this$state = this.state,
        offsetLeft = _this$state.offsetLeft,
        currentIndex = _this$state.currentIndex;

    if (currentIndex === index && !oldHeight) {
      this.lastScrollTop += height - this.props.rowHeight;
      if (this.lastScrollTop < 0) this.lastScrollTop = 0;
      (0, _translate.setTranslate)(this.tbody, "-" + offsetLeft + "px", "-" + this.lastScrollTop + "px");
    }

    var contentHeight = this.getContentHeight();

    if (oldHeight && height !== oldHeight) {
      if (this.lastScrollTop > contentHeight) {
        this.handleScroll.apply(this, (0, _immer.default)(this.lastScrollArgs, function (draft) {
          draft[7] = 1;
        }));
        return;
      }

      var scrollTop = this.lastScrollTop / contentHeight;
      this.setState({
        scrollTop: scrollTop
      });

      if (scrollTop === this.state.scrollTop) {
        this.forceUpdate();
      }
    }
    /**
     * if press and hold bar to scroll to the bottom, reset scroll
     */
    // if (this.lastScrollArgs[1] === 1) {
    //   setTimeout(() => {
    //     this.handleScroll(
    //       ...immer(this.lastScrollArgs, draft => {
    //         draft[7] = undefined
    //       })
    //     )
    //   })
    // }

  };

  _proto.setTop = function setTop(scrollHeight, fullHeight, top) {
    var _this2 = this;

    var offsetLeft = this.state.offsetLeft;
    this.tbody.style.marginTop = scrollHeight * top + "px";
    this.lastScrollTop = fullHeight * top;
    (0, _translate.setTranslate)(this.tbody, "-" + offsetLeft + "px", "-" + this.lastScrollTop + "px");
    setTimeout(function () {
      _this2.setState({
        scrollTop: top
      });

      _this2.lastScrollArgs[1] = top;
    });
  };

  _proto.checkScrollToIndex = function checkScrollToIndex(index, outerHeight) {
    var _this$props3 = this.props,
        data = _this$props3.data,
        rowsInView = _this$props3.rowsInView;
    var max = data.length;

    if (max - index >= rowsInView) {
      return index;
    }

    var contentHeight = this.getSumHeight(index, max);

    if (contentHeight >= outerHeight) {
      return index;
    }

    return max;
  };

  _proto.ajustBottom = function ajustBottom(dataChange) {
    var _this3 = this;

    var reachBottom = this.lastScrollArgs[1] === 1;
    var drag = this.lastScrollArgs[8];

    if (!dataChange && reachBottom && drag) {
      if (this.ajustBottomScroll) return;
      this.ajustBottomScroll = true;
      setTimeout(function () {
        _this3.handleScroll.apply(_this3, _this3.lastScrollArgs);
      });
    }
  };

  _proto.updateScrollLeft = function updateScrollLeft() {
    var scrollLeft = this.props.scrollLeft;
    this.resetFloatFixed();
    if (!(0, _is.isNumber)(scrollLeft)) return;
    var args = Array.isArray(this.lastScrollArgs) && this.lastScrollArgs.slice();

    if (scrollLeft !== this.state.offsetLeft && args) {
      var bodyWidth = this.lastScrollArgs[4];
      if (scrollLeft < 0) scrollLeft = 0;
      if (scrollLeft > this.getContentWidth() - bodyWidth) scrollLeft = this.getContentWidth() - bodyWidth;
      args[0] = scrollLeft / (this.getContentWidth() - args[4]);
      args[1] = this.state.scrollTop;
      args[6] = 0;
      args[7] = 0;
      this.handleScroll.apply(this, args);
    }
  };

  _proto.adjustScrollLeft = function adjustScrollLeft() {
    var scrollLeft = this.props.scrollLeft;
    this.resetFloatFixed();

    if ((0, _is.isNumber)(scrollLeft) && scrollLeft > 0) {
      var v = this.headWrapper.clientWidth;
      var offset = this.getContentWidth() - v;
      this.setState({
        scrollLeft: scrollLeft / offset,
        offsetLeft: scrollLeft
      });
    }
  };

  _proto.resetFloatFixed = function resetFloatFixed() {
    if (!this.headWrapper || !this.tbody) return;
    var fixed = this.props.fixed;
    var delta = fixed === 'x' ? 0 : _Scroll2.BAR_WIDTH;
    var floatFixed = Math.abs(this.headWrapper.clientWidth - this.tbody.clientWidth) !== delta;

    if (floatFixed !== this.state.floatFixed) {
      this.setState({
        floatFixed: floatFixed
      });
    }
  };

  _proto.resetIndex = function resetIndex() {
    var currentIndex = this.state.currentIndex;
    var max = this.props.data.length - this.props.rowsInView;
    if (max < 0) max = 0;
    if (max >= currentIndex) return currentIndex; // if data.length < currentIndex

    return max;
  };

  _proto.resetHeight = function resetHeight() {
    var _this4 = this;

    var scrollTop = this.state.scrollTop;
    var _this$props4 = this.props,
        treeColumnsName = _this$props4.treeColumnsName,
        changedByExpand = _this$props4.changedByExpand;
    var fullHeight = this.getContentHeight();
    var height = fullHeight * scrollTop;
    var scrollHeight = this.lastScrollArgs[5]; // Height reduced

    if (this.lastScrollTop - height >= 1) {
      var index = this.resetIndex();
      this.setState({
        currentIndex: index
      });

      if (this.renderByExpand) {
        this.renderByExpand = false;
        return;
      } // this.lastScrollTop = height
      // if (treeColumnsName && changedByExpand) {
      //   this.tbody.style.marginTop = `${this.lastScrollTop - this.realOffset}px`
      //   setTranslate(this.tbody, `-${offsetLeft}px`, `-${this.lastScrollTop}px`)
      //   return
      // }


      if (treeColumnsName && changedByExpand) {
        // Blank space may appear after clicking the top or bottom collapse button
        if (fullHeight - this.lastScrollTop < (1 - this.lastScrollArgs[1]) * scrollHeight) {
          if (fullHeight <= scrollHeight) {
            index = 0;
          } else {
            this.setTop(scrollHeight, fullHeight, 1);
            return;
          }
        } else {
          return;
        }
      }

      if (index === 0) {
        this.setTop(scrollHeight, fullHeight, 0);
      } else if (fullHeight - this.lastScrollTop < (1 - this.lastScrollArgs[1]) * scrollHeight) {
        this.setTop(scrollHeight, fullHeight, 1);
      } else {
        var keepTop = this.lastScrollTop - this.lastScrollArgs[1] * scrollHeight; // keepTop = scrollTopLength - scrollTopLength/fullHeight * scrollHeight
        // keepTop = (1 - scrollHeight / fullHeight) * scrollTopLength

        var scrollTopLength = keepTop / (1 - scrollHeight / fullHeight);
        this.lastScrollTop = scrollTopLength;
        var st = this.lastScrollTop / fullHeight;
        this.setTop(scrollHeight, fullHeight, st);
      }
    } else if (this.lastScrollTop - height < 1) {
      setTimeout(function () {
        _this4.lastScrollArgs[1] = _this4.lastScrollTop / fullHeight;

        _this4.setState({
          scrollTop: _this4.lastScrollTop / fullHeight
        });
      });
    }
  };

  _proto.resetWidth = function resetWidth(left, right) {
    if (left === void 0) {
      left = this.lastResetLeft || 0;
    }

    if (right === void 0) {
      right = this.lastResetRight || 0;
    }

    this.lastResetLeft = left;
    this.lastResetRight = right;
    (0, _translate.setTranslate)(this.tbody, "-" + left + "px", "-" + this.lastScrollTop + "px");

    if (this.thead) {
      (0, _translate.setTranslate)(this.thead, "-" + left + "px", '0');
    }

    ;
    [this.thead, this.tbody].forEach(function (el) {
      if (!el) return;
      [].forEach.call(el.parentNode.querySelectorAll('td, th'), function (cell) {
        if (cell.classList.contains((0, _styles.tableClass)(_Td.CLASS_FIXED_LEFT))) {
          (0, _translate.setTranslate)(cell, left + "px", '0');
        } else if (cell.classList.contains((0, _styles.tableClass)(_Td.CLASS_FIXED_RIGHT))) {
          (0, _translate.setTranslate)(cell, "-" + right + "px", '0');
        } else if (cell.style.transform) {
          (0, _translate.setTranslate)(cell, '0', '0');
        }
      });
    });
  };

  _proto.bindElement = function bindElement(key, el) {
    this[key] = el;

    if (key === 'headWrapper') {
      if (el) {
        this.rmOverScrollListener = (0, _scrollBehavior.banOverScrollX)(el);
      } else if (this.rmOverScrollListener) {
        this.rmOverScrollListener();
        this.rmOverScrollListener = null;
      }
    }
  };

  _proto.scrollToTop = function scrollToTop() {
    this.scrollToIndex(0);
  };

  _proto.scrollToIndex = function scrollToIndex(index, callback) {
    if (!this.$isMounted) return;
    if (index >= 1) index -= 1;
    if (index < 0) index = 0;
    var contentHeight = this.getContentHeight();
    var outerHeight = (0, _element.getParent)(this.realTbody, "." + (0, _styles.tableClass)('body')).clientHeight - 12;
    var currentIndex = this.checkScrollToIndex(index, outerHeight);
    var sumHeight = this.getSumHeight(0, currentIndex);
    var scrollTop = sumHeight / contentHeight;
    var marginTop = scrollTop * outerHeight;
    var offsetScrollTop = sumHeight + marginTop;

    if (offsetScrollTop > contentHeight) {
      offsetScrollTop = contentHeight;
      currentIndex = this.props.data.length - this.props.rowsInView;
      scrollTop = 1;
      marginTop = outerHeight;
    }

    this.lastScrollArgs[1] = scrollTop;
    this.setState({
      currentIndex: currentIndex,
      scrollTop: scrollTop
    }, callback);
    this.lastScrollTop = offsetScrollTop;
    this.tbody.style.marginTop = marginTop + "px";
    (0, _translate.setTranslate)(this.tbody, "-" + this.state.offsetLeft + "px", "-" + offsetScrollTop + "px");
  } // business component needed
  ;

  _proto.scrollOffset = function scrollOffset(index, callback) {
    var currentIndex = this.state.currentIndex;
    var outerHeight = (0, _element.getParent)(this.realTbody, "." + (0, _styles.tableClass)('body')).clientHeight - 12;
    var lastRowHeight = this.cachedRowHeight[this.cachedRowHeight.length - 1];
    if (this.state.scrollTop === 1 && index >= 0) return;
    if (lastRowHeight && this.realTbody.clientHeight - outerHeight < lastRowHeight && index >= 0) return;
    var scrollIndex = currentIndex + index + 1;

    if (currentIndex === 1 && index === -1) {
      scrollIndex = 0;
    }

    this.scrollToIndex(scrollIndex, callback);
  };

  _proto.handleScroll = function handleScroll() {
    if (!this.tbody || this.realTbody.clientHeight === 0) return;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var x = args[0],
        y = args[1],
        max = args[2],
        bar = args[3],
        v = args[4],
        h = args[5],
        pixelX = args[6],
        pixelY = args[7];
    var colgroup = this.state.colgroup;
    var isResize = v && this.lastScrollArgs[4] && v !== this.lastScrollArgs[4];
    this.lastScrollArgs = args;

    if (this.ajustBottomScroll) {
      this.lastScrollArgs[8] = false;
      this.ajustBottomScroll = false;
    }

    var _this$props5 = this.props,
        data = _this$props5.data,
        rowHeight = _this$props5.rowHeight,
        rowsInView = _this$props5.rowsInView;
    var contentWidth = this.getContentWidth();
    var contentHeight = this.getContentHeight();
    var left = x * (contentWidth - v);
    var scrollTop = h > contentHeight ? 0 : y;
    var right = max - left;
    if (right < 0) right = 0;
    /* set x */

    if (left < 0) left = 0;
    this.resetWidth(left, right);
    /* set x end */

    /* set y */

    this.tbody.style.marginTop = scrollTop * h + "px";

    if (pixelY === undefined) {
      // drag scroll bar
      var index = this.getIndex(scrollTop);
      var lastRowHeight = this.getLastRowHeight(index);
      var offsetScrollTop = this.getSumHeight(0, index) + scrollTop * this.realTbody.clientHeight;
      this.setState({
        currentIndex: index
      });
      this.lastScrollTop = offsetScrollTop;
      (0, _translate.setTranslate)(this.tbody, "-" + left + "px", "-" + (offsetScrollTop + lastRowHeight) + "px");
    } else if (pixelY === 0) {
      // whell x
      (0, _translate.setTranslate)(this.tbody, "-" + left + "px", "-" + this.lastScrollTop + "px");
    } else if (contentHeight < h) {
      this.lastScrollTop = 0;
      scrollTop = 0;
      (0, _translate.setTranslate)(this.tbody, "-" + left + "px", '0px');
      this.setState({
        currentIndex: 0
      });
    } else {
      // wheel scroll
      this.lastScrollTop += pixelY;
      if (this.lastScrollTop < 0) this.lastScrollTop = 0; // scroll over bottom

      if (this.lastScrollTop > contentHeight) this.lastScrollTop = contentHeight;
      var temp = this.lastScrollTop - scrollTop * h;
      var _index = 0;

      while (temp > 0) {
        temp -= this.cachedRowHeight[_index] || rowHeight;
        _index += 1;
      } // offset last row


      _index -= 1;
      if (data.length - rowsInView < _index) _index = data.length - rowsInView;
      if (_index < 0) _index = 0;
      this.setState({
        currentIndex: _index
      });
      scrollTop = this.lastScrollTop / contentHeight;
      (0, _translate.setTranslate)(this.tbody, "-" + left + "px", "-" + this.lastScrollTop + "px");
    }
    /* set y end */


    this.setState({
      scrollLeft: x,
      scrollTop: scrollTop,
      offsetLeft: left,
      offsetRight: right,
      colgroup: isResize ? undefined : colgroup,
      resize: isResize ? v : false
    });
    if (this.props.onScroll) this.props.onScroll(x, y, left);
  };

  _proto.handleSortChange = function handleSortChange() {
    var _this$props6;

    this.scrollToIndex(0);

    (_this$props6 = this.props).onSortChange.apply(_this$props6, arguments);
  };

  _proto.handleColgroup = function handleColgroup(tds) {
    var columns = this.props.columns;
    var colgroup = [];

    var _loop = function _loop(i, count) {
      var _tds$i$getBoundingCli = tds[i].getBoundingClientRect(),
          width = _tds$i$getBoundingCli.width;

      var colSpan = parseInt(tds[i].getAttribute('colspan'), 10);

      if (colSpan > 1) {
        (0, _numbers.split)(width, (0, _numbers.range)(colSpan).map(function (j) {
          return columns[i + j].width;
        })).forEach(function (w) {
          return colgroup.push(w);
        });
      } else {
        colgroup.push(width);
      }
    };

    for (var i = 0, count = tds.length; i < count; i++) {
      _loop(i, count);
    }

    this.setState({
      colgroup: colgroup,
      resize: false
    });
  };

  _proto.renderBody = function renderBody(floatClass) {
    var _this$props7 = this.props,
        data = _this$props7.data,
        rowsInView = _this$props7.rowsInView,
        columns = _this$props7.columns,
        width = _this$props7.width,
        fixed = _this$props7.fixed,
        rowHeight = _this$props7.rowHeight,
        columnResizable = _this$props7.columnResizable,
        innerScrollAttr = _this$props7.innerScrollAttr,
        bordered = _this$props7.bordered,
        others = (0, _objectWithoutPropertiesLoose2.default)(_this$props7, ["data", "rowsInView", "columns", "width", "fixed", "rowHeight", "columnResizable", "innerScrollAttr", "bordered"]);
    var _this$state2 = this.state,
        colgroup = _this$state2.colgroup,
        scrollTop = _this$state2.scrollTop,
        scrollLeft = _this$state2.scrollLeft,
        offsetLeft = _this$state2.offsetLeft,
        offsetRight = _this$state2.offsetRight,
        currentIndex = _this$state2.currentIndex,
        resize = _this$state2.resize;
    var contentWidth = this.getContentWidth();
    var minWidthSup = columns.find(function (d) {
      return d.minWidth;
    });

    if (!data || data.length === 0) {
      return _react.default.createElement("div", null);
    }

    var dataUpdated = this.lastData !== data; // Incorrect height due to changing data length dynamically

    if (this.lastData && !dataUpdated) dataUpdated = this.lastData.length !== data.length;
    this.lastData = data;
    if (!dataUpdated && this.lastColumns && !(0, _shallowEqual.compareColumns)(this.lastColumns, columns)) dataUpdated = true;
    this.lastColumns = columns;
    var prevHeight = this.getSumHeight(0, currentIndex);
    var hasNotRenderRows = data.length > rowsInView;
    return _react.default.createElement(_Scroll.default, {
      scrollTop: scrollTop,
      scrollLeft: scrollLeft,
      scroll: fixed,
      scrollHeight: this.getContentHeight(),
      scrollWidth: contentWidth,
      onScroll: this.handleScroll,
      className: _styles.tableClass.apply(void 0, ['body'].concat(floatClass)),
      innerScrollAttr: innerScrollAttr
    }, _react.default.createElement("div", {
      ref: this.bindTbody,
      className: (0, _styles.tableClass)('scroll-inner'),
      style: {
        width: width
      }
    }, _react.default.createElement("div", {
      style: {
        height: prevHeight
      }
    }), _react.default.createElement("table", {
      className: (0, _styles.tableClass)(!colgroup && minWidthSup && 'init', bordered && 'table-bordered'),
      style: {
        width: width
      },
      ref: this.bindRealTbody
    }, _react.default.createElement(_Colgroup.default, {
      colgroup: colgroup,
      columns: columns,
      resizable: columnResizable && this.lastScrollArgs[4]
    }), _react.default.createElement(_Tbody.default, (0, _extends2.default)({}, others, {
      bordered: bordered,
      columns: columns,
      onBodyRender: this.handleColgroup,
      index: currentIndex,
      offsetLeft: offsetLeft,
      offsetRight: offsetRight,
      data: data.slice(currentIndex, currentIndex + rowsInView),
      setRowHeight: this.setRowHeight,
      hasNotRenderRows: hasNotRenderRows,
      dataUpdated: dataUpdated,
      resize: resize,
      colgroup: colgroup,
      onScrollTop: this.scrollToTop,
      columnResizable: columnResizable
    })))));
  };

  _proto.renderHeader = function renderHeader(floatClass) {
    var _this$props8 = this.props,
        columns = _this$props8.columns,
        width = _this$props8.width,
        onResize = _this$props8.onResize,
        columnResizable = _this$props8.columnResizable,
        sticky = _this$props8.sticky,
        bordered = _this$props8.bordered;
    var colgroup = this.state.colgroup;

    var header = _react.default.createElement("div", {
      key: "head",
      className: _styles.tableClass.apply(void 0, ['head'].concat(floatClass)),
      ref: this.bindHeadWrapper
    }, _react.default.createElement("table", {
      style: {
        width: width
      },
      ref: this.bindThead,
      className: (0, _styles.tableClass)(bordered && 'table-bordered')
    }, _react.default.createElement(_Colgroup.default, {
      colgroup: colgroup,
      columns: columns,
      resizable: columnResizable && this.lastScrollArgs[4]
    }), _react.default.createElement(_Thead.default, (0, _extends2.default)({}, this.props, {
      colgroup: colgroup,
      onSortChange: this.handleSortChange,
      onColChange: onResize
    }))));

    if (sticky) {
      var stickyProps = Object.assign({
        top: 0
      }, sticky);
      return _react.default.createElement(_Sticky.default, (0, _extends2.default)({}, stickyProps, {
        key: "head"
      }), header);
    }

    return header;
  };

  _proto.render = function render() {
    var _this$props9 = this.props,
        fixed = _this$props9.fixed,
        hideHeader = _this$props9.hideHeader;
    var _this$state3 = this.state,
        scrollLeft = _this$state3.scrollLeft,
        floatFixed = _this$state3.floatFixed;
    var floatClass = [];

    if (floatFixed) {
      if (scrollLeft > 0) {
        floatClass.push('float-left');
      }

      if (scrollLeft !== 1) {
        floatClass.push('float-right');
      }
    }

    if (fixed === 'y' || fixed === 'both') {
      floatClass.push('scroll-y');
    }

    return [hideHeader ? null : this.renderHeader(floatClass), _react.default.createElement(_context.Provider, {
      value: true,
      key: "body"
    }, this.renderBody(floatClass))];
  };

  return SeperateTable;
}(_component.PureComponent);

SeperateTable.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'size', 'type', 'kengen'), {
  columns: _propTypes.default.array.isRequired,
  data: _propTypes.default.array,
  fixed: _propTypes.default.string.isRequired,
  onScroll: _propTypes.default.func,
  rowHeight: _propTypes.default.number,
  rowsInView: _propTypes.default.number.isRequired,
  tableRef: _propTypes.default.func,
  width: _propTypes.default.number,
  scrollLeft: _propTypes.default.number,
  onResize: _propTypes.default.func,
  innerScrollAttr: _propTypes.default.arrayOf(_propTypes.default.string),
  sticky: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.bool]),
  hideHeader: _propTypes.default.bool
});
SeperateTable.defaultProps = {
  data: undefined,
  rowHeight: 40,
  width: undefined
};
var _default = SeperateTable;
exports.default = _default;