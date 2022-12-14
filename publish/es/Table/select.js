import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _createClass from "@babel/runtime/helpers/createClass";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { addEventListener } from '../utils/dom/document';
import { getParent } from '../utils/dom/element';
import { isMacOS, isFirefox } from '../utils/is';
import ready from '../utils/dom/ready';
import { tableClass } from './styles';
var selectClass = tableClass('select');
var trClass = tableClass('normal');
var noSelection = tableClass('no-selection'); // event combination

function _isEventCombination(event) {
  var ismo = isMacOS();
  return ismo && event.metaKey || !ismo && event.ctrlKey;
} // 根据table tr层次   合并td


function mergeDomsText(nodes) {
  if (!nodes || nodes.length <= 0) return [];
  var trs = [];
  var res = [];
  nodes.forEach(function (node) {
    var tr = getParent(node, "tr." + trClass);
    var index = trs.indexOf(tr);

    if (index === -1) {
      trs.push(tr);
      index = trs.length - 1;
    }

    if (res[index]) {
      res[index].push(node.innerText);
    } else {
      res[index] = [node.innerText];
    }
  });
  return res;
} // format table text
// 组合 text


function formatTableText(arrs) {
  if (!arrs || arrs.length <= 0) return '';
  var txt = '';
  arrs.forEach(function (value) {
    if (typeof value === 'string') {
      txt += value + "\t";
    } else {
      txt += formatTableText(value) + "\n";
    }
  });
  return txt;
} // 生成 textarea，并且执行 copy


function execCopyCommand(text) {
  // if none, return;
  if (!text) return;
  var textarea = document.createElement('textarea');
  textarea.setAttribute('readonly', 'readonly');
  textarea.value = text; // out window

  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.left = '-9999px';
  document.body.append(textarea);
  textarea.select();

  if (document.execCommand('copy')) {
    document.execCommand('copy');
  }

  document.body.removeChild(textarea);
} // remove all selectClass from dom


function removeSelectClass(dom, force) {
  if (force === void 0) {
    force = false;
  }

  if (dom) {
    dom.classList.remove(selectClass);
    return;
  }

  if (force) return;
  var nodes = document.querySelectorAll("." + selectClass);
  if (nodes.length <= 0) return;
  nodes.forEach(function (elem) {
    removeSelectClass(elem);
  });
  nodes = document.querySelector("." + noSelection);
  if (nodes) nodes.classList.remove("." + noSelection);
} // add selection class


function addSelectionClass(dom, className) {
  if (className === void 0) {
    className = selectClass;
  }

  if (!dom) return;
  dom.classList.add(className);
}

function toggleNoSelection(flag) {
  if (flag) {
    document.body.classList.add(noSelection);
    return;
  }

  document.body.classList.remove(noSelection);
} // handle document click


function docClick(event) {
  if ((getParent(event.target, "." + tableClass('simple-body')) || getParent(event.target, "." + tableClass('body'))) && _isEventCombination(event)) return;
  removeSelectClass();
  toggleNoSelection();
} // 批量操作
// bulk operation doms


function bulkOperation(doms, start, end) {
  if (!doms || doms.length <= 0 || start <= -1 || end <= -1) return;
  var arr = Array.prototype.slice.call(doms.childNodes, start, end + 1);
  arr.forEach(function (dom) {
    addSelectionClass(dom);
  });
} // 批量操作 -->  添加 selection classname


function bulkAddSelectionClass(td, cache) {
  var tr = getParent(td, "tr." + trClass);
  if (!tr) return;
  var trs = tr.parentNode.childNodes;
  var xIndex = Array.prototype.indexOf.call(tr.childNodes, td);
  var count = 0; // xIndex - cache.xIndex

  while (count < trs.length) {
    if (cache.yIndex <= count) {
      bulkOperation(trs[count], cache.xIndex, xIndex);
    }

    if (trs[count] === tr) {
      break;
    }

    count += 1;
  }
}

function handleKeyDown(event) {
  if (!_isEventCombination(event) || event.keyCode !== 67) return;
  var texts = formatTableText(mergeDomsText(document.querySelectorAll("." + selectClass)));
  execCopyCommand(texts);
} // ctrl + c


ready(function () {
  addEventListener(document, 'keydown', handleKeyDown);
});
export default (function (Table) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(_class, _React$Component);

    function _class(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.doc = null;
      _this.isFirefox = isFirefox();
      _this.events = {};
      _this.move = false;
      _this.cache = {};
      _this.prevDom = null;
      _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleMouseUp = _this.handleMouseUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));

      if (!_this.isFirefox && _this.selection) {
        _this.events.onMouseDown = _this.handleMouseDown;
        _this.events.onMouseUp = _this.handleMouseUp;
        _this.events.onMouseMove = _this.handleMouseMove;
      }

      return _this;
    }

    var _proto = _class.prototype;

    _proto.componentDidMount = function componentDidMount() {
      if (!this.isFirefox && this.selection) {
        this.doc = addEventListener(document, 'click', docClick);
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this.doc) {
        this.doc.remove();
      }
    };

    _proto.isEventCombination = function isEventCombination(event) {
      return this.selection && _isEventCombination(event);
    };

    _proto.handleMouseDown = function handleMouseDown(event) {
      if (!this.isEventCombination(event)) return;
      toggleNoSelection(true); // toggle move

      this.move = true;
      var td = getParent(event.target, 'td');
      var tr = getParent(td, "tr." + trClass);
      this.prevDom = td;
      if (!tr) return;
      var xIndex = Array.prototype.indexOf.call(tr.childNodes, td);
      var yIndex = Array.prototype.indexOf.call(tr.parentNode.childNodes, tr);
      this.cache.xIndex = xIndex;
      this.cache.yIndex = yIndex;
      this.cache.dom = td;
    };

    _proto.handleMouseUp = function handleMouseUp(event) {
      if (!this.isEventCombination(event)) return;
      var td = getParent(event.target, 'td');

      if (td === this.cache.dom) {
        this.cache = {};
        this.move = false;

        if (td.classList.contains(selectClass)) {
          removeSelectClass(td);
          return;
        }

        addSelectionClass(td);
        return;
      }

      this.prevDom = null;
      bulkAddSelectionClass(td, this.cache); // reset

      this.cache = {};
      this.move = false;
    };

    _proto.handleMouseMove = function handleMouseMove(event) {
      if (!this.move) return;
      var td = getParent(event.target, 'td');
      if (this.prevDom === td) return;
      this.prevDom = td; // clear class name

      removeSelectClass();
      bulkAddSelectionClass(td, this.cache);
    };

    _proto.render = function render() {
      var _this$props = this.props,
          selection = _this$props.selection,
          cellSelectable = _this$props.cellSelectable,
          otherProps = _objectWithoutPropertiesLoose(_this$props, ["selection", "cellSelectable"]);

      return React.createElement(Table, _extends({}, otherProps, {
        events: this.events
      }));
    };

    _createClass(_class, [{
      key: "selection",
      get: function get() {
        var _this$props2 = this.props,
            selection = _this$props2.selection,
            cellSelectable = _this$props2.cellSelectable;
        return selection || cellSelectable;
      }
    }]);

    return _class;
  }(React.Component), _defineProperty(_class, "propTypes", {
    selection: PropTypes.bool,
    cellSelectable: PropTypes.bool
  }), _temp;
});