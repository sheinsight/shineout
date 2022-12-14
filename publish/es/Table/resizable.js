import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import immer from 'immer';
import PropTypes from 'prop-types';
export default (function (Table) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(_class, _React$Component);

    function _class(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.handleResize = _this.handleResize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
          var widthed = onColumnResize ? columns : immer(columns, function (draft) {
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
      var changed = immer(this.state, function (draft) {
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
          other = _objectWithoutPropertiesLoose(_this$props2, ["onColumnResize"]);

      var width = this.getWidth();
      return React.createElement(Table, _extends({}, other, {
        width: width,
        columns: columns,
        onResize: this.handleResize
      }));
    };

    return _class;
  }(React.Component), _defineProperty(_class, "propTypes", {
    columns: PropTypes.array.isRequired,
    onColumnResize: PropTypes.func,
    width: PropTypes.number
  }), _temp;
});