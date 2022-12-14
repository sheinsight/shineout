"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _proptypes = require("../utils/proptypes");

var _element = require("../utils/dom/element");

var _Button = _interopRequireDefault(require("../Button"));

var _styles = require("./styles");

var _AnimationList = _interopRequireDefault(require("../AnimationList"));

var _Item = _interopRequireDefault(require("./Item"));

var _document = require("../utils/dom/document");

var _AbsoluteList = _interopRequireDefault(require("../AnimationList/AbsoluteList"));

var _uid = require("../utils/uid");

var _context = _interopRequireDefault(require("../Table/context"));

var _Caret = _interopRequireDefault(require("../icons/Caret"));

var _config = require("../config");

var _classname = require("../utils/classname");

var _getDataset = _interopRequireDefault(require("../utils/dom/getDataset"));

var positionMap = {
  'left-top': 'left-top',
  'left-bottom': 'left-bottom',
  'right-top': 'right-top',
  'right-bottom': 'right-bottom',
  'top-right': 'left-bottom',
  'top-left': 'right-bottom',
  'bottom-right': 'left-top',
  'bottom-left': 'right-top',
  auto: ''
};

var Dropdown =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Dropdown, _PureComponent);

  function Dropdown(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      show: false
    };

    if (props.hover !== undefined) {
      console.warn('The "hover" property is not recommend, use trigger="hover" instead.');
    }

    _this.dropdownId = "dropdown_" + (0, _uid.getUidStr)();
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.clickAway = _this.clickAway.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleFocus = _this.handleFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleHide = _this.handleHide.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleMouseEnter = _this.handleToggle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), true);
    _this.handleMouseLeave = _this.handleToggle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), false);
    _this.renderList = _this.renderList.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

    _this.bindList();

    return _this;
  }

  var _proto = Dropdown.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.toggleDocumentEvent(false);
  };

  _proto.getTrigger = function getTrigger() {
    if (this.props.hover === true) return 'hover';
    return this.props.trigger;
  };

  _proto.getPosition = function getPosition() {
    var position = this.props.position;
    if (position !== 'auto') return position;
    if (!this.element) return 'bottom-left';
    var windowHeight = _document.docSize.height;
    var windowWidth = _document.docSize.width;
    var rect = this.element.getBoundingClientRect();
    position = rect.bottom > windowHeight / 2 ? 'top-' : 'bottom-';
    position += rect.right > windowWidth / 2 ? 'right' : 'left';
    return position;
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.bindList = function bindList() {
    var animation = this.props.animation;
    var FadeList = (0, _AnimationList.default)('fade', animation ? 'fast' : 0);
    this.DropdownList = (0, _AbsoluteList.default)(function (_ref) {
      var focus = _ref.focus,
          other = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["focus"]);
      return _react.default.createElement(FadeList, (0, _extends2.default)({
        show: focus
      }, other));
    });
  };

  _proto.toggleDocumentEvent = function toggleDocumentEvent(bind) {
    var method = bind ? 'addEventListener' : 'removeEventListener';
    document[method]('click', this.clickAway, true);
  };

  _proto.clickAway = function clickAway(e) {
    var absolute = this.props.absolute;
    var el = (0, _element.getParent)(e.target, 'a');
    var onSelf = absolute ? (0, _element.getParent)(e.target, "[data-id=" + this.dropdownId + "]") : el === this.element || this.element.contains(el);
    if (el && onSelf && el.getAttribute('data-role') === 'item') return;
    this.handleHide(0);
  };

  _proto.handleFocus = function handleFocus() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }

    if (this.state.show) return;
    this.setState({
      show: true
    });
    this.toggleDocumentEvent(true);
  };

  _proto.handleHide = function handleHide(delay) {
    var _this2 = this;

    if (delay === void 0) {
      delay = 200;
    }

    this.closeTimer = setTimeout(function () {
      _this2.setState({
        show: false
      });

      _this2.toggleDocumentEvent(false);
    }, delay);
  };

  _proto.handleToggle = function handleToggle(show) {
    if (this.getTrigger() === 'click') return;
    if (show) this.handleFocus();else this.handleHide();
  };

  _proto.renderRTLButton = function renderRTLButton(placeholder, spanClassName, caret, buttonClassName) {
    var _this$props = this.props,
        isSub = _this$props.isSub,
        type = _this$props.type,
        outline = _this$props.outline,
        size = _this$props.size,
        disabled = _this$props.disabled;

    if (isSub) {
      return _react.default.createElement("a", {
        key: "button",
        className: (0, _styles.dropdownClass)('button', 'item', this.state.show && 'active'),
        "data-role": "item",
        onClick: this.handleFocus
      }, _react.default.createElement("span", {
        className: spanClassName
      }, placeholder), caret);
    }

    return _react.default.createElement(_Button.default, {
      disabled: disabled,
      onClick: this.handleFocus,
      outline: outline,
      className: buttonClassName,
      type: type,
      size: size,
      key: "button"
    }, _react.default.createElement("span", {
      className: spanClassName
    }, placeholder), caret);
  };

  _proto.renderButton = function renderButton(placeholder) {
    var _this$props2 = this.props,
        type = _this$props2.type,
        outline = _this$props2.outline,
        size = _this$props2.size,
        disabled = _this$props2.disabled,
        isSub = _this$props2.isSub,
        position = _this$props2.position;
    var rtl = (0, _config.isRTL)();
    var buttonClassName = (0, _styles.dropdownClass)('button', !placeholder && 'split-button', rtl && 'rtl');
    var spanClassName = (0, _styles.dropdownClass)('button-content');

    var caret = _react.default.createElement("span", {
      key: "caret",
      className: (0, _styles.dropdownClass)('caret', rtl && 'rtl')
    }, _react.default.createElement(_Caret.default, null));

    var childs = [_react.default.createElement("span", {
      key: "text",
      className: spanClassName
    }, placeholder), caret];

    if (['left-bottom', 'left-top'].includes(position)) {
      childs.reverse();
    }

    if (isSub) {
      return _react.default.createElement("a", {
        key: "button",
        className: (0, _styles.dropdownClass)('button', 'item', this.state.show && 'active'),
        "data-role": "item",
        onClick: this.handleFocus
      }, childs);
    }

    return _react.default.createElement(_Button.default, {
      disabled: disabled,
      onClick: this.handleFocus,
      outline: outline,
      className: buttonClassName,
      type: type,
      size: size,
      key: "button"
    }, childs);
  };

  _proto.renderList = function renderList(data, placeholder, position) {
    var _this3 = this;

    var _this$props3 = this.props,
        width = _this$props3.width,
        onClick = _this$props3.onClick,
        columns = _this$props3.columns,
        renderItem = _this$props3.renderItem,
        absolute = _this$props3.absolute;
    if (!Array.isArray(data) || data.length === 0) return null;
    var DropdownList = this.DropdownList;
    return [_react.default.createElement(DropdownList, {
      absolute: absolute,
      parentElement: this.element,
      position: position,
      className: (0, _styles.dropdownClass)((0, _classname.getDirectionClass)('menu'), columns > 1 && 'box-list', (0, _config.isRTL)() && 'rtl'),
      style: {
        width: width
      },
      key: "list",
      focus: this.state.show,
      "data-id": this.dropdownId,
      fixed: "min"
    }, data.map(function (d, index) {
      var childPosition = positionMap[position];
      var itemClassName = (0, _styles.dropdownClass)('item', !width && 'no-width', childPosition.indexOf('left') === 0 && 'item-left');
      return d.children ? _react.default.createElement(Dropdown, {
        style: {
          width: '100%'
        },
        data: d.children,
        disabled: d.disabled,
        placeholder: d.content,
        type: "link",
        key: index,
        position: childPosition,
        btnColor: true,
        onClick: onClick,
        renderItem: renderItem,
        trigger: _this3.getTrigger(),
        isSub: true
      }) : _react.default.createElement(_Item.default, {
        data: d,
        key: index,
        onClick: d.onClick || onClick,
        itemClassName: itemClassName,
        renderItem: renderItem,
        columns: columns,
        width: width
      });
    })), this.renderButton(placeholder)];
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        data = _this$props4.data,
        className = _this$props4.className,
        style = _this$props4.style,
        placeholder = _this$props4.placeholder;
    var show = this.state.show;
    var position = this.getPosition();
    var wrapClassName = (0, _styles.dropdownClass)('_', position, show && 'show', {
      'split-dropdown': !placeholder,
      rtl: (0, _config.isRTL)()
    });
    if (className) wrapClassName += " " + className;
    return _react.default.createElement("div", (0, _extends2.default)({
      ref: this.bindElement,
      className: wrapClassName,
      style: style,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    }, (0, _getDataset.default)(this.props)), this.renderList(data, placeholder, position));
  };

  return Dropdown;
}(_component.PureComponent);

Dropdown.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'placeholder', 'type'), {
  data: _propTypes.default.array.isRequired,
  disabled: _propTypes.default.bool,
  hover: _propTypes.default.bool,
  isSub: _propTypes.default.bool,
  position: _propTypes.default.oneOf(['left-top', 'left-bottom', 'right-top', 'right-bottom', 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'auto']),
  trigger: _propTypes.default.oneOf(['click', 'hover']),
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  animation: _propTypes.default.bool
});
Dropdown.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  disabled: false,
  data: [],
  position: 'bottom-left',
  trigger: 'click',
  animation: true
});
Dropdown.displayName = 'ShineoutDropdown';

var _default = (0, _context.default)(Dropdown);

exports.default = _default;