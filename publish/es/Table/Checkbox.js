import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../component';
import { CHANGE_TOPIC } from '../Datum/types';
import Checkbox from '../Checkbox/Checkbox';
import Radio from '../Radio/Radio';

var TableCheckbox =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(TableCheckbox, _PureComponent);

  function TableCheckbox(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleUpdate = _this.forceUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = TableCheckbox.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    this.props.datum.subscribe(CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.props.datum.unsubscribe(CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.handleChange = function handleChange(_, checked, index) {
    var _this$props = this.props,
        data = _this$props.data,
        datum = _this$props.datum,
        treeColumnsName = _this$props.treeColumnsName;

    if (checked) {
      datum.add(data, index, treeColumnsName);
    } else {
      datum.remove(data, index, treeColumnsName);
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        data = _this$props2.data,
        datum = _this$props2.datum;
    var disabled = datum.disabled(data);
    var checked = datum.check(data);
    var CheckItem = datum.limit === 1 ? Radio : Checkbox;
    return React.createElement(CheckItem, _extends({}, this.props, {
      checked: checked,
      disabled: disabled,
      onChange: this.handleChange
    }));
  };

  return TableCheckbox;
}(PureComponent);

_defineProperty(TableCheckbox, "propTypes", {
  data: PropTypes.object.isRequired,
  datum: PropTypes.object.isRequired,
  treeColumnsName: PropTypes.string,
  checked: PropTypes.bool
});

export { TableCheckbox as default };