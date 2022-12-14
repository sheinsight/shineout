"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.mergeFilteredTree = exports.getFlattenTree = exports.getFilterTree = void 0;

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _immer = _interopRequireDefault(require("immer"));

var _clone = require("./clone");

var getFilterTree = function getFilterTree(treeNodes, filterFunc, filterExpandKeys, keyFunc, childrenKey, showHitDescendants, firstMatchNode, _temp) {
  if (childrenKey === void 0) {
    childrenKey = 'children';
  }

  var _ref = _temp === void 0 ? {} : _temp,
      advanced = _ref.advanced;

  var mapFilteredNodeToData = function mapFilteredNodeToData(node) {
    if (!node) return null;
    var match = false;

    if (filterFunc(node)) {
      if (firstMatchNode) firstMatchNode(node);
      match = true;
    }

    var children = (node[childrenKey] || []).map(mapFilteredNodeToData).filter(function (n) {
      return n;
    });

    if (children.length || match) {
      var _objectSpread2;

      var key = keyFunc(node);
      if (filterExpandKeys && children.length > 0) filterExpandKeys.push(key);
      if (!node[childrenKey]) return node;
      var childNodes = showHitDescendants && match ? node[childrenKey] || [] : children;
      if (advanced && match && children.length > 0) childNodes = children;
      return (0, _objectSpread3.default)({}, node, (_objectSpread2 = {}, _objectSpread2[childrenKey] = childNodes, _objectSpread2));
    }

    return null;
  };

  return treeNodes.map(mapFilteredNodeToData).filter(function (node) {
    return node;
  });
};

exports.getFilterTree = getFilterTree;

var getFlattenTree = function getFlattenTree(data, childrenKey) {
  if (childrenKey === void 0) {
    childrenKey = 'children';
  }

  var arr = [];

  var flatten = function flatten(list, path) {
    list.forEach(function (item) {
      var children = item[childrenKey];

      if (children && children.length > 0) {
        var clonedPath = [].concat(path);
        clonedPath.push(item);
        flatten(children, clonedPath);
      } else {
        arr.push([].concat(path, [item]));
      }
    });
  };

  flatten(data, []);
  return arr;
};

exports.getFlattenTree = getFlattenTree;

var mergeFilteredTree = function mergeFilteredTree(filterDatum, rawDatum, tiledId) {
  var filterData = filterDatum.data;
  var childrenKey = filterDatum.childrenKey;
  if (tiledId.length === 0) return filterData;

  var recursion = function recursion(node) {
    var nodeKey = filterDatum.getKey(node);

    if (tiledId.indexOf(nodeKey) >= 0) {
      node[childrenKey] = (0, _clone.deepClone)(rawDatum.getDataById(nodeKey)[childrenKey] || []);
    } else {
      var item = filterDatum.getDataById(nodeKey);

      if (item && item[childrenKey]) {
        node[childrenKey] = (0, _clone.deepClone)(item[childrenKey] || []);
      }
    }

    var children = node[childrenKey] || [];
    children.map(recursion);
  };

  return (0, _immer.default)(filterData, function (draft) {
    draft.map(recursion);
  });
};

exports.mergeFilteredTree = mergeFilteredTree;