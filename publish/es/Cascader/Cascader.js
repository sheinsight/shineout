import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import immer from 'immer';
import classnames from 'classnames';
import { isFunc } from '../utils/is';
import { PureComponent } from '../component';
import { getUidStr } from '../utils/uid';
import DatumTree from '../Datum/Tree';
import { selectClass } from '../Select/styles';
import { cascaderClass } from './styles';
import Result from './Result';
import CascaderList from './List';
import FilterList from './FilterList';
import { docSize } from '../utils/dom/document';
import { getParent } from '../utils/dom/element';
import absoluteList from '../AnimationList/AbsoluteList';
import { isRTL } from '../config';
import { getKey } from '../utils/uid';
var OptionList = absoluteList(function (_ref) {
  var focus = _ref.focus,
      getRef = _ref.getRef,
      other = _objectWithoutPropertiesLoose(_ref, ["focus", "getRef"]);

  return focus ? React.createElement("div", _extends({}, other, {
    ref: getRef
  })) : null;
});

var isDescendent = function isDescendent(el, id) {
  if (el.getAttribute('data-id') === id) return true;
  if (!el.parentElement) return false;
  return isDescendent(el.parentElement, id);
};

var Cascader =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Cascader, _PureComponent);

  function Cascader(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      focus: false,
      path: [],
      position: 'drop-down'
    };
    _this.datum = new DatumTree({
      data: props.data,
      loader: props.loader,
      keygen: props.keygen,
      mode: props.mode,
      onChange: props.onChange,
      value: props.value || props.defaultValue,
      disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
      childrenKey: props.childrenKey,
      unmatch: props.unmatch
    });
    _this.isRendered = false;
    _this.selectId = "select_" + getUidStr();
    _this.handleClick = _this.handleState.bind(_assertThisInitialized(_assertThisInitialized(_this)), true);
    _this.handleBlur = _this.handleState.bind(_assertThisInitialized(_assertThisInitialized(_this)), false);
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClickAway = _this.handleClickAway.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handlePathChange = _this.handlePathChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClear = _this.handleClear.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.shouldFocus = _this.shouldFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindRef = _this.bindRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindInput = _this.bindInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleRemove = _this.handleRemove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.close = _this.handleBlur;

    if (props.getComponentRef) {
      if (isFunc(props.getComponentRef)) {
        props.getComponentRef(_assertThisInitialized(_assertThisInitialized(_this)));
      } else {
        props.getComponentRef.current = _assertThisInitialized(_assertThisInitialized(_this));
      }
    }

    return _this;
  }

  var _proto = Cascader.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    this.updatePathByValue();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    this.datum.mode = this.props.mode;
    var _this$props = this.props,
        onFilter = _this$props.onFilter,
        filterDataChange = _this$props.filterDataChange,
        filterText = _this$props.filterText;
    if (!filterDataChange && prevProps.data !== this.props.data) this.datum.setData(this.props.data, true);

    if (prevProps.value !== this.props.value) {
      this.datum.setValue(this.props.value || []);
      this.updatePathByValue();
    }

    if (prevState.focus !== this.state.focus && !this.state.focus && onFilter) {
      setTimeout(function () {
        onFilter('');
      }, 400);
    }

    if (filterText !== undefined && prevProps.filterText !== filterText) {
      this.updatePath();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.clearClickAway();
  };

  _proto.bindRef = function bindRef(el) {
    this.ref = el;
  };

  _proto.bindClickAway = function bindClickAway() {
    document.addEventListener('mousedown', this.handleClickAway);
  };

  _proto.bindInput = function bindInput(input) {
    this.input = input;
  };

  _proto.clearClickAway = function clearClickAway() {
    document.removeEventListener('mousedown', this.handleClickAway);
  };

  _proto.shouldFocus = function shouldFocus(el) {
    if (el.getAttribute('data-id') === this.selectId) return true;
    if (getParent(el, "." + cascaderClass('result'))) return true;
    return false;
  };

  _proto.updatePath = function updatePath() {
    var _this$props2 = this.props,
        firstMatchNode = _this$props2.firstMatchNode,
        keygen = _this$props2.keygen,
        filterText = _this$props2.filterText;

    if (!filterText || !firstMatchNode) {
      this.setState({
        path: []
      });
      return;
    }

    var key = getKey(firstMatchNode, keygen);
    var current = this.datum.getPath(key);
    if (!current) return;
    this.setState(immer(function (draft) {
      draft.path = [].concat(current.path, [key]);
    }));
  };

  _proto.updatePathByValue = function updatePathByValue() {
    var _this$props3 = this.props,
        mode = _this$props3.mode,
        value = _this$props3.value;
    if (mode !== undefined) return;
    if (value === this.lastValue) return;

    if (!value || !value.length) {
      this.setState({
        path: []
      });
    } else {
      var v = value[value.length - 1];
      var data = this.datum.getDataById(v);
      if (data === null) return;

      try {
        var id = this.datum.getKey(data);

        var _ref2 = this.datum.getPath(id) || {},
            path = _ref2.path;

        path = path || [];
        this.handlePathChange(id, null, path);
      } catch (e) {
        console.error(e);
      }
    }
  };

  _proto.handleClickAway = function handleClickAway(e) {
    var desc = isDescendent(e.target, this.selectId);

    if (!desc) {
      this.clearClickAway();
      this.props.onBlur();
      this.handleState(false);
    }
  };

  _proto.handlePathChange = function handlePathChange(id, data, path, fromClick) {
    var _this2 = this;

    var _this$props4 = this.props,
        childrenKey = _this$props4.childrenKey,
        finalDismiss = _this$props4.finalDismiss,
        loader = _this$props4.loader;

    if (fromClick && data) {
      var leaf = !data[childrenKey] || data[childrenKey].length === 0;

      if (loader && typeof loader === 'function' && data[childrenKey] === undefined) {
        leaf = false;
      }

      if (finalDismiss && leaf) this.handleState(false);
    }

    setTimeout(function () {
      _this2.setState({
        path: [].concat(path, [id])
      });
    }, 50);
  };

  _proto.handleFocus = function handleFocus(e) {
    if (!this.shouldFocus(e.target)) return;
    this.props.onFocus(e);
    this.bindClickAway();
  };

  _proto.handleClear = function handleClear() {
    var _this3 = this;

    var mode = this.props.mode;
    this.setState({
      path: []
    });
    if (mode !== undefined) this.datum.setValue([]);
    this.handleChange([]); // force close

    setTimeout(function () {
      return _this3.handleState(false);
    }, 10);
  };

  _proto.handleRemove = function handleRemove(node) {
    var onChange = this.props.onChange;
    this.datum.set(this.datum.getKey(node), 0);
    if (onChange) onChange(this.datum.getValue(), node);
  };

  _proto.handleState = function handleState(focus, e) {
    if (this.props.disabled === true) return;
    if (focus === this.state.focus) return; // click close icon

    if (focus && e && e.target.classList.contains(cascaderClass('close'))) return; // if remove node, return

    if (e && getParent(e.target, "." + cascaderClass('remove-container'))) return;
    var _this$props5 = this.props,
        height = _this$props5.height,
        onCollapse = _this$props5.onCollapse;
    var position = this.props.position;

    if (!position) {
      var windowHeight = docSize.height;
      var bottom = height + this.element.getBoundingClientRect().bottom;
      if (bottom > windowHeight) position = 'drop-up';
    }

    if (onCollapse) onCollapse(focus);
    this.setState({
      focus: focus,
      position: position || 'drop-down'
    });

    if (focus) {
      this.renderPending = false;
      this.bindClickAway();
    } // } else if (blur) {
    //   this.clearClickAway()
    //   onBlur()
    // }

  };

  _proto.handleKeyDown = function handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleState(!this.state.focus);
    } // fot close the list


    if (e.keyCode === 9) {
      this.props.onBlur(); // e.preventDefault()

      if (this.state.focus) {
        this.handleState(false);
      } else {
        this.clearClickAway();
      }
    }
  };

  _proto.handleChange = function handleChange() {
    var _this$props6 = this.props,
        onChange = _this$props6.onChange,
        onFilter = _this$props6.onFilter,
        filterText = _this$props6.filterText;

    if (this.input) {
      this.input.reset();
      this.input.focus();
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var value = args[0];
    this.lastValue = value;
    onChange.apply(void 0, args);
    if (onFilter && filterText) onFilter('');
  };

  _proto.renderList = function renderList() {
    var _this4 = this;

    var _this$props7 = this.props,
        data = _this$props7.data,
        keygen = _this$props7.keygen,
        renderItem = _this$props7.renderItem,
        mode = _this$props7.mode,
        loader = _this$props7.loader,
        onItemClick = _this$props7.onItemClick,
        expandTrigger = _this$props7.expandTrigger,
        childrenKey = _this$props7.childrenKey,
        height = _this$props7.height;
    var path = this.state.path;
    var props = {
      datum: this.datum,
      renderItem: renderItem,
      keygen: keygen,
      loader: loader,
      onPathChange: this.handlePathChange,
      onChange: this.handleChange,
      onItemClick: onItemClick,
      multiple: mode !== undefined,
      expandTrigger: expandTrigger,
      childrenKey: childrenKey
    };
    var tempData = data;
    var list = [React.createElement(CascaderList, _extends({}, props, {
      key: "root",
      data: tempData,
      id: path[0],
      parentId: "",
      path: []
    }))];
    var childs = path.map(function (p, i) {
      tempData = tempData && tempData.find(function (d) {
        var nid = _this4.datum.getKey(d, path[i - 1]);

        return nid === p;
      });

      if (tempData && tempData[childrenKey] && tempData[childrenKey].length > 0) {
        tempData = tempData[childrenKey];
        return React.createElement(CascaderList, _extends({}, props, {
          key: p,
          data: tempData,
          id: path[i + 1],
          parentId: path[i],
          path: path.slice(0, i + 1)
        }));
      }

      return null;
    });
    list = list.concat(childs);
    var listStyle = data.length === 0 ? {
      height: 'auto',
      width: '100%'
    } : {
      height: height
    };
    return React.createElement("div", {
      ref: this.bindRef,
      style: listStyle
    }, list);
  };

  _proto.renderAbsoluteList = function renderAbsoluteList() {
    var _this$props8 = this.props,
        absolute = _this$props8.absolute,
        zIndex = _this$props8.zIndex;
    var _this$state = this.state,
        focus = _this$state.focus,
        position = _this$state.position;
    var className = classnames(selectClass('options'), cascaderClass('options'));
    var rootClass = classnames(cascaderClass(focus && 'focus', isRTL() && 'rtl'), selectClass(this.state.position));
    if (!focus && !this.isRendered) return null;
    this.isRendered = true;
    return React.createElement(OptionList, {
      autoAdapt: true,
      rootClass: rootClass,
      className: className,
      position: position,
      absolute: absolute,
      focus: focus,
      parentElement: this.element,
      "data-id": this.selectId,
      zIndex: zIndex
    }, this.renderList());
  };

  _proto.renderFilterList = function renderFilterList() {
    var _this$props9 = this.props,
        absolute = _this$props9.absolute,
        onFilter = _this$props9.onFilter,
        filterText = _this$props9.filterText,
        zIndex = _this$props9.zIndex,
        data = _this$props9.data,
        childrenKey = _this$props9.childrenKey,
        renderItem = _this$props9.renderItem,
        expandTrigger = _this$props9.expandTrigger,
        height = _this$props9.height,
        loading = _this$props9.loading;
    var _this$state2 = this.state,
        focus = _this$state2.focus,
        position = _this$state2.position;
    var className = classnames(cascaderClass(focus && 'focus', isRTL() && 'rtl'), selectClass(this.state.position));
    return React.createElement(FilterList, {
      fixed: "min",
      rootClass: className,
      position: position,
      absolute: absolute,
      focus: focus,
      parentElement: this.element,
      "data-id": this.selectId,
      zIndex: zIndex,
      data: data,
      childrenKey: childrenKey,
      renderItem: renderItem,
      expandTrigger: expandTrigger,
      datum: this.datum,
      onChange: this.handleChange,
      onPathChange: this.handlePathChange,
      onFilter: onFilter,
      filterText: filterText,
      height: height,
      loading: loading
    });
  };

  _proto.renderPanel = function renderPanel() {
    var _this$props10 = this.props,
        filterText = _this$props10.filterText,
        data = _this$props10.data,
        mode = _this$props10.mode,
        loading = _this$props10.loading;
    if (loading) return this.renderFilterList();
    if (!filterText || filterText && mode !== undefined || data.length === 0) return this.renderAbsoluteList();
    return this.renderFilterList();
  };

  _proto.render = function render() {
    var _this5 = this;

    var _this$props11 = this.props,
        placeholder = _this$props11.placeholder,
        disabled = _this$props11.disabled,
        size = _this$props11.size,
        other = _objectWithoutPropertiesLoose(_this$props11, ["placeholder", "disabled", "size"]);

    var focus = this.state.focus;
    var className = classnames(cascaderClass('_', size, focus && 'focus', other.mode !== undefined && 'multiple', disabled === true && 'disabled', isRTL() && 'rtl'), selectClass(this.state.position, focus && 'focus'));
    return React.createElement("div", {
      // eslint-disable-next-line
      tabIndex: disabled === true ? -1 : 0,
      className: className,
      onFocus: this.handleFocus,
      onClick: this.handleClick,
      "data-id": this.selectId,
      onKeyDown: this.handleKeyDown,
      ref: function ref(el) {
        _this5.element = el;
      }
    }, React.createElement(Result, _extends({}, other, {
      focus: focus,
      multiple: other.mode !== undefined,
      datum: this.datum,
      placeholder: placeholder,
      onClear: this.handleClear,
      onPathChange: this.handlePathChange,
      bindInput: this.bindInput,
      handleRemove: this.handleRemove,
      selectId: this.selectId,
      showList: this.handleClick,
      size: size
    })), this.renderPanel());
  };

  return Cascader;
}(PureComponent);

Cascader.propTypes = {
  clearable: PropTypes.bool,
  data: PropTypes.array,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  expandTrigger: PropTypes.oneOf(['click', 'hover', 'hover-only']),
  height: PropTypes.number,
  keygen: PropTypes.any,
  loader: PropTypes.func,
  mode: PropTypes.oneOf([0, 1, 2, 3]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onItemClick: PropTypes.func,
  placeholder: PropTypes.any,
  position: PropTypes.string,
  renderItem: PropTypes.any,
  renderResult: PropTypes.any,
  size: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.array,
  absolute: PropTypes.bool,
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  childrenKey: PropTypes.string,
  finalDismiss: PropTypes.bool,
  onCollapse: PropTypes.func,
  filterText: PropTypes.string,
  onFilter: PropTypes.func,
  filterDataChange: PropTypes.any,
  firstMatchNode: PropTypes.object,
  unmatch: PropTypes.bool,
  getComponentRef: PropTypes.func,
  showArrow: PropTypes.bool,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.node])
};
Cascader.defaultProps = {
  clearable: true,
  expandTrigger: 'click',
  height: 300,
  data: [],
  childrenKey: 'children',
  showArrow: true
};
export default Cascader;