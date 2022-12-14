import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { getDirectionClass } from '../utils/classname';
import { PureComponent } from '../component';
import Checkbox from '../Checkbox';
import Spin from '../Spin';
import { cascaderClass } from './styles';
import Caret from '../icons/Caret';
import { getParent } from '../utils/dom/element';
import { checkinputClass } from '../Checkbox/styles';
import { isRTL } from '../config';
var checkBoxStyle = {
  marginRight: 8,
  marginTop: -1,
  verticalAlign: 'top'
};

var Node =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Node, _PureComponent);

  function Node(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      loading: false
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handlePathChange = _this.handlePathChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSelect = _this.handleSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Node.prototype;

  _proto.checkDisabled = function checkDisabled() {
    var _this$props = this.props,
        datum = _this$props.datum,
        id = _this$props.id,
        disabled = _this$props.disabled;
    if (disabled) return true;
    return datum.isDisabled(id);
  };

  _proto.handleClick = function handleClick() {
    var _this$props2 = this.props,
        id = _this$props2.id,
        data = _this$props2.data,
        path = _this$props2.path,
        onChange = _this$props2.onChange,
        onPathChange = _this$props2.onPathChange,
        loader = _this$props2.loader,
        multiple = _this$props2.multiple,
        datum = _this$props2.datum;
    onPathChange(id, data, path, true);

    if (!multiple) {
      onChange([].concat(path, [id]), datum.getDataById(id));
    }

    if (loader && !this.state.loading) {
      this.setState({
        loading: true
      });
      loader(id, data);
    }
  };

  _proto.handlePathChange = function handlePathChange() {
    var _this$props3 = this.props,
        id = _this$props3.id,
        data = _this$props3.data,
        path = _this$props3.path,
        onPathChange = _this$props3.onPathChange; // if (active) return

    onPathChange(id, data, path);
  };

  _proto.handleChange = function handleChange(_, checked) {
    var _this$props4 = this.props,
        datum = _this$props4.datum,
        id = _this$props4.id,
        onChange = _this$props4.onChange;
    datum.set(id, checked ? 1 : 0);
    onChange(datum.getValue(), datum.getDataById(id));
  };

  _proto.handleSelect = function handleSelect(e) {
    var _this$props5 = this.props,
        datum = _this$props5.datum,
        id = _this$props5.id;
    if (getParent(e.target, "." + checkinputClass('_'))) return;
    var checked = datum.getChecked(id);
    this.handleChange(null, !checked);
  };

  _proto.renderContent = function renderContent() {
    var _this$props6 = this.props,
        id = _this$props6.id,
        active = _this$props6.active,
        data = _this$props6.data,
        renderItem = _this$props6.renderItem;
    var render = typeof renderItem === 'function' ? renderItem : function (d) {
      return d[renderItem];
    };
    return render(data, active, id);
  };

  _proto.render = function render() {
    var _this$props7 = this.props,
        active = _this$props7.active,
        data = _this$props7.data,
        multiple = _this$props7.multiple,
        datum = _this$props7.datum,
        id = _this$props7.id,
        loader = _this$props7.loader,
        expandTrigger = _this$props7.expandTrigger,
        childrenKey = _this$props7.childrenKey;
    var loading = this.state.loading;
    var disabled = this.checkDisabled();
    var children = data[childrenKey];
    var hasChildren = children && children.length > 0;
    var mayChildren = loader && !loading && children === undefined;
    var className = cascaderClass('node', active && 'active', disabled && 'disabled', hasChildren && 'has-children', mayChildren && 'may-be-children');
    var style = {};
    var events = {};

    if (!disabled && (expandTrigger !== 'hover-only' || !children || children.length === 0)) {
      events.onClick = this.handleClick;
      style.cursor = 'pointer';
    }

    if (expandTrigger === 'hover' || expandTrigger === 'hover-only') {
      events.onMouseEnter = this.handlePathChange;
      if (multiple) events.onClick = this.handleSelect;
    }

    var caret = React.createElement("span", {
      className: cascaderClass(getDirectionClass('caret'))
    }, React.createElement(Caret, null));

    if (isRTL() && checkBoxStyle.marginRight !== 0) {
      checkBoxStyle.marginRight = 0;
    }

    return React.createElement("div", _extends({
      className: className,
      style: style
    }, events), multiple && React.createElement(Checkbox, {
      checked: datum.getChecked(id),
      disabled: disabled,
      onChange: this.handleChange,
      style: checkBoxStyle
    }), this.renderContent(), loading && children === undefined && React.createElement(Spin, {
      className: cascaderClass('loading'),
      size: 10,
      name: "ring"
    }), (hasChildren || mayChildren) && caret);
  };

  return Node;
}(PureComponent);

Node.propTypes = {
  active: PropTypes.bool,
  data: PropTypes.object,
  datum: PropTypes.object,
  disabled: PropTypes.bool,
  expandTrigger: PropTypes.string,
  id: PropTypes.string,
  loader: PropTypes.func,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onPathChange: PropTypes.func,
  path: PropTypes.array,
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  childrenKey: PropTypes.string
};
export default Node;