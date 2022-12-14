import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';

var Colgroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Colgroup, _React$Component);

  function Colgroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      didShow: false
    };
    return _this;
  }

  var _proto = Colgroup.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    var _this$props = this.props,
        colgroup = _this$props.colgroup,
        columns = _this$props.columns,
        resizable = _this$props.resizable;

    if (!colgroup && resizable && this.state.didShow) {
      this.setState({
        didShow: false
      });
      return;
    }

    if (!resizable || this.state.didShow) return;
    if (!colgroup || colgroup.length !== columns.length) return;
    this.setState({
      didShow: true
    });
  };

  _proto.render = function render() {
    var didShow = this.state.didShow;
    var _this$props2 = this.props,
        columns = _this$props2.columns,
        colgroup = _this$props2.colgroup;

    if (colgroup && colgroup.length === columns.length) {
      return React.createElement("colgroup", null, colgroup.map(function (c, i) {
        var last = colgroup.length - 1 === i;
        if (didShow && last) return null;
        return React.createElement("col", {
          key: columns[i].key,
          style: {
            width: c
          }
        });
      }));
    }

    return React.createElement("colgroup", null, columns.map(function (c, i) {
      var last = columns.length - 1 === i;
      if (didShow && last) return null;
      return React.createElement("col", {
        key: c.key,
        style: {
          width: c.width
        }
      });
    }));
  };

  return Colgroup;
}(React.Component);

Colgroup.propTypes = {
  columns: PropTypes.array.isRequired,
  colgroup: PropTypes.array,
  resizable: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
};
Colgroup.defaultProps = {
  colgroup: undefined
};
export default Colgroup;