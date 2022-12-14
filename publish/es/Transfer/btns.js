import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { getKey } from '../utils/uid';
import Button from '../Button';
import { Component } from '../component';
import { transferClass } from './styles';
import icons from '../icons';
import { isRTL } from '../config';

var Btns =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Btns, _Component);

  function Btns(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.toSource = _this.change.bind(_assertThisInitialized(_assertThisInitialized(_this)), 0);
    _this.toTarget = _this.change.bind(_assertThisInitialized(_assertThisInitialized(_this)), 1);
    return _this;
  }

  var _proto = Btns.prototype;

  _proto.getDataMap = function getDataMap() {
    var _this$props = this.props,
        data = _this$props.data,
        keygen = _this$props.keygen;
    var dataMap = new Map();

    for (var i = 0; i < data.length; i++) {
      dataMap.set(getKey(data[i], keygen, i), data[i]);
    }

    return dataMap;
  };

  _proto.change = function change(index) {
    var _this$props2 = this.props,
        setSelecteds = _this$props2.setSelecteds,
        selecteds = _this$props2.selecteds,
        datum = _this$props2.datum;
    var dataMap = this.getDataMap();
    var newValue = selecteds[1 - index].map(function (c) {
      return dataMap.get(c);
    }); // const newValue = selecteds[1 - index].map(c => data.find((d, i) => getKey(d, keygen, i) === c))

    setSelecteds(1 - index, []);
    datum[index ? 'add' : 'remove'](newValue, undefined, undefined, true);
  };

  _proto.renderButtonText = function renderButtonText(mode) {
    if (mode === void 0) {
      mode = 'left';
    }

    var _this$props3 = this.props,
        operations = _this$props3.operations,
        operationIcon = _this$props3.operationIcon;

    if (mode === 'left') {
      var left = [React.createElement(React.Fragment, {
        key: "operationIcon"
      }, operationIcon && icons.AngleLeft), React.createElement(React.Fragment, {
        key: "operations"
      }, operations[1])];
      if (isRTL()) return left.reverse();
      return left;
    }

    var right = [React.createElement(React.Fragment, {
      key: "operationIcon"
    }, operationIcon && icons.AngleRight), React.createElement(React.Fragment, {
      key: "operations"
    }, operations[0])];
    if (isRTL()) return right.reverse();
    return right;
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        selecteds = _this$props4.selecteds,
        disabled = _this$props4.disabled;
    var disable = disabled === true;
    return React.createElement("div", {
      className: transferClass('btns')
    }, React.createElement("div", null, React.createElement(Button, {
      type: "primary",
      disabled: disable || !selecteds[0].length,
      size: "small",
      className: transferClass('btns-button', 'btns-bottom'),
      onClick: this.toTarget
    }, this.renderButtonText('right')), React.createElement("br", null), React.createElement(Button, {
      type: "primary",
      disabled: disable || !selecteds[1].length,
      size: "small",
      className: transferClass('btns-button'),
      onClick: this.toSource
    }, this.renderButtonText('left'))));
  };

  return Btns;
}(Component);

Btns.propTypes = {
  datum: PropTypes.object,
  selecteds: PropTypes.array,
  data: PropTypes.array,
  setSelecteds: PropTypes.func,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  operations: PropTypes.array,
  operationIcon: PropTypes.bool,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};
export default Btns;