import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { getUidStr } from '../utils/uid';
export default (function (Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(_class, _React$Component);

    function _class(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        data: []
      };
      _this.groupByData = _this.groupByData.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.groupKey = getUidStr();
      return _this;
    }

    var _proto = _class.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this.groupByData();
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (prevProps.data !== this.props.data) this.groupByData();
    };

    _proto.groupByData = function groupByData() {
      var _this2 = this;

      var _this$props = this.props,
          groupBy = _this$props.groupBy,
          data = _this$props.data;

      if (typeof groupBy !== 'function') {
        this.setState({
          data: data
        });
        return;
      }

      var groupData = {};
      data.forEach(function (d, i) {
        var _ref;

        var g = groupBy(d, i, data);
        if (!groupData[g]) groupData[g || ''] = g ? [(_ref = {}, _ref[_this2.groupKey] = g, _ref)] : [];
        groupData[g].push(d);
      });
      this.setState({
        data: Object.keys(groupData).reduce(function (p, v) {
          return v ? p.concat(groupData[v]) : groupData[v].concat(p);
        }, [])
      });
    };

    _proto.render = function render() {
      var _this$props2 = this.props,
          groupBy = _this$props2.groupBy,
          data = _this$props2.data,
          props = _objectWithoutPropertiesLoose(_this$props2, ["groupBy", "data"]);

      return React.createElement(Origin, _extends({}, props, {
        data: this.state.data,
        groupKey: this.groupKey
      }));
    };

    return _class;
  }(React.Component), _defineProperty(_class, "propTypes", {
    data: PropTypes.array,
    groupBy: PropTypes.func
  }), _defineProperty(_class, "defaultProps", {
    data: []
  }), _temp;
});