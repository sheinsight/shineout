import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../component';
import { tableClass } from './styles';
import { range, split } from '../utils/numbers';
import Colgroup from './Colgroup';
import Tbody from './Tbody';
import Thead from './Thead';
import { compareColumns } from '../utils/shallowEqual';
import Sticky from '../Sticky';
import { addResizeObserver } from '../utils/dom/element';

function setScrollLeft(target, scrollLeft) {
  if (target && target.scrollLeft !== scrollLeft) target.scrollLeft = scrollLeft;
}

var SimpleTable =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(SimpleTable, _PureComponent);

  function SimpleTable(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      colgroup: undefined,
      scrollAble: false,
      resize: false
    };
    _this.handleSortChange = _this.handleSortChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindHeader = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'header');
    _this.bindBody = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'body');
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleColgroup = _this.handleColgroup.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.resetColGroup = _this.resetColGroup.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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

    if (resize || shouldResetColgroup || !compareColumns(prevProps.columns, this.props.columns)) {
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
      this.removeReiszeObserver = addResizeObserver(el, this.resetColGroup, {
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
        split(width, range(colSpan).map(function (j) {
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
    var inner = React.createElement("table", {
      style: {
        width: width
      },
      className: tableClass(bordered && 'table-bordered')
    }, React.createElement(Colgroup, {
      colgroup: colgroup || this.lastColGroup,
      columns: columns,
      resizable: columnResizable
    }), React.createElement(Thead, _extends({}, this.props, {
      colgroup: colgroup,
      onSortChange: this.handleSortChange,
      onColChange: onResize
    })));
    var empty = data.length === 0;
    var headerStyle = {};
    if (!empty) headerStyle.overflowY = scrollAble ? 'scroll' : 'hidden';
    var header = React.createElement("div", {
      key: "head",
      style: headerStyle,
      className: tableClass('head', 'simple-head', empty && 'empty-head'),
      ref: this.bindHeader
    }, inner);

    if (sticky) {
      var stickyProps = Object.assign({
        top: 0
      }, sticky);
      return React.createElement(Sticky, _extends({}, stickyProps, {
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
        others = _objectWithoutPropertiesLoose(_this$props3, ["columns", "width", "fixed", "columnResizable", "bordered"]);

    var _this$state2 = this.state,
        colgroup = _this$state2.colgroup,
        resize = _this$state2.resize;
    var minWidthSup = columns.find(function (d) {
      return d.minWidth;
    });
    return React.createElement("div", {
      key: "body",
      className: tableClass('simple-body'),
      ref: this.bindBody,
      onScroll: this.handleScroll
    }, React.createElement("table", {
      style: {
        width: width
      },
      className: tableClass(!colgroup && minWidthSup && 'init', bordered && 'table-bordered')
    }, React.createElement(Colgroup, {
      colgroup: colgroup,
      columns: columns,
      resizable: columnResizable
    }), React.createElement(Tbody, _extends({
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
    if (!columns || columns.length === 0) return React.createElement("table", {
      style: {
        width: width
      },
      className: tableClass(bordered && 'table-bordered')
    }, children);
    return [hideHeader ? null : this.renderHeader(), this.renderBody(), children];
  };

  return SimpleTable;
}(PureComponent);

SimpleTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  fixed: PropTypes.string,
  width: PropTypes.number,
  onResize: PropTypes.func,
  onSortChange: PropTypes.func,
  children: PropTypes.any,
  dataChangeResize: PropTypes.bool,
  columnResizable: PropTypes.bool,
  sticky: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  hideHeader: PropTypes.bool,
  bordered: PropTypes.bool
};
SimpleTable.defaultProps = {
  data: undefined,
  width: undefined
};
export default SimpleTable;