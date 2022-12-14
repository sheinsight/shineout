import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import immer from 'immer';
import Datum from '../Datum/Tree';
import { curry } from '../utils/func';
import { mergeFilteredTree } from '../utils/tree';
import { treeClass } from '../Tree/styles';
import { treeSelectClass } from './styles';
import { Component } from '../component';
export default curry(function (options, Origin) {
  var _options$dataKey = options.dataKey,
      dataKey = _options$dataKey === void 0 ? 'data' : _options$dataKey;

  var Tiled =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(Tiled, _Component);

    function Tiled(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        tileds: []
      };
      _this.getIcon = _this.getIcon.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleFilter = _this.handleFilter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      if (props.onAdvancedFilter) _this.genRawDatum();
      return _this;
    }

    var _proto = Tiled.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (prevProps.rawData !== this.props.rawData && this.props.onAdvancedFilter) {
        if (this.rawDatum) this.rawDatum.setData(this.props.rawData);else this.genRawDatum();
        this.forceUpdate();
      }
    };

    _proto.getFilteredDatum = function getFilteredDatum() {
      var _this$props = this.props,
          keygen = _this$props.keygen,
          childrenKey = _this$props.childrenKey;
      var data = this.props[dataKey];
      if (this.filteredDatum && this.filteredDatum.data === data) return this.filteredDatum;
      this.filteredDatum = new Datum({
        data: data,
        keygen: keygen,
        childrenKey: childrenKey
      });
      return this.filteredDatum;
    };

    _proto.getIcon = function getIcon(data) {
      var _this$props2 = this.props,
          childrenKey = _this$props2.childrenKey,
          _this$props2$expanded = _this$props2.expanded,
          expanded = _this$props2$expanded === void 0 ? [] : _this$props2$expanded;
      var originIcon = React.createElement("span", {
        className: treeClass('default-icon')
      });
      var key = this.rawDatum.getKey(data);
      var rawData = this.rawDatum.getDataById(key);
      if (!data || !rawData) return originIcon;
      var sameCount = data[childrenKey] && rawData[childrenKey] && data[childrenKey].length === rawData[childrenKey].length;
      if (expanded.indexOf(key) === -1) return originIcon;
      return React.createElement("span", {
        className: treeSelectClass('match', sameCount && 'full'),
        onClick: this.handleToggle.bind(this, key)
      }, React.createElement("span", null));
    };

    _proto.handleFilter = function handleFilter(text, from) {
      var onFilter = this.props.onFilter;
      if (!text) this.setState({
        tileds: []
      });
      if (onFilter) onFilter(text, from);
    };

    _proto.handleToggle = function handleToggle(key, e) {
      e.stopPropagation();
      this.setState(immer(function (draft) {
        var index = draft.tileds.indexOf(key);
        if (index >= 0) draft.tileds.splice(index, 1);else draft.tileds.push(key);
      }));
    };

    _proto.genRawDatum = function genRawDatum() {
      var _this$props3 = this.props,
          rawData = _this$props3.rawData,
          childrenKey = _this$props3.childrenKey,
          keygen = _this$props3.keygen;
      this.rawDatum = new Datum({
        data: rawData,
        childrenKey: childrenKey,
        keygen: keygen
      });
    };

    _proto.render = function render() {
      var _objectSpread2;

      var _this$props4 = this.props,
          filterText = _this$props4.filterText,
          onAdvancedFilter = _this$props4.onAdvancedFilter;
      var tileds = this.state.tileds;
      if (!filterText || !onAdvancedFilter) return React.createElement(Origin, this.props);
      var expandIcons = [this.getIcon, this.getIcon];
      var filterDatum = this.getFilteredDatum();
      var data = mergeFilteredTree(filterDatum, this.rawDatum, tileds);

      var props = _objectSpread({}, this.props, (_objectSpread2 = {
        onFilter: this.handleFilter,
        expandIcons: expandIcons
      }, _objectSpread2[dataKey] = data, _objectSpread2));

      return React.createElement(Origin, props);
    };

    return Tiled;
  }(Component);

  _defineProperty(Tiled, "propTypes", {
    rawData: PropTypes.array,
    keygen: PropTypes.any,
    onFilter: PropTypes.func,
    childrenKey: PropTypes.string,
    filterText: PropTypes.string,
    data: PropTypes.array,
    expanded: PropTypes.array,
    onAdvancedFilter: PropTypes.bool
  });

  _defineProperty(Tiled, "defaultProps", {
    childrenKey: 'children'
  });

  return Tiled;
});
export var advancedFilterHOC = function advancedFilterHOC(Origin) {
  return function (props) {
    // eslint-disable-next-line react/prop-types
    var onAdvancedFilter = props.onAdvancedFilter,
        onFilter = props.onFilter;
    return React.createElement(Origin, _extends({}, props, {
      onFilter: onAdvancedFilter || onFilter,
      onAdvancedFilter: !!onAdvancedFilter
    }));
  };
};