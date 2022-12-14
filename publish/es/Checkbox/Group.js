import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PureComponent } from '../component';
import { getProps } from '../utils/proptypes';
import { getKey } from '../utils/uid';
import { CHANGE_TOPIC } from '../Datum/types';
import Checkbox from './Checkbox';
import { Provider } from './context';
import { checkinputClass } from './styles';

var CheckboxGroup =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CheckboxGroup, _PureComponent);

  function CheckboxGroup(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleUpdate = _this.handleUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleRawChange = _this.handleRawChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = CheckboxGroup.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    this.props.datum.subscribe(CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.props.datum.unsubscribe(CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.getContent = function getContent(d) {
    var renderItem = this.props.renderItem;

    if (typeof renderItem === 'string') {
      return d[renderItem];
    }

    if (typeof renderItem === 'function') {
      return renderItem(d);
    }

    return '';
  };

  _proto.handleUpdate = function handleUpdate() {
    this.forceUpdate();
  };

  _proto.handleClick = function handleClick(val, checked, index) {
    var _this$props = this.props,
        data = _this$props.data,
        datum = _this$props.datum;

    if (checked) {
      datum.add(data[index]);
    } else {
      datum.remove(data[index]);
    }
  };

  _proto.handleRawChange = function handleRawChange(value, checked) {
    var datum = this.props.datum;

    if (checked) {
      datum.add(value);
    } else {
      datum.remove(value);
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        block = _this$props2.block,
        data = _this$props2.data,
        datum = _this$props2.datum,
        keygen = _this$props2.keygen,
        children = _this$props2.children,
        style = _this$props2.style;
    var className = classnames(checkinputClass('group', ['no-block', 'block'][Number(block)]), this.props.className);

    if (data === undefined) {
      return React.createElement("div", {
        className: className,
        style: style
      }, React.createElement(Provider, {
        value: {
          onRawChange: this.handleRawChange,
          checked: datum.check.bind(datum)
        }
      }, children));
    }

    return React.createElement("div", {
      className: className,
      style: style
    }, data.map(function (d, i) {
      return React.createElement(Checkbox, {
        checked: datum.check(d),
        disabled: datum.disabled(d),
        key: getKey(d, keygen, i),
        htmlValue: i,
        index: i,
        onChange: _this2.handleClick
      }, _this2.getContent(d));
    }), children);
  };

  return CheckboxGroup;
}(PureComponent);

CheckboxGroup.propTypes = _objectSpread({}, getProps(PropTypes, 'children', 'keygen'), {
  block: PropTypes.bool,
  data: PropTypes.array,
  datum: PropTypes.object.isRequired,
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
});
CheckboxGroup.defaultProps = {
  renderItem: function renderItem(d) {
    return d;
  }
};
export default CheckboxGroup;