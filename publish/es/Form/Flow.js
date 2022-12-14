import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import PropTypes from 'prop-types';
import { Component } from '../component';
import { changeSubscribe, CHANGE_TOPIC } from '../Datum/types';
import { isFunc } from '../utils/is';

var Flow =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Flow, _Component);

  function Flow(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.update = _this.forceUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.events = [];
    var _this$props = _this.props,
        names = _this$props.names,
        formDatum = _this$props.formDatum;

    if (names) {
      names.forEach(function (n) {
        var nc = changeSubscribe(n);
        formDatum.subscribe(nc, _this.update);

        _this.events.push(nc);
      });
    } else {
      formDatum.subscribe(CHANGE_TOPIC, _this.update);

      _this.events.push(CHANGE_TOPIC);
    }

    return _this;
  }

  var _proto = Flow.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    _Component.prototype.componentWillUnmount.call(this);

    var formDatum = this.props.formDatum;
    this.events.forEach(function (n) {
      return formDatum.unsubscribe(n);
    });
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        formDatum = _this$props2.formDatum;
    if (isFunc(children)) return children(formDatum) || null;
    return children;
  };

  return Flow;
}(Component);

Flow.propTypes = {
  children: PropTypes.any,
  formDatum: PropTypes.object.isRequired,
  names: PropTypes.array
};
export default Flow;