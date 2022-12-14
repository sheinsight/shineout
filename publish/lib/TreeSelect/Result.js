"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.IS_NOT_MATCHED_VALUE = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _element = require("../utils/dom/element");

var _styles = require("./styles");

var _styles2 = require("../Input/styles");

var _styles3 = require("../InputTitle/styles");

var _is = require("../utils/is");

var _Input = _interopRequireDefault(require("./Input"));

var _Caret = _interopRequireDefault(require("../icons/Caret"));

var _More = _interopRequireWildcard(require("../Select/More"));

var _InputTitle = _interopRequireDefault(require("../InputTitle"));

var _uid = require("../utils/uid");

var _classname = require("../utils/classname");

var IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE';
exports.IS_NOT_MATCHED_VALUE = IS_NOT_MATCHED_VALUE;

var getResultContent = function getResultContent(data, renderResult, renderUnmatched) {
  if ((0, _is.isObject)(data) && data.IS_NOT_MATCHED_VALUE) {
    if (typeof renderUnmatched === 'function') return renderUnmatched(data.value);
    return (0, _is.isObject)(data.value) ? renderResult(data.value) : data.value;
  }

  return renderResult(data);
}; // eslint-disable-next-line


function Item(_ref) {
  var content = _ref.content,
      data = _ref.data,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      only = _ref.only;
  var value = data;
  var click = disabled || !onClick ? undefined : function () {
    return onClick(value);
  };
  var synDisabled = disabled || !click;
  return _react.default.createElement("a", {
    tabIndex: -1,
    className: (0, _styles.treeSelectClass)((0, _classname.getDirectionClass)('item'), disabled && (0, _classname.getDirectionClass)('disabled'), synDisabled && (0, _classname.getDirectionClass)('ban'), only && 'item-only')
  }, content, !synDisabled && _react.default.createElement("span", {
    className: (0, _styles.treeSelectClass)('indicator', 'close'),
    onClick: click
  }));
}

var Result =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Result, _PureComponent);

  function Result(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      more: -1
    };
    _this.handleRemove = _this.handleRemove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handelMore = _this.handelMore.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindResult = _this.bindResult.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.resetMore = _this.resetMore.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Result.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var compressed = this.props.compressed;

    if (compressed && !this.isCompressedBound()) {
      this.cancelResizeObserver = (0, _element.addResizeObserver)(this.resultEl, this.resetMore, {
        direction: 'x'
      });
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(preProps) {
    this.updateMore(preProps);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.cancelResizeObserver) this.cancelResizeObserver();
  };

  _proto.getCompressedBound = function getCompressedBound() {
    var compressedBound = this.props.compressedBound;

    if (this.isCompressedBound()) {
      return compressedBound;
    }

    return this.state.more;
  };

  _proto.bindResult = function bindResult(el) {
    this.resultEl = el;
  };

  _proto.updateMore = function updateMore(preProps) {
    var _this$props = this.props,
        result = _this$props.result,
        compressed = _this$props.compressed,
        onFilter = _this$props.onFilter,
        keygen = _this$props.keygen,
        data = _this$props.data;

    if (compressed) {
      if (this.isCompressedBound()) {
        return;
      }

      var shouldRest = false;

      if (preProps.result.length !== result.length || (data || []).length !== (preProps.data || []).length) {
        shouldRest = true;
      } else if (preProps.result !== result) {
        var i = preProps.result.length - 1;

        var _loop = function _loop() {
          var getUnMatchKey = function getUnMatchKey(d, k) {
            return d && d.IS_NOT_MATCHED_VALUE ? d.value : (0, _uid.getKey)(d, k);
          };

          var isSameData = function isSameData(data1, data2, k) {
            return getUnMatchKey(data1, k) === getUnMatchKey(data2, k);
          };

          if (!isSameData(result[i], preProps.result[i], keygen)) {
            shouldRest = true;
            return "break";
          }

          i -= 1;
        };

        while (i >= 0) {
          var _ret = _loop();

          if (_ret === "break") break;
        }
      }

      if (shouldRest) {
        this.resetMore();
      } else if (result.length && this.shouldResetMore) {
        this.shouldResetMore = false;
        this.state.more = (0, _More.getResetMore)(onFilter, this.resultEl, this.resultEl.querySelectorAll("." + (0, _styles.treeSelectClass)('item')));
        this.forceUpdate();
      }
    }
  };

  _proto.resetMore = function resetMore() {
    if (!this.props.compressed) return;
    this.shouldResetMore = true;
    this.state.more = -1;
    this.forceUpdate();
  };

  _proto.handleRemove = function handleRemove() {
    var onRemove = this.props.onRemove;
    onRemove.apply(void 0, arguments);
  };

  _proto.handelMore = function handelMore(more) {
    this.setState({
      more: more
    });
  };

  _proto.isCompressedBound = function isCompressedBound() {
    var compressedBound = this.props.compressedBound;
    return compressedBound && (0, _is.isNumber)(compressedBound) && compressedBound >= 1;
  };

  _proto.renderClear = function renderClear() {
    var _this$props2 = this.props,
        onClear = _this$props2.onClear,
        result = _this$props2.result,
        disabled = _this$props2.disabled;

    if (onClear && result.length > 0 && disabled !== true) {
      /* eslint-disable */
      return _react.default.createElement("div", {
        key: "clear",
        onClick: onClear,
        className: (0, _styles.treeSelectClass)('close-warpper')
      }, _react.default.createElement("a", {
        tabIndex: -1,
        "data-role": "close",
        className: (0, _styles.treeSelectClass)('indicator', 'close')
      }));
      /* eslint-enable */
    }

    return null;
  };

  _proto.renderInput = function renderInput(text, key) {
    if (key === void 0) {
      key = 'input';
    }

    var _this$props3 = this.props,
        multiple = _this$props3.multiple,
        onFilter = _this$props3.onFilter,
        focus = _this$props3.focus,
        setInputReset = _this$props3.setInputReset;
    return _react.default.createElement(_Input.default, {
      key: key + "." + (focus ? 1 : 0),
      updatAble: !multiple,
      multiple: multiple,
      focus: focus,
      text: text,
      onFilter: onFilter,
      setInputReset: setInputReset
    });
  };

  _proto.renderItem = function renderItem(data, index) {
    var _this$props4 = this.props,
        renderResult = _this$props4.renderResult,
        renderUnmatched = _this$props4.renderUnmatched,
        datum = _this$props4.datum;
    var content = getResultContent(data, renderResult, renderUnmatched);
    if (content === null) return null;
    var more = this.state.more;
    return _react.default.createElement(Item, {
      only: more === 1,
      key: index,
      content: content,
      data: data,
      disabled: datum.disabled(data),
      onClick: this.handleRemove
    });
  };

  _proto.renderMore = function renderMore(items) {
    var compressed = this.props.compressed;
    var more = this.getCompressedBound();
    return [_react.default.createElement(_More.default, {
      key: "more",
      className: (0, _styles.treeSelectClass)((0, _classname.getDirectionClass)('item'), 'item-compressed'),
      popoverClassName: (0, _styles.treeSelectClass)('popover'),
      contentClassName: (0, _styles.treeSelectClass)((0, _classname.getDirectionClass)('result')),
      compressed: compressed,
      data: items,
      cls: _styles.treeSelectClass,
      showNum: more
    })];
  };

  _proto.renderPlaceholder = function renderPlaceholder() {
    var _this$props5 = this.props,
        focus = _this$props5.focus,
        onFilter = _this$props5.onFilter,
        innerTitle = _this$props5.innerTitle;

    if (focus && onFilter) {
      return this.renderInput(' ');
    }

    return _react.default.createElement("span", {
      className: (0, _classnames.default)((0, _styles2.inputClass)('placeholder'), (0, _styles.treeSelectClass)('ellipsis'), innerTitle && (0, _styles3.inputTitleClass)('hidable'))
    }, this.props.placeholder, "\xA0");
  };

  _proto.renderResult = function renderResult() {
    var _this2 = this;

    var _this$props6 = this.props,
        multiple = _this$props6.multiple,
        compressed = _this$props6.compressed,
        result = _this$props6.result,
        renderResult = _this$props6.renderResult,
        renderUnmatched = _this$props6.renderUnmatched,
        onFilter = _this$props6.onFilter,
        focus = _this$props6.focus,
        filterText = _this$props6.filterText;

    if (multiple) {
      var items = result.map(function (n, i) {
        return _this2.renderItem(n, i);
      }).filter(function (n) {
        return !(0, _is.isEmpty)(n);
      });

      if (compressed) {
        items = this.renderMore(items);
      }

      if (focus && onFilter) {
        items.push(this.renderInput(filterText, result.length));
      }

      return items;
    }

    if (onFilter) {
      return this.renderInput(getResultContent(result[0], renderResult, renderUnmatched));
    }

    return _react.default.createElement("span", {
      className: (0, _styles.treeSelectClass)('ellipsis')
    }, getResultContent(result[0], renderResult, renderUnmatched));
  };

  _proto.render = function render() {
    var showPlaceholder = this.props.result.length === 0;
    var result = showPlaceholder ? this.renderPlaceholder() : this.renderResult();
    var _this$props7 = this.props,
        compressed = _this$props7.compressed,
        innerTitle = _this$props7.innerTitle,
        focus = _this$props7.focus,
        onFilter = _this$props7.onFilter;
    var open = onFilter && focus || !showPlaceholder;
    return _react.default.createElement(_InputTitle.default, {
      innerTitle: innerTitle,
      open: open,
      className: (0, _styles.treeSelectClass)('title-box'),
      titleClass: (0, _styles.treeSelectClass)((0, _classname.getDirectionClass)('title-box-title'))
    }, _react.default.createElement("div", {
      ref: this.bindResult,
      className: (0, _classnames.default)((0, _styles.treeSelectClass)((0, _classname.getDirectionClass)('result'), compressed && 'compressed', showPlaceholder && 'empty'), innerTitle && (0, _styles3.inputTitleClass)('item-scroll'))
    }, result, !this.props.multiple && // eslint-disable-next-line
    _react.default.createElement("a", {
      tabIndex: -1,
      className: (0, _styles.treeSelectClass)('indicator', 'caret')
    }, _react.default.createElement(_Caret.default, null)), this.renderClear()));
  };

  return Result;
}(_react.PureComponent);

Result.propTypes = {
  datum: _propTypes.default.object,
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  filterText: _propTypes.default.string,
  focus: _propTypes.default.bool,
  multiple: _propTypes.default.bool.isRequired,
  onRemove: _propTypes.default.func,
  onClear: _propTypes.default.func,
  onFilter: _propTypes.default.func,
  result: _propTypes.default.array.isRequired,
  renderResult: _propTypes.default.func.isRequired,
  placeholder: _propTypes.default.string,
  setInputReset: _propTypes.default.func,
  compressed: _propTypes.default.bool,
  compressedBound: _propTypes.default.number,
  renderUnmatched: _propTypes.default.func,
  innerTitle: _propTypes.default.node,
  keygen: _propTypes.default.any,
  data: _propTypes.default.array
};
var _default = Result;
exports.default = _default;