"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _styles = require("./styles");

var _numbers = require("../utils/numbers");

var _Colgroup = _interopRequireDefault(require("./Colgroup"));

var _Tbody = _interopRequireDefault(require("./Tbody"));

var _Thead = _interopRequireDefault(require("./Thead"));

var _shallowEqual = require("../utils/shallowEqual");

var _Sticky = _interopRequireDefault(require("../Sticky"));

var _element = require("../utils/dom/element");

function setScrollLeft(target, scrollLeft) {
  if (target && target.scrollLeft !== scrollLeft) target.scrollLeft = scrollLeft;
}

var SimpleTable =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(SimpleTable, _PureComponent);

  function SimpleTable(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      colgroup: undefined,
      scrollAble: false,
      resize: false
    };
    _this.handleSortChange = _this.handleSortChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindHeader = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'header');
    _this.bindBody = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'body');
    _this.handleScroll = _this.handleScroll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleColgroup = _this.handleColgroup.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.resetColGroup = _this.resetColGroup.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = SimpleTable.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.scrollCheck();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.scrollCheck();
    var resize = prevProps.data.length === 0 && this.props.data.length; // when resize

    if (resize && this.body) this.handleScroll({
      currentTarget: this.body
    });
    var shouldResetColgroup = this.props.dataChangeResize && this.props.data !== prevProps.data;

    if (resize || shouldResetColgroup || !(0, _shallowEqual.compareColumns)(prevProps.columns, this.props.columns)) {
      this.setState({
        colgroup: undefined,
        resize: true
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.body) this.body.removeEventListener('wheel', this.handleScroll);
    if (this.removeReiszeObserver) this.removeReiszeObserver();
  };

  _proto.bindElement = function bindElement(key, el) {
    this[key] = el; // this.body will be undefined on componentDidMount when columns length is 0

    if (key === 'body' && el) {
      el.addEventListener('wheel', this.handleScroll, {
        passive: false
      });
      this.removeReiszeObserver = (0, _element.addResizeObserver)(el, this.resetColGroup, {
        direction: 'x'
      });
    }
  };

  _proto.resetColGroup = function resetColGroup() {
    this.lastColGroup = this.state.colgroup || this.lastColGroup;
    this.setState({
      colgroup: undefined,
      resize: true
    });
  };

  _proto.scrollCheck = function scrollCheck() {
    var scrollAble = this.state.scrollAble;
    if (!this.body) return;
    var overHeight = this.body.scrollHeight > this.body.clientHeight;
    if (scrollAble !== overHeight) this.setState({
      scrollAble: overHeight
    });
  };

  _proto.handleSortChange = function handleSortChange() {
    var _this$props;

    if (this.body) this.body.scrollTop = 0;

    (_this$props = this.props).onSortChange.apply(_this$props, arguments);
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

  _proto.handleScroll = function handleScroll(_ref) {
    var currentTarget = _ref.currentTarget;
    var scrollLeft = currentTarget.scrollLeft;
    setScrollLeft(this.header, scrollLeft);
    setScrollLeft(this.body, scrollLeft);
  };

  _proto.renderHeader = function renderHeader() {
    var _this$props2 = this.props,
        columns = _this$props2.columns,
        width = _this$props2.width,
        data = _this$props2.data,
        onResize = _this$props2.onResize,
        columnResizable = _this$props2.columnResizable,
        sticky = _this$props2.sticky,
        bordered = _this$props2.bordered;
    var _this$state = this.state,
        colgroup = _this$state.colgroup,
        scrollAble = _this$state.scrollAble;

    var inner = _react.default.createElement("table", {
      style: {
        width: width
      },
      className: (0, _styles.tableClass)(bordered && 'table-bordered')
    }, _react.default.createElement(_Colgroup.default, {
      colgroup: colgroup || this.lastColGroup,
      columns: columns,
      resizable: columnResizable
    }), _react.default.createElement(_Thead.default, (0, _extends2.default)({}, this.props, {
      colgroup: colgroup,
      onSortChange: this.handleSortChange,
      onColChange: onResize
    })));

    var empty = data.length === 0;
    var headerStyle = {};
    if (!empty) headerStyle.overflowY = scrollAble ? 'scroll' : 'hidden';

    var header = _react.default.createElement("div", {
      key: "head",
      style: headerStyle,
      className: (0, _styles.tableClass)('head', 'simple-head', empty && 'empty-head'),
      ref: this.bindHeader
    }, inner);

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

  _proto.renderBody = function renderBody() {
    var _this$props3 = this.props,
        columns = _this$props3.columns,
        width = _this$props3.width,
        fixed = _this$props3.fixed,
        columnResizable = _this$props3.columnResizable,
        bordered = _this$props3.bordered,
        others = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["columns", "width", "fixed", "columnResizable", "bordered"]);
    var _this$state2 = this.state,
        colgroup = _this$state2.colgroup,
        resize = _this$state2.resize;
    var minWidthSup = columns.find(function (d) {
      return d.minWidth;
    });
    return _react.default.createElement("div", {
      key: "body",
      className: (0, _styles.tableClass)('simple-body'),
      ref: this.bindBody,
      onScroll: this.handleScroll
    }, _react.default.createElement("table", {
      style: {
        width: width
      },
      className: (0, _styles.tableClass)(!colgroup && minWidthSup && 'init', bordered && 'table-bordered')
    }, _react.default.createElement(_Colgroup.default, {
      colgroup: colgroup,
      columns: columns,
      resizable: columnResizable
    }), _react.default.createElement(_Tbody.default, (0, _extends2.default)({
      colgroup: colgroup,
      lazy: false,
      index: 0,
      columns: columns,
      onBodyRender: this.handleColgroup,
      resize: resize,
      bordered: bordered
    }, others))));
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        columns = _this$props4.columns,
        width = _this$props4.width,
        children = _this$props4.children,
        hideHeader = _this$props4.hideHeader,
        bordered = _this$props4.bordered;
    if (!columns || columns.length === 0) return _react.default.createElement("table", {
      style: {
        width: width
      },
      className: (0, _styles.tableClass)(bordered && 'table-bordered')
    }, children);
    return [hideHeader ? null : this.renderHeader(), this.renderBody(), children];
  };

  return SimpleTable;
}(_component.PureComponent);

SimpleTable.propTypes = {
  columns: _propTypes.default.array,
  data: _propTypes.default.array,
  fixed: _propTypes.default.string,
  width: _propTypes.default.number,
  onResize: _propTypes.default.func,
  onSortChange: _propTypes.default.func,
  children: _propTypes.default.any,
  dataChangeResize: _propTypes.default.bool,
  columnResizable: _propTypes.default.bool,
  sticky: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.bool]),
  hideHeader: _propTypes.default.bool,
  bordered: _propTypes.default.bool
};
SimpleTable.defaultProps = {
  data: undefined,
  width: undefined
};
var _default = SimpleTable;
exports.default = _default;