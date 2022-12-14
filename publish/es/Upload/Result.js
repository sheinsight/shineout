import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { uploadClass } from './styles';
import icons from '../icons';
import RemoveConfirm from './RemoveConfirm';
import { getDirectionClass } from '../utils/classname';

var Result =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Result, _PureComponent);

  function Result(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      confirm: false
    };
    _this.handleRemove = _this.handleRemove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleRecover = _this.handleRecover.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleConfirmChange = _this.handleConfirmChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Result.prototype;

  _proto.handleRemove = function handleRemove() {
    this.props.onRemove(this.props.index);
  };

  _proto.handleRecover = function handleRecover() {
    var _this$props = this.props,
        onRecover = _this$props.onRecover,
        value = _this$props.value,
        index = _this$props.index;
    onRecover(index, value);
  };

  _proto.handleConfirmChange = function handleConfirmChange(confirm) {
    this.setState({
      confirm: confirm
    });
  };

  _proto.render = function render() {
    var confirm = this.state.confirm;
    var _this$props2 = this.props,
        renderResult = _this$props2.renderResult,
        value = _this$props2.value,
        recoverAble = _this$props2.recoverAble,
        showRecover = _this$props2.showRecover,
        removeConfirm = _this$props2.removeConfirm;
    var className = uploadClass('view-value', recoverAble && 'to-be-delete', confirm && 'view-active');
    return React.createElement("div", {
      className: className
    }, React.createElement("div", {
      className: uploadClass(getDirectionClass('text'))
    }, renderResult(value)), this.props.onRemove && React.createElement("a", {
      className: uploadClass('delete'),
      onClick: removeConfirm ? undefined : this.handleRemove
    }, icons.Close, React.createElement(RemoveConfirm, {
      onVisibleChange: this.handleConfirmChange,
      confirm: removeConfirm,
      onRemove: this.handleRemove
    })), showRecover && React.createElement("a", {
      className: uploadClass('recover'),
      onClick: this.handleRecover
    }, icons.Recovery));
  };

  return Result;
}(PureComponent);

Result.propTypes = {
  index: PropTypes.number,
  onRemove: PropTypes.func,
  onRecover: PropTypes.func,
  recoverAble: PropTypes.bool,
  renderResult: PropTypes.func,
  showRecover: PropTypes.bool,
  value: PropTypes.any,
  removeConfirm: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
Result.defaultProps = {
  renderResult: function renderResult(a) {
    return a;
  },
  recoverAble: false
};
export default Result;