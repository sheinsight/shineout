import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import DatumTree from '../Datum/Tree';
import shallowEqual from '../utils/shallowEqual';

function toArray(value) {
  if (!value) return [];
  if (!Array.isArray(value)) return [value];
  return value;
}

export default function datum(Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(TreeDatum, _React$Component);

    function TreeDatum(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.datum = new DatumTree({
        data: props.data,
        loader: props.loader,
        keygen: props.keygen,
        mode: props.mode,
        value: toArray(props.value),
        onChange: props.onChange,
        disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
        childrenKey: props.childrenKey,
        unmatch: props.unmatch
      });
      return _this;
    }

    var _proto = TreeDatum.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (!shallowEqual(prevProps.data, this.props.data)) {
        var disabled = this.props.disabled;
        this.datum.updateDisabled(typeof disabled === 'function' ? disabled : undefined);
        this.datum.setData(this.props.data, true);
        this.forceUpdate();
      }
    };

    _proto.render = function render() {
      var value = this.props.value;

      var props = _objectSpread({}, this.props, {
        datum: this.datum
      });

      if (!shallowEqual(toArray(value), this.datum.getValue())) {
        this.datum.setValue(toArray(value));
      }

      return React.createElement(Origin, props);
    };

    return TreeDatum;
  }(React.Component), _defineProperty(_class, "propTypes", {
    loader: PropTypes.func,
    data: PropTypes.array,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    mode: PropTypes.oneOf([0, 1, 2, 3, 4]),
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
    keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    multiple: PropTypes.bool,
    childrenKey: PropTypes.string,
    unmatch: PropTypes.bool
  }), _defineProperty(_class, "defaultProps", {
    mode: 1,
    childrenKey: 'children'
  }), _temp;
}