"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.PureComponent = exports.Component = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

function create(name) {
  var Base = _react.default[name];
  return (
    /*#__PURE__*/
    function (_Base) {
      (0, _inheritsLoose2.default)(_class, _Base);

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

var Component = create('Component');
exports.Component = Component;
var PureComponent = create('PureComponent');
exports.PureComponent = PureComponent;