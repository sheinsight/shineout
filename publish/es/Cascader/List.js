import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cascaderClass } from './styles';
import Node from './Node';
import { getLocale } from '../locale';
import { getDirectionClass } from '../utils/classname';

var List =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(List, _Component);

  function List(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {};
    _this.getText = _this.getText.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = List.prototype;

  _proto.getKey = function getKey(data, index) {
    var _this$props = this.props,
        keygen = _this$props.keygen,
        parentId = _this$props.parentId;
    if (typeof keygen === 'function') return keygen(data, parentId);
    if (keygen) return data[keygen];
    return parentId + (parentId ? ',' : '') + index;
  };

  _proto.getText = function getText(key) {
    return this.props.text[key] || getLocale(key);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        data = _this$props2.data,
        other = _objectWithoutPropertiesLoose(_this$props2, ["data"]);

    if (!data || data.length === 0) return React.createElement("span", {
      className: cascaderClass('no-data')
    }, this.getText('noData'));
    return React.createElement("div", {
      className: cascaderClass(getDirectionClass('list'))
    }, data.map(function (d, i) {
      var id = _this2.getKey(d, i);

      return React.createElement(Node, _extends({}, other, {
        key: id,
        active: other.id === id,
        id: id,
        data: d
      }));
    }));
  };

  return List;
}(Component);

List.propTypes = {
  data: PropTypes.array,
  id: PropTypes.string,
  keygen: PropTypes.any,
  onNodeClick: PropTypes.func,
  parentId: PropTypes.string,
  text: PropTypes.object
};
List.defaultProps = {
  id: '',
  parentId: '',
  text: {}
};
export default List;