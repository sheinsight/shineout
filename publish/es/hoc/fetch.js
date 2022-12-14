import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
// obsolete code
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
export default (function (Component) {
  var Fetch =
  /*#__PURE__*/
  function (_PureComponent) {
    _inheritsLoose(Fetch, _PureComponent);

    function Fetch(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.state = {
        loading: !!props.fetch
      };
      return _this;
    }

    var _proto = Fetch.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var fetch = this.props.fetch;
      if (fetch) this.fetchData(fetch);
    };

    _proto.fetchData = function fetchData(fetch) {
      var _this2 = this;

      fetch.then(function (data) {
        _this2.setState({
          data: data,
          loading: false
        });
      });
    };

    _proto.render = function render() {
      var _this$props = this.props,
          fetch = _this$props.fetch,
          props = _objectWithoutPropertiesLoose(_this$props, ["fetch"]);

      var _this$state = this.state,
          data = _this$state.data,
          loading = _this$state.loading;
      return React.createElement(Component, _extends({
        data: data
      }, props, {
        loading: loading
      }));
    };

    return Fetch;
  }(PureComponent);

  Fetch.propTypes = {
    fetch: PropTypes.object
  };
  Fetch.defaultProps = {
    fetch: undefined
  };
  return Fetch;
});