import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PureComponent } from '../component';
import { treeClass } from './styles';
import Spin from '../Spin';
import Checkbox from './Checkbox';
import { CHANGE_TOPIC } from '../Datum/types';
var loading = React.createElement("span", {
  className: treeClass('icon-loading')
}, React.createElement(Spin, {
  name: "ring",
  size: 12
}));

var Content =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Content, _PureComponent);

  function Content(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleNodeClick = _this.handleNodeClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleNodeExpand = _this.handleNodeExpand.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleIndicatorClick = _this.handleIndicatorClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleUpdate = _this.handleUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Content.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    var datum = this.props.datum;
    datum.subscribe(CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    var datum = this.props.datum;
    datum.unsubscribe(CHANGE_TOPIC, this.handleUpdate);
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
    var icon = expandIcons ? expandIcons[expanded + 0] : React.createElement("span", {
      className: treeClass('default-icon')
    });
    var indicator = React.createElement("a", {
      onClick: this.handleIndicatorClick,
      className: classnames(treeClass("icon-" + (expanded ? 'sub' : 'plus')), iconClass)
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
        other = _objectWithoutPropertiesLoose(_this$props6, ["data", "onToggle", "onChange", "expanded", "draggable", "onDragOver", "onDrop"]);

    return React.createElement("div", {
      onDragOver: onDragOver
    }, this.renderIndicator(), React.createElement("div", {
      className: treeClass('content')
    }, onChange && React.createElement(Checkbox, _extends({}, other, {
      onChange: onChange
    })), React.createElement("div", {
      className: treeClass('text'),
      onClick: this.handleNodeClick,
      onDoubleClick: this.handleNodeExpand
    }, this.renderNode())));
  };

  return Content;
}(PureComponent);

Content.propTypes = {
  active: PropTypes.bool,
  data: PropTypes.object,
  draggable: PropTypes.bool,
  expanded: PropTypes.bool,
  loader: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  onNodeClick: PropTypes.func,
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  parentClickExpand: PropTypes.bool,
  childrenKey: PropTypes.string,
  expandIcons: PropTypes.array,
  setFetching: PropTypes.func,
  fetching: PropTypes.bool,
  doubleClickExpand: PropTypes.bool,
  iconClass: PropTypes.string,
  datum: PropTypes.object
};
export default Content;