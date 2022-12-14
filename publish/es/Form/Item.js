import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import immer from 'immer';
import createReactContext from '../context';
import { Component } from '../component';
import { errorSubscribe, RESET_TOPIC } from '../Datum/types';
import { getGrid } from '../Grid/utils';
import { getProps, defaultProps } from '../utils/proptypes';
import { objectValues } from '../utils/objects';
import { formClass } from './styles';

var _createReactContext = createReactContext(),
    Provider = _createReactContext.Provider,
    Consumer = _createReactContext.Consumer;

var Label =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Label, _PureComponent);

  function Label() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Label.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        width = _this$props.width,
        children = _this$props.children;
    if (children === undefined) return null;
    return React.createElement("div", {
      style: {
        width: width
      },
      className: formClass('label')
    }, children);
  };

  return Label;
}(PureComponent); // eslint-disable-next-line


_defineProperty(Label, "propTypes", {
  children: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
});

var Item =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Item, _Component);

  function Item(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      inputs: {},
      errors: {}
    };
    _this.events = {
      bindInputToItem: _this.bind.bind(_assertThisInitialized(_assertThisInitialized(_this))),
      unbindInputFromItem: _this.unbind.bind(_assertThisInitialized(_assertThisInitialized(_this))),
      onItemError: _this.handleError.bind(_assertThisInitialized(_assertThisInitialized(_this)))
    };
    _this.handleUpdate = _this.handleUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    if (props.formDatum) props.formDatum.subscribe(RESET_TOPIC, _this.handleUpdate);
    return _this;
  }

  var _proto2 = Item.prototype;

  _proto2.getErrors = function getErrors() {
    var formDatum = this.props.formDatum;
    var errors = [];

    if (formDatum) {
      Object.keys(this.state.inputs).forEach(function (name) {
        var err = formDatum.getError(name);
        if (err) errors.push(err);
      });
    }

    objectValues(this.state.errors).forEach(function (err) {
      if (err) errors.push(err);
    });
    return errors;
  };

  _proto2.handleUpdate = function handleUpdate() {
    var _this2 = this;

    if (this.updateTimer) clearTimeout(this.updateTimer);
    this.updateTimer = setTimeout(function () {
      _this2.forceUpdate();
    });
  };

  _proto2.bind = function bind(name) {
    var _this3 = this;

    var names = Array.isArray(name) ? name : [name];
    var formDatum = this.props.formDatum;

    if (formDatum) {
      names.forEach(function (n) {
        formDatum.subscribe(errorSubscribe(n), _this3.handleUpdate);
      });
    }

    this.setState(immer(function (state) {
      names.forEach(function (n) {
        state.inputs[n] = true;
      });
    }));
  };

  _proto2.unbind = function unbind(name) {
    var names = Array.isArray(name) ? name : [name];
    var formDatum = this.props.formDatum;

    if (formDatum) {
      names.forEach(function (n) {
        formDatum.unsubscribe(errorSubscribe(n));
      });
    }

    this.setState(immer(function (state) {
      names.forEach(function (n) {
        delete state.inputs[n];
      });
    }));
  };

  _proto2.handleError = function handleError(name, error) {
    this.setState(immer(function (state) {
      state.errors[name] = error;
    }));
  };

  _proto2.renderHelp = function renderHelp(errors) {
    var realErrors = errors.filter(function (e) {
      return e.message;
    });

    if (realErrors.length > 0) {
      return React.createElement("div", {
        className: formClass('error')
      }, realErrors.map(function (e, i) {
        return React.createElement("div", {
          key: i
        }, e.message);
      }));
    }

    var tip = this.props.tip;
    if (!tip) return null;
    return React.createElement("div", {
      className: formClass('tip')
    }, tip);
  };

  _proto2.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        grid = _this$props2.grid,
        label = _this$props2.label,
        labelAlign = _this$props2.labelAlign,
        labelVerticalAlign = _this$props2.labelVerticalAlign,
        labelWidth = _this$props2.labelWidth,
        required = _this$props2.required,
        style = _this$props2.style,
        keepErrorHeight = _this$props2.keepErrorHeight;
    var errors = this.getErrors();
    var className = classnames(getGrid(grid), formClass('item', required && 'required', errors.length > 0 && 'invalid', labelVerticalAlign && "label-vertical-align-" + labelVerticalAlign, keepErrorHeight && "item-keep-height", ['top', 'right', 'left'].indexOf(labelAlign) >= 0 && "label-align-" + labelAlign), this.props.className);
    return React.createElement(Provider, {
      value: this.events
    }, React.createElement("div", {
      className: className,
      style: style
    }, React.createElement(Label, {
      width: labelWidth
    }, label), React.createElement("div", {
      className: formClass('control')
    }, children, this.renderHelp(errors))));
  };

  return Item;
}(Component);

Item.propTypes = _objectSpread({}, getProps(PropTypes, 'children', 'grid'), {
  className: PropTypes.string,
  // formItemErrors: PropTypes.array,
  keepErrorHeight: PropTypes.bool,
  label: PropTypes.any,
  labelAlign: PropTypes.string,
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  tip: PropTypes.any
});
Item.defaultProps = _objectSpread({}, defaultProps, {
  formItemErrors: [],
  keepErrorHeight: false
});
export default Item; // eslint-disable-next-line

export var itemConsumer = function itemConsumer(Origin) {
  return function (props) {
    return React.createElement(Consumer, null, function (events) {
      return React.createElement(Origin, _extends({}, props, events));
    });
  };
};