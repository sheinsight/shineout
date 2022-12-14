import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import createReactContext from '../context';
import { PureComponent } from '../component';
import { getUidStr } from '../utils/uid';
import { hidableClass } from './styles';
var context = createReactContext();
export var consumer = function consumer(Origin) {
  return function (props) {
    return React.createElement(context.Consumer, null, function (value) {
      return React.createElement(Origin, _extends({}, value, props));
    });
  };
};
/**
 * @param {*} Component
 * @param {*} duration
 * @param {*} type - fade, collapse, tranlate
 */

export default function (Component, _ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? ['fade'] : _ref$type,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 360 : _ref$duration,
      _ref$display = _ref.display,
      display = _ref$display === void 0 ? 'block' : _ref$display;
  var hasCollapse = type.indexOf('collapse') >= 0;
  var needTransform = type.indexOf('scale-y') >= 0;

  var Hidable =
  /*#__PURE__*/
  function (_PureComponent) {
    _inheritsLoose(Hidable, _PureComponent);

    function Hidable(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.state = {
        show: props.show
      };
      _this.height = 0;
      _this.id = "__hidable_" + getUidStr() + "__";
      return _this;
    }

    var _proto = Hidable.prototype;

    _proto.componentDidMount = function componentDidMount() {
      _PureComponent.prototype.componentDidMount.call(this);

      var el = this.getElement();
      if (!el) return;
      if (this.props.show) return;
      if (hasCollapse) this.height = el.offsetHeight;
      el.style.display = 'none';

      if (hasCollapse) {
        el.style.overflow = 'hidden';
        el.style.height = 0;
      }
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (this.props.show === prevProps.show) return;
      if (this.props.show) this.show();else this.hide();
    };

    _proto.getElement = function getElement() {
      return document.querySelector("." + this.id);
    };

    _proto.show = function show() {
      var _this2 = this;

      var es = this.getElement().style;
      es.display = display;
      setTimeout(function () {
        if (_this2.$isMounted) {
          _this2.setState({
            show: true
          });

          if (hasCollapse) {
            es.height = _this2.height + "px";
            setTimeout(function () {
              es.height = 'auto';
              es.overflow = '';
            }, duration);
          }
        }
      }, 10);
    };

    _proto.hide = function hide() {
      var _this3 = this;

      this.setState({
        show: false
      });
      var element = this.getElement();

      if (hasCollapse) {
        this.height = element.offsetHeight;
        element.style.height = this.height + "px";
        element.style.overflow = 'hidden';
        setTimeout(function () {
          element.style.height = 0;
        }, 10);
      }

      setTimeout(function () {
        if (_this3.state.show === false && element) {
          element.style.display = 'none';
        }
      }, duration);
    };

    _proto.render = function render() {
      var animation = "animation-" + duration;

      if (!needTransform) {
        animation = "fade-" + animation;
      }

      var className = classnames(hidableClass.apply(void 0, ['_'].concat(type, [animation, this.state.show && 'show'])), this.props.className, this.id);
      var provider = {
        visible: this.state.show
      };
      return React.createElement(context.Provider, {
        value: provider
      }, React.createElement(Component, _extends({}, this.props, {
        className: className
      })));
    };

    return Hidable;
  }(PureComponent);

  Hidable.propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
    height: PropTypes.number
  };
  Hidable.defaultProps = {
    className: '',
    show: false
  };
  return Hidable;
}