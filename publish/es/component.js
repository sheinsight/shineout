import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';

function create(name) {
  var Base = React[name];
  return (
    /*#__PURE__*/
    function (_Base) {
      _inheritsLoose(_class, _Base);

      function _class() {
        return _Base.apply(this, arguments) || this;
      }

      var _proto = _class.prototype;

      _proto.componentDidMount = function componentDidMount() {
        this.$isMounted = true;
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        this.$isMounted = false;
      };

      _proto.setState = function setState() {
        var _Base$prototype$setSt;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (this.$isMounted !== false) (_Base$prototype$setSt = _Base.prototype.setState).call.apply(_Base$prototype$setSt, [this].concat(args));
      };

      _proto.forceUpdate = function forceUpdate() {
        if (this.$isMounted === true) _Base.prototype.forceUpdate.call(this);

        if (this.$isMounted === undefined) {
          if (this.forceUpdateTimer) clearTimeout(this.forceUpdateTimer);
          this.forceUpdateTimer = setTimeout(this.forceUpdate.bind(this));
        }
      };

      return _class;
    }(Base)
  );
}

export var Component = create('Component');
export var PureComponent = create('PureComponent');