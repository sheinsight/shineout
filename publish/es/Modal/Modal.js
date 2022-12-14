import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import PropTypes from 'prop-types';
import { Component } from 'react';
import { defaultProps, getProps } from '../utils/proptypes';
import shallowEqual from '../utils/shallowEqual';
import { getUidStr } from '../utils/uid';
import { open, close, destroy } from './events';

var Modal =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Modal, _Component);

  function Modal(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.id = getUidStr();
    _this.visible = props.visible;
    _this.handleUpdate = _this.handleUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Modal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.visible && !this.props.usePortal) {
      open(this.getOption(), false);
    }
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    if (shallowEqual(this.props, nextProps)) return false;
    if (nextProps.visible) return true;
    close(_objectSpread({}, this.props, {
      id: this.id
    }), this.handleUpdate);
    return !shallowEqual(this.props, nextProps) && nextProps.visible;
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.props.visible && !this.props.usePortal) {
      open(this.getOption(), false);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var usePortal = this.props.usePortal;
    close({
      id: this.id
    });
    destroy(this.id, !usePortal);
  };

  _proto.getOption = function getOption() {
    var _this$props = this.props,
        children = _this$props.children,
        usePortal = _this$props.usePortal,
        visible = _this$props.visible,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "usePortal", "visible"]);

    return _objectSpread({}, props, {
      content: children,
      id: this.id,
      from: 'modal' // overwrite props from

    });
  };

  _proto.handleUpdate = function handleUpdate() {
    var destroyProps = this.props.destroy;
    if (destroyProps) this.forceUpdate();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        usePortal = _this$props2.usePortal,
        visible = _this$props2.visible;
    var option = this.getOption();
    if (visible && usePortal) return open(option, true);
    return null;
  };

  return Modal;
}(Component);

Modal.propTypes = _objectSpread({}, getProps(PropTypes), {
  usePortal: PropTypes.bool,
  destroy: PropTypes.bool
});
Modal.defaultProps = _objectSpread({}, defaultProps, {
  usePortal: true,
  visible: false,
  esc: true
});
Modal.displayName = 'ShineoutModal';
export default Modal;