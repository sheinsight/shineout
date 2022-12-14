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

var _immer = _interopRequireDefault(require("immer"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _default = function _default(Table) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inheritsLoose2.default)(_class, _React$Component);

    function _class(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.handleResize = _this.handleResize.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.state = {
        columns: props.columns,
        delta: 0
      };
      return _this;
    }

    var _proto = _class.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var _this2 = this;

      var prevColumns = prevProps.columns;
      var _this$props = this.props,
          columns = _this$props.columns,
          onColumnResize = _this$props.onColumnResize;

      if (prevColumns !== columns) {
        if (prevColumns.length !== columns.length) {
          this.setState({
            columns: columns
          });
        } else {
          var widthed = onColumnResize ? columns : (0, _immer.default)(columns, function (draft) {
            draft.forEach(function (column, index) {
              column.width = _this2.state.columns[index].width;
            });
          });
          this.setState({
            columns: widthed
          });
        }
      }
    };

    _proto.getWidth = function getWidth() {
      var width = this.props.width;
      if (typeof width === 'number') return width + this.state.delta;
      return width;
    };

    _proto.handleResize = function handleResize(index, width, colgroup) {
      if (colgroup === undefined) return;
      var onColumnResize = this.props.onColumnResize;
      var changed = (0, _immer.default)(this.state, function (draft) {
        var column = draft.columns[index];
        draft.delta += parseFloat(width - (column.width || colgroup[index] || 0));
        colgroup[index] = width;
        draft.columns.forEach(function (col, i) {
          var w = colgroup[i];
          if (w) col.width = w;
        });
      });

      if (onColumnResize) {
        onColumnResize(changed.columns);
        return;
      }

      this.setState(changed);
    };

    _proto.render = function render() {
      var columns = this.state.columns;
      var _this$props2 = this.props,
          onColumnResize = _this$props2.onColumnResize,
          other = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["onColumnResize"]);
      var width = this.getWidth();
      return _react.default.createElement(Table, (0, _extends2.default)({}, other, {
        width: width,
        columns: columns,
        onResize: this.handleResize
      }));
    };

    return _class;
  }(_react.default.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    columns: _propTypes.default.array.isRequired,
    onColumnResize: _propTypes.default.func,
    width: _propTypes.default.number
  }), _temp;
};

exports.default = _default;