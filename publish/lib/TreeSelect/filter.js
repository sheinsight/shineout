"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _tree = require("../utils/tree");

var _Result = require("./Result");

var _default = function _default(Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inheritsLoose2.default)(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        innerFilter: undefined,
        innerData: undefined,
        filterText: ''
      };
      _this.handleFilter = _this.handleFilter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.getResultByValues = _this.getResultByValues.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.resultCache = new Map();
      return _this;
    }

    var _proto = _class.prototype;

    _proto.getResultByValues = function getResultByValues() {
      var _this2 = this;

      var _this$props = this.props,
          datum = _this$props.datum,
          noCache = _this$props.noCache,
          renderUnmatched = _this$props.renderUnmatched;
      var value = datum.getValue() || [];

      if (renderUnmatched) {
        value = value.concat([].concat(this.props.value).filter(function (v) {
          return v && value.indexOf(v) === -1;
        }));
      }

      var result = [];
      value.forEach(function (v) {
        var res = noCache ? undefined : _this2.resultCache.get(v);

        if (!res) {
          var _res;

          res = datum.getDataById(v);
          if (res && !noCache && !res[_Result.IS_NOT_MATCHED_VALUE]) _this2.resultCache.set(v, res);else if (!res) res = (_res = {}, _res[_Result.IS_NOT_MATCHED_VALUE] = true, _res.value = v, _res);
        }

        if (res) {
          result.push(res);
        }
      });
      return result;
    };

    _proto.handleFilter = function handleFilter(text, from) {
      var _this3 = this;

      if (from === void 0) {
        from = 'edit';
      }

      var _this$props2 = this.props,
          filterDelay = _this$props2.filterDelay,
          onFilter = _this$props2.onFilter; // not filter

      if (!text) {
        this.setState({
          filterText: '',
          innerFilter: undefined,
          innerData: undefined
        });
        if (this.timer) clearTimeout(this.timer);
        if (onFilter) onFilter(text, from);
        return;
      }

      if (!onFilter) return;
      this.setState({
        filterText: text
      });
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        var fn = onFilter(text, from);

        if (typeof fn === 'function') {
          _this3.setState({
            innerFilter: fn
          });
        }
      }, filterDelay);
    };

    _proto.render = function render() {
      var _this4 = this;

      var _this$props3 = this.props,
          data = _this$props3.data,
          onFilter = _this$props3.onFilter,
          expanded = _this$props3.expanded,
          showHitDescendants = _this$props3.showHitDescendants,
          other = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["data", "onFilter", "expanded", "showHitDescendants"]);
      var _this$state = this.state,
          innerFilter = _this$state.innerFilter,
          filterText = _this$state.filterText;
      var filterFn = onFilter ? this.handleFilter : undefined;
      var newData = data;
      var newExpanded = expanded;

      if (innerFilter) {
        var filterExpandedKeys = [];
        newData = (0, _tree.getFilterTree)(data, innerFilter, filterExpandedKeys, function (node) {
          return _this4.props.datum.getKey(node);
        }, other.childrenKey, showHitDescendants, undefined, {
          advanced: other.onAdvancedFilter
        });
        newExpanded = filterExpandedKeys;
      }

      return _react.default.createElement(Origin, (0, _extends2.default)({}, other, {
        filterText: filterText,
        result: this.getResultByValues(),
        data: newData,
        rawData: data,
        onFilter: filterFn,
        expanded: newExpanded
      }));
    };

    return _class;
  }(_component.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    datum: _propTypes.default.object,
    data: _propTypes.default.array,
    filterDelay: _propTypes.default.number,
    keygen: _propTypes.default.any,
    onFilter: _propTypes.default.func,
    value: _propTypes.default.any,
    noCache: _propTypes.default.bool,
    expanded: _propTypes.default.arrayOf(_propTypes.default.string),
    showHitDescendants: _propTypes.default.bool,
    renderUnmatched: _propTypes.default.func,
    onAdvancedFilter: _propTypes.default.bool
  }), (0, _defineProperty2.default)(_class, "defaultProps", {
    data: [],
    filterDelay: 300,
    showHitDescendants: false
  }), _temp;
};

exports.default = _default;