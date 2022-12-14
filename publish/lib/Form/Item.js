"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.itemConsumer = exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _immer = _interopRequireDefault(require("immer"));

var _context = _interopRequireDefault(require("../context"));

var _component = require("../component");

var _types = require("../Datum/types");

var _utils = require("../Grid/utils");

var _proptypes = require("../utils/proptypes");

var _objects = require("../utils/objects");

var _styles = require("./styles");

var _createReactContext = (0, _context.default)(),
    Provider = _createReactContext.Provider,
    Consumer = _createReactContext.Consumer;

var Label =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Label, _PureComponent);

  function Label() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Label.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        width = _this$props.width,
        children = _this$props.children;
    if (children === undefined) return null;
    return _react.default.createElement("div", {
      style: {
        width: width
      },
      className: (0, _styles.formClass)('label')
    }, children);
  };

  return Label;
}(_react.PureComponent); // eslint-disable-next-line


(0, _defineProperty2.default)(Label, "propTypes", {
  children: _propTypes.default.any,
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
});

var Item =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Item, _Component);

  function Item(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      inputs: {},
      errors: {}
    };
    _this.events = {
      bindInputToItem: _this.bind.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))),
      unbindInputFromItem: _this.unbind.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))),
      onItemError: _this.handleError.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)))
    };
    _this.handleUpdate = _this.handleUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    if (props.formDatum) props.formDatum.subscribe(_types.RESET_TOPIC, _this.handleUpdate);
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

    (0, _objects.objectValues)(this.state.errors).forEach(function (err) {
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
        formDatum.subscribe((0, _types.errorSubscribe)(n), _this3.handleUpdate);
      });
    }

    this.setState((0, _immer.default)(function (state) {
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
        formDatum.unsubscribe((0, _types.errorSubscribe)(n));
      });
    }

    this.setState((0, _immer.default)(function (state) {
      names.forEach(function (n) {
        delete state.inputs[n];
      });
    }));
  };

  _proto2.handleError = function handleError(name, error) {
    this.setState((0, _immer.default)(function (state) {
      state.errors[name] = error;
    }));
  };

  _proto2.renderHelp = function renderHelp(errors) {
    var realErrors = errors.filter(function (e) {
      return e.message;
    });

    if (realErrors.length > 0) {
      return _react.default.createElement("div", {
        className: (0, _styles.formClass)('error')
      }, realErrors.map(function (e, i) {
        return _react.default.createElement("div", {
          key: i
        }, e.message);
      }));
    }

    var tip = this.props.tip;
    if (!tip) return null;
    return _react.default.createElement("div", {
      className: (0, _styles.formClass)('tip')
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
    var className = (0, _classnames.default)((0, _utils.getGrid)(grid), (0, _styles.formClass)('item', required && 'required', errors.length > 0 && 'invalid', labelVerticalAlign && "label-vertical-align-" + labelVerticalAlign, keepErrorHeight && "item-keep-height", ['top', 'right', 'left'].indexOf(labelAlign) >= 0 && "label-align-" + labelAlign), this.props.className);
    return _react.default.createElement(Provider, {
      value: this.events
    }, _react.default.createElement("div", {
      className: className,
      style: style
    }, _react.default.createElement(Label, {
      width: labelWidth
    }, label), _react.default.createElement("div", {
      className: (0, _styles.formClass)('control')
    }, children, this.renderHelp(errors))));
  };

  return Item;
}(_component.Component);

Item.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'children', 'grid'), {
  className: _propTypes.default.string,
  // formItemErrors: PropTypes.array,
  keepErrorHeight: _propTypes.default.bool,
  label: _propTypes.default.any,
  labelAlign: _propTypes.default.string,
  labelWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  required: _propTypes.default.bool,
  tip: _propTypes.default.any
});
Item.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  formItemErrors: [],
  keepErrorHeight: false
});
var _default = Item; // eslint-disable-next-line

exports.default = _default;

var itemConsumer = function itemConsumer(Origin) {
  return function (props) {
    return _react.default.createElement(Consumer, null, function (events) {
      return _react.default.createElement(Origin, (0, _extends2.default)({}, props, events));
    });
  };
};

exports.itemConsumer = itemConsumer;