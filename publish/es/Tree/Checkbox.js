import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../component';
import Checkbox from '../Checkbox/Checkbox';
import { treeClass } from './styles';
import { getDirectionClass } from '../utils/classname';

var TreeCheckbox =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(TreeCheckbox, _PureComponent);

  function TreeCheckbox(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    props.datum.bind(props.id, _this.forceUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this))));
    return _this;
  }

  var _proto = TreeCheckbox.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this); // When dragging a node,
    // it will first trigger the constructor of the new node,
    // then trigger the willUnmount of the old node,
    // and finally trigger the didMount of the new node,
    // the old node will unload the update event, so bind it here again


    this.props.datum.bind(this.props.id, this.forceUpdate.bind(this));
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.props.datum.unbind(this.props.id);
  };

  _proto.checkDisabled = function checkDisabled() {
    var _this$props = this.props,
        datum = _this$props.datum,
        id = _this$props.id,
        disabled = _this$props.disabled;
    if (disabled) return true;
    return datum.isDisabled(id);
  };

  _proto.handleChange = function handleChange(v, checked) {
    var _this$props2 = this.props,
        datum = _this$props2.datum,
        id = _this$props2.id,
        onChange = _this$props2.onChange;
    datum.set(id, checked ? 1 : 0);
    onChange(datum.getValue(), id);
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        datum = _this$props3.datum,
        id = _this$props3.id;
    var checked = datum.getChecked(id);
    return React.createElement(Checkbox, {
      checked: checked,
      disabled: this.checkDisabled(),
      onChange: this.handleChange,
      className: treeClass(getDirectionClass('checkbox'))
    });
  };

  return TreeCheckbox;
}(PureComponent);

_defineProperty(TreeCheckbox, "propTypes", {
  datum: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired
});

export { TreeCheckbox as default };