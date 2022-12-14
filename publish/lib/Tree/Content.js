"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _component = require("../component");

var _styles = require("./styles");

var _Spin = _interopRequireDefault(require("../Spin"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _types = require("../Datum/types");

var loading = _react.default.createElement("span", {
  className: (0, _styles.treeClass)('icon-loading')
}, _react.default.createElement(_Spin.default, {
  name: "ring",
  size: 12
}));

var Content =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Content, _PureComponent);

  function Content(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleNodeClick = _this.handleNodeClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleNodeExpand = _this.handleNodeExpand.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleIndicatorClick = _this.handleIndicatorClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleUpdate = _this.handleUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Content.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    var datum = this.props.datum;
    datum.subscribe(_types.CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    var datum = this.props.datum;
    datum.unsubscribe(_types.CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.handleNodeClick = function handleNodeClick() {
    var _this$props = this.props,
        data = _this$props.data,
        id = _this$props.id,
        parentClickExpand = _this$props.parentClickExpand,
        childrenKey = _this$props.childrenKey;
    var children = data[childrenKey];
    var hasChildren = children && children.length > 0;

    if (hasChildren && parentClickExpand) {
      this.handleIndicatorClick();
    } else {
      this.props.onNodeClick(data, id);
    }
  };

  _proto.handleUpdate = function handleUpdate() {
    this.forceUpdate();
  };

  _proto.handleNodeExpand = function handleNodeExpand() {
    var _this$props2 = this.props,
        data = _this$props2.data,
        childrenKey = _this$props2.childrenKey,
        doubleClickExpand = _this$props2.doubleClickExpand;
    if (!doubleClickExpand) return;
    var children = data[childrenKey];
    var hasChildren = children && children.length > 0;
    if (hasChildren) this.handleIndicatorClick();
  };

  _proto.handleIndicatorClick = function handleIndicatorClick() {
    var _this$props3 = this.props,
        id = _this$props3.id,
        data = _this$props3.data,
        onToggle = _this$props3.onToggle,
        loader = _this$props3.loader,
        childrenKey = _this$props3.childrenKey,
        setFetching = _this$props3.setFetching;
    onToggle();
    if (data[childrenKey] !== undefined) return;
    setFetching(true);
    loader(id, data);
  };

  _proto.renderNode = function renderNode() {
    var _this$props4 = this.props,
        id = _this$props4.id,
        active = _this$props4.active,
        data = _this$props4.data,
        renderItem = _this$props4.renderItem,
        expanded = _this$props4.expanded;
    var render = typeof renderItem === 'function' ? renderItem : function (d) {
      return d[renderItem];
    };
    return render(data, expanded, active, id);
  };

  _proto.renderIndicator = function renderIndicator() {
    var _this$props5 = this.props,
        data = _this$props5.data,
        expanded = _this$props5.expanded,
        expandIcons = _this$props5.expandIcons,
        loader = _this$props5.loader,
        childrenKey = _this$props5.childrenKey,
        fetching = _this$props5.fetching,
        iconClass = _this$props5.iconClass;
    var children = data[childrenKey];
    var icon = expandIcons ? expandIcons[expanded + 0] : _react.default.createElement("span", {
      className: (0, _styles.treeClass)('default-icon')
    });

    var indicator = _react.default.createElement("a", {
      onClick: this.handleIndicatorClick,
      className: (0, _classnames.default)((0, _styles.treeClass)("icon-" + (expanded ? 'sub' : 'plus')), iconClass)
    }, typeof icon === 'function' ? icon(data) : icon);

    if (children && children.length > 0) return indicator;
    if (Array.isArray(children) || children === null) return null;
    if (fetching && !children) return loading;
    if (loader && !fetching) return indicator;
    return null;
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        data = _this$props6.data,
        onToggle = _this$props6.onToggle,
        onChange = _this$props6.onChange,
        expanded = _this$props6.expanded,
        draggable = _this$props6.draggable,
        onDragOver = _this$props6.onDragOver,
        onDrop = _this$props6.onDrop,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props6, ["data", "onToggle", "onChange", "expanded", "draggable", "onDragOver", "onDrop"]);
    return _react.default.createElement("div", {
      onDragOver: onDragOver
    }, this.renderIndicator(), _react.default.createElement("div", {
      className: (0, _styles.treeClass)('content')
    }, onChange && _react.default.createElement(_Checkbox.default, (0, _extends2.default)({}, other, {
      onChange: onChange
    })), _react.default.createElement("div", {
      className: (0, _styles.treeClass)('text'),
      onClick: this.handleNodeClick,
      onDoubleClick: this.handleNodeExpand
    }, this.renderNode())));
  };

  return Content;
}(_component.PureComponent);

Content.propTypes = {
  active: _propTypes.default.bool,
  data: _propTypes.default.object,
  draggable: _propTypes.default.bool,
  expanded: _propTypes.default.bool,
  loader: _propTypes.default.func,
  id: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  onChange: _propTypes.default.func,
  onToggle: _propTypes.default.func,
  onDragOver: _propTypes.default.func,
  onDrop: _propTypes.default.func,
  onNodeClick: _propTypes.default.func,
  renderItem: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]).isRequired,
  parentClickExpand: _propTypes.default.bool,
  childrenKey: _propTypes.default.string,
  expandIcons: _propTypes.default.array,
  setFetching: _propTypes.default.func,
  fetching: _propTypes.default.bool,
  doubleClickExpand: _propTypes.default.bool,
  iconClass: _propTypes.default.string,
  datum: _propTypes.default.object
};
var _default = Content;
exports.default = _default;