"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _component = require("../component");

var _proptypes = require("../utils/proptypes");

var _Tree = _interopRequireDefault(require("../Datum/Tree"));

var _Root = _interopRequireDefault(require("./Root"));

var Tree =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Tree, _PureComponent);

  function Tree(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      active: null
    };
    _this.nodes = new Map();
    _this.datum = props.datum || new _Tree.default({
      data: props.data,
      loader: props.loader,
      keygen: props.keygen,
      mode: props.mode,
      onChange: props.onChange,
      value: props.value || props.defaultValue,
      disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
      childrenKey: props.childrenKey,
      unmatch: props.unmatch
    });
    _this.handleDrop = _this.handleDrop.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleToggle = _this.handleToggle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleNodeClick = _this.handleNodeClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindNode = _this.bindNode.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.unbindNode = _this.unbindNode.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleDragImageSelector = _this.handleProps.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'dragImageSelector');
    _this.handleClidrenClass = _this.handleProps.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'childrenClass');
    _this.handleLeafClass = _this.handleProps.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'leafClass');

    _this.bindDatum();

    return _this;
  }

  var _proto = Tree.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.expanded !== this.props.expanded) {
      this.handleExpanded(this.props.expanded);
    }

    if (prevProps.active !== this.props.active) {
      this.handleActive(this.props.active);
    }

    if (this.props.onChange || this.props.onDrop || this.props.radioUpdate) {
      this.datum.mode = this.props.mode;
      if (prevProps.value !== this.props.value) this.datum.setValue(this.props.value || []);
      if (prevProps.data !== this.props.data && this.props.dataUpdate) this.datum.setData(this.props.data);
    }
  };

  _proto.getActive = function getActive() {
    var active = this.props.active;
    return active === undefined ? this.state.active : active;
  };

  _proto.bindDatum = function bindDatum() {
    var bindDatum = this.props.bindDatum;
    if (bindDatum) bindDatum(this.datum);
  };

  _proto.bindNode = function bindNode(id, update) {
    /*
    if (this.nodes.has(id)) {
      console.error(`Node with '${id}' key has already been added. Tree node's key must be unique.`)
      return {}
    }
    */
    this.nodes.set(id, update);
    var active = this.props.active === id;
    var expanded = this.props.expanded || this.props.defaultExpanded;

    if (this.props.defaultExpandAll) {
      return {
        active: active,
        expanded: true
      };
    }

    return {
      active: active,
      expanded: expanded && expanded.indexOf(id) >= 0
    };
  };

  _proto.unbindNode = function unbindNode(id) {
    this.nodes.delete(id);
  };

  _proto.handleExpanded = function handleExpanded(expanded) {
    var temp = new Set(expanded);

    for (var _iterator = this.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _ref2 = _ref,
          id = _ref2[0],
          update = _ref2[1];
      update('expanded', temp.has(id));
    }
  };

  _proto.handleActive = function handleActive(active) {
    for (var _iterator2 = this.nodes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var _ref4 = _ref3,
          id = _ref4[0],
          update = _ref4[1];
      update('active', id === active);
    }
  };

  _proto.handleNodeClick = function handleNodeClick(node, id) {
    var _this2 = this;

    var _this$props = this.props,
        active = _this$props.active,
        onClick = _this$props.onClick;

    if (active === undefined) {
      this.setState({
        active: id
      }, function () {
        _this2.handleActive(id);
      });
    }

    if (onClick) {
      onClick(node, id, this.datum.getPath(id));
    }
  };

  _proto.handleToggle = function handleToggle(id) {
    var _this$props2 = this.props,
        expanded = _this$props2.expanded,
        onExpand = _this$props2.onExpand;
    var newExpanded;

    if (!expanded && onExpand) {
      onExpand([id]);
      return;
    }

    if (expanded.indexOf(id) >= 0) {
      newExpanded = expanded.filter(function (e) {
        return e !== id;
      });
    } else {
      newExpanded = [].concat(expanded, [id]);
    }

    if (onExpand) onExpand(newExpanded);
  };

  _proto.handleDrop = function handleDrop(id, targetId, position) {
    var _this3 = this;

    var childrenKey = this.props.childrenKey;
    var current = this.datum.getPath(id);
    var target = this.datum.getPath(targetId);
    var data = (0, _immer.default)(this.props.data, function (draft) {
      var node = draft;
      var temp;
      var removeNode;
      var offset = 0;
      current.indexPath.forEach(function (p, i) {
        if (i < current.indexPath.length - 1) {
          node = node[p][childrenKey];
        } else {
          temp = node;

          removeNode = function removeNode() {
            return temp.splice(p, 1)[0];
          };

          node = node[p];
        }
      });
      var tnode = draft;
      target.indexPath.forEach(function (p, i) {
        if (i < target.indexPath.length - 1) {
          tnode = tnode[p][childrenKey];
        } else if (tnode === temp) {
          // same parent
          removeNode();

          if (current.index <= target.index) {
            offset = -1;
          }

          removeNode = function removeNode() {};
        }
      });

      if (position === -1) {
        tnode = tnode[target.index + offset];
        if (!Array.isArray(tnode[childrenKey])) tnode[childrenKey] = [];
        tnode[childrenKey].push(node);
        position = tnode[childrenKey].length - 1;

        var update = _this3.nodes.get(targetId);

        if (update) update('expanded', true);
      } else {
        tnode.splice(position + offset, 0, node);
        targetId = target.path[target.path.length - 1];
      }

      removeNode();
    });
    this.props.onDrop(data, id, targetId, position);
  };

  _proto.handleProps = function handleProps(key) {
    return this.props[key];
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        className = _this$props3.className,
        style = _this$props3.style,
        data = _this$props3.data,
        disabled = _this$props3.disabled,
        line = _this$props3.line,
        keygen = _this$props3.keygen,
        onExpand = _this$props3.onExpand,
        onChange = _this$props3.onChange,
        renderItem = _this$props3.renderItem,
        mode = _this$props3.mode,
        onDrop = _this$props3.onDrop,
        loader = _this$props3.loader,
        parentClickExpand = _this$props3.parentClickExpand,
        childrenKey = _this$props3.childrenKey,
        expandIcons = _this$props3.expandIcons,
        dragImageStyle = _this$props3.dragImageStyle,
        dragImageSelector = _this$props3.dragImageSelector,
        childrenClass = _this$props3.childrenClass,
        leafClass = _this$props3.leafClass,
        dragHoverExpand = _this$props3.dragHoverExpand,
        doubleClickExpand = _this$props3.doubleClickExpand,
        iconClass = _this$props3.iconClass,
        nodeClass = _this$props3.nodeClass,
        dragSibling = _this$props3.dragSibling;
    var onToggle = onExpand ? this.handleToggle : undefined;
    return _react.default.createElement(_Root.default, {
      className: className,
      data: data,
      datum: this.datum,
      disabled: typeof disabled !== 'function' && disabled,
      bindNode: this.bindNode,
      keygen: keygen,
      line: line,
      loader: loader,
      mode: mode,
      unbindNode: this.unbindNode,
      onChange: onChange,
      onDrop: onDrop && this.handleDrop,
      onToggle: onToggle,
      onNodeClick: this.handleNodeClick,
      renderItem: renderItem,
      style: style,
      parentClickExpand: parentClickExpand,
      childrenKey: childrenKey,
      expandIcons: expandIcons,
      dragImageStyle: dragImageStyle,
      dragImageSelector: typeof dragImageSelector === 'function' ? dragImageSelector : this.handleDragImageSelector,
      childrenClass: typeof childrenClass === 'function' ? childrenClass : this.handleClidrenClass,
      leafClass: typeof leafClass === 'function' ? leafClass : this.handleLeafClass,
      dragHoverExpand: dragHoverExpand,
      doubleClickExpand: doubleClickExpand,
      iconClass: iconClass,
      nodeClass: nodeClass,
      dragSibling: dragSibling
    });
  };

  return Tree;
}(_component.PureComponent);

Tree.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default), {
  active: _propTypes.default.any,
  data: _propTypes.default.array,
  defaultExpanded: _propTypes.default.arrayOf(_propTypes.default.string),
  defaultValue: _propTypes.default.arrayOf(_propTypes.default.string),
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  expanded: _propTypes.default.arrayOf(_propTypes.default.string),
  line: _propTypes.default.bool,
  loader: _propTypes.default.func,
  mode: _propTypes.default.oneOf([0, 1, 2, 3, 4]),
  onChange: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onExpand: _propTypes.default.func,
  onDrop: _propTypes.default.func,
  value: _propTypes.default.array,
  datum: _propTypes.default.object,
  parentClickExpand: _propTypes.default.bool,
  defaultExpandAll: _propTypes.default.bool,
  dataUpdate: _propTypes.default.bool,
  childrenKey: _propTypes.default.string,
  expandIcons: _propTypes.default.array,
  dragImageStyle: _propTypes.default.object,
  radioUpdate: _propTypes.default.bool,
  doubleClickExpand: _propTypes.default.bool,
  dragSibling: _propTypes.default.bool,
  nodeClass: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  unmatch: _propTypes.default.bool
});
Tree.defaultProps = {
  data: [],
  defaultExpanded: [],
  defaultValue: [],
  mode: 0,
  dataUpdate: true,
  childrenKey: 'children',
  dragImageStyle: {}
};
var _default = Tree;
exports.default = _default;