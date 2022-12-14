"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _locale = require("../locale");

var _LazyList = _interopRequireDefault(require("../AnimationList/LazyList"));

var _styles = require("./styles");

var _is = require("../utils/is");

var _uid = require("../utils/uid");

var _lazyload = require("../utils/lazyload");

var _Spin = _interopRequireDefault(require("../Spin"));

var _getDataset = _interopRequireDefault(require("../utils/dom/getDataset"));

var _Checkbox = _interopRequireDefault(require("../Table/Checkbox"));

var _config = require("../config");

var Index =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Index, _Component);

  function Index(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.bindNode = _this.bindNode.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindObserver = _this.bindObserver.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.scrollLoading = _this.scrollLoading.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderItem = _this.renderItem.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.id = null;
    return _this;
  }

  var _proto = Index.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    (0, _lazyload.removeStack)(this.id, true);
    this.node = null;
    this.observer = null;
    this.id = null;
  };

  _proto.getItemClassName = function getItemClassName(value, index, flag) {
    var rowClassName = this.props.rowClassName;
    var base = (0, _styles.listClass)('item', flag && 'checkbox');
    if ((0, _is.isFunc)(rowClassName)) return (0, _classnames.default)(base, rowClassName(value, index));
    if ((0, _is.isString)(rowClassName)) return (0, _classnames.default)(base, rowClassName);
    return base;
  };

  _proto.getContent = function getContent(value, index) {
    var renderItem = this.props.renderItem;
    if ((0, _is.isFunc)(renderItem)) return renderItem(value, index);
    if ((0, _is.isString)(renderItem)) return value[renderItem];
    if ((0, _is.isString)(value)) return value;
    return null;
  };

  _proto.scrollLoading = function scrollLoading() {
    var scrollLoading = this.props.scrollLoading;
    if (!(0, _is.isFunc)(scrollLoading)) return;
    scrollLoading();
  };

  _proto.bindNode = function bindNode(node) {
    this.node = node;
  };

  _proto.bindObserver = function bindObserver(node) {
    this.observer = node;
    if (!node) return;
    (0, _lazyload.removeStack)(this.id, true);
    this.id = (0, _lazyload.addStack)({
      container: this.node,
      element: node,
      render: this.scrollLoading,
      offset: 20,
      noRemove: true
    });
  };

  _proto.renderCheckBox = function renderCheckBox(flag, data, index) {
    if (!flag) return null;
    var datum = this.props.datum;
    return _react.default.createElement(_Checkbox.default, {
      data: data,
      index: index,
      datum: datum,
      force: datum.check(data)
    });
  };

  _proto.renderItem = function renderItem(value, index) {
    var _this$props = this.props,
        keygen = _this$props.keygen,
        onChange = _this$props.onChange;
    var haveRowSelected = (0, _is.isFunc)(onChange);
    return _react.default.createElement("div", {
      className: this.getItemClassName(value, index, haveRowSelected),
      key: (0, _uid.getKey)(value, keygen, index)
    }, this.renderCheckBox(haveRowSelected, value, index), this.getContent(value, index));
  };

  _proto.renderList = function renderList(isEmpty) {
    var _this$props2 = this.props,
        data = _this$props2.data,
        empty = _this$props2.empty,
        keygen = _this$props2.keygen,
        fixed = _this$props2.fixed,
        rowsInView = _this$props2.rowsInView,
        lineHeight = _this$props2.lineHeight,
        value = _this$props2.value,
        colNum = _this$props2.colNum;
    if (isEmpty) return _react.default.createElement("div", {
      className: (0, _styles.listClass)('item', 'empty')
    }, empty || (0, _locale.getLocale)('noData'));

    if (!fixed) {
      var items = data.map(this.renderItem);

      if (colNum && colNum > 1) {
        var frs = Array(colNum).fill('1fr').join(' ');
        return _react.default.createElement("div", {
          style: {
            display: 'grid',
            gridTemplateColumns: frs
          }
        }, items);
      }

      return items;
    }

    return _react.default.createElement(_LazyList.default, {
      lineHeight: lineHeight,
      data: data,
      keygen: keygen,
      renderItem: this.renderItem,
      itemsInView: rowsInView,
      force: value,
      colNum: colNum
    });
  };

  _proto.renderFooter = function renderFooter() {
    var footer = this.props.footer;
    if ((0, _is.isFunc)(footer)) return _react.default.createElement("div", {
      className: (0, _styles.listClass)('footer')
    }, footer());
    if ((0, _react.isValidElement)(footer)) return _react.default.createElement("div", {
      className: (0, _styles.listClass)('footer')
    }, footer);
    return null;
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        data = _this$props3.data,
        loading = _this$props3.loading,
        style = _this$props3.style,
        size = _this$props3.size,
        bordered = _this$props3.bordered,
        fixed = _this$props3.fixed,
        height = _this$props3.height,
        scrollLoading = _this$props3.scrollLoading;
    var isEmpty = !(0, _is.isArray)(data) || data.length <= 0;
    var ms = Object.assign({}, style, height && {
      height: height
    });
    return _react.default.createElement("div", (0, _extends2.default)({
      className: (0, _classnames.default)((0, _styles.listClass)('container', size, bordered && 'bordered', fixed && 'fixed', (0, _config.isRTL)() && 'rtl'), this.props.className),
      style: ms,
      ref: this.bindNode
    }, (0, _getDataset.default)(this.props)), loading && _react.default.createElement("div", {
      className: (0, _styles.listClass)('loading')
    }, typeof loading === 'boolean' ? _react.default.createElement(_Spin.default, {
      size: 40
    }) : loading), _react.default.createElement("div", {
      className: (0, _styles.listClass)('list', isEmpty && 'empty')
    }, this.renderList(isEmpty)), !isEmpty && (0, _is.isFunc)(scrollLoading) && _react.default.createElement("div", {
      ref: this.bindObserver
    }), this.renderFooter());
  };

  return Index;
}(_react.Component);

Index.propTypes = {
  onChange: _propTypes.default.func,
  className: _propTypes.default.string,
  data: _propTypes.default.array,
  renderItem: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]),
  footer: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  datum: _propTypes.default.object.isRequired,
  keygen: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string, _propTypes.default.bool]).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  format: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]),
  loading: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.node]),
  style: _propTypes.default.object,
  scrollLoading: _propTypes.default.func,
  rowClassName: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  size: _propTypes.default.oneOf(['default', 'small', 'large']),
  bordered: _propTypes.default.bool,
  empty: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  fixed: _propTypes.default.bool,
  rowsInView: _propTypes.default.number,
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  lineHeight: _propTypes.default.number,
  value: _propTypes.default.array,
  colNum: _propTypes.default.number
};
Index.defaultProps = {
  size: 'default',
  loading: false,
  colNum: 1
};
Index.displayName = 'ShineoutList';
var _default = Index;
exports.default = _default;