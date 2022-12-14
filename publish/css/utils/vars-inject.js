"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getInjectType = getInjectType;
exports.setInjectType = setInjectType;
exports.cleanStyleObj = cleanStyleObj;
exports.injectTag = injectTag;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _color = require("./color");

var _config = require("../config");

var _objects = require("./objects");

var _styles = require("../Pagination/styles");

var _styles2 = require("../Checkbox/styles");

var _styles3 = require("../Button/styles");

var _styles4 = require("../Select/styles");

var _styles5 = require("../Form/styles");

var _styles6 = require("../Menu/styles");

var _styles7 = require("../Alert/styles");

var _styles8 = require("../Message/styles");

var _styles9 = require("../Modal/styles");

var _styles10 = require("../Popover/styles");

var _styles11 = require("../DatePicker/styles");

var _styles12 = require("../Dropdown/styles");

var _styles13 = require("../Input/styles");

var _styles14 = require("../Card/styles");

var _styles15 = require("../Tooltip/styles");

var _styles16 = require("../Slider/styles");

var _styles17 = require("../Tag/styles");

var _expose = require("../styles/expose");

var computedCache = {};
var injectType = 'body';
var styleObj = {};

function getInjectType() {
  return injectType;
}

function setInjectType(type) {
  injectType = type;
}

function cleanStyleObj() {
  styleObj = {};
}

function injectTag(custom) {
  if (custom === void 0) {
    custom = {};
  }

  var id = '__shineoutThemeStyleContainer__';
  var styleText = "body{" + Object.keys((0, _objectSpread2.default)({}, styleObj, custom)).map(function (key) {
    return key + ": " + styleObj[key];
  }).join(';') + "}";
  var el = document.getElementById(id);

  if (el) {
    el.innerText = styleText;
  } else {
    var stylee = document.createElement('style');
    stylee.setAttribute('type', 'text/css');
    stylee.setAttribute('id', id);
    stylee.innerText = styleText;
    document.head.appendChild(stylee);
  }
}

function getProperty(name, cache) {
  if (name === void 0) {
    name = '--btn-hover-darken';
  }

  if (cache === void 0) {
    cache = true;
  }

  if (cache && computedCache[name]) return computedCache[name];
  computedCache[name] = getComputedStyle(document.body).getPropertyValue(name).trim();
  return computedCache[name];
}

function setBodyProperty(colors, value) {
  for (var _iterator = (0, _objects.entries)(colors), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var _ref2 = _ref,
        cssVar = _ref2[0],
        cssValue = _ref2[1];

    if (injectType === 'body') {
      if (value === undefined) {
        document.body.style.removeProperty(cssVar);
      } else {
        document.body.style.setProperty(cssVar, cssValue);
      }
    }

    if (injectType === 'tag') {
      if (value === undefined) {
        delete styleObj[cssVar];
      } else {
        styleObj[cssVar] = cssValue;
      }
    }
  }
}

var injects = {
  color: {
    info: {
      title: 'Color 颜色',
      name: 'color',
      path: 'Button'
    },
    conf: [{
      name: 'primary',
      type: 'color',
      attr: 'backgroundColor',
      className: (0, _styles3.buttonClass)('primary'),
      desc: '主色'
    }, {
      name: 'infoColor',
      type: 'color',
      attr: 'backgroundColor',
      className: (0, _styles3.buttonClass)('info')
    }, {
      name: 'warning',
      type: 'color',
      attr: 'backgroundColor',
      className: (0, _styles3.buttonClass)('warning')
    }, {
      name: 'danger',
      type: 'color',
      attr: 'backgroundColor',
      className: (0, _styles3.buttonClass)('danger')
    }, {
      name: 'secondary',
      type: 'color',
      attr: 'backgroundColor',
      className: (0, _styles3.buttonClass)('secondary')
    }, {
      name: 'success',
      type: 'color',
      attr: 'backgroundColor',
      className: (0, _styles3.buttonClass)('success')
    }, {
      name: 'gray100',
      type: 'color',
      attr: 'color',
      desc: 'Form, Datepicker, Cascader, Tree, Card, Upload, Pagination, Select',
      className: (0, _expose.exposeClass)('gray-100')
    }, {
      name: 'gray200',
      type: 'color',
      attr: 'color',
      desc: 'Form, Datepicker, Cascader, Alert, Tabs, Progress',
      className: (0, _expose.exposeClass)('gray-200')
    }, {
      name: 'gray300',
      type: 'color',
      attr: 'color',
      desc: 'Button, Card, Cascader, Upload, Image, Tooltip',
      className: (0, _expose.exposeClass)('gray-300')
    }, {
      name: 'gray400',
      type: 'color',
      attr: 'color',
      desc: 'Cascader, Select, TreeSelect, Slider, Upload, Input, Rate',
      className: (0, _expose.exposeClass)('gray-400')
    }, {
      name: 'gray500',
      type: 'color',
      attr: 'color',
      desc: 'Cascader, Select, Table, TreeSelect, Checkbox, Slider, Tree',
      className: (0, _expose.exposeClass)('gray-500')
    }, {
      name: 'gray600',
      type: 'color',
      attr: 'color',
      desc: 'Select, Datepicker, TreeSelect, Link-disabled, Table, Pagination, Tree',
      className: (0, _expose.exposeClass)('gray-600')
    }, {
      name: 'gray700',
      type: 'color',
      attr: 'color',
      desc: 'Table sort icon hover color',
      className: (0, _expose.exposeClass)('gray-700')
    }, {
      name: 'gray800',
      type: 'color',
      attr: 'color',
      desc: 'Dropdown, Card, Dropdown',
      className: (0, _expose.exposeClass)('gray-800')
    }, {
      name: 'gray900',
      type: 'color',
      attr: 'color',
      desc: 'text color, Menu',
      className: (0, _expose.exposeClass)('gray-900')
    }],

    set primary(v) {
      setBodyProperty({
        '--primary-color': v,
        '--primary-color-dark-5': (0, _color.darken)(v, 5),
        '--primary-color-dark-15': (0, _color.darken)(v, 15),
        '--primary-color-dark-btn-hover': (0, _color.darken)(v, getProperty()),
        '--primary-color-lighten-40': (0, _color.darken)(v, -40),
        '--primary-color-fade-60': (0, _color.fade)(v, 0.6),
        '--primary-color-fade-50': (0, _color.fade)(v, 0.5),
        '--primary-color-fade-10': (0, _color.fade)(v, 0.1),
        '--primary-color-fade-5': (0, _color.fade)(v, 0.05),
        '--primary-color-fade-0': (0, _color.fade)(v, 0),
        '--primary-color-dark-5_fade-60': (0, _color.fade)((0, _color.darken)(v, 5), 0.6),
        '--primary-color-dark-5_fade-0': (0, _color.fade)((0, _color.darken)(v, 5), 0)
      }, v);
    },

    set infoColor(v) {
      setBodyProperty({
        '--info-color': v,
        '--info-color-dark-5': (0, _color.darken)(v, 5),
        '--info-color-fade-60': (0, _color.fade)(v, 0.6),
        '--info-color-dark-5_fade-60': (0, _color.fade)((0, _color.darken)(v, 5), 0.6),
        '--info-color-fade-0': (0, _color.fade)(v, 0),
        '--info-color-dark-5_fade-0': (0, _color.fade)((0, _color.darken)(v, 5), 0),
        '--info-color-dark-btn-hover': (0, _color.darken)(v, getProperty())
      }, v);
    },

    set warning(v) {
      setBodyProperty({
        '--warning-color': v,
        '--warning-color-dark-5': (0, _color.darken)(v, 5),
        '--warning-color-fade-60': (0, _color.fade)(v, 0.6),
        '--warning-color-dark-5_fade-60': (0, _color.fade)((0, _color.darken)(v, 5), 0.6),
        '--warning-color-fade-0': (0, _color.fade)(v, 0),
        '--warning-color-dark-5_fade-0': (0, _color.fade)((0, _color.darken)(v, 5), 0),
        '--warning-color-dark-btn-hover': (0, _color.darken)(v, getProperty())
      }, v);
    },

    set danger(v) {
      setBodyProperty({
        '--danger-color': v,
        '--danger-color-fade-25': (0, _color.fade)(v, 0.25),
        '--danger-color-dark-5': (0, _color.darken)(v, 5),
        '--danger-color-fade-60': (0, _color.fade)(v, 0.6),
        '--danger-color-dark-5_fade-60': (0, _color.fade)((0, _color.darken)(v, 5), 0.6),
        '--danger-color-fade-0': (0, _color.fade)(v, 0),
        '--danger-color-dark-5_fade-0': (0, _color.fade)((0, _color.darken)(v, 5), 0),
        '--danger-color-dark-btn-hover': (0, _color.darken)(v, getProperty())
      }, v);
    },

    set success(v) {
      setBodyProperty({
        '--success-color': v,
        '--success-color-dark-5': (0, _color.darken)(v, 5),
        '--success-color-fade-60': (0, _color.fade)(v, 0.6),
        '--success-color-dark-5_fade-60': (0, _color.fade)((0, _color.darken)(v, 5), 0.6),
        '--success-color-fade-0': (0, _color.fade)(v, 0),
        '--success-color-dark-5_fade-0': (0, _color.fade)((0, _color.darken)(v, 5), 0),
        '--success-color-dark-btn-hover': (0, _color.darken)(v, getProperty())
      }, v);
    },

    set secondary(v) {
      setBodyProperty({
        '--secondary-color': v,
        '--secondary-color-dark-5': (0, _color.darken)(v, 5),
        '--secondary-color-dark-btn-hover': (0, _color.darken)(v, getProperty()),
        '--secondary-color-dark-5_fade-60': (0, _color.fade)((0, _color.darken)(v, 5), 0.6),
        '--secondary-color-dark-5_fade-0': (0, _color.fade)((0, _color.darken)(v, 5), 0)
      }, v);
    },

    set gray100(v) {
      setBodyProperty({
        '--gray-100': v
      }, v);
    },

    set gray200(v) {
      setBodyProperty({
        '--gray-200': v,
        '--gray-200-darken-5': (0, _color.darken)(v, 5)
      }, v);
    },

    set gray300(v) {
      setBodyProperty({
        '--gray-300': v,
        '--gray-300-darken-hover': (0, _color.darken)(v, getProperty()),
        '--gray-300-fade-60': (0, _color.fade)(v, 0.6),
        '--gray-300-fade-0': (0, _color.fade)(v, 0)
      }, v);
    },

    set gray400(v) {
      setBodyProperty({
        '--gray-400': v,
        '--gray-400-darken-20': (0, _color.darken)(v, 20)
      }, v);
    },

    set gray500(v) {
      setBodyProperty({
        '--gray-500': v
      }, v);
    },

    set gray600(v) {
      setBodyProperty({
        '--gray-600': v,
        '--gray-600-lighten-15': (0, _color.darken)(v, -15)
      }, v);
    },

    set gray700(v) {
      setBodyProperty({
        '--gray-700': v
      }, v);
    },

    set gray800(v) {
      setBodyProperty({
        '--gray-800': v,
        '--gray-800-darken-5': (0, _color.darken)(v, 5)
      }, v);
    },

    set gray900(v) {
      setBodyProperty({
        '--gray-900': v,
        '--gray-900-lighten-40': (0, _color.darken)(v, -40)
      }, v);
    }

  },
  button: {
    info: {
      title: 'Button 按钮',
      name: 'button',
      path: 'Button'
    },
    conf: [{
      name: 'fontSizeBase',
      attr: 'fontSize',
      type: 'number',
      parser: parseInt,
      className: (0, _styles3.buttonClass)('_'),
      desc: '常规按钮字体大小'
    }, {
      name: 'fontSizeLarge',
      attr: 'fontSize',
      type: 'number',
      parser: parseInt,
      className: (0, _styles3.buttonClass)('large'),
      desc: '大按钮字体大小'
    }, {
      name: 'fontSizeSmall',
      attr: 'fontSize',
      type: 'number',
      parser: parseInt,
      className: (0, _styles3.buttonClass)('small'),
      desc: '小按钮字体大小'
    }, {
      name: 'marginLeft',
      attr: 'marginLeft',
      type: 'number',
      parser: parseInt,
      className: (0, _expose.exposeClass)('button'),
      desc: '连续按钮间距'
    }, {
      name: 'spinMargin',
      attr: 'marginRight',
      type: 'number',
      parser: parseInt,
      className: (0, _styles3.buttonClass)('spin-ltr'),
      desc: '加载图标与文字间距'
    }, {
      name: 'paddingBaseHorizontal',
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      className: (0, _styles3.buttonClass)('_'),
      desc: '常规按钮水平内边距'
    }, {
      name: 'paddingBaseVertical',
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      className: (0, _styles3.buttonClass)('_'),
      desc: '常规按钮垂直内边距'
    }, {
      name: 'paddingLargeHorizontal',
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      className: (0, _styles3.buttonClass)('large'),
      desc: '大按钮水平内边距'
    }, {
      name: 'paddingLargeVertical',
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      className: (0, _styles3.buttonClass)('large'),
      desc: '大按钮垂直内边距'
    }, {
      name: 'paddingSmallHorizontal',
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      className: (0, _styles3.buttonClass)('small'),
      desc: '小按钮水平内边距'
    }, {
      name: 'paddingSmallVertical',
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      className: (0, _styles3.buttonClass)('small'),
      desc: '小按钮垂直内边距'
    }, {
      name: 'borderRadius',
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      className: (0, _styles3.buttonClass)('_'),
      desc: '常规按钮圆角'
    }, {
      name: 'smallBorderRadius',
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      className: (0, _styles3.buttonClass)('small'),
      desc: '小按钮圆角'
    }, {
      name: 'largeBorderRadius',
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      className: (0, _styles3.buttonClass)('large'),
      desc: '大按钮圆角'
    }, {
      name: 'disabledBg',
      attr: 'backgroundColor',
      type: 'color',
      className: (0, _styles3.buttonClass)('disabled'),
      desc: '禁用按钮背景色'
    }, {
      name: 'disabledDelimiter',
      attr: 'borderColor',
      type: 'color',
      className: (0, _expose.exposeClass)('button-disabled-delimiter'),
      desc: '按钮组禁用状态下分隔符颜色'
    }, {
      name: 'disabledColor',
      attr: 'color',
      type: 'color',
      className: (0, _styles3.buttonClass)('disabled'),
      desc: '禁用按钮文字颜色'
    }, {
      name: 'disabledBorderColor',
      attr: 'borderColor',
      type: 'color',
      className: (0, _styles3.buttonClass)('disabled'),
      desc: '禁用按钮边框颜色'
    }, {
      name: 'buttonDefaultTextColor',
      attr: 'color',
      type: 'color',
      className: (0, _styles3.buttonClass)('default'),
      desc: '默认样式下文字颜色'
    }, {
      name: 'buttonDefaultBorderColor',
      attr: 'borderColor',
      type: 'color',
      className: (0, _styles3.buttonClass)('default'),
      desc: '默认样式下边框颜色'
    }],

    set fontSizeBase(v) {
      setBodyProperty({
        '--button-font-size-base': parseInt(v, 10) + "px"
      }, v);
    },

    set fontSizeLarge(v) {
      setBodyProperty({
        '--button-font-size-large': parseInt(v, 10) + "px"
      }, v);
    },

    set fontSizeSmall(v) {
      setBodyProperty({
        '--button-font-size-small': parseInt(v, 10) + "px"
      }, v);
    },

    set spinMargin(v) {
      setBodyProperty({
        '--button-spin-margin': parseInt(v, 10) + "px"
      }, v);
    },

    set marginLeft(v) {
      setBodyProperty({
        '--button-margin-left': parseInt(v, 10) + "px"
      }, v);
    },

    set borderRadius(v) {
      setBodyProperty({
        '--button-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set smallBorderRadius(v) {
      setBodyProperty({
        '--button-small-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set largeBorderRadius(v) {
      setBodyProperty({
        '--button-large-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingBaseHorizontal(v) {
      setBodyProperty({
        '--button-padding-base-horizontal': parseInt(v, 10) + "px",
        '--button-padding-base-horizontal-7': parseInt(v, 10) * 0.7 + "px"
      }, v);
    },

    set paddingLargeHorizontal(v) {
      setBodyProperty({
        '--button-padding-large-horizontal': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingSmallHorizontal(v) {
      setBodyProperty({
        '--button-padding-small-horizontal': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingBaseVertical(v) {
      setBodyProperty({
        '--button-padding-base-vertical': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingLargeVertical(v) {
      setBodyProperty({
        '--button-padding-large-vertical': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingSmallVertical(v) {
      setBodyProperty({
        '--button-padding-small-vertical': parseInt(v, 10) + "px"
      }, v);
    },

    set disabledBg(v) {
      setBodyProperty({
        '--button-disabled-bg': v
      }, v);
    },

    set disabledColor(v) {
      setBodyProperty({
        '--button-disabled-color': v
      }, v);
    },

    set disabledBorderColor(v) {
      setBodyProperty({
        '--button-disabled-border-color': v
      }, v);
    },

    set disabledDelimiter(v) {
      setBodyProperty({
        '--button-disabled-delimiter': v
      }, v);
    },

    set buttonDefaultTextColor(v) {
      setBodyProperty({
        '--button-default-text-color': v
      }, v);
    },

    set buttonDefaultBorderColor(v) {
      setBodyProperty({
        '--button-default-border': v,
        '--button-default-border-fade-0': (0, _color.fade)(v, 0),
        '--button-default-border-fade-60': (0, _color.fade)(v, 0.6)
      }, v);
    }

  },
  dropdown: {
    info: {
      title: 'Dropdown 下拉菜单',
      name: 'dropdown',
      path: 'Dropdown'
    },
    conf: [{
      name: 'borderWidth',
      attr: 'borderWidth',
      type: 'number',
      parser: parseInt,
      className: (0, _expose.exposeClass)('dropdown-button'),
      desc: '按钮边框宽度'
    }, {
      name: 'columnsPadding',
      attr: 'padding',
      type: 'string',
      className: (0, _styles12.dropdownClass)('box-list'),
      desc: '多列平铺的内边距'
    }, {
      name: 'optionsHoverBgc',
      attr: 'backgroundColor',
      type: 'color',
      className: (0, _expose.exposeClass)('dropdown-options-hover'),
      desc: 'options hover时背景颜色'
    }, {
      name: 'optionsHoverColor',
      attr: 'color',
      type: 'color',
      className: (0, _expose.exposeClass)('dropdown-options-hover'),
      desc: 'options hover时字体颜色'
    }],

    set borderWidth(v) {
      setBodyProperty({
        '--dropdown-border-width': parseInt(v, 10) + "px"
      }, v);
    },

    set columnsPadding(v) {
      setBodyProperty({
        '--dropdown-columns-padding': v
      }, v);
    },

    set optionsHoverBgc(v) {
      setBodyProperty({
        '--dropdown-options-hover-bgc': v
      }, v);
    },

    set optionsHoverColor(v) {
      setBodyProperty({
        '--dropdown-options-hover-color': v
      }, v);
    }

  },
  form: {
    info: {
      title: 'Form 表单',
      name: 'form',
      path: 'Form'
    },
    conf: [{
      name: 'itemMarginBottom',
      className: (0, _styles5.formClass)('item'),
      attr: 'marginBottom',
      type: 'number',
      parser: parseInt,
      desc: '条目垂直间隔'
    }, {
      name: 'itemMarginRight',
      className: (0, _expose.exposeClass)('form-inline'),
      attr: 'marginRight',
      type: 'number',
      parser: parseInt,
      desc: '条目水平间隔'
    }, {
      name: 'tipColor',
      className: (0, _expose.exposeClass)('form-tip'),
      attr: 'color',
      type: 'color',
      desc: '提示文字颜色'
    }, {
      name: 'labelHorizontalAlign',
      className: (0, _expose.exposeClass)('form-label'),
      attr: 'textAlign',
      type: ['start', 'center', 'end'],
      desc: '标签对齐方式'
    }, {
      name: 'formTipFontSize',
      className: (0, _expose.exposeClass)('form-tip'),
      attr: 'fontSize',
      type: 'number',
      parser: parseInt,
      desc: '提示信息字体大小'
    }, {
      name: 'formErrorLineHeight',
      className: (0, _expose.exposeClass)('form-error'),
      attr: 'lineHeight',
      type: 'number',
      parser: parseFloat,
      desc: '校验错误文字行高'
    }, {
      name: 'formErrorMarginTop',
      className: (0, _expose.exposeClass)('form-error'),
      attr: 'marginTop',
      type: 'number',
      parser: parseInt,
      desc: '校验错误文字顶部间距'
    }, {
      name: 'formErrorMarginBottom',
      className: (0, _expose.exposeClass)('form-error'),
      attr: 'marginBottom',
      type: 'number',
      parser: parseInt,
      desc: '校验错误文字底部间距'
    }, {
      name: 'formKeepErrorHeight',
      className: (0, _expose.exposeClass)('form-keep-error'),
      attr: 'min-height',
      type: 'number',
      parser: parseInt,
      desc: '错误提示不撑开表单高度时的最小间距'
    }],

    set itemMarginBottom(v) {
      setBodyProperty({
        '--form-item-margin-bottom': parseInt(v, 10) + "px"
      }, v);
    },

    set itemMarginRight(v) {
      setBodyProperty({
        '--form-item-margin-right': parseInt(v, 10) + "px"
      }, v);
    },

    set tipColor(v) {
      setBodyProperty({
        '--form-tip-color': v
      }, v);
    },

    set labelHorizontalAlign(v) {
      setBodyProperty({
        '--form-item-label-align': v
      }, v);
    },

    set formTipFontSize(v) {
      setBodyProperty({
        '--form-tip-font-size': parseInt(v, 10) + "px"
      }, v);
    },

    set formErrorLineHeight(v) {
      setBodyProperty({
        '--form-item-error-line-height': parseInt(v, 10) + "px"
      }, v);
    },

    set formErrorMarginTop(v) {
      setBodyProperty({
        '--form-item-error-margin-top': parseInt(v, 10) + "px"
      }, v);
    },

    set formErrorMarginBottom(v) {
      setBodyProperty({
        '--form-item-error-margin-bottom': parseInt(v, 10) + "px"
      }, v);
    },

    set formKeepErrorHeight(v) {
      setBodyProperty({
        '--form-Item-min-keep-height': parseInt(v, 10) + "px"
      }, v);
    }

  },
  checkbox: {
    info: {
      title: 'Checkbox 复选框',
      name: 'checkbox',
      path: 'Checkbox'
    },
    conf: [{
      name: 'marginRight',
      className: (0, _styles2.checkinputClass)('_'),
      attr: 'marginRight',
      type: 'number',
      parser: parseInt,
      desc: '水平间隔'
    }, {
      name: 'borderWidth',
      className: (0, _expose.exposeClass)('checkbox-indicator'),
      attr: 'width',
      type: 'number',
      parser: parseInt,
      desc: '边框宽度'
    }, {
      name: 'color',
      className: (0, _styles2.checkinputClass)('_'),
      attr: 'color',
      type: 'color',
      desc: '文字颜色'
    }, {
      name: 'borderColor',
      className: (0, _expose.exposeClass)('checkbox-indicator'),
      attr: 'borderColor',
      type: 'color',
      desc: '边框颜色'
    }, {
      name: 'textPaddingX',
      className: (0, _expose.exposeClass)('checkbox-text'),
      attr: 'paddingRight',
      type: 'number',
      parser: parseInt,
      desc: '文字水平内间距'
    }, {
      name: 'indicatorBorderRadius',
      className: (0, _expose.exposeClass)('checkbox-indicator'),
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      min: 3,
      desc: '圆角'
    }, {
      name: 'checkboxDisabledBgc',
      className: (0, _expose.exposeClass)('checkbox-disabled'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'Checkbox 和 Radio 未选中状态禁用后的背景色'
    }, {
      name: 'checkboxCheckedDisabledBgc',
      className: (0, _expose.exposeClass)('checkbox-checked-disabled'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'Checkbox 和 Radio 选中状态下禁用后的背景色'
    }],

    set marginRight(v) {
      setBodyProperty({
        '--checkbox-margin-right': parseInt(v, 10) + "px"
      }, v);
    },

    set color(v) {
      setBodyProperty({
        '--checkinput-color': v
      }, v);
    },

    set borderColor(v) {
      setBodyProperty({
        '--checkbox-border-color': v
      }, v);
    },

    set borderWidth(v) {
      setBodyProperty({
        '--checkbox-border-width': parseInt(v, 10) + "px"
      }, v);
    },

    set textPaddingX(v) {
      setBodyProperty({
        '--checkbox-text-padding-x': parseInt(v, 10) + "px"
      }, v);
    },

    set indicatorBorderRadius(v) {
      setBodyProperty({
        '--checkbox-indicator-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set checkboxDisabledBgc(v) {
      setBodyProperty({
        '--checkbox-disabled-bgc': v
      }, v);
    },

    set checkboxCheckedDisabledBgc(v) {
      setBodyProperty({
        '--checkbox-checked-disabled-bgc': v
      }, v);
    }

  },
  radio: {
    info: {
      title: 'Radio 单选框',
      name: 'radio',
      path: 'Radio'
    },
    conf: [{
      name: 'size',
      className: (0, _expose.exposeClass)('radio'),
      attr: 'width',
      type: 'number',
      parser: parseInt,
      min: 0,
      max: 40,
      desc: '尺寸'
    }, {
      name: 'borderWidth',
      className: (0, _expose.exposeClass)('radio'),
      attr: 'borderWidth',
      type: 'number',
      parser: parseInt,
      min: 0,
      max: 10,
      desc: '选中的边框宽度'
    }, {
      name: 'innerWidth',
      className: (0, _expose.exposeClass)('radio-inner'),
      attr: 'width',
      type: 'number',
      parser: parseInt,
      min: 0,
      max: 10,
      desc: '选中点尺寸'
    }, {
      name: 'uncheckBorderWidth',
      className: (0, _expose.exposeClass)('radio-uncheck'),
      attr: 'width',
      type: 'number',
      parser: parseInt,
      min: 0,
      desc: '未选中边框宽度'
    }, {
      name: 'color',
      className: (0, _expose.exposeClass)('radio'),
      attr: 'color',
      type: 'color',
      desc: '文字颜色'
    }],

    set size(v) {
      setBodyProperty({
        '--radio-width': parseInt(v, 10) + "px"
      }, v);
    },

    set borderWidth(v) {
      setBodyProperty({
        '--radio-border-width': parseInt(v, 10) + "px"
      }, v);
    },

    set innerWidth(v) {
      setBodyProperty({
        '--radio-inner-width': parseInt(v, 10) + "px"
      }, v);
    },

    set uncheckBorderWidth(v) {
      setBodyProperty({
        '--radio-border-uncheck-width': parseInt(v, 10) + "px"
      }, v);
    },

    set color(v) {
      setBodyProperty({
        '--radio-text-color': v
      }, v);
    }

  },
  input: {
    info: {
      title: 'Input 输入框',
      name: 'input',
      path: 'Input'
    },
    conf: [{
      name: 'color',
      className: (0, _styles13.inputClass)('_'),
      attr: 'color',
      type: 'color',
      desc: '文字颜色'
    }, {
      name: 'borderRadius',
      className: (0, _styles13.inputClass)('_'),
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      desc: '圆角'
    }, {
      name: 'underlineHeight',
      className: (0, _styles13.inputClass)('_', 'underline'),
      attr: 'borderBottomWidth',
      type: 'number',
      parser: parseInt,
      desc: '下边框宽度(仅在下边框模式生效)'
    }, {
      name: 'dropdownBorderRadius',
      className: (0, _styles11.datepickerClass)('picker'),
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      desc: '下拉框圆角，例如Select Options'
    }, {
      name: 'focusWidth',
      className: (0, _styles13.inputClass)('focus'),
      attr: 'boxShadow',
      type: 'number',
      max: 20,
      parser: function parser(v) {
        return parseInt(v.split(' ').pop(), 10);
      },
      desc: '聚焦发散光宽度'
    }, {
      name: 'disabledBg',
      className: (0, _styles13.inputClass)('disabled'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '禁用背景色'
    }, {
      name: 'disabledColor',
      className: (0, _styles13.inputClass)('disabled'),
      attr: 'color',
      type: 'color',
      desc: '禁用字体色'
    }, {
      name: 'borderColor',
      className: (0, _styles13.inputClass)('_'),
      attr: 'borderColor',
      type: 'color',
      desc: '边框颜色'
    }, {
      name: 'borderHoverColor',
      className: (0, _expose.exposeClass)('input-focus'),
      attr: 'borderColor',
      type: 'color',
      desc: '鼠标悬浮、聚焦时的边框色'
    }, {
      name: 'placeholderColor',
      className: (0, _expose.exposeClass)('input-placeholder'),
      attr: 'color',
      type: 'color',
      desc: '占位文字颜色'
    }, {
      name: 'placeholderSize',
      className: (0, _expose.exposeClass)('input-placeholder'),
      attr: 'fontSize',
      type: 'number',
      parser: parseInt,
      desc: '占位文字大小'
    }, {
      name: 'clearBg',
      className: (0, _expose.exposeClass)('input-clear'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '清空图标背景色'
    }, {
      name: 'clearHoverBg',
      className: (0, _expose.exposeClass)('input-clear-hover'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '清空图标鼠标悬浮背景色'
    }],

    set color(v) {
      setBodyProperty({
        '--input-text-color': v
      }, v);
    },

    set borderRadius(v) {
      setBodyProperty({
        '--input-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set underlineHeight(v) {
      setBodyProperty({
        '--input-underline-height': parseInt(v, 10) + "px"
      }, v);
    },

    set dropdownBorderRadius(v) {
      setBodyProperty({
        '--input-dropdown-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set disabledBg(v) {
      setBodyProperty({
        '--input-bg-disabled': v
      }, v);
    },

    set disabledColor(v) {
      setBodyProperty({
        '--input-disabled-color': v
      }, v);
    },

    set borderColor(v) {
      setBodyProperty({
        '--input-border-color': v
      }, v);
    },

    set borderHoverColor(v) {
      setBodyProperty({
        '--input-border-focus-color': v,
        '--input-border-focus-color-fade-25': (0, _color.fade)(v, 0.25)
      }, v);
    },

    set focusWidth(v) {
      setBodyProperty({
        '--input-focus-width': parseInt(v, 10) + "px"
      }, v);
    },

    set placeholderColor(v) {
      setBodyProperty({
        '--input-placeholder-color': v
      }, v);
    },

    set placeholderSize(v) {
      setBodyProperty({
        '--input-placeholder-size': parseInt(v, 10) + "px"
      }, v);
    },

    set clearBg(v) {
      setBodyProperty({
        '--input-clear-bg-color': v
      }, v);
    },

    set clearHoverBg(v) {
      setBodyProperty({
        '--input-clear-bg-hover-color': v
      }, v);
    }

  },
  select: {
    info: {
      title: 'Select 选择框',
      name: 'select',
      path: 'Select'
    },
    conf: [{
      name: 'resultPaddingHorizontal',
      className: (0, _expose.exposeClass)('select-result-item'),
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      desc: '选中值水平内边距'
    }, {
      name: 'resultPaddingVertical',
      className: (0, _expose.exposeClass)('select-result-item'),
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      desc: '选中值垂直内边距'
    }, {
      name: 'itemColor',
      className: (0, _styles4.selectClass)('option'),
      attr: 'color',
      type: 'color',
      desc: '选项文字颜色'
    }, {
      name: 'itemBgColor',
      className: (0, _styles4.selectClass)('option'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '选项背景颜色'
    }, {
      name: 'disabledBg',
      className: (0, _styles4.selectClass)('option', 'disabled'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '禁用选项背景色'
    }, {
      name: 'disabledColor',
      className: (0, _styles4.selectClass)('option', 'disabled'),
      attr: 'color',
      type: 'color',
      desc: '禁用选项文字颜色'
    }, {
      name: 'itemActiveBg',
      className: (0, _styles4.selectClass)('active', 'option'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '选中项背景色'
    }, {
      name: 'itemActiveColor',
      className: (0, _styles4.selectClass)('active', 'option'),
      attr: 'color',
      type: 'color',
      desc: '选中项文字颜色'
    }, {
      name: 'itemHoverBg',
      className: (0, _expose.exposeClass)('select-option-hover'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '选项鼠标悬浮背景色'
    }, {
      name: 'itemHoverColor',
      className: (0, _expose.exposeClass)('select-option-hover'),
      attr: 'color',
      type: 'color',
      desc: '选项鼠标悬浮文字颜色'
    }, {
      name: 'compressedMoreHoverBg',
      className: (0, _expose.exposeClass)('select-compressed'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'compressed模式按钮鼠标悬浮背景色'
    }, {
      name: 'clearIconBg',
      className: (0, _expose.exposeClass)('select-close'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '清空按钮背景色'
    }, {
      name: 'treeDisabledBg',
      className: (0, _expose.exposeClass)('select-tree-disabled'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '树形选择禁用选项背景色'
    }, {
      name: 'treeContentColor',
      className: (0, _expose.exposeClass)('select-tree'),
      attr: 'color',
      type: 'color',
      desc: '树形选择可点击选项文字颜色'
    }, {
      name: 'treeDisableContentColor',
      className: (0, _expose.exposeClass)('select-tree-disabled'),
      attr: 'color',
      type: 'color',
      desc: '树形选择禁用选项文字颜色'
    }, {
      name: 'treeIconHoverBg',
      className: (0, _expose.exposeClass)('select-tree-icon-hover'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '树形选择展开箭头背景色'
    }, {
      name: 'treeNodeHoverBg',
      className: (0, _expose.exposeClass)('select-tree-node-hover'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '树形选择节点hover状态背景色'
    }, {
      name: 'treeNodeHoverColor',
      className: (0, _expose.exposeClass)('select-tree-node-hover'),
      attr: 'color',
      type: 'color',
      desc: '树形选择节点hover状态文字颜色'
    }, {
      name: 'treeNodeSelectedBg',
      className: (0, _expose.exposeClass)('select-tree-node-selected'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '树形选择节点选中状态背景色'
    }, {
      name: 'treeNodeSelectedColor',
      className: (0, _expose.exposeClass)('select-tree-node-selected'),
      attr: 'color',
      type: 'color',
      desc: '树形选择节点选中状态文字颜色'
    }],

    set resultPaddingVertical(v) {
      setBodyProperty({
        '--select-result-padding-vertical': parseInt(v, 10) + "px"
      }, v);
    },

    set resultPaddingHorizontal(v) {
      setBodyProperty({
        '--select-result-padding-horizontal': parseInt(v, 10) + "px",
        '--select-result-padding-horizontal-16': parseInt(v, 10) + 16 + "px"
      }, v);
    },

    set itemColor(v) {
      setBodyProperty({
        '--select-option-color': v
      }, v);
    },

    set itemBgColor(v) {
      setBodyProperty({
        '--select-option-bg-color': v
      }, v);
    },

    set disabledBg(v) {
      setBodyProperty({
        '--select-disabled-bg-color': v
      }, v);
    },

    set disabledColor(v) {
      setBodyProperty({
        '--select-disabled-color': v
      }, v);
    },

    set itemActiveBg(v) {
      setBodyProperty({
        '--select-item-active-bg': v
      }, v);
    },

    set itemActiveColor(v) {
      setBodyProperty({
        '--select-item-active-color': v
      }, v);
    },

    set itemHoverBg(v) {
      setBodyProperty({
        '--select-option-hover-bg': v
      }, v);
    },

    set itemHoverColor(v) {
      setBodyProperty({
        '--select-option-hover-color': v
      }, v);
    },

    set compressedMoreHoverBg(v) {
      setBodyProperty({
        '--select-compressed-hover-bg': v
      }, v);
    },

    set clearIconBg(v) {
      setBodyProperty({
        '--select-clear-bg-color': v
      }, v);
    },

    set treeDisabledBg(v) {
      setBodyProperty({
        '--select-tree-disabled-bg-color': v
      }, v);
    },

    set treeContentColor(v) {
      setBodyProperty({
        '--select-tree-content-color': v
      }, v);
    },

    set treeDisableContentColor(v) {
      setBodyProperty({
        '--select-tree-disabled-content-color': v
      }, v);
    },

    set treeIconHoverBg(v) {
      setBodyProperty({
        '--select-tree-icon-hover-bg-color': v
      }, v);
    },

    set treeNodeHoverBg(v) {
      setBodyProperty({
        '--select-tree-node-hover-bg': v
      }, v);
    },

    set treeNodeHoverColor(v) {
      setBodyProperty({
        '--select-tree-node-hover-color': v
      }, v);
    },

    set treeNodeSelectedBg(v) {
      setBodyProperty({
        '--select-tree-node-selected-bg': v
      }, v);
    },

    set treeNodeSelectedColor(v) {
      setBodyProperty({
        '--select-tree-node-selected-color': v
      }, v);
    }

  },
  datepicker: {
    info: {
      title: 'Datepicker 日期选择',
      name: 'datepicker',
      path: 'Datepicker'
    },
    conf: [{
      name: 'rectBorderRadius',
      className: (0, _expose.exposeClass)('datepicker-month-item'),
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      desc: '年份、月份选中项圆角'
    }, {
      name: 'dayHoverBgc',
      className: (0, _expose.exposeClass)('datepicker-day-hover-bgc'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'day hover时背景颜色'
    }],

    set rectBorderRadius(v) {
      setBodyProperty({
        '--datepicker-rect-active-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set dayHoverBgc(v) {
      setBodyProperty({
        '--datepicker-day-hover-bgc': v
      }, v);
    }

  },
  slider: {
    info: {
      title: 'Slider 滑块',
      name: 'slider',
      path: 'Slider'
    },
    conf: [{
      name: 'indicatorBg',
      className: (0, _expose.exposeClass)('slider-indicator'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '滑块背景色'
    }, {
      name: 'indicatorSize',
      className: (0, _expose.exposeClass)('slider-indicator'),
      attr: 'width',
      type: 'number',
      min: 8,
      max: 40,
      parser: parseInt,
      desc: '滑块尺寸'
    }, {
      name: 'indicatorBoxShadow',
      className: (0, _expose.exposeClass)('slider-indicator'),
      attr: 'boxShadow',
      type: 'string',
      desc: '滑块阴影'
    }, {
      name: 'barBg',
      className: (0, _expose.exposeClass)('slider-bar'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '滑动条背景色'
    }, {
      name: 'disabledBarBg',
      className: (0, _expose.exposeClass)('slider-bar-disabled'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '滑动条禁用背景色'
    }, {
      name: 'disabledIndicatorBorder',
      className: (0, _expose.exposeClass)('slider-indicator-disabled'),
      attr: 'borderColor',
      type: 'color',
      desc: '禁用状态下滑块边框色'
    }, {
      name: 'disabledIndicatorBg',
      className: (0, _expose.exposeClass)('slider-indicator-disabled'),
      attr: 'background',
      type: 'color',
      desc: '禁用状态下滑块边背景色'
    }, {
      name: 'height',
      className: (0, _styles16.sliderClass)('background'),
      attr: 'height',
      type: 'number',
      parser: parseInt,
      desc: '滑动条高度'
    }, {
      name: 'borderRadius',
      className: (0, _styles16.sliderClass)('background'),
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      desc: '滑动条圆角'
    }, {
      name: 'valueBottom',
      className: (0, _expose.exposeClass)('slider-value'),
      attr: 'height',
      type: 'number',
      parser: parseInt,
      desc: '当前值距离滑块距离'
    }],

    set indicatorBg(v) {
      setBodyProperty({
        '--slider-indicator-bg': v
      }, v);
    },

    set indicatorSize(v) {
      setBodyProperty({
        '--slider-indicator-size': parseInt(v, 10) + "px",
        '--slider-indicator-size-half': parseInt(v, 10) / 2 + "px"
      }, v);
    },

    set indicatorBoxShadow(v) {
      setBodyProperty({
        '--slider-indicator-box-shadow': v
      }, v);
    },

    set barBg(v) {
      setBodyProperty({
        '--slider-bar-color': v
      }, v);
    },

    set disabledBarBg(v) {
      setBodyProperty({
        '--slider-disabled-bar-bg': v
      }, v);
    },

    set disabledIndicatorBorder(v) {
      setBodyProperty({
        '--slider-disbaled-indicator-border-color': v
      }, v);
    },

    set disabledIndicatorBg(v) {
      setBodyProperty({
        '--slider-disbaled-indicator-bg': v
      }, v);
    },

    set height(v) {
      setBodyProperty({
        '--slider-bar-height': parseInt(v, 10) + "px"
      }, v);
    },

    set borderRadius(v) {
      setBodyProperty({
        '--slider-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set valueBottom(v) {
      setBodyProperty({
        '--slider-value-bottom': parseInt(v, 10) + "px"
      }, v);
    }

  },
  table: {
    info: {
      title: 'Table 表格',
      name: 'table',
      path: 'Table'
    },
    conf: [{
      name: 'scrollRatio',
      className: (0, _expose.exposeClass)('table-scroll-ratio'),
      attr: 'width',
      parser: parseInt,
      type: 'number',
      desc: '滚动速率，仅在 Windows 下有效',
      logic: true,
      max: 500
    }, {
      name: 'headBg',
      className: (0, _expose.exposeClass)('table-head'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '表头背景色'
    }, {
      name: 'headColor',
      className: (0, _expose.exposeClass)('table-head'),
      attr: 'color',
      type: 'color',
      desc: '表头文字颜色'
    }, {
      name: 'bodyBg',
      className: (0, _expose.exposeClass)('table-body'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '表格内容背景色'
    }, {
      name: 'rowSpacing',
      className: (0, _expose.exposeClass)('table-spacing'),
      attr: 'height',
      type: 'number',
      parser: parseInt,
      desc: '行间距'
    }, {
      name: 'rowBorderRadius',
      className: (0, _expose.exposeClass)('table-spacing'),
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      desc: '行圆角'
    }, {
      name: 'headFontWeight',
      className: (0, _expose.exposeClass)('table-head'),
      attr: 'fontWeight',
      type: 'number',
      max: 900,
      min: 100,
      parser: parseInt,
      desc: '表头字重'
    }, {
      name: 'borderColor',
      className: (0, _expose.exposeClass)('table-head'),
      attr: 'borderColor',
      type: 'color',
      desc: '边框颜色'
    }, {
      name: 'hoverBg',
      className: (0, _expose.exposeClass)('table-head-hover'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '鼠标悬浮行背景色'
    }, {
      name: 'selectedBg',
      className: (0, _expose.exposeClass)('table-selected'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '选中行背景色'
    }, {
      name: 'textColor',
      className: (0, _expose.exposeClass)('table'),
      attr: 'color',
      type: 'color',
      desc: '文字颜色'
    }, {
      name: 'borderRadiusTop',
      className: (0, _expose.exposeClass)('table-head'),
      attr: 'borderTopLeftRadius',
      type: 'number',
      parser: parseInt,
      desc: '表格头部圆角'
    }, {
      name: 'headerCellPadding',
      className: (0, _expose.exposeClass)('table-head'),
      attr: 'padding',
      type: 'string',
      desc: '表头分组内边距'
    }, {
      name: 'smallCellPadding',
      className: (0, _expose.exposeClass)('table-small'),
      attr: 'padding',
      type: 'string',
      desc: '紧凑表格单元格内边距'
    }, {
      name: 'cellPaddingHorizontal',
      className: (0, _expose.exposeClass)('table-cell'),
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      desc: '单元格水平内边距'
    }, {
      name: 'cellPaddingVertical',
      className: (0, _expose.exposeClass)('table-cell'),
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      desc: '单元格垂直内边距'
    }, {
      name: 'treeExpandIconMarginRight',
      className: (0, _expose.exposeClass)('table-tree-expand'),
      attr: 'marginRight',
      type: 'number',
      parser: parseInt,
      desc: '子表格展开/收起按钮距离文字距离'
    }, {
      name: 'fixedStart',
      className: (0, _expose.exposeClass)('table-fixed-start'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '固定列渐变色开始颜色'
    }, {
      name: 'fixedEnd',
      className: (0, _expose.exposeClass)('table-fixed-end'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '固定列渐变色结束颜色'
    }, {
      name: 'tableEvenBgc',
      className: (0, _expose.exposeClass)('table-even'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '偶数行背景颜色'
    }, {
      name: 'tableOddBgc',
      className: (0, _expose.exposeClass)('table-odd'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '奇数行背景颜色'
    }, {
      name: 'marginBottom',
      className: (0, _expose.exposeClass)('table'),
      attr: 'marginBottom',
      type: 'number',
      parser: parseInt,
      desc: '表格底部外边距'
    }, {
      name: 'headerTopDivider',
      className: (0, _expose.exposeClass)('table-head-top'),
      attr: 'borderWidth',
      type: 'number',
      parser: parseInt,
      desc: '无边框表格头部边框线'
    }],

    set scrollRatio(v) {
      (0, _config.set)('scrollRatio', v);
      setBodyProperty({
        '--table-scroll-ratio': parseInt(v, 10) + "px"
      }, v);
    },

    set headBg(v) {
      setBodyProperty({
        '--table-head-bg': v
      }, v);
    },

    set hoverBg(v) {
      setBodyProperty({
        '--table-hover-bg': v
      }, v);
    },

    set selectedBg(v) {
      setBodyProperty({
        '--table-selected-row-bg': v
      }, v);
    },

    set headColor(v) {
      setBodyProperty({
        '--table-head-color': v
      }, v);
    },

    set bodyBg(v) {
      setBodyProperty({
        '--table-body-bg': v
      }, v);
    },

    set rowSpacing(v) {
      setBodyProperty({
        '--table-row-spacing': parseInt(v, 10) + "px"
      }, v);
    },

    set rowBorderRadius(v) {
      setBodyProperty({
        '--table-row-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set headFontWeight(v) {
      setBodyProperty({
        '--table-head-font-weight': "" + parseInt(v, 10)
      }, v);
    },

    set borderColor(v) {
      setBodyProperty({
        '--table-border-color': v
      }, v);
    },

    set textColor(v) {
      setBodyProperty({
        '--table-color': v
      }, v);
    },

    set borderRadiusTop(v) {
      setBodyProperty({
        '--table-border-radius-top': parseInt(v, 10) + "px"
      }, v);
    },

    set headerCellPadding(v) {
      setBodyProperty({
        '--table-header-cell-padding': v
      }, v);
    },

    set smallCellPadding(v) {
      setBodyProperty({
        '--table-small-cell-padding': v
      }, v);
    },

    set cellPaddingHorizontal(v) {
      setBodyProperty({
        '--table-cell-padding-horizontal': parseInt(v, 10) + "px"
      }, v);
    },

    set cellPaddingVertical(v) {
      setBodyProperty({
        '--table-cell-padding-vertical': parseInt(v, 10) + "px"
      }, v);
    },

    set treeExpandIconMarginRight(v) {
      setBodyProperty({
        '--table-tree-expand-icon-margin-right': parseInt(v, 10) + "px"
      }, v);
    },

    set fixedStart(v) {
      setBodyProperty({
        '--table-fixed-start-color': v
      }, v);
    },

    set fixedEnd(v) {
      setBodyProperty({
        '--table-fixed-end-color': v
      }, v);
    },

    set tableEvenBgc(v) {
      setBodyProperty({
        '--table-even-td-bgc': v
      }, v);
    },

    set tableOddBgc(v) {
      setBodyProperty({
        '--table-odd-td-bgc': v
      }, v);
    },

    set marginBottom(v) {
      setBodyProperty({
        '--table-margin-bottom': parseInt(v, 10) + "px"
      }, v);
    },

    set headerTopDivider(v) {
      setBodyProperty({
        '--table-header-top-divider-width': parseInt(v, 10) + "px"
      }, v);
    }

  },
  pagination: {
    info: {
      title: 'Pagination 分页',
      name: 'pagination',
      path: 'Pagination'
    },
    conf: [{
      name: 'borderRadius',
      className: (0, _styles.paginationClass)('item'),
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      desc: '项目圆角'
    }, {
      name: 'borderWidth',
      className: (0, _styles.paginationClass)('item'),
      attr: 'borderWidth',
      type: 'number',
      parser: parseInt,
      desc: '项目边框宽度'
    }, {
      name: 'hoverBorderColor',
      className: (0, _expose.exposeClass)('pagination-hover'),
      attr: 'borderColor',
      type: 'color',
      desc: '项目鼠标悬浮边框颜色'
    }, {
      name: 'hoverColor',
      className: (0, _expose.exposeClass)('pagination-hover'),
      attr: 'color',
      type: 'color',
      desc: '项目鼠标悬浮文字颜色'
    }, {
      name: 'hoverBg',
      className: (0, _expose.exposeClass)('pagination-hover'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '项目鼠标悬浮背景色'
    }, {
      name: 'fontSize',
      className: (0, _expose.exposeClass)('pagination'),
      attr: 'fontSize',
      type: 'number',
      parser: parseInt,
      desc: '字体大小'
    }, {
      name: 'defaultSize',
      className: (0, _expose.exposeClass)('pagination-default'),
      attr: 'width',
      type: 'number',
      parser: parseInt,
      desc: '默认尺寸宽高'
    }, {
      name: 'smallSize',
      className: (0, _expose.exposeClass)('pagination-small'),
      attr: 'width',
      type: 'number',
      parser: parseInt,
      desc: '小号尺寸宽高'
    }, {
      name: 'largeSize',
      className: (0, _expose.exposeClass)('pagination-large'),
      attr: 'width',
      type: 'number',
      parser: parseInt,
      desc: '大号尺寸宽高'
    }],

    set borderRadius(v) {
      setBodyProperty({
        '--pagination-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set borderWidth(v) {
      setBodyProperty({
        '--pagination-border-width': parseInt(v, 10) + "px"
      }, v);
    },

    set hoverBorderColor(v) {
      setBodyProperty({
        '--pagination-hover-border': v
      }, v);
    },

    set hoverColor(v) {
      setBodyProperty({
        '--pagination-hover-color': v
      }, v);
    },

    set hoverBg(v) {
      setBodyProperty({
        '--pagination-hover-bg': v
      }, v);
    },

    set fontSize(v) {
      setBodyProperty({
        '--pagination-font-size': parseInt(v, 10) + "px"
      }, v);
    },

    set defaultSize(v) {
      setBodyProperty({
        '--pagination-size': parseInt(v, 10) + "px"
      }, v);
    },

    set smallSize(v) {
      setBodyProperty({
        '--pagination-size-small': parseInt(v, 10) + "px"
      }, v);
    },

    set largeSize(v) {
      setBodyProperty({
        '--pagination-size-large': parseInt(v, 10) + "px"
      }, v);
    }

  },
  tag: {
    info: {
      title: 'Tag 标签',
      name: 'tag',
      path: 'Tag'
    },
    conf: [{
      name: 'bg',
      className: (0, _styles17.tagClass)('_'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '默认背景色'
    }, {
      name: 'successBg',
      className: (0, _styles17.tagClass)('success'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'success类型背景色'
    }, {
      name: 'infoBg',
      className: (0, _styles17.tagClass)('info'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'info类型背景色'
    }, {
      name: 'warningBg',
      className: (0, _styles17.tagClass)('warning'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'warning类型背景色'
    }, {
      name: 'dangerBg',
      className: (0, _styles17.tagClass)('danger'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'danger类型背景色'
    }, {
      name: 'color',
      className: (0, _styles17.tagClass)('_'),
      attr: 'color',
      type: 'color',
      desc: '默认文字颜色'
    }, {
      name: 'successColor',
      className: (0, _styles17.tagClass)('success'),
      attr: 'color',
      type: 'color',
      desc: 'success类型文字颜色'
    }, {
      name: 'infoColor',
      className: (0, _styles17.tagClass)('info'),
      attr: 'color',
      type: 'color',
      desc: 'info类型文字颜色'
    }, {
      name: 'warningColor',
      className: (0, _styles17.tagClass)('warning'),
      attr: 'color',
      type: 'color',
      desc: 'warning类型文字颜色'
    }, {
      name: 'dangerColor',
      className: (0, _styles17.tagClass)('danger'),
      attr: 'color',
      type: 'color',
      desc: 'danger类型文字颜色'
    }, {
      name: 'borderColor',
      className: (0, _styles17.tagClass)('default'),
      attr: 'borderColor',
      type: 'color',
      desc: '边框颜色'
    }, {
      name: 'closeColor',
      className: (0, _expose.exposeClass)('tag-close'),
      attr: 'color',
      type: 'color',
      desc: '关闭按钮颜色'
    }, {
      name: 'closeHoverColor',
      className: (0, _expose.exposeClass)('tag-close-hover'),
      attr: 'color',
      type: 'color',
      desc: '关闭按钮鼠标悬浮时颜色'
    }, {
      name: 'borderRadius',
      className: (0, _styles17.tagClass)('_'),
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      desc: '圆角'
    }, {
      name: 'paddingHorizontal',
      className: (0, _styles17.tagClass)('_'),
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      desc: '水平内边距'
    }, {
      name: 'paddingVertical',
      className: (0, _styles17.tagClass)('_'),
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      desc: '垂直内边距'
    }, {
      name: 'fontWeight',
      className: (0, _styles17.tagClass)('_'),
      attr: 'fontWeight',
      type: 'number',
      parser: parseInt,
      min: 100,
      max: 900,
      desc: '字重'
    }],

    set bg(v) {
      setBodyProperty({
        '--tag-bg': v
      }, v);
    },

    set successBg(v) {
      setBodyProperty({
        '--tag-success-bg': v
      }, v);
    },

    set infoBg(v) {
      setBodyProperty({
        '--tag-info-bg': v
      }, v);
    },

    set warningBg(v) {
      setBodyProperty({
        '--tag-warning-bg': v
      }, v);
    },

    set dangerBg(v) {
      setBodyProperty({
        '--tag-danger-bg': v
      }, v);
    },

    set color(v) {
      setBodyProperty({
        '--tag-color': v
      }, v);
    },

    set successColor(v) {
      setBodyProperty({
        '--tag-success-color': v
      }, v);
    },

    set infoColor(v) {
      setBodyProperty({
        '--tag-info-color': v
      }, v);
    },

    set warningColor(v) {
      setBodyProperty({
        '--tag-warning-color': v
      }, v);
    },

    set dangerColor(v) {
      setBodyProperty({
        '--tag-danger-color': v
      }, v);
    },

    set closeColor(v) {
      setBodyProperty({
        '--tag-close-color': v
      }, v);
    },

    set closeHoverColor(v) {
      setBodyProperty({
        '--tag-close-hover-color': v
      }, v);
    },

    set borderColor(v) {
      setBodyProperty({
        '--tag-border-color': v
      }, v);
    },

    set borderRadius(v) {
      setBodyProperty({
        '--tag-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingHorizontal(v) {
      setBodyProperty({
        '--tag-padding-horizontal': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingVertical(v) {
      setBodyProperty({
        '--tag-padding-vertical': parseInt(v, 10) + "px"
      }, v);
    },

    set fontWeight(v) {
      setBodyProperty({
        '--tag-font-weight': v
      }, v);
    }

  },
  tooltip: {
    info: {
      title: 'Tooltip 提示',
      name: 'tooltip',
      path: 'Tooltip'
    },
    conf: [{
      name: 'bg',
      className: (0, _styles15.tooltipClass)('inner'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '背景色'
    }, {
      name: 'paddingHorizontal',
      className: (0, _styles15.tooltipClass)('inner'),
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      desc: '水平内边距'
    }, {
      name: 'paddingVertical',
      className: (0, _styles15.tooltipClass)('inner'),
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      desc: '垂直内边距'
    }],

    set bg(v) {
      setBodyProperty({
        '--tooltip-bg': v
      }, v);
    },

    set paddingHorizontal(v) {
      setBodyProperty({
        '--tooltip-padding-horizontal': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingVertical(v) {
      setBodyProperty({
        '--tooltip-padding-vertical': parseInt(v, 10) + "px"
      }, v);
    }

  },
  menu: {
    info: {
      title: 'Menu 菜单',
      name: 'menu',
      path: 'Menu'
    },
    conf: [{
      name: 'height',
      className: (0, _styles6.menuClass)('title'),
      attr: 'height',
      type: 'number',
      parser: parseInt,
      desc: '条目高度'
    }, {
      name: 'fontSize',
      className: (0, _styles6.menuClass)('title'),
      attr: 'fontSize',
      type: 'number',
      parser: parseInt,
      desc: '字体大小'
    }, {
      name: 'darkColor',
      className: (0, _expose.exposeClass)('menu-dark'),
      attr: 'color',
      type: 'color',
      desc: '黑色主题文字颜色'
    }, {
      name: 'darkBg',
      className: (0, _expose.exposeClass)('menu-dark'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '黑色主题背景色'
    }, {
      name: 'darkRootNodeBg',
      className: (0, _expose.exposeClass)('menu-dark-root'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '黑色主题 Root Node 背景色'
    }, {
      name: 'darkChildrenSegmentation',
      className: (0, _expose.exposeClass)('menu-dark-seg'),
      attr: 'borderTopColor',
      type: 'color',
      desc: '黑色主题子菜单与Root Menu 分割线背景色'
    }, {
      name: 'darkActiveBg',
      className: (0, _expose.exposeClass)('menu-dark-active'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '黑色主题选中项背景色'
    }, {
      name: 'activeBg',
      className: (0, _expose.exposeClass)('menu-active'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '选中项背景色'
    }, {
      name: 'activeColor',
      className: (0, _expose.exposeClass)('menu-active'),
      attr: 'color',
      type: 'color',
      desc: '选中项文字颜色'
    }, {
      name: 'color',
      className: (0, _expose.exposeClass)('menu-text'),
      attr: 'color',
      type: 'color',
      desc: '文字颜色'
    }, {
      name: 'activePaddingHorizontal',
      className: (0, _expose.exposeClass)('menu-active'),
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      desc: '选中项水平内边距'
    }, {
      name: 'activePaddingVertical',
      className: (0, _expose.exposeClass)('menu-active'),
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      desc: '选中项垂直内边距'
    }, {
      name: 'activeBorderRadius',
      className: (0, _expose.exposeClass)('menu-active'),
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      desc: '选中项圆角'
    }, {
      name: 'itemHoverColor',
      className: (0, _expose.exposeClass)('menu-light-hover'),
      attr: 'color',
      type: 'color',
      desc: 'hover状态下文字颜色'
    }, {
      name: 'itemHoverDarkColor',
      className: (0, _expose.exposeClass)('menu-dark-hover'),
      attr: 'color',
      type: 'color',
      desc: '暗黑主题 hover状态下文字颜色'
    }, {
      name: 'itemHoverBgc',
      className: (0, _expose.exposeClass)('menu-light-hover'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'hover状态下背景颜色'
    }, {
      name: 'itemHoverDarkBgc',
      className: (0, _expose.exposeClass)('menu-dark-hover'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '暗黑主题 hover状态下背景颜色'
    }, {
      name: 'activeBar',
      className: (0, _expose.exposeClass)('menu-bar'),
      attr: 'width',
      type: 'number',
      parser: parseInt,
      desc: 'active 状态下 bar 宽度'
    }, {
      name: 'activeBarColor',
      className: (0, _expose.exposeClass)('menu-bar'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'active bar 颜色'
    }, {
      name: 'darkActiveBarColor',
      className: (0, _expose.exposeClass)('menu-dark-bar'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '暗黑模式下 active bar 颜色'
    }, {
      name: 'verticalDarkRootActiveBgc',
      className: (0, _expose.exposeClass)('menu-dark-vertical'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '垂直样式 dark 主题：子节点选中下，parent 节点背景颜色'
    }, {
      name: 'hasChildrenActiveBgc',
      className: (0, _expose.exposeClass)('menu-dark-vertical-children'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '垂直样式：选中状态，背景颜色'
    }, {
      name: 'hasChildrenActiveColor',
      className: (0, _expose.exposeClass)('menu-dark-vertical-children'),
      attr: 'color',
      type: 'color',
      desc: '垂直样式：选中状态，背景颜色'
    }, {
      name: 'verticalInpathBarWidth',
      className: (0, _expose.exposeClass)('menu-dark-vertical-bar'),
      attr: 'width',
      type: 'number',
      parser: parseInt,
      desc: '垂直样式：子节点选中下，parent 节点 bar 的宽度'
    }],

    set verticalDarkRootActiveBgc(v) {
      setBodyProperty({
        '--menu-vertical-dark-parent-active-bgc': v
      }, v);
    },

    set hasChildrenActiveBgc(v) {
      setBodyProperty({
        '--menu-item-has-children-active-bgc': v
      }, v);
    },

    set hasChildrenActiveColor(v) {
      setBodyProperty({
        '--menu-item-has-children-active-color': v
      }, v);
    },

    set verticalInpathBarWidth(v) {
      setBodyProperty({
        '--menu-vertical-in-path-bar-width': parseInt(v, 10) + "px"
      }, v);
    },

    set height(v) {
      var height = parseInt(v, 10);
      setBodyProperty({
        '--menu-item-height': height + "px"
      }, v);
    },

    set fontSize(v) {
      setBodyProperty({
        '--menu-item-font-size': parseInt(v, 10) + "px"
      }, v);
    },

    set darkBg(v) {
      setBodyProperty({
        '--menu-dark-bg': v
      }, v);
    },

    set darkActiveBg(v) {
      setBodyProperty({
        '--menu-dark-acitve-bg': v
      }, v);
    },

    set activeBg(v) {
      setBodyProperty({
        '--menu-item-active-bg': v
      }, v);
    },

    set activeColor(v) {
      setBodyProperty({
        '--menu-item-active-color': v
      }, v);
    },

    set color(v) {
      setBodyProperty({
        '--menu-item-color': v
      }, v);
    },

    set darkColor(v) {
      setBodyProperty({
        '--menu-dark-color': v
      }, v);
    },

    set darkRootNodeBg(v) {
      setBodyProperty({
        '--menu-root-node-bgc': v
      }, v);
    },

    set darkChildrenSegmentation(v) {
      setBodyProperty({
        '--menu-children-segmentation': v
      }, v);
    },

    set activePaddingHorizontal(v) {
      setBodyProperty({
        '--menu-active-padding-horizontal': parseInt(v, 10) + "px",
        '--menu-active-padding-horizontal-negative': "-" + parseInt(v, 10) + "px"
      }, v);
    },

    set activePaddingVertical(v) {
      setBodyProperty({
        '--menu-active-padding-vertical': parseInt(v, 10) + "px"
      }, v);
    },

    set activeBorderRadius(v) {
      setBodyProperty({
        '--menu-active-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set itemHoverColor(v) {
      setBodyProperty({
        '--menu-item-light-hover-color': v
      }, v);
    },

    set itemHoverDarkColor(v) {
      setBodyProperty({
        '--menu-item-dark-hover-color': v
      }, v);
    },

    set itemHoverBgc(v) {
      setBodyProperty({
        '--menu-item-light-hover-bgc': v
      }, v);
    },

    set itemHoverDarkBgc(v) {
      setBodyProperty({
        '--menu-item-dark-hover-bgc': v
      }, v);
    },

    set activeBar(v) {
      setBodyProperty({
        '--menu-active-bar': parseInt(v, 10) + "px"
      }, v);
    },

    set activeBarColor(v) {
      setBodyProperty({
        '--menu-item-active-indicator': v
      }, v);
    },

    set darkActiveBarColor(v) {
      setBodyProperty({
        '--menu-dark-item-active-indicator': v
      }, v);
    }

  },
  alert: {
    info: {
      title: 'Alert 提示框',
      name: 'alert',
      path: 'Alert'
    },
    conf: [{
      name: 'fontSize',
      className: (0, _styles7.alertClass)('_'),
      attr: 'fontSize',
      type: 'number',
      parser: parseInt,
      desc: '文字大小'
    }, {
      name: 'iconMarginTop',
      className: (0, _styles7.alertClass)('icon'),
      attr: 'marginTop',
      type: 'number',
      parser: parseInt,
      desc: 'Icon上外边距'
    }, {
      name: 'paddingX',
      className: (0, _styles7.alertClass)('_'),
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      desc: '水平方向内边距'
    }, {
      name: 'paddingY',
      className: (0, _styles7.alertClass)('_'),
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      desc: '垂直方向内边距'
    }, {
      name: 'closeIconColor',
      className: (0, _expose.exposeClass)('alert-close'),
      attr: 'color',
      type: 'color',
      desc: '关闭按钮颜色'
    }, {
      name: 'closeIconHoverColor',
      className: (0, _expose.exposeClass)('alert-close-hover'),
      attr: 'color',
      type: 'color',
      desc: '关闭按钮鼠标悬浮颜色'
    }, {
      name: 'borderRadius',
      className: (0, _styles7.alertClass)('_'),
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      desc: '圆角'
    }, {
      name: 'successBoxShadow',
      className: (0, _styles7.alertClass)('success'),
      attr: 'boxShadow',
      type: 'string',
      desc: 'success 类型阴影'
    }, {
      name: 'infoBoxShadow',
      className: (0, _styles7.alertClass)('info'),
      attr: 'boxShadow',
      type: 'string',
      desc: 'info 类型阴影'
    }, {
      name: 'warningBoxShadow',
      className: (0, _styles7.alertClass)('warning'),
      attr: 'boxShadow',
      type: 'string',
      desc: 'warning 类型阴影'
    }, {
      name: 'dangerBoxShadow',
      className: (0, _styles7.alertClass)('danger'),
      attr: 'boxShadow',
      type: 'string',
      desc: 'danger 类型阴影'
    }, {
      name: 'borderWidth',
      className: (0, _styles7.alertClass)('_'),
      attr: 'borderWidth',
      type: 'number',
      parser: parseInt,
      desc: '边框宽度'
    }, {
      name: 'successTextColor',
      className: (0, _styles7.alertClass)('success'),
      attr: 'color',
      type: 'color',
      desc: 'success 类型文字颜色'
    }, {
      name: 'successBg',
      className: (0, _styles7.alertClass)('success'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'success 类型背景色'
    }, {
      name: 'successBorderColor',
      className: (0, _styles7.alertClass)('success'),
      attr: 'borderColor',
      type: 'color',
      desc: 'success 类型边框色'
    }, {
      name: 'infoTextColor',
      className: (0, _styles7.alertClass)('info'),
      attr: 'color',
      type: 'color',
      desc: 'info 类型文字颜色'
    }, {
      name: 'infoBg',
      className: (0, _styles7.alertClass)('info'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'info 类型背景色'
    }, {
      name: 'infoBorderColor',
      className: (0, _styles7.alertClass)('info'),
      attr: 'borderColor',
      type: 'color',
      desc: 'info 类型边框色'
    }, {
      name: 'warningTextColor',
      className: (0, _styles7.alertClass)('warning'),
      attr: 'color',
      type: 'color',
      desc: 'warning 类型文字颜色'
    }, {
      name: 'warningBg',
      className: (0, _styles7.alertClass)('warning'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'warning 类型背景色'
    }, {
      name: 'warningBorderColor',
      className: (0, _styles7.alertClass)('warning'),
      attr: 'borderColor',
      type: 'color',
      desc: 'warning 类型边框颜色'
    }, {
      name: 'dangerTextColor',
      className: (0, _styles7.alertClass)('danger'),
      attr: 'color',
      type: 'color',
      desc: 'danger 类型文字颜色'
    }, {
      name: 'dangerBg',
      className: (0, _styles7.alertClass)('danger'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'success 类型背景色'
    }, {
      name: 'dangerBorderColor',
      className: (0, _styles7.alertClass)('danger'),
      attr: 'borderColor',
      type: 'color',
      desc: 'danger 类型边框色'
    }],

    set fontSize(v) {
      setBodyProperty({
        '--alert-font-size': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingX(v) {
      setBodyProperty({
        '--alert-padding-x': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingY(v) {
      setBodyProperty({
        '--alert-padding-y': parseInt(v, 10) + "px"
      }, v);
    },

    set iconMarginTop(v) {
      setBodyProperty({
        '--alert-icon-margin-top': parseInt(v, 10) + "px"
      }, v);
    },

    set closeIconColor(v) {
      setBodyProperty({
        '--alert-close-color': v
      }, v);
    },

    set closeIconHoverColor(v) {
      setBodyProperty({
        '--alert-close-hover-color': v
      }, v);
    },

    set borderRadius(v) {
      setBodyProperty({
        '--alert-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set boxShadow(v) {
      setBodyProperty({
        '--alert-box-shadow': v
      }, v);
    },

    set successBoxShadow(v) {
      setBodyProperty({
        '--alert-success-box-shadow': v
      }, v);
    },

    set infoBoxShadow(v) {
      setBodyProperty({
        '--alert-info-box-shadow': v
      }, v);
    },

    set dangerBoxShadow(v) {
      setBodyProperty({
        '--alert-danger-box-shadow': v
      }, v);
    },

    set warningBoxShadow(v) {
      setBodyProperty({
        '--alert-warning-box-shadow': v
      }, v);
    },

    set borderWidth(v) {
      setBodyProperty({
        '--alert-border-width': parseInt(v, 10) + "px"
      }, v);
    },

    set successTextColor(v) {
      setBodyProperty({
        '--alert-success-text-color': v,
        '--alert-success-text-darken-10-color': (0, _color.darken)(v, 10)
      }, v);
    },

    set successBg(v) {
      setBodyProperty({
        '--alert-success-bg': v
      }, v);
    },

    set successBorderColor(v) {
      setBodyProperty({
        '--alert-success-border-color': v,
        '--alert-success-border-darken-5-color': (0, _color.darken)(v, 5)
      }, v);
    },

    set infoTextColor(v) {
      setBodyProperty({
        '--alert-info-text-color': v,
        '--alert-info-text-darken-10-color': (0, _color.darken)(v, 10)
      }, v);
    },

    set infoBg(v) {
      setBodyProperty({
        '--alert-info-bg': v
      }, v);
    },

    set infoBorderColor(v) {
      setBodyProperty({
        '--alert-info-border-color': v,
        '--alert-info-border-darken-5-color': (0, _color.darken)(v, 5)
      }, v);
    },

    set warningTextColor(v) {
      setBodyProperty({
        '--alert-warning-text-color': v,
        '--alert-warning-text-darken-10-color': (0, _color.darken)(v, 10)
      }, v);
    },

    set warningBg(v) {
      setBodyProperty({
        '--alert-warning-bg': v
      }, v);
    },

    set warningBorderColor(v) {
      setBodyProperty({
        '--alert-warning-border-color': v,
        '--alert-warning-border-darken-5-color': (0, _color.darken)(v, 5)
      }, v);
    },

    set dangerTextColor(v) {
      setBodyProperty({
        '--alert-danger-text-color': v,
        '--alert-danger-text-darken-10-color': (0, _color.darken)(v, 10)
      }, v);
    },

    set dangerBg(v) {
      setBodyProperty({
        '--alert-danger-bg': v
      }, v);
    },

    set dangerBorderColor(v) {
      setBodyProperty({
        '--alert-danger-border-color': v,
        '--alert-danger-border-darken-5-color': (0, _color.darken)(v, 5)
      }, v);
    }

  },
  message: {
    info: {
      title: 'Message 消息提示',
      name: 'message',
      path: 'Message'
    },
    conf: [{
      name: 'boxShadow',
      className: (0, _styles8.messageClass)('msg'),
      attr: 'boxShadow',
      type: 'string',
      desc: '阴影'
    }, {
      name: 'closeColor',
      className: (0, _expose.exposeClass)('msg-close'),
      attr: 'color',
      type: 'color',
      desc: '关闭图标颜色'
    }, {
      name: 'color',
      className: (0, _styles8.messageClass)('msg'),
      attr: 'color',
      type: 'color',
      desc: '文字颜色'
    }, {
      name: 'fontWeight',
      className: (0, _styles8.messageClass)('msg'),
      attr: 'fontWeight',
      type: 'number',
      parser: parseInt,
      max: 900,
      min: 100,
      desc: '字重'
    }, {
      name: 'borderColor',
      className: (0, _styles8.messageClass)('msg'),
      attr: 'borderColor',
      type: 'color',
      desc: '边框颜色'
    }, {
      name: 'iconMarginTop',
      className: (0, _expose.exposeClass)('msg-icon'),
      attr: 'marginTop',
      type: 'number',
      parser: parseInt,
      desc: '类型图标距离顶部距离'
    }],

    set boxShadow(v) {
      setBodyProperty({
        '--message-box-shadow': v
      }, v);
    },

    set color(v) {
      setBodyProperty({
        '--message-text-color': v
      }, v);
    },

    set closeColor(v) {
      setBodyProperty({
        '--message-close-color': v
      }, v);
    },

    set fontWeight(v) {
      setBodyProperty({
        '--message-font-weight': v
      }, v);
    },

    set borderColor(v) {
      setBodyProperty({
        '--message-border-color': v
      }, v);
    },

    set iconMarginTop(v) {
      setBodyProperty({
        '--message-icon-margin-top': parseInt(v, 10) + "px"
      }, v);
    }

  },
  card: {
    info: {
      title: 'Card 卡片',
      name: 'card',
      path: 'Card'
    },
    conf: [{
      name: 'fontSize',
      className: (0, _styles14.cardClass)('_'),
      attr: 'fontSize',
      type: 'number',
      parser: parseInt,
      desc: '文字大小'
    }, {
      name: 'paddingHeaderHorizontal',
      className: (0, _styles14.cardClass)('header'),
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      desc: '头部水平内边距'
    }, {
      name: 'paddingHeaderVertical',
      className: (0, _styles14.cardClass)('header'),
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      desc: '头部垂直内边距'
    }, {
      name: 'paddingBodyHorizontal',
      className: (0, _styles14.cardClass)('body'),
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      desc: '内容部分水平内边距'
    }, {
      name: 'paddingBodyVertical',
      className: (0, _styles14.cardClass)('body'),
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      desc: '内容部分垂直内边距'
    }, {
      name: 'paddingFooterHorizontal',
      className: (0, _styles14.cardClass)('footer'),
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      desc: '底部水平内边距'
    }, {
      name: 'paddingFooterVertical',
      className: (0, _styles14.cardClass)('footer'),
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      desc: '底部垂直内边距'
    }, {
      name: 'borderRadius',
      className: (0, _styles14.cardClass)('_'),
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      desc: '圆角'
    }, {
      name: 'borderWidth',
      className: (0, _styles14.cardClass)('_'),
      attr: 'borderWidth',
      type: 'number',
      parser: parseInt,
      desc: '边框宽度'
    }, {
      name: 'dividerHeight',
      className: (0, _expose.exposeClass)('card-divider'),
      attr: 'height',
      type: 'number',
      parser: parseInt,
      desc: '分割线高度'
    }, {
      name: 'dividerWidth',
      value: '100%',
      attr: 'width',
      type: 'string',
      desc: '分割线宽度'
    }, {
      name: 'borderColor',
      className: (0, _styles14.cardClass)('_'),
      attr: 'borderColor',
      type: 'color',
      desc: '边框颜色'
    }, {
      name: 'dividerColor',
      className: (0, _expose.exposeClass)('card-divider'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '分割线颜色'
    }, {
      name: 'color',
      className: (0, _styles14.cardClass)('_'),
      attr: 'color',
      type: 'color',
      desc: '内容部分文字颜色'
    }, {
      name: 'boxShadow',
      className: (0, _styles14.cardClass)('shadow'),
      attr: 'boxShadow',
      type: 'string',
      desc: '阴影'
    }, {
      name: 'headerBg',
      className: (0, _styles14.cardClass)('header'),
      attr: 'background-color',
      type: 'color',
      desc: '头部背景色'
    }, {
      name: 'footerBg',
      className: (0, _styles14.cardClass)('footer'),
      attr: 'background-color',
      type: 'color',
      desc: '底部背景色'
    }, {
      name: 'headerColor',
      className: (0, _styles14.cardClass)('header'),
      attr: 'color',
      type: 'color',
      desc: '头部文字颜色'
    }, {
      name: 'footerColor',
      className: (0, _styles14.cardClass)('footer'),
      attr: 'color',
      type: 'color',
      desc: '底部文字颜色'
    }],

    set fontSize(v) {
      setBodyProperty({
        '--card-font-size': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingHeaderHorizontal(v) {
      setBodyProperty({
        '--panel-header-padding-horizontal': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingHeaderVertical(v) {
      setBodyProperty({
        '--panel-header-padding-vertical': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingBodyHorizontal(v) {
      setBodyProperty({
        '--panel-body-padding-horizontal': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingBodyVertical(v) {
      setBodyProperty({
        '--panel-body-padding-vertical': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingFooterHorizontal(v) {
      setBodyProperty({
        '--panel-footer-padding-horizontal': parseInt(v, 10) + "px"
      }, v);
    },

    set paddingFooterVertical(v) {
      setBodyProperty({
        '--panel-footer-padding-vertical': parseInt(v, 10) + "px"
      }, v);
    },

    set borderRadius(v) {
      setBodyProperty({
        '--panel-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set borderWidth(v) {
      setBodyProperty({
        '--card-border-width': parseInt(v, 10) + "px"
      }, v);
    },

    set dividerHeight(v) {
      setBodyProperty({
        '--card-divider-height': parseInt(v, 10) + "px"
      }, v);
    },

    set dividerWidth(v) {
      setBodyProperty({
        '--card-divider-width': v
      }, v);
    },

    set borderColor(v) {
      setBodyProperty({
        '--card-border-color': v
      }, v);
    },

    set dividerColor(v) {
      setBodyProperty({
        '--card-divider-color': v
      }, v);
    },

    set color(v) {
      setBodyProperty({
        '--card-color': v
      }, v);
    },

    set boxShadow(v) {
      setBodyProperty({
        '--card-box-shadow': v
      }, v);
    },

    set headerBg(v) {
      setBodyProperty({
        '--card-header-bg': v
      }, v);
    },

    set footerBg(v) {
      setBodyProperty({
        '--card-footer-bg': v
      }, v);
    },

    set headerColor(v) {
      setBodyProperty({
        '--card-header-color': v
      }, v);
    },

    set footerColor(v) {
      setBodyProperty({
        '--card-footer-color': v
      }, v);
    }

  },
  modal: {
    info: {
      title: 'Modal 对话框',
      name: 'modal',
      path: 'Modal'
    },
    conf: [{
      name: 'titleFontFamily',
      className: (0, _styles9.modalClass)('title'),
      attr: 'fontFamily',
      type: 'string',
      desc: '标题字体'
    }, {
      name: 'fontSize',
      className: (0, _expose.exposeClass)('modal-card'),
      attr: 'fontSize',
      type: 'number',
      parser: parseInt,
      desc: '文字大小'
    }, {
      name: 'iconSize',
      className: (0, _expose.exposeClass)('modal-icon'),
      attr: 'width',
      type: 'number',
      parser: parseInt,
      desc: '类型图标尺寸'
    }, {
      name: 'iconTop',
      className: (0, _expose.exposeClass)('modal-icon'),
      attr: 'marginTop',
      type: 'number',
      parser: parseInt,
      desc: '类型图标距离顶部距离'
    }, {
      name: 'iconLeft',
      className: (0, _expose.exposeClass)('modal-icon'),
      attr: 'marginLeft',
      type: 'number',
      parser: parseInt,
      desc: '类型图标距离左侧距离'
    }, {
      name: 'closeIconColor',
      className: (0, _expose.exposeClass)('modal-close'),
      attr: 'color',
      type: 'color',
      desc: '关闭按钮颜色'
    }, {
      name: 'closeIconHoverColor',
      className: (0, _expose.exposeClass)('modal-close-hover'),
      attr: 'color',
      type: 'color',
      desc: '关闭按钮鼠标悬浮颜色'
    }, {
      name: 'closeIconTopMargin',
      className: (0, _expose.exposeClass)('modal-close'),
      attr: 'marginTop',
      type: 'number',
      parser: parseInt,
      desc: '关闭按钮顶部间距'
    }, {
      name: 'closeIconRightMargin',
      className: (0, _expose.exposeClass)('modal-close'),
      attr: 'marginRight',
      type: 'number',
      parser: parseInt,
      desc: '关闭按钮右侧间距'
    }, {
      name: 'titleFontSize',
      className: (0, _styles9.modalClass)('title'),
      attr: 'fontSize',
      type: 'number',
      parser: parseInt,
      desc: '标题字体大小'
    }, {
      name: 'padding',
      className: (0, _styles9.modalClass)('panel'),
      attr: 'padding',
      type: 'string',
      desc: '整体内边距'
    }, {
      name: 'headerPaddingTop',
      className: (0, _expose.exposeClass)('modal-card-header'),
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      desc: '头部内边距-Top'
    }, {
      name: 'headerPaddingRight',
      className: (0, _expose.exposeClass)('modal-card-header'),
      attr: 'paddingRight',
      type: 'number',
      parser: parseInt,
      desc: '头部内边距-Right'
    }, {
      name: 'headerPaddingBottom',
      className: (0, _expose.exposeClass)('modal-card-header'),
      attr: 'paddingBottom',
      type: 'number',
      parser: parseInt,
      desc: '头部内边距-Bottom'
    }, {
      name: 'headerPaddingLeft',
      className: (0, _expose.exposeClass)('modal-card-header'),
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      desc: '头部内边距-Left'
    }, {
      name: 'bodyPaddingTop',
      className: (0, _expose.exposeClass)('modal-card-body'),
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      desc: '内容内边距-Top'
    }, {
      name: 'bodyPaddingRight',
      className: (0, _expose.exposeClass)('modal-card-body'),
      attr: 'paddingRight',
      type: 'number',
      parser: parseInt,
      desc: '内容内边距-Right'
    }, {
      name: 'bodyPaddingBottom',
      className: (0, _expose.exposeClass)('modal-card-body'),
      attr: 'paddingBottom',
      type: 'number',
      parser: parseInt,
      desc: '内容内边距-Bottom'
    }, {
      name: 'bodyPaddingLeft',
      className: (0, _expose.exposeClass)('modal-card-body'),
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      desc: '内容内边距-Left'
    }, {
      name: 'iconHeaderPaddingRight',
      className: (0, _styles9.modalClass)('title', 'method-title'),
      attr: 'paddingRight',
      type: 'number',
      parser: parseInt,
      desc: '带有 Icon 的对话框 头部 Right 内边距'
    }, {
      name: 'iconBodyPaddingTop',
      className: (0, _expose.exposeClass)('modal-icon-body'),
      attr: 'paddingTop',
      type: 'number',
      parser: parseInt,
      desc: '带有 Icon 的对话框内容 Top 内边距'
    }, {
      name: 'iconBodyPaddingRight',
      className: (0, _expose.exposeClass)('modal-icon-body'),
      attr: 'paddingRight',
      type: 'number',
      parser: parseInt,
      desc: '带有 Icon 的对话框内容 Right 内边距'
    }, {
      name: 'iconBodyPaddingBottom',
      className: (0, _expose.exposeClass)('modal-icon-body'),
      attr: 'paddingBottom',
      type: 'number',
      parser: parseInt,
      desc: '带有 Icon 的对话框内容 Bottom 内边距'
    }, {
      name: 'iconBodyPaddingLeft',
      className: (0, _expose.exposeClass)('modal-icon-body'),
      attr: 'paddingLeft',
      type: 'number',
      parser: parseInt,
      desc: '带有 Icon 的对话框内容 Left 内边距'
    }, {
      name: 'footerPadding',
      className: (0, _expose.exposeClass)('modal-card-footer'),
      attr: 'padding',
      type: 'string',
      desc: '底部内边距'
    }, {
      name: 'borderRadius',
      className: (0, _expose.exposeClass)('modal-card'),
      attr: 'borderTopLeftRadius',
      type: 'number',
      parser: parseInt,
      desc: '圆角'
    }, {
      name: 'borderWidth',
      className: (0, _expose.exposeClass)('modal-card'),
      attr: 'borderWidth',
      type: 'number',
      parser: parseInt,
      desc: '边框宽度'
    }, {
      name: 'dividerHeight',
      className: (0, _expose.exposeClass)('modal-divider'),
      attr: 'height',
      type: 'number',
      parser: parseInt,
      desc: '分割线高度'
    }, {
      name: 'dividerWidth',
      value: '100%',
      attr: 'width',
      type: 'string',
      desc: '分割线宽度'
    }, {
      name: 'borderColor',
      className: (0, _expose.exposeClass)('modal-card'),
      attr: 'borderColor',
      type: 'color',
      desc: '边框颜色'
    }, {
      name: 'dividerColor',
      className: (0, _expose.exposeClass)('modal-divider'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '分割线颜色'
    }, {
      name: 'color',
      className: (0, _expose.exposeClass)('modal-card'),
      attr: 'color',
      type: 'color',
      desc: '内容部分文字颜色'
    }, {
      name: 'titleColor',
      className: (0, _styles9.modalClass)('title'),
      attr: 'color',
      type: 'color',
      desc: '标题文字颜色'
    }, // {
    //   name: 'footerColor',
    //   className: exposeClass('modal-card-footer'),
    //   attr: 'color',
    //   type: 'color',
    //   desc: '底部文字颜色',
    // },
    {
      name: 'headerBg',
      className: (0, _expose.exposeClass)('modal-card-header'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '头部背景色'
    }, {
      name: 'footerBg',
      className: (0, _expose.exposeClass)('modal-card-footer'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '底部背景色'
    }, {
      name: 'boxShadow',
      className: (0, _expose.exposeClass)('modal-card'),
      attr: 'boxShadow',
      type: 'string',
      desc: '阴影'
    }],

    set titleFontFamily(v) {
      setBodyProperty({
        '--modal-title-font': v
      }, v);
    },

    set fontSize(v) {
      setBodyProperty({
        '--modal-font-size': parseInt(v, 10) + "px"
      }, v);
    },

    set iconSize(v) {
      setBodyProperty({
        '--modal-icon-size': parseInt(v, 10) + "px"
      }, v);
    },

    set iconLeft(v) {
      setBodyProperty({
        '--modal-icon-left': parseInt(v, 10) + "px"
      }, v);
    },

    set iconTop(v) {
      setBodyProperty({
        '--modal-icon-top': parseInt(v, 10) + "px"
      }, v);
    },

    set closeIconColor(v) {
      setBodyProperty({
        '--modal-close-icon-color': v
      }, v);
    },

    set closeIconHoverColor(v) {
      setBodyProperty({
        '--modal-close-icon-hover-color': v
      }, v);
    },

    set closeIconTopMargin(v) {
      setBodyProperty({
        '--modal-close-top-margin': parseInt(v, 10) + "px"
      }, v);
    },

    set closeIconRightMargin(v) {
      setBodyProperty({
        '--modal-close-right-margin': parseInt(v, 10) + "px"
      }, v);
    },

    set titleFontSize(v) {
      setBodyProperty({
        '--modal-title-font-size': parseInt(v, 10) + "px"
      }, v);
    },

    set titleColor(v) {
      setBodyProperty({
        '--modal-title-color': v
      }, v);
    },

    set padding(v) {
      setBodyProperty({
        '--modal-panel-padding': v
      }, v);
    },

    set headerPaddingTop(v) {
      setBodyProperty({
        '--modal-header-padding-top': parseInt(v, 10) + "px"
      }, v);
    },

    set headerPaddingRight(v) {
      setBodyProperty({
        '--modal-header-padding-right': parseInt(v, 10) + "px"
      }, v);
    },

    set iconHeaderPaddingRight(v) {
      setBodyProperty({
        '--modal-method-header-padding-right': parseInt(v, 10) + "px"
      }, v);
    },

    set headerPaddingBottom(v) {
      setBodyProperty({
        '--modal-header-padding-bottom': parseInt(v, 10) + "px"
      }, v);
    },

    set headerPaddingLeft(v) {
      setBodyProperty({
        '--modal-header-padding-left': parseInt(v, 10) + "px"
      }, v);
    },

    set bodyPaddingTop(v) {
      setBodyProperty({
        '--modal-body-padding-top': parseInt(v, 10) + "px"
      }, v);
    },

    set bodyPaddingRight(v) {
      setBodyProperty({
        '--modal-body-padding-right': parseInt(v, 10) + "px"
      }, v);
    },

    set bodyPaddingBottom(v) {
      setBodyProperty({
        '--modal-body-padding-bottom': parseInt(v, 10) + "px"
      }, v);
    },

    set bodyPaddingLeft(v) {
      setBodyProperty({
        '--modal-body-padding-left': parseInt(v, 10) + "px"
      }, v);
    },

    set iconBodyPaddingTop(v) {
      setBodyProperty({
        '--modal-icon-body-padding-top': parseInt(v, 10) + "px"
      }, v);
    },

    set iconBodyPaddingRight(v) {
      setBodyProperty({
        '--modal-icon-body-padding-right': parseInt(v, 10) + "px"
      }, v);
    },

    set iconBodyPaddingBottom(v) {
      setBodyProperty({
        '--modal-icon-body-padding-bottom': parseInt(v, 10) + "px"
      }, v);
    },

    set iconBodyPaddingLeft(v) {
      setBodyProperty({
        '--modal-icon-body-padding-left': parseInt(v, 10) + "px"
      }, v);
    },

    set footerPadding(v) {
      setBodyProperty({
        '--modal-footer-padding': v
      }, v);
    },

    set borderRadius(v) {
      setBodyProperty({
        '--modal-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set borderWidth(v) {
      setBodyProperty({
        '--modal-border-width': parseInt(v, 10) + "px"
      }, v);
    },

    set dividerHeight(v) {
      setBodyProperty({
        '--modal-divider-height': parseInt(v, 10) + "px"
      }, v);
    },

    set dividerWidth(v) {
      setBodyProperty({
        '--modal-divider-width': v
      }, v);
    },

    set borderColor(v) {
      setBodyProperty({
        '--modal-border-color': v
      }, v);
    },

    set dividerColor(v) {
      setBodyProperty({
        '--modal-divider-color': v
      }, v);
    },

    set color(v) {
      setBodyProperty({
        '--modal-color': v
      }, v);
    },

    set headerBg(v) {
      setBodyProperty({
        '--modal-header-bg': v
      }, v);
    },

    set footerBg(v) {
      setBodyProperty({
        '--modal-footer-bg': v
      }, v);
    },

    set boxShadow(v) {
      setBodyProperty({
        '--modal-box-shadow': v
      }, v);
    }

  },
  popover: {
    info: {
      title: 'Popover 气泡',
      name: 'popover',
      path: 'Popover'
    },
    conf: [{
      name: 'borderColor',
      className: (0, _styles10.popoverClass)('_'),
      attr: 'borderColor',
      type: 'color',
      desc: '边框颜色'
    }, {
      name: 'borderWidth',
      className: (0, _styles10.popoverClass)('_'),
      attr: 'borderWidth',
      type: 'number',
      parser: parseInt,
      desc: '边框宽度'
    }, {
      name: 'boxShadow',
      className: (0, _styles10.popoverClass)('_'),
      attr: 'boxShadow',
      type: 'string',
      desc: '阴影'
    }, {
      name: 'borderRadius',
      className: (0, _styles10.popoverClass)('_'),
      attr: 'borderRadius',
      type: 'number',
      parser: parseInt,
      desc: '圆角'
    }, {
      name: 'textMaxWidth',
      className: (0, _styles10.popoverClass)('text'),
      attr: 'maxWidth',
      type: 'string',
      desc: '纯文字时的最大宽度'
    }, {
      name: 'fontSize',
      className: (0, _styles10.popoverClass)('_'),
      attr: 'fontSize',
      type: 'number',
      parser: parseInt,
      desc: '字体大小'
    }],

    set borderColor(v) {
      setBodyProperty({
        '--popover-border-color': v
      }, v);
    },

    set borderWidth(v) {
      setBodyProperty({
        '--popover-border-width': parseInt(v, 10) + "px"
      }, v);
    },

    set boxShadow(v) {
      setBodyProperty({
        '--popover-box-shadow': v
      }, v);
    },

    set borderRadius(v) {
      setBodyProperty({
        '--popover-border-radius': parseInt(v, 10) + "px"
      }, v);
    },

    set textMaxWidth(v) {
      setBodyProperty({
        '--popover-text-max-width': v
      }, v);
    },

    set fontSize(v) {
      setBodyProperty({
        '--popover-text-font-size': parseInt(v, 10) + "px"
      }, v);
    }

  },
  tree: {
    info: {
      title: 'Tree 树型选择',
      name: 'tree',
      path: 'Tree'
    },
    conf: [{
      name: 'treeIndicatorColor',
      className: (0, _expose.exposeClass)('tree-default-icon'),
      attr: 'borderLeftColor',
      type: 'color',
      desc: '三角/+-颜色'
    }, {
      name: 'levelIndent',
      className: (0, _expose.exposeClass)('tree-indent'),
      attr: 'width',
      type: 'number',
      parser: parseInt,
      min: -100,
      desc: '项目缩进'
    }, {
      name: 'nodeMarginBottom',
      className: (0, _expose.exposeClass)('tree-node'),
      attr: 'marginBottom',
      type: 'number',
      parser: parseInt,
      desc: '项目垂直间隔'
    }, {
      name: 'lineColor',
      className: (0, _expose.exposeClass)('tree-line'),
      attr: 'color',
      type: 'color',
      desc: '连线颜色'
    }],

    set levelIndent(v) {
      setBodyProperty({
        '--tree-level-indent': parseInt(v, 10) + "px"
      }, v);
    },

    set nodeMarginBottom(v) {
      setBodyProperty({
        '--tree-node-margin-bottom': parseInt(v, 10) + "px"
      }, v);
    },

    set treeIndicatorColor(v) {
      setBodyProperty({
        '--tree-indicator-color': v
      }, v);
    },

    set lineColor(v) {
      setBodyProperty({
        '--tree-line-color': v
      }, v);
    }

  },
  switch: {
    info: {
      title: 'Switch 开关选择器',
      name: 'switch',
      path: 'Switch'
    },
    conf: [{
      name: 'uncheckBg',
      className: (0, _styles2.checkinputClass)('switch'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '关闭状态背景色'
    }, {
      name: 'type',
      className: (0, _expose.exposeClass)('switch-type'),
      attr: 'animationName',
      type: ['outter', 'inner'],
      desc: '类型'
    }],

    set type(v) {
      var o = {};

      if (v === 'outter') {
        o['--switch-indicator-padding-horizontal'] = "0px";
        o['--switch-indicator-padding-horizontal-negative'] = "0px";
        o['--switch-indicator-size'] = "24px";
        o['--switch-bg-height'] = "16px";
        o['--switch-indicator-top'] = "-4px";
        o['--switch-small-indicator-size'] = "16px";
        o['--switch-small-bg-height'] = "10px";
        o['--switch-large-bg-height'] = "22px";
        o['--switch-large-indicator-top'] = "-5px";
        o['--switch-small-indicator-top'] = "-3px";
        o['--switch-large-indicator-size'] = "32px";
      } else if (v === 'inner') {
        o['--switch-indicator-checked-bg'] = "#fff";
        o['--switch-indicator-padding-horizontal'] = "2px";
        o['--switch-indicator-padding-horizontal-negative'] = "-2px";
        o['--switch-indicator-size'] = "18px";
        o['--switch-bg-height'] = "22px";
        o['--switch-indicator-top'] = "2px";
        o['--switch-small-indicator-size'] = "12px";
        o['--switch-small-bg-height'] = "16px";
        o['--switch-large-bg-height'] = "28px";
        o['--switch-large-indicator-top'] = "2px";
        o['--switch-small-indicator-top'] = "2px";
        o['--switch-large-indicator-size'] = "24px";
      }

      setBodyProperty(o, v);
    },

    set uncheckBg(v) {
      setBodyProperty({
        '--switch-unchecked-bg': v
      }, v);
    }

  },
  tabs: {
    info: {
      title: 'Tabs 标签',
      name: 'tabs',
      path: 'Tabs'
    },
    conf: [{
      name: 'tabSpacing',
      className: (0, _expose.exposeClass)('tabs'),
      attr: 'marginLeft',
      type: 'number',
      min: -10,
      parser: parseInt,
      desc: 'tab间隔'
    }, {
      name: 'tabPaddingX',
      className: (0, _expose.exposeClass)('tabs-tab'),
      attr: 'paddingLeft',
      type: 'number',
      min: 0,
      parser: parseInt,
      desc: 'tab水平内边距'
    }, {
      name: 'tabPaddingY',
      className: (0, _expose.exposeClass)('tabs-tab'),
      attr: 'paddingTop',
      type: 'number',
      min: 0,
      parser: parseInt,
      desc: 'tab垂直内边距'
    }, {
      name: 'tabFontSize',
      className: (0, _expose.exposeClass)('tabs-tab'),
      attr: 'fontSize',
      type: 'number',
      min: 0,
      parser: parseInt,
      desc: 'tab字体大小'
    }, {
      name: 'tabBackground',
      className: (0, _expose.exposeClass)('tabs-tab'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'tab背景色'
    }, {
      name: 'tabActiveBackground',
      className: (0, _expose.exposeClass)('tabs-tab-active'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'tab选中背景色'
    }, {
      name: 'tabBorderColor',
      className: (0, _expose.exposeClass)('tabs-tab'),
      attr: 'borderColor',
      type: 'color',
      desc: 'tab边框颜色'
    }, {
      name: 'tabActiveBorderColor',
      className: (0, _expose.exposeClass)('tabs-tab-active'),
      attr: 'borderColor',
      type: 'color',
      desc: 'tab选中边框颜色'
    }, {
      name: 'tabColor',
      className: (0, _expose.exposeClass)('tabs-tab'),
      attr: 'color',
      type: 'color',
      desc: 'tab文字颜色'
    }, {
      name: 'tabActiveColor',
      className: (0, _expose.exposeClass)('tabs-tab-active'),
      attr: 'color',
      type: 'color',
      desc: 'tab选中文字颜色(不含线条样式)'
    }, {
      name: 'tabLineActiveColor',
      className: (0, _expose.exposeClass)('tabs-line-active'),
      attr: 'color',
      type: 'color',
      desc: 'tab线条样式选中文字颜色'
    }],

    set tabSpacing(v) {
      setBodyProperty({
        '--tabs-tab-spacing': parseInt(v, 10) + "px"
      }, v);
    },

    set tabPaddingX(v) {
      setBodyProperty({
        '--tabs-tab-padding-x': parseInt(v, 10) + "px"
      }, v);
    },

    set tabPaddingY(v) {
      setBodyProperty({
        '--tabs-tab-padding-y': parseInt(v, 10) + "px"
      }, v);
    },

    set tabFontSize(v) {
      setBodyProperty({
        '--tabs-tab-font-size': parseInt(v, 10) + "px"
      }, v);
    },

    set tabBackground(v) {
      setBodyProperty({
        '--tabs-tab-background': v
      }, v);
    },

    set tabActiveBackground(v) {
      setBodyProperty({
        '--tabs-tab-active-background': v
      }, v);
    },

    set tabBorderColor(v) {
      setBodyProperty({
        '--tabs-tab-border-color': v
      }, v);
    },

    set tabActiveBorderColor(v) {
      setBodyProperty({
        '--tabs-tab-active-border-color': v
      }, v);
    },

    set tabColor(v) {
      setBodyProperty({
        '--tabs-tab-color': v
      }, v);
    },

    set tabActiveColor(v) {
      setBodyProperty({
        '--tabs-tab-active-color': v
      }, v);
    },

    set tabLineActiveColor(v) {
      setBodyProperty({
        '--tabs-line-active-color': v
      }, v);
    }

  },
  cascader: {
    info: {
      title: 'Cascader 级联选择器',
      name: 'cascader',
      path: 'Cascader'
    },
    conf: [{
      name: 'activeBgc',
      className: (0, _expose.exposeClass)('cascader-active'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '选中背景颜色'
    }, {
      name: 'activeColor',
      className: (0, _expose.exposeClass)('cascader-active'),
      attr: 'color',
      type: 'color',
      desc: '选中字体颜色'
    }],

    set activeBgc(v) {
      setBodyProperty({
        '--cascader-active-background-color': v
      }, v);
    },

    set activeColor(v) {
      setBodyProperty({
        '--cascader-active-color': v
      }, v);
    }

  },
  list: {
    info: {
      title: 'List 列表',
      name: 'list',
      path: 'List'
    },
    conf: [{
      name: 'itemBottomBorderWidth',
      className: (0, _expose.exposeClass)('list-item'),
      attr: 'width',
      type: 'number',
      parser: parseInt,
      desc: '分割线粗细'
    }, {
      name: 'itemHoverBgc',
      className: (0, _expose.exposeClass)('list-item'),
      attr: 'backgroundColor',
      type: 'color',
      desc: '行hover时背景颜色'
    }],

    set itemBottomBorderWidth(v) {
      setBodyProperty({
        '--list-item-bottom-border-width': parseInt(v, 10) + "px"
      }, v);
    },

    set itemHoverBgc(v) {
      setBodyProperty({
        '--list-item-hover-bgc': v
      }, v);
    }

  },
  progress: {
    info: {
      title: 'Progress',
      name: 'progress',
      path: 'Progress'
    },
    conf: [{
      name: 'progressBgc',
      className: (0, _expose.exposeClass)('progress'),
      attr: 'backgroundColor',
      type: 'color',
      desc: 'Progress默认背景颜色'
    }],

    set progressBgc(v) {
      setBodyProperty({
        '--progress-bgc': v
      }, v);
    }

  },
  common: {
    info: {
      title: 'Common 公共',
      name: 'common',
      path: 'Button'
    },
    conf: [{
      name: 'fontSize',
      className: (0, _expose.exposeClass)('common-base'),
      attr: 'fontSize',
      parser: parseInt,
      type: 'number',
      desc: '字体大小'
    }, {
      name: 'fontFamily',
      className: (0, _styles3.buttonClass)('_'),
      attr: 'fontFamily',
      type: 'string',
      desc: '字体'
    }, {
      name: 'lineHeight',
      value: 1.428571429,
      type: 'string',
      desc: '行高'
    }, {
      name: 'contentBlockPadding',
      className: '',
      attr: 'padding',
      type: 'string',
      desc: '区块内边距'
    }, {
      name: 'contentTextPadding',
      className: (0, _styles10.popoverClass)('text'),
      attr: 'padding',
      type: 'string',
      desc: '文字内边距'
    }, {
      name: 'spinDefaultName',
      className: (0, _expose.exposeClass)('common-spin-default'),
      attr: 'animationName',
      type: ['default', 'chasing-dots', 'cube-grid', 'double-bounce', 'fading-circle', 'four-dots', 'plane', 'pulse', 'ring', 'scale-circle', 'three-bounce', 'wave'],
      desc: '默认加载中样式'
    }, {
      name: 'caret',
      className: (0, _expose.exposeClass)('common-caret'),
      attr: 'animationName',
      type: ['line', 'fill'],
      desc: '下拉箭头风格'
    }, {
      name: 'inputDelay',
      className: (0, _expose.exposeClass)('common-input-delay'),
      attr: 'width',
      type: 'number',
      parser: parseInt,
      min: 0,
      max: 2000,
      desc: '输入延迟，Input, Textarea, EditableArea'
    }, {
      name: 'inputTrim',
      className: (0, _expose.exposeClass)('common-input-trim'),
      attr: 'opacity',
      type: 'number',
      parser: parseInt,
      min: 0,
      max: 1,
      desc: '输入过滤两侧空格，Input, Textarea, EditableArea work. 0 or 1'
    }],

    set fontSize(v) {
      var base = parseInt(v, 10);
      setBodyProperty({
        '--font-size-base': base + "px",
        '--font-size-base-26': Math.floor(base * 2.6) + "px",
        '--font-size-base-215': Math.floor(base * 2.15) + "px",
        '--font-size-base-17': Math.floor(base * 1.7) + "px",
        '--font-size-base-125': Math.floor(base * 1.25) + "px",
        '--font-size-base-085': Math.floor(base * 0.85) + "px",
        '--font-size-base-15': Math.floor(base * 1.5) + "px",
        '--font-size-base-45': Math.floor(base * 4.5) + "px",
        '--font-size-large': Math.ceil(base * 1.25) + "px",
        '--font-size-small': Math.ceil(base * 0.85) + "px",
        '--font-size-large-medium': base + 2 + "px"
      }, v);
    },

    set fontFamily(v) {
      setBodyProperty({
        '--common-body-font-family': v
      }, v);
    },

    set lineHeight(v) {
      setBodyProperty({
        '--common-line-height': v
      }, v);
    },

    set contentBlockPadding(v) {
      setBodyProperty({
        '--common-content-block-padding': v
      }, v);
    },

    set contentTextPadding(v) {
      setBodyProperty({
        '--common-content-text-padding': v
      }, v);
    },

    set caret(v) {
      (0, _config.set)('caret', v);
      setBodyProperty({
        '--common-caret-style': v
      }, v);
    },

    set inputDelay(v) {
      (0, _config.set)('delay', v);
      setBodyProperty({
        '--common-input-delay': parseInt(v, 10) + "px"
      }, v);
    },

    set inputTrim(v) {
      (0, _config.set)('trim', !!v);
      setBodyProperty({
        '--common-input-trim': parseInt(v, 10)
      }, v);
    },

    set spinDefaultName(v) {
      (0, _config.set)('spin', v);
      setBodyProperty({
        '--common-spin-default-name': v
      }, v);
    }

  }
};
var _default = injects;
exports.default = _default;