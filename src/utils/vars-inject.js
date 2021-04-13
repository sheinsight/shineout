import { darken, fade } from './color'
import { set as configSet } from '../config'
import { entries } from './objects'
import {
  paginationClass,
  checkinputClass,
  tagClass,
  buttonClass,
  tooltipClass,
  inputClass,
  selectClass,
  formClass,
  sliderClass,
  menuClass,
  alertClass,
  messageClass,
  cardClass,
  modalClass,
  popoverClass,
  datepickerClass,
  dropdownClass,
} from '../styles'
import { exposeClass } from '../styles/expose'

const computedCache = {}
function getProperty(name = '--btn-hover-darken', cache = true) {
  if (cache && computedCache[name]) return computedCache[name]
  computedCache[name] = getComputedStyle(document.body)
    .getPropertyValue(name)
    .trim()
  return computedCache[name]
}

function setBodyProperty(colors, value) {
  for (const [cssVar, cssValue] of entries(colors)) {
    if (value === undefined) {
      document.body.style.removeProperty(cssVar)
    } else {
      document.body.style.setProperty(cssVar, cssValue)
    }
  }
}

const injects = {
  color: {
    info: {
      title: 'Color 颜色',
      name: 'color',
      path: 'Button',
    },
    conf: [
      {
        name: 'primary',
        type: 'color',
        attr: 'backgroundColor',
        className: buttonClass('primary'),
        desc: '主色',
      },
      {
        name: 'infoColor',
        type: 'color',
        attr: 'backgroundColor',
        className: buttonClass('info'),
      },
      {
        name: 'warning',
        type: 'color',
        attr: 'backgroundColor',
        className: buttonClass('warning'),
      },
      {
        name: 'danger',
        type: 'color',
        attr: 'backgroundColor',
        className: buttonClass('danger'),
      },
      {
        name: 'secondary',
        type: 'color',
        attr: 'backgroundColor',
        className: buttonClass('secondary'),
      },
      {
        name: 'success',
        type: 'color',
        attr: 'backgroundColor',
        className: buttonClass('success'),
      },
      {
        name: 'gray100',
        type: 'color',
        attr: 'color',
        desc: 'Form, Datepicker, Cascader, Tree, Card, Upload, Pagination, Select',
        className: exposeClass('gray-100'),
      },
      {
        name: 'gray200',
        type: 'color',
        attr: 'color',
        desc: 'Form, Datepicker, Cascader, Alert, Tabs, Progress',
        className: exposeClass('gray-200'),
      },
      {
        name: 'gray300',
        type: 'color',
        attr: 'color',
        desc: 'Button, Card, Cascader, Upload, Image, Tooltip',
        className: exposeClass('gray-300'),
      },
      {
        name: 'gray400',
        type: 'color',
        attr: 'color',
        desc: 'Cascader, Select, TreeSelect, Slider, Upload, Input, Rate',
        className: exposeClass('gray-400'),
      },
      {
        name: 'gray500',
        type: 'color',
        attr: 'color',
        desc: 'Cascader, Select, Table, TreeSelect, Checkbox, Slider, Tree',
        className: exposeClass('gray-500'),
      },
      {
        name: 'gray600',
        type: 'color',
        attr: 'color',
        desc: 'Select, Datepicker, TreeSelect, Link-disabled, Table, Pagination, Tree',
        className: exposeClass('gray-600'),
      },
      {
        name: 'gray700',
        type: 'color',
        attr: 'color',
        desc: 'Table sort icon hover color',
        className: exposeClass('gray-700'),
      },
      {
        name: 'gray800',
        type: 'color',
        attr: 'color',
        desc: 'Dropdown, Card, Dropdown',
        className: exposeClass('gray-800'),
      },
      {
        name: 'gray900',
        type: 'color',
        attr: 'color',
        desc: 'text color, Menu',
        className: exposeClass('gray-900'),
      },
    ],
    set primary(v) {
      setBodyProperty(
        {
          '--primary-color': v,
          '--primary-color-dark-5': darken(v, 5),
          '--primary-color-dark-15': darken(v, 15),
          '--primary-color-dark-btn-hover': darken(v, getProperty()),
          '--primary-color-lighten-40': darken(v, -40),
          '--primary-color-fade-60': fade(v, 0.6),
          '--primary-color-fade-50': fade(v, 0.5),
          '--primary-color-fade-10': fade(v, 0.1),
          '--primary-color-fade-0': fade(v, 0),
          '--primary-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
          '--primary-color-dark-5_fade-0': fade(darken(v, 5), 0),
        },
        v
      )
    },
    set infoColor(v) {
      setBodyProperty(
        {
          '--info-color': v,
          '--info-color-dark-5': darken(v, 5),
          '--info-color-fade-60': fade(v, 0.6),
          '--info-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
          '--info-color-fade-0': fade(v, 0),
          '--info-color-dark-5_fade-0': fade(darken(v, 5), 0),
          '--info-color-dark-btn-hover': darken(v, getProperty()),
        },
        v
      )
    },
    set warning(v) {
      setBodyProperty(
        {
          '--warning-color': v,
          '--warning-color-dark-5': darken(v, 5),
          '--warning-color-fade-60': fade(v, 0.6),
          '--warning-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
          '--warning-color-fade-0': fade(v, 0),
          '--warning-color-dark-5_fade-0': fade(darken(v, 5), 0),
          '--warning-color-dark-btn-hover': darken(v, getProperty()),
        },
        v
      )
    },
    set danger(v) {
      setBodyProperty(
        {
          '--danger-color': v,
          '--danger-color-fade-25': fade(v, 0.25),
          '--danger-color-dark-5': darken(v, 5),
          '--danger-color-fade-60': fade(v, 0.6),
          '--danger-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
          '--danger-color-fade-0': fade(v, 0),
          '--danger-color-dark-5_fade-0': fade(darken(v, 5), 0),
          '--danger-color-dark-btn-hover': darken(v, getProperty()),
        },
        v
      )
    },
    set success(v) {
      setBodyProperty(
        {
          '--success-color': v,
          '--success-color-dark-5': darken(v, 5),
          '--success-color-fade-60': fade(v, 0.6),
          '--success-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
          '--success-color-fade-0': fade(v, 0),
          '--success-color-dark-5_fade-0': fade(darken(v, 5), 0),
          '--success-color-dark-btn-hover': darken(v, getProperty()),
        },
        v
      )
    },
    set secondary(v) {
      setBodyProperty(
        {
          '--secondary-color': v,
          '--secondary-color-dark-5': darken(v, 5),
          '--secondary-color-dark-btn-hover': darken(v, getProperty()),
          '--secondary-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
          '--secondary-color-dark-5_fade-0': fade(darken(v, 5), 0),
        },
        v
      )
    },
    set gray100(v) {
      setBodyProperty(
        {
          '--gray-100': v,
        },
        v
      )
    },
    set gray200(v) {
      setBodyProperty(
        {
          '--gray-200': v,
          '--gray-200-darken-5': darken(v, 5),
        },
        v
      )
    },
    set gray300(v) {
      setBodyProperty(
        {
          '--gray-300': v,
          '--gray-300-darken-hover': darken(v, getProperty()),
          '--gray-300-fade-60': fade(v, 0.6),
          '--gray-300-fade-0': fade(v, 0),
        },
        v
      )
    },
    set gray400(v) {
      setBodyProperty(
        {
          '--gray-400': v,
          '--gray-400-darken-20': darken(v, 20),
        },
        v
      )
    },
    set gray500(v) {
      setBodyProperty(
        {
          '--gray-500': v,
        },
        v
      )
    },
    set gray600(v) {
      setBodyProperty(
        {
          '--gray-600': v,
          '--gray-600-lighten-15': darken(v, -15),
        },
        v
      )
    },
    set gray700(v) {
      setBodyProperty(
        {
          '--gray-700': v,
        },
        v
      )
    },
    set gray800(v) {
      setBodyProperty(
        {
          '--gray-800': v,
          '--gray-800-darken-5': darken(v, 5),
        },
        v
      )
    },
    set gray900(v) {
      setBodyProperty(
        {
          '--gray-900': v,
          '--gray-900-lighten-40': darken(v, -40),
        },
        v
      )
    },
  },
  button: {
    info: {
      title: 'Button 按钮',
      name: 'button',
      path: 'Button',
    },
    conf: [
      {
        name: 'fontSizeBase',
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        className: buttonClass('_'),
        desc: '常规按钮字体大小',
      },
      {
        name: 'defaultSizeWidth',
        attr: 'minWidth',
        type: 'number',
        parser: parseInt,
        className: buttonClass('_'),
        desc: '常规按钮最小宽度',
        max: 200,
      },
      {
        name: 'fontSizeLarge',
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        className: buttonClass('large'),
        desc: '大按钮字体大小',
      },
      {
        name: 'largeSizeWidth',
        attr: 'minWidth',
        type: 'number',
        parser: parseInt,
        className: buttonClass('large'),
        desc: '大号按钮最小宽度',
        max: 200,
      },
      {
        name: 'fontSizeSmall',
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        className: buttonClass('small'),
        desc: '小按钮字体大小',
      },
      {
        name: 'smallSizeWidth',
        attr: 'minWidth',
        type: 'number',
        parser: parseInt,
        className: buttonClass('_'),
        desc: '小号按钮最小宽度',
        max: 200,
      },
      {
        name: 'marginLeft',
        attr: 'marginLeft',
        type: 'number',
        parser: parseInt,
        className: exposeClass('button'),
        desc: '连续按钮间距',
      },
      {
        name: 'spinMargin',
        attr: 'marginRight',
        type: 'number',
        parser: parseInt,
        className: buttonClass('spin'),
        desc: '加载图标与文字间距',
      },
      {
        name: 'paddingBaseHorizontal',
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        className: buttonClass('_'),
        desc: '常规按钮水平内边距',
      },
      {
        name: 'paddingBaseVertical',
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        className: buttonClass('_'),
        desc: '常规按钮垂直内边距',
      },
      {
        name: 'paddingLargeHorizontal',
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        className: buttonClass('large'),
        desc: '大按钮水平内边距',
      },
      {
        name: 'paddingLargeVertical',
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        className: buttonClass('large'),
        desc: '大按钮垂直内边距',
      },
      {
        name: 'paddingSmallHorizontal',
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        className: buttonClass('small'),
        desc: '小按钮水平内边距',
      },
      {
        name: 'paddingSmallVertical',
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        className: buttonClass('small'),
        desc: '小按钮垂直内边距',
      },
      {
        name: 'borderRadius',
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        className: buttonClass('_'),
        desc: '常规按钮圆角',
      },
      {
        name: 'smallBorderRadius',
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        className: buttonClass('small'),
        desc: '小按钮圆角',
      },
      {
        name: 'largeBorderRadius',
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        className: buttonClass('large'),
        desc: '大按钮圆角',
      },
      {
        name: 'disabledBg',
        attr: 'backgroundColor',
        type: 'color',
        className: buttonClass('disabled'),
        desc: '禁用按钮背景色',
      },
      {
        name: 'disabledDelimiter',
        attr: 'borderColor',
        type: 'color',
        className: exposeClass('button-disabled-delimiter'),
        desc: '按钮组禁用状态下分隔符颜色',
      },
      {
        name: 'disabledColor',
        attr: 'color',
        type: 'color',
        className: buttonClass('disabled'),
        desc: '禁用按钮文字颜色',
      },
      {
        name: 'disabledBorderColor',
        attr: 'borderColor',
        type: 'color',
        className: buttonClass('disabled'),
        desc: '禁用按钮边框颜色',
      },
      {
        name: 'buttonDefaultTextColor',
        attr: 'color',
        type: 'color',
        className: buttonClass('default'),
        desc: '默认样式下文字颜色',
      },
    ],
    set fontSizeBase(v) {
      setBodyProperty(
        {
          '--button-font-size-base': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set defaultSizeWidth(v) {
      setBodyProperty(
        {
          '--button-default-size-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set fontSizeLarge(v) {
      setBodyProperty(
        {
          '--button-font-size-large': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set largeSizeWidth(v) {
      setBodyProperty(
        {
          '--button-large-size-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set fontSizeSmall(v) {
      setBodyProperty(
        {
          '--button-font-size-small': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set smallSizeWidth(v) {
      setBodyProperty(
        {
          '--button-small-size-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set spinMargin(v) {
      setBodyProperty(
        {
          '--button-spin-margin': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set marginLeft(v) {
      setBodyProperty(
        {
          '--button-margin-left': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderRadius(v) {
      setBodyProperty(
        {
          '--button-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set smallBorderRadius(v) {
      setBodyProperty(
        {
          '--button-small-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set largeBorderRadius(v) {
      setBodyProperty(
        {
          '--button-large-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingBaseHorizontal(v) {
      setBodyProperty(
        {
          '--button-padding-base-horizontal': `${parseInt(v, 10)}px`,
          '--button-padding-base-horizontal-7': `${parseInt(v, 10) * 0.7}px`,
        },
        v
      )
    },
    set paddingLargeHorizontal(v) {
      setBodyProperty(
        {
          '--button-padding-large-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingSmallHorizontal(v) {
      setBodyProperty(
        {
          '--button-padding-small-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingBaseVertical(v) {
      setBodyProperty(
        {
          '--button-padding-base-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingLargeVertical(v) {
      setBodyProperty(
        {
          '--button-padding-large-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingSmallVertical(v) {
      setBodyProperty(
        {
          '--button-padding-small-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set disabledBg(v) {
      setBodyProperty(
        {
          '--button-disabled-bg': v,
        },
        v
      )
    },
    set disabledColor(v) {
      setBodyProperty(
        {
          '--button-disabled-color': v,
        },
        v
      )
    },
    set disabledBorderColor(v) {
      setBodyProperty(
        {
          '--button-disabled-border-color': v,
        },
        v
      )
    },
    set disabledDelimiter(v) {
      setBodyProperty(
        {
          '--button-disabled-delimiter': v,
        },
        v
      )
    },
    set buttonDefaultTextColor(v) {
      setBodyProperty(
        {
          '--button-default-text-color': v,
        },
        v
      )
    },
  },
  dropdown: {
    info: {
      title: 'Dropdown 下拉菜单',
      name: 'dropdown',
      path: 'Dropdown',
    },
    conf: [
      {
        name: 'borderWidth',
        attr: 'borderWidth',
        type: 'number',
        parser: parseInt,
        className: exposeClass('dropdown-button'),
        desc: '按钮边框宽度',
      },
      {
        name: 'columnsPadding',
        attr: 'padding',
        type: 'string',
        className: dropdownClass('box-list'),
        desc: '多列平铺的内边距',
      },
      {
        name: 'optionsHoverBgc',
        attr: 'backgroundColor',
        type: 'color',
        className: exposeClass('dropdown-options-hover'),
        desc: 'options hover时背景颜色',
      },
      {
        name: 'optionsHoverColor',
        attr: 'color',
        type: 'color',
        className: exposeClass('dropdown-options-hover'),
        desc: 'options hover时字体颜色',
      },
    ],
    set borderWidth(v) {
      setBodyProperty(
        {
          '--dropdown-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set columnsPadding(v) {
      setBodyProperty(
        {
          '--dropdown-columns-padding': v,
        },
        v
      )
    },
    set optionsHoverBgc(v) {
      setBodyProperty(
        {
          '--dropdown-options-hover-bgc': v,
        },
        v
      )
    },
    set optionsHoverColor(v) {
      setBodyProperty(
        {
          '--dropdown-options-hover-color': v,
        },
        v
      )
    },
  },
  form: {
    info: {
      title: 'Form 表单',
      name: 'form',
      path: 'Form',
    },
    conf: [
      {
        name: 'itemMarginBottom',
        className: formClass('item'),
        attr: 'marginBottom',
        type: 'number',
        parser: parseInt,
        desc: '条目垂直间隔',
      },
      {
        name: 'itemMarginRight',
        className: exposeClass('form-inline'),
        attr: 'marginRight',
        type: 'number',
        parser: parseInt,
        desc: '条目水平间隔',
      },
      {
        name: 'tipColor',
        className: exposeClass('form-tip'),
        attr: 'color',
        type: 'color',
        desc: '提示文字颜色',
      },
      {
        name: 'labelHorizontalAlign',
        className: exposeClass('form-label'),
        attr: 'textAlign',
        type: ['start', 'center', 'end'],
        desc: '标签对齐方式',
      },
      {
        name: 'formTipFontSize',
        className: exposeClass('form-tip'),
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        desc: '提示信息字体大小',
      },
    ],
    set itemMarginBottom(v) {
      setBodyProperty(
        {
          '--form-item-margin-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set itemMarginRight(v) {
      setBodyProperty(
        {
          '--form-item-margin-right': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set tipColor(v) {
      setBodyProperty(
        {
          '--form-tip-color': v,
        },
        v
      )
    },
    set labelHorizontalAlign(v) {
      setBodyProperty(
        {
          '--form-item-label-align': v,
        },
        v
      )
    },
    set formTipFontSize(v) {
      setBodyProperty(
        {
          '--form-tip-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
  },
  checkbox: {
    info: {
      title: 'Checkbox 复选框',
      name: 'checkbox',
      path: 'Checkbox',
    },
    conf: [
      {
        name: 'marginRight',
        className: checkinputClass('_'),
        attr: 'marginRight',
        type: 'number',
        parser: parseInt,
        desc: '水平间隔',
      },
      {
        name: 'borderWidth',
        className: exposeClass('checkbox-indicator'),
        attr: 'width',
        type: 'number',
        parser: parseInt,
        desc: '边框宽度',
      },
      {
        name: 'color',
        className: checkinputClass('_'),
        attr: 'color',
        type: 'color',
        desc: '文字颜色',
      },
      {
        name: 'borderColor',
        className: exposeClass('checkbox-indicator'),
        attr: 'borderColor',
        type: 'color',
        desc: '边框颜色',
      },
      {
        name: 'textPaddingX',
        className: exposeClass('checkbox-text'),
        attr: 'paddingRight',
        type: 'number',
        parser: parseInt,
        desc: '文字水平内间距',
      },
      {
        name: 'indicatorBorderRadius',
        className: exposeClass('checkbox-indicator'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        min: 3,
        desc: '圆角',
      },
    ],
    set marginRight(v) {
      setBodyProperty(
        {
          '--checkbox-margin-right': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set color(v) {
      setBodyProperty(
        {
          '--checkinput-color': v,
        },
        v
      )
    },
    set borderColor(v) {
      setBodyProperty(
        {
          '--checkbox-border-color': v,
        },
        v
      )
    },
    set borderWidth(v) {
      setBodyProperty(
        {
          '--checkbox-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set textPaddingX(v) {
      setBodyProperty(
        {
          '--checkbox-text-padding-x': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set indicatorBorderRadius(v) {
      setBodyProperty(
        {
          '--checkbox-indicator-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
  },
  radio: {
    info: {
      title: 'Radio 单选框',
      name: 'radio',
      path: 'Radio',
    },
    conf: [
      {
        name: 'size',
        className: exposeClass('radio'),
        attr: 'width',
        type: 'number',
        parser: parseInt,
        min: 0,
        max: 40,
        desc: '尺寸',
      },
      {
        name: 'borderWidth',
        className: exposeClass('radio'),
        attr: 'borderWidth',
        type: 'number',
        parser: parseInt,
        min: 0,
        max: 10,
        desc: '选中的边框宽度',
      },
      {
        name: 'innerWidth',
        className: exposeClass('radio-inner'),
        attr: 'width',
        type: 'number',
        parser: parseInt,
        min: 0,
        max: 10,
        desc: '选中点尺寸',
      },
      {
        name: 'uncheckBorderWidth',
        className: exposeClass('radio-uncheck'),
        attr: 'width',
        type: 'number',
        parser: parseInt,
        min: 0,
        desc: '未选中边框宽度',
      },
      {
        name: 'color',
        className: exposeClass('radio'),
        attr: 'color',
        type: 'color',
        desc: '文字颜色',
      },
    ],
    set size(v) {
      setBodyProperty(
        {
          '--radio-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderWidth(v) {
      setBodyProperty(
        {
          '--radio-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set innerWidth(v) {
      setBodyProperty(
        {
          '--radio-inner-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set uncheckBorderWidth(v) {
      setBodyProperty(
        {
          '--radio-border-uncheck-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set color(v) {
      setBodyProperty(
        {
          '--radio-text-color': v,
        },
        v
      )
    },
  },
  input: {
    info: {
      title: 'Input 输入框',
      name: 'input',
      path: 'Input',
    },
    conf: [
      {
        name: 'color',
        className: inputClass('_'),
        attr: 'color',
        type: 'color',
        desc: '文字颜色',
      },
      {
        name: 'borderRadius',
        className: inputClass('_'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        desc: '圆角',
      },
      {
        name: 'dropdownBorderRadius',
        className: datepickerClass('picker'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        desc: '下拉框圆角，例如Select Options',
      },
      {
        name: 'focusWidth',
        className: inputClass('focus'),
        attr: 'boxShadow',
        type: 'number',
        max: 20,
        parser: v => parseInt(v.split(' ').pop(), 10),
        desc: '聚焦发散光宽度',
      },
      {
        name: 'disabledBg',
        className: inputClass('disabled'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '禁用背景色',
      },
      {
        name: 'disabledColor',
        className: inputClass('disabled'),
        attr: 'color',
        type: 'color',
        desc: '禁用字体色',
      },
      {
        name: 'borderColor',
        className: inputClass('_'),
        attr: 'borderColor',
        type: 'color',
        desc: '边框颜色',
      },
      {
        name: 'borderHoverColor',
        className: exposeClass('input-focus'),
        attr: 'borderColor',
        type: 'color',
        desc: '鼠标悬浮、聚焦时的边框色',
      },
      {
        name: 'placeholderColor',
        className: exposeClass('input-placeholder'),
        attr: 'color',
        type: 'color',
        desc: '占位文字颜色',
      },
      {
        name: 'placeholderSize',
        className: exposeClass('input-placeholder'),
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        desc: '占位文字大小',
      },
      {
        name: 'clearBg',
        className: exposeClass('input-clear'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '清空图标背景色',
      },
      {
        name: 'clearHoverBg',
        className: exposeClass('input-clear-hover'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '清空图标鼠标悬浮背景色',
      },
    ],
    set color(v) {
      setBodyProperty(
        {
          '--input-text-color': v,
        },
        v
      )
    },
    set borderRadius(v) {
      setBodyProperty(
        {
          '--input-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set dropdownBorderRadius(v) {
      setBodyProperty(
        {
          '--input-dropdown-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set disabledBg(v) {
      setBodyProperty(
        {
          '--input-bg-disabled': v,
        },
        v
      )
    },
    set disabledColor(v) {
      setBodyProperty(
        {
          '--input-disabled-color': v,
        },
        v
      )
    },
    set borderColor(v) {
      setBodyProperty(
        {
          '--input-border-color': v,
        },
        v
      )
    },
    set borderHoverColor(v) {
      setBodyProperty(
        {
          '--input-border-focus-color': v,
          '--input-border-focus-color-fade-25': fade(v, 0.25),
        },
        v
      )
    },
    set focusWidth(v) {
      setBodyProperty(
        {
          '--input-focus-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set placeholderColor(v) {
      setBodyProperty(
        {
          '--input-placeholder-color': v,
        },
        v
      )
    },
    set placeholderSize(v) {
      setBodyProperty(
        {
          '--input-placeholder-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set clearBg(v) {
      setBodyProperty(
        {
          '--input-clear-bg-color': v,
        },
        v
      )
    },
    set clearHoverBg(v) {
      setBodyProperty(
        {
          '--input-clear-bg-hover-color': v,
        },
        v
      )
    },
  },
  select: {
    info: {
      title: 'Select 选择框',
      name: 'select',
      path: 'Select',
    },
    conf: [
      {
        name: 'resultPaddingHorizontal',
        className: exposeClass('select-result-item'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        desc: '选中值水平内边距',
      },
      {
        name: 'resultPaddingVertical',
        className: exposeClass('select-result-item'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        desc: '选中值垂直内边距',
      },
      {
        name: 'itemColor',
        className: selectClass('option'),
        attr: 'color',
        type: 'color',
        desc: '选项文字颜色',
      },
      {
        name: 'itemBgColor',
        className: selectClass('option'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '选项背景颜色',
      },
      {
        name: 'disabledBg',
        className: selectClass('option', 'disabled'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '禁用选项背景色',
      },
      {
        name: 'disabledColor',
        className: selectClass('option', 'disabled'),
        attr: 'color',
        type: 'color',
        desc: '禁用选项文字颜色',
      },
      {
        name: 'itemActiveBg',
        className: selectClass('active', 'option'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '选中项背景色',
      },
      {
        name: 'itemActiveColor',
        className: selectClass('active', 'option'),
        attr: 'color',
        type: 'color',
        desc: '选中项文字颜色',
      },
      {
        name: 'itemHoverBg',
        className: exposeClass('select-option-hover'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '选项鼠标悬浮背景色',
      },
      {
        name: 'itemHoverColor',
        className: exposeClass('select-option-hover'),
        attr: 'color',
        type: 'color',
        desc: '选项鼠标悬浮文字颜色',
      },
      {
        name: 'compressedMoreHoverBg',
        className: exposeClass('select-compressed'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'compressed模式按钮鼠标悬浮背景色',
      },
      {
        name: 'clearIconBg',
        className: exposeClass('select-close'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '清空按钮背景色',
      },
    ],
    set resultPaddingVertical(v) {
      setBodyProperty(
        {
          '--select-result-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set resultPaddingHorizontal(v) {
      setBodyProperty(
        {
          '--select-result-padding-horizontal': `${parseInt(v, 10)}px`,
          '--select-result-padding-horizontal-16': `${parseInt(v, 10) + 16}px`,
        },
        v
      )
    },
    set itemColor(v) {
      setBodyProperty(
        {
          '--select-option-color': v,
        },
        v
      )
    },
    set itemBgColor(v) {
      setBodyProperty(
        {
          '--select-option-bg-color': v,
        },
        v
      )
    },
    set disabledBg(v) {
      setBodyProperty(
        {
          '--select-disabled-bg-color': v,
        },
        v
      )
    },
    set disabledColor(v) {
      setBodyProperty(
        {
          '--select-disabled-color': v,
        },
        v
      )
    },
    set itemActiveBg(v) {
      setBodyProperty(
        {
          '--select-item-active-bg': v,
        },
        v
      )
    },
    set itemActiveColor(v) {
      setBodyProperty(
        {
          '--select-item-active-color': v,
        },
        v
      )
    },
    set itemHoverBg(v) {
      setBodyProperty(
        {
          '--select-option-hover-bg': v,
        },
        v
      )
    },
    set itemHoverColor(v) {
      setBodyProperty(
        {
          '--select-option-hover-color': v,
        },
        v
      )
    },
    set compressedMoreHoverBg(v) {
      setBodyProperty(
        {
          '--select-compressed-hover-bg': v,
        },
        v
      )
    },
    set clearIconBg(v) {
      setBodyProperty(
        {
          '--select-clear-bg-color': v,
        },
        v
      )
    },
  },
  datepicker: {
    info: {
      title: 'Datepicker 日期选择',
      name: 'datepicker',
      path: 'Datepicker',
    },
    conf: [
      {
        name: 'rectBorderRadius',
        className: exposeClass('datepicker-month-item'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        desc: '年份、月份选中项圆角',
      },
      {
        name: 'dayHoverBgc',
        className: exposeClass('datepicker-day-hover-bgc'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'day hover时背景颜色',
      },
    ],
    set rectBorderRadius(v) {
      setBodyProperty(
        {
          '--datepicker-rect-active-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set dayHoverBgc(v) {
      setBodyProperty(
        {
          '--datepicker-day-hover-bgc': v,
        },
        v
      )
    },
  },
  slider: {
    info: {
      title: 'Slider 滑块',
      name: 'slider',
      path: 'Slider',
    },
    conf: [
      {
        name: 'indicatorBg',
        className: exposeClass('slider-indicator'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '滑块背景色',
      },
      {
        name: 'indicatorSize',
        className: exposeClass('slider-indicator'),
        attr: 'width',
        type: 'number',
        min: 8,
        max: 40,
        parser: parseInt,
        desc: '滑块尺寸',
      },
      {
        name: 'indicatorBoxShadow',
        className: exposeClass('slider-indicator'),
        attr: 'boxShadow',
        type: 'string',
        desc: '滑块阴影',
      },
      {
        name: 'barBg',
        className: exposeClass('slider-bar'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '滑动条背景色',
      },
      {
        name: 'disabledBarBg',
        className: exposeClass('slider-bar-disabled'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '滑动条禁用背景色',
      },
      {
        name: 'disabledIndicatorBorder',
        className: exposeClass('slider-indicator-disabled'),
        attr: 'borderColor',
        type: 'color',
        desc: '禁用状态下滑块边框色',
      },
      {
        name: 'disabledIndicatorBg',
        className: exposeClass('slider-indicator-disabled'),
        attr: 'background',
        type: 'color',
        desc: '禁用状态下滑块边背景色',
      },
      {
        name: 'height',
        className: sliderClass('background'),
        attr: 'height',
        type: 'number',
        parser: parseInt,
        desc: '滑动条高度',
      },
      {
        name: 'borderRadius',
        className: sliderClass('background'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        desc: '滑动条圆角',
      },
      {
        name: 'valueBottom',
        className: exposeClass('slider-value'),
        attr: 'height',
        type: 'number',
        parser: parseInt,
        desc: '当前值距离滑块距离',
      },
    ],
    set indicatorBg(v) {
      setBodyProperty(
        {
          '--slider-indicator-bg': v,
        },
        v
      )
    },
    set indicatorSize(v) {
      setBodyProperty(
        {
          '--slider-indicator-size': `${parseInt(v, 10)}px`,
          '--slider-indicator-size-half': `${parseInt(v, 10) / 2}px`,
        },
        v
      )
    },
    set indicatorBoxShadow(v) {
      setBodyProperty(
        {
          '--slider-indicator-box-shadow': v,
        },
        v
      )
    },
    set barBg(v) {
      setBodyProperty(
        {
          '--slider-bar-color': v,
        },
        v
      )
    },
    set disabledBarBg(v) {
      setBodyProperty(
        {
          '--slider-disabled-bar-bg': v,
        },
        v
      )
    },
    set disabledIndicatorBorder(v) {
      setBodyProperty(
        {
          '--slider-disbaled-indicator-border-color': v,
        },
        v
      )
    },
    set disabledIndicatorBg(v) {
      setBodyProperty(
        {
          '--slider-disbaled-indicator-bg': v,
        },
        v
      )
    },
    set height(v) {
      setBodyProperty(
        {
          '--slider-bar-height': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderRadius(v) {
      setBodyProperty(
        {
          '--slider-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set valueBottom(v) {
      setBodyProperty(
        {
          '--slider-value-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
  },
  table: {
    info: {
      title: 'Table 表格',
      name: 'table',
      path: 'Table',
    },
    conf: [
      {
        name: 'scrollRatio',
        className: exposeClass('table-scroll-ratio'),
        attr: 'width',
        parser: parseInt,
        type: 'number',
        desc: '滚动速率，仅在 Windows 下有效',
        logic: true,
        max: 500,
      },
      {
        name: 'headBg',
        className: exposeClass('table-head'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '表头背景色',
      },
      {
        name: 'headColor',
        className: exposeClass('table-head'),
        attr: 'color',
        type: 'color',
        desc: '表头文字颜色',
      },
      {
        name: 'bodyBg',
        className: exposeClass('table-body'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '表格内容背景色',
      },
      {
        name: 'rowSpacing',
        className: exposeClass('table-spacing'),
        attr: 'height',
        type: 'number',
        parser: parseInt,
        desc: '行间距',
      },
      {
        name: 'rowBorderRadius',
        className: exposeClass('table-spacing'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        desc: '行圆角',
      },
      {
        name: 'headFontWeight',
        className: exposeClass('table-head'),
        attr: 'fontWeight',
        type: 'number',
        max: 900,
        min: 100,
        parser: parseInt,
        desc: '表头字重',
      },
      {
        name: 'borderColor',
        className: exposeClass('table-head'),
        attr: 'borderColor',
        type: 'color',
        desc: '边框颜色',
      },
      {
        name: 'hoverBg',
        className: exposeClass('table-head-hover'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '鼠标悬浮行背景色',
      },
      {
        name: 'selectedBg',
        className: exposeClass('table-selected'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '选中行背景色',
      },
      {
        name: 'textColor',
        className: exposeClass('table'),
        attr: 'color',
        type: 'color',
        desc: '文字颜色',
      },
      {
        name: 'borderRadiusTop',
        className: exposeClass('table-head'),
        attr: 'borderTopLeftRadius',
        type: 'number',
        parser: parseInt,
        desc: '表格头部圆角',
      },
      {
        name: 'headerCellPadding',
        className: exposeClass('table-head'),
        attr: 'padding',
        type: 'string',
        desc: '表头分组内边距',
      },
      {
        name: 'smallCellPadding',
        className: exposeClass('table-small'),
        attr: 'padding',
        type: 'string',
        desc: '紧凑表格单元格内边距',
      },
      {
        name: 'cellPaddingHorizontal',
        className: exposeClass('table-cell'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        desc: '单元格水平内边距',
      },
      {
        name: 'cellPaddingVertical',
        className: exposeClass('table-cell'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        desc: '单元格垂直内边距',
      },
      {
        name: 'treeExpandIconMarginRight',
        className: exposeClass('table-tree-expand'),
        attr: 'marginRight',
        type: 'number',
        parser: parseInt,
        desc: '子表格展开/收起按钮距离文字距离',
      },
      {
        name: 'fixedStart',
        className: exposeClass('table-fixed-start'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '固定列渐变色开始颜色',
      },
      {
        name: 'fixedEnd',
        className: exposeClass('table-fixed-end'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '固定列渐变色结束颜色',
      },
      {
        name: 'tableEvenBgc',
        className: exposeClass('table-even'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '偶数行背景颜色',
      },
      {
        name: 'tableOddBgc',
        className: exposeClass('table-odd'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '奇数行背景颜色',
      },
      {
        name: 'marginBottom',
        className: exposeClass('table'),
        attr: 'marginBottom',
        type: 'number',
        parser: parseInt,
        desc: '表格底部外边距',
      },
      {
        name: 'headerTopDivider',
        className: exposeClass('table-header-top'),
        attr: 'borderWidth',
        type: 'number',
        parser: parseInt,
        desc: '无边框表格头部边框线',
      },
    ],
    set scrollRatio(v) {
      configSet('scrollRatio', v)
      setBodyProperty(
        {
          '--table-scroll-ratio': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set headBg(v) {
      setBodyProperty(
        {
          '--table-head-bg': v,
        },
        v
      )
    },
    set hoverBg(v) {
      setBodyProperty(
        {
          '--table-hover-bg': v,
        },
        v
      )
    },
    set selectedBg(v) {
      setBodyProperty(
        {
          '--table-selected-row-bg': v,
        },
        v
      )
    },
    set headColor(v) {
      setBodyProperty(
        {
          '--table-head-color': v,
        },
        v
      )
    },
    set bodyBg(v) {
      setBodyProperty(
        {
          '--table-body-bg': v,
        },
        v
      )
    },
    set rowSpacing(v) {
      setBodyProperty(
        {
          '--table-row-spacing': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set rowBorderRadius(v) {
      setBodyProperty(
        {
          '--table-row-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set headFontWeight(v) {
      setBodyProperty(
        {
          '--table-head-font-weight': `${parseInt(v, 10)}`,
        },
        v
      )
    },
    set borderColor(v) {
      setBodyProperty(
        {
          '--table-border-color': v,
        },
        v
      )
    },
    set textColor(v) {
      setBodyProperty(
        {
          '--table-color': v,
        },
        v
      )
    },
    set borderRadiusTop(v) {
      setBodyProperty(
        {
          '--table-border-radius-top': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set headerCellPadding(v) {
      setBodyProperty(
        {
          '--table-header-cell-padding': v,
        },
        v
      )
    },
    set smallCellPadding(v) {
      setBodyProperty(
        {
          '--table-small-cell-padding': v,
        },
        v
      )
    },
    set cellPaddingHorizontal(v) {
      setBodyProperty(
        {
          '--table-cell-padding-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set cellPaddingVertical(v) {
      setBodyProperty(
        {
          '--table-cell-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set treeExpandIconMarginRight(v) {
      setBodyProperty(
        {
          '--table-tree-expand-icon-margin-right': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set fixedStart(v) {
      setBodyProperty(
        {
          '--table-fixed-start-color': v,
        },
        v
      )
    },
    set fixedEnd(v) {
      setBodyProperty(
        {
          '--table-fixed-end-color': v,
        },
        v
      )
    },
    set tableEvenBgc(v) {
      setBodyProperty(
        {
          '--table-even-td-bgc': v,
        },
        v
      )
    },
    set tableOddBgc(v) {
      setBodyProperty(
        {
          '--table-odd-td-bgc': v,
        },
        v
      )
    },
    set marginBottom(v) {
      setBodyProperty(
        {
          '--table-margin-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set headerTopDivider(v) {
      setBodyProperty(
        {
          '--table-header-top-divider-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
  },
  pagination: {
    info: {
      title: 'Pagination 分页',
      name: 'pagination',
      path: 'Pagination',
    },
    conf: [
      {
        name: 'borderRadius',
        className: paginationClass('item'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        desc: '项目圆角',
      },
      {
        name: 'borderWidth',
        className: paginationClass('item'),
        attr: 'borderWidth',
        type: 'number',
        parser: parseInt,
        desc: '项目边框宽度',
      },
      {
        name: 'hoverBorderColor',
        className: exposeClass('pagination-hover'),
        attr: 'borderColor',
        type: 'color',
        desc: '项目鼠标悬浮边框颜色',
      },
      {
        name: 'hoverColor',
        className: exposeClass('pagination-hover'),
        attr: 'color',
        type: 'color',
        desc: '项目鼠标悬浮文字颜色',
      },
      {
        name: 'hoverBg',
        className: exposeClass('pagination-hover'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '项目鼠标悬浮背景色',
      },
      {
        name: 'fontSize',
        className: exposeClass('pagination'),
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        desc: '字体大小',
      },
      {
        name: 'defaultSize',
        className: exposeClass('pagination-default'),
        attr: 'width',
        type: 'number',
        parser: parseInt,
        desc: '默认尺寸宽高',
      },
      {
        name: 'smallSize',
        className: exposeClass('pagination-small'),
        attr: 'width',
        type: 'number',
        parser: parseInt,
        desc: '小号尺寸宽高',
      },
      {
        name: 'largeSize',
        className: exposeClass('pagination-large'),
        attr: 'width',
        type: 'number',
        parser: parseInt,
        desc: '大号尺寸宽高',
      },
    ],
    set borderRadius(v) {
      setBodyProperty(
        {
          '--pagination-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderWidth(v) {
      setBodyProperty(
        {
          '--pagination-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set hoverBorderColor(v) {
      setBodyProperty(
        {
          '--pagination-hover-border': v,
        },
        v
      )
    },
    set hoverColor(v) {
      setBodyProperty(
        {
          '--pagination-hover-color': v,
        },
        v
      )
    },
    set hoverBg(v) {
      setBodyProperty(
        {
          '--pagination-hover-bg': v,
        },
        v
      )
    },
    set fontSize(v) {
      setBodyProperty(
        {
          '--pagination-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set defaultSize(v) {
      setBodyProperty(
        {
          '--pagination-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set smallSize(v) {
      setBodyProperty(
        {
          '--pagination-size-small': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set largeSize(v) {
      setBodyProperty(
        {
          '--pagination-size-large': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
  },
  tag: {
    info: {
      title: 'Tag 标签',
      name: 'tag',
      path: 'Tag',
    },
    conf: [
      {
        name: 'bg',
        className: tagClass('_'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '默认背景色',
      },
      {
        name: 'successBg',
        className: tagClass('success'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'success类型背景色',
      },
      {
        name: 'infoBg',
        className: tagClass('info'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'info类型背景色',
      },
      {
        name: 'warningBg',
        className: tagClass('warning'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'warning类型背景色',
      },
      {
        name: 'dangerBg',
        className: tagClass('danger'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'danger类型背景色',
      },
      {
        name: 'color',
        className: tagClass('_'),
        attr: 'color',
        type: 'color',
        desc: '默认文字颜色',
      },
      {
        name: 'successColor',
        className: tagClass('success'),
        attr: 'color',
        type: 'color',
        desc: 'success类型文字颜色',
      },
      {
        name: 'infoColor',
        className: tagClass('info'),
        attr: 'color',
        type: 'color',
        desc: 'info类型文字颜色',
      },
      {
        name: 'warningColor',
        className: tagClass('warning'),
        attr: 'color',
        type: 'color',
        desc: 'warning类型文字颜色',
      },
      {
        name: 'dangerColor',
        className: tagClass('danger'),
        attr: 'color',
        type: 'color',
        desc: 'danger类型文字颜色',
      },
      {
        name: 'borderColor',
        className: tagClass('default'),
        attr: 'borderColor',
        type: 'color',
        desc: '边框颜色',
      },
      {
        name: 'closeColor',
        className: exposeClass('tag-close'),
        attr: 'color',
        type: 'color',
        desc: '关闭按钮颜色',
      },
      {
        name: 'closeHoverColor',
        className: exposeClass('tag-close-hover'),
        attr: 'color',
        type: 'color',
        desc: '关闭按钮鼠标悬浮时颜色',
      },
      {
        name: 'borderRadius',
        className: tagClass('_'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        desc: '圆角',
      },
      {
        name: 'paddingHorizontal',
        className: tagClass('_'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        desc: '水平内边距',
      },
      {
        name: 'paddingVertical',
        className: tagClass('_'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        desc: '垂直内边距',
      },
      {
        name: 'fontWeight',
        className: tagClass('_'),
        attr: 'fontWeight',
        type: 'number',
        parser: parseInt,
        min: 100,
        max: 900,
        desc: '字重',
      },
    ],
    set bg(v) {
      setBodyProperty(
        {
          '--tag-bg': v,
        },
        v
      )
    },
    set successBg(v) {
      setBodyProperty({ '--tag-success-bg': v }, v)
    },
    set infoBg(v) {
      setBodyProperty({ '--tag-info-bg': v }, v)
    },
    set warningBg(v) {
      setBodyProperty({ '--tag-warning-bg': v }, v)
    },
    set dangerBg(v) {
      setBodyProperty({ '--tag-danger-bg': v }, v)
    },
    set color(v) {
      setBodyProperty(
        {
          '--tag-color': v,
        },
        v
      )
    },
    set successColor(v) {
      setBodyProperty({ '--tag-success-color': v }, v)
    },
    set infoColor(v) {
      setBodyProperty({ '--tag-info-color': v }, v)
    },
    set warningColor(v) {
      setBodyProperty({ '--tag-warning-color': v }, v)
    },
    set dangerColor(v) {
      setBodyProperty({ '--tag-danger-color': v }, v)
    },
    set closeColor(v) {
      setBodyProperty(
        {
          '--tag-close-color': v,
        },
        v
      )
    },
    set closeHoverColor(v) {
      setBodyProperty(
        {
          '--tag-close-hover-color': v,
        },
        v
      )
    },
    set borderColor(v) {
      setBodyProperty(
        {
          '--tag-border-color': v,
        },
        v
      )
    },
    set borderRadius(v) {
      setBodyProperty(
        {
          '--tag-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingHorizontal(v) {
      setBodyProperty(
        {
          '--tag-padding-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingVertical(v) {
      setBodyProperty(
        {
          '--tag-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set fontWeight(v) {
      setBodyProperty(
        {
          '--tag-font-weight': v,
        },
        v
      )
    },
  },
  tooltip: {
    info: {
      title: 'Tooltip 提示',
      name: 'tooltip',
      path: 'Tooltip',
    },
    conf: [
      {
        name: 'bg',
        className: tooltipClass('inner'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '背景色',
      },
      {
        name: 'paddingHorizontal',
        className: tooltipClass('inner'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        desc: '水平内边距',
      },
      {
        name: 'paddingVertical',
        className: tooltipClass('inner'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        desc: '垂直内边距',
      },
    ],
    set bg(v) {
      setBodyProperty(
        {
          '--tooltip-bg': v,
        },
        v
      )
    },
    set paddingHorizontal(v) {
      setBodyProperty(
        {
          '--tooltip-padding-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingVertical(v) {
      setBodyProperty(
        {
          '--tooltip-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
  },
  menu: {
    info: {
      title: 'Menu 菜单',
      name: 'menu',
      path: 'Menu',
    },
    conf: [
      {
        name: 'height',
        className: menuClass('title'),
        attr: 'height',
        type: 'number',
        parser: parseInt,
        desc: '条目高度',
      },
      {
        name: 'fontSize',
        className: menuClass('title'),
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        desc: '字体大小',
      },
      {
        name: 'darkColor',
        className: exposeClass('menu-dark'),
        attr: 'color',
        type: 'color',
        desc: '黑色主题文字颜色',
      },
      {
        name: 'darkBg',
        className: exposeClass('menu-dark'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '黑色主题背景色',
      },
      {
        name: 'darkRootNodeBg',
        className: exposeClass('menu-dark-root'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '黑色主题 Root Node 背景色',
      },
      {
        name: 'darkChildrenSegmentation',
        className: exposeClass('menu-dark-seg'),
        attr: 'borderTopColor',
        type: 'color',
        desc: '黑色主题子菜单与Root Menu 分割线背景色',
      },
      {
        name: 'darkActiveBg',
        className: exposeClass('menu-dark-active'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '黑色主题选中项背景色',
      },
      {
        name: 'activeBg',
        className: exposeClass('menu-active'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '选中项背景色',
      },
      {
        name: 'activeColor',
        className: exposeClass('menu-active'),
        attr: 'color',
        type: 'color',
        desc: '选中项文字颜色',
      },
      {
        name: 'color',
        className: exposeClass('menu-text'),
        attr: 'color',
        type: 'color',
        desc: '文字颜色',
      },
      {
        name: 'activePaddingHorizontal',
        className: exposeClass('menu-active-horizontal'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        desc: '选中项水平内边距',
      },
      {
        name: 'activePaddingVertical',
        className: exposeClass('menu-active-vertical'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        desc: '选中项垂直内边距',
      },
      {
        name: 'activeBorderRadius',
        className: exposeClass('menu-acitive-borderRadius'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        desc: '选中项圆角',
      },
      {
        name: 'itemHoverColor',
        className: exposeClass('menu-light-hover'),
        attr: 'color',
        type: 'color',
        desc: 'hover状态下文字颜色',
      },
      {
        name: 'itemHoverDarkColor',
        className: exposeClass('menu-dark-hover'),
        attr: 'color',
        type: 'color',
        desc: '暗黑主题 hover状态下文字颜色',
      },
      {
        name: 'itemHoverBgc',
        className: exposeClass('menu-light-hover'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'hover状态下背景颜色',
      },
      {
        name: 'itemHoverDarkBgc',
        className: exposeClass('menu-dark-hover'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '暗黑主题 hover状态下背景颜色',
      },
      {
        name: 'activeBar',
        className: exposeClass('menu-bar'),
        attr: 'width',
        type: 'number',
        parser: parseInt,
        desc: 'active 状态下 bar 宽度',
      },
      {
        name: 'activeBarColor',
        className: exposeClass('menu-bar'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'active bar 颜色',
      },
      {
        name: 'darkActiveBarColor',
        className: exposeClass('menu-dark-bar'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '暗黑模式下 active bar 颜色',
      },
      {
        name: 'verticalDarkRootActiveBgc',
        className: exposeClass('menu-dark-vertical'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '垂直样式 dark 主题：子节点选中下，parent 节点背景颜色',
      },
      {
        name: 'hasChildrenActiveBgc',
        className: exposeClass('menu-dark-vertical-children'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '垂直样式：选中状态，背景颜色',
      },
      {
        name: 'hasChildrenActiveColor',
        className: exposeClass('menu-dark-vertical-children'),
        attr: 'color',
        type: 'color',
        desc: '垂直样式：选中状态，背景颜色',
      },
      {
        name: 'verticalInpathBarWidth',
        className: exposeClass('menu-dark-vertical-bar'),
        attr: 'width',
        type: 'number',
        parser: parseInt,
        desc: '垂直样式：子节点选中下，parent 节点 bar 的宽度',
      },
    ],
    set verticalDarkRootActiveBgc(v) {
      setBodyProperty(
        {
          '--menu-vertical-dark-parent-active-bgc': v,
        },
        v
      )
    },
    set hasChildrenActiveBgc(v) {
      setBodyProperty(
        {
          '--menu-item-has-children-active-bgc': v,
        },
        v
      )
    },
    set hasChildrenActiveColor(v) {
      setBodyProperty(
        {
          '--menu-item-has-children-active-color': v,
        },
        v
      )
    },
    set verticalInpathBarWidth(v) {
      setBodyProperty(
        {
          '--menu-vertical-in-path-bar-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set height(v) {
      const height = parseInt(v, 10)
      setBodyProperty(
        {
          '--menu-item-height': `${height}px`,
        },
        v
      )
    },
    set fontSize(v) {
      setBodyProperty(
        {
          '--menu-item-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set darkBg(v) {
      setBodyProperty(
        {
          '--menu-dark-bg': v,
        },
        v
      )
    },
    set darkActiveBg(v) {
      setBodyProperty(
        {
          '--menu-dark-acitve-bg': v,
        },
        v
      )
    },
    set activeBg(v) {
      setBodyProperty(
        {
          '--menu-item-active-bg': v,
        },
        v
      )
    },
    set activeColor(v) {
      setBodyProperty(
        {
          '--menu-item-active-color': v,
        },
        v
      )
    },
    set color(v) {
      setBodyProperty(
        {
          '--menu-item-color': v,
        },
        v
      )
    },
    set darkColor(v) {
      setBodyProperty(
        {
          '--menu-dark-color': v,
        },
        v
      )
    },
    set darkRootNodeBg(v) {
      setBodyProperty(
        {
          '--menu-root-node-bgc': v,
        },
        v
      )
    },
    set darkChildrenSegmentation(v) {
      setBodyProperty(
        {
          '--menu-children-segmentation': v,
        },
        v
      )
    },
    set activePaddingHorizontal(v) {
      setBodyProperty(
        {
          '--menu-active-padding-horizontal': `${parseInt(v, 10)}px`,
          '--menu-active-padding-horizontal-negative': `-${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set activePaddingVertical(v) {
      setBodyProperty(
        {
          '--menu-active-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set activeBorderRadius(v) {
      setBodyProperty(
        {
          '--menu-active-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set itemHoverColor(v) {
      setBodyProperty(
        {
          '--menu-item-light-hover-color': v,
        },
        v
      )
    },
    set itemHoverDarkColor(v) {
      setBodyProperty(
        {
          '--menu-item-dark-hover-color': v,
        },
        v
      )
    },
    set itemHoverBgc(v) {
      setBodyProperty(
        {
          '--menu-item-light-hover-bgc': v,
        },
        v
      )
    },
    set itemHoverDarkBgc(v) {
      setBodyProperty(
        {
          '--menu-item-dark-hover-bgc': v,
        },
        v
      )
    },
    set activeBar(v) {
      setBodyProperty(
        {
          '--menu-active-bar': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set activeBarColor(v) {
      setBodyProperty(
        {
          '--menu-item-active-indicator': v,
        },
        v
      )
    },
    set darkActiveBarColor(v) {
      setBodyProperty(
        {
          '--menu-dark-item-active-indicator': v,
        },
        v
      )
    },
  },
  alert: {
    info: {
      title: 'Alert 提示框',
      name: 'alert',
      path: 'Alert',
    },
    conf: [
      {
        name: 'fontSize',
        className: alertClass('_'),
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        desc: '文字大小',
      },
      {
        name: 'closeIconColor',
        className: exposeClass('alert-close'),
        attr: 'color',
        type: 'color',
        desc: '关闭按钮颜色',
      },
      {
        name: 'closeIconHoverColor',
        className: exposeClass('alert-close-hover'),
        attr: 'color',
        type: 'color',
        desc: '关闭按钮鼠标悬浮颜色',
      },
      {
        name: 'borderRadius',
        className: alertClass('_'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        desc: '圆角',
      },
      {
        name: 'successBoxShadow',
        className: alertClass('success'),
        attr: 'boxShadow',
        type: 'string',
        desc: 'success 类型阴影',
      },
      {
        name: 'infoBoxShadow',
        className: alertClass('info'),
        attr: 'boxShadow',
        type: 'string',
        desc: 'info 类型阴影',
      },
      {
        name: 'warningBoxShadow',
        className: alertClass('warning'),
        attr: 'boxShadow',
        type: 'string',
        desc: 'warning 类型阴影',
      },
      {
        name: 'dangerBoxShadow',
        className: alertClass('danger'),
        attr: 'boxShadow',
        type: 'string',
        desc: 'danger 类型阴影',
      },
      {
        name: 'borderWidth',
        className: alertClass('_'),
        attr: 'borderWidth',
        type: 'number',
        parser: parseInt,
        desc: '边框宽度',
      },
      {
        name: 'successTextColor',
        className: alertClass('success'),
        attr: 'color',
        type: 'color',
        desc: 'success 类型文字颜色',
      },
      {
        name: 'successBg',
        className: alertClass('success'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'success 类型背景色',
      },
      {
        name: 'successBorderColor',
        className: alertClass('success'),
        attr: 'borderColor',
        type: 'color',
        desc: 'success 类型边框色',
      },
      {
        name: 'infoTextColor',
        className: alertClass('info'),
        attr: 'color',
        type: 'color',
        desc: 'info 类型文字颜色',
      },
      {
        name: 'infoBg',
        className: alertClass('info'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'info 类型背景色',
      },
      {
        name: 'infoBorderColor',
        className: alertClass('info'),
        attr: 'borderColor',
        type: 'color',
        desc: 'info 类型边框色',
      },
      {
        name: 'warningTextColor',
        className: alertClass('warning'),
        attr: 'color',
        type: 'color',
        desc: 'warning 类型文字颜色',
      },
      {
        name: 'warningBg',
        className: alertClass('warning'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'warning 类型背景色',
      },
      {
        name: 'warningBorderColor',
        className: alertClass('warning'),
        attr: 'borderColor',
        type: 'color',
        desc: 'warning 类型边框颜色',
      },
      {
        name: 'dangerTextColor',
        className: alertClass('danger'),
        attr: 'color',
        type: 'color',
        desc: 'danger 类型文字颜色',
      },
      {
        name: 'dangerBg',
        className: alertClass('danger'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'success 类型背景色',
      },
      {
        name: 'dangerBorderColor',
        className: alertClass('danger'),
        attr: 'borderColor',
        type: 'color',
        desc: 'danger 类型边框色',
      },
    ],
    set fontSize(v) {
      setBodyProperty(
        {
          '--alert-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set closeIconColor(v) {
      setBodyProperty(
        {
          '--alert-close-color': v,
        },
        v
      )
    },
    set closeIconHoverColor(v) {
      setBodyProperty(
        {
          '--alert-close-hover-color': v,
        },
        v
      )
    },
    set borderRadius(v) {
      setBodyProperty(
        {
          '--alert-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set boxShadow(v) {
      setBodyProperty(
        {
          '--alert-box-shadow': v,
        },
        v
      )
    },
    set successBoxShadow(v) {
      setBodyProperty(
        {
          '--alert-success-box-shadow': v,
        },
        v
      )
    },
    set infoBoxShadow(v) {
      setBodyProperty(
        {
          '--alert-info-box-shadow': v,
        },
        v
      )
    },
    set dangerBoxShadow(v) {
      setBodyProperty(
        {
          '--alert-danger-box-shadow': v,
        },
        v
      )
    },
    set warningBoxShadow(v) {
      setBodyProperty(
        {
          '--alert-warning-box-shadow': v,
        },
        v
      )
    },
    set borderWidth(v) {
      setBodyProperty(
        {
          '--alert-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set successTextColor(v) {
      setBodyProperty(
        {
          '--alert-success-text-color': v,
          '--alert-success-text-darken-10-color': darken(v, 10),
        },
        v
      )
    },
    set successBg(v) {
      setBodyProperty(
        {
          '--alert-success-bg': v,
        },
        v
      )
    },
    set successBorderColor(v) {
      setBodyProperty(
        {
          '--alert-success-border-color': v,
          '--alert-success-border-darken-5-color': darken(v, 5),
        },
        v
      )
    },
    set infoTextColor(v) {
      setBodyProperty(
        {
          '--alert-info-text-color': v,
          '--alert-info-text-darken-10-color': darken(v, 10),
        },
        v
      )
    },
    set infoBg(v) {
      setBodyProperty(
        {
          '--alert-info-bg': v,
        },
        v
      )
    },
    set infoBorderColor(v) {
      setBodyProperty(
        {
          '--alert-info-border-color': v,
          '--alert-info-border-darken-5-color': darken(v, 5),
        },
        v
      )
    },
    set warningTextColor(v) {
      setBodyProperty(
        {
          '--alert-warning-text-color': v,
          '--alert-warning-text-darken-10-color': darken(v, 10),
        },
        v
      )
    },
    set warningBg(v) {
      setBodyProperty(
        {
          '--alert-warning-bg': v,
        },
        v
      )
    },
    set warningBorderColor(v) {
      setBodyProperty(
        {
          '--alert-warning-border-color': v,
          '--alert-warning-border-darken-5-color': darken(v, 5),
        },
        v
      )
    },
    set dangerTextColor(v) {
      setBodyProperty(
        {
          '--alert-danger-text-color': v,
          '--alert-danger-text-darken-10-color': darken(v, 10),
        },
        v
      )
    },
    set dangerBg(v) {
      setBodyProperty(
        {
          '--alert-danger-bg': v,
        },
        v
      )
    },
    set dangerBorderColor(v) {
      setBodyProperty(
        {
          '--alert-danger-border-color': v,
          '--alert-danger-border-darken-5-color': darken(v, 5),
        },
        v
      )
    },
  },
  message: {
    info: {
      title: 'Message 消息提示',
      name: 'message',
      path: 'Message',
    },
    conf: [
      {
        name: 'boxShadow',
        className: messageClass('msg'),
        attr: 'boxShadow',
        type: 'string',
        desc: '阴影',
      },
      {
        name: 'closeColor',
        className: exposeClass('msg-close'),
        attr: 'color',
        type: 'color',
        desc: '关闭图标颜色',
      },
      {
        name: 'color',
        className: messageClass('msg'),
        attr: 'color',
        type: 'color',
        desc: '文字颜色',
      },
      {
        name: 'fontWeight',
        className: messageClass('msg'),
        attr: 'fontWeight',
        type: 'number',
        parser: parseInt,
        max: 900,
        min: 100,
        desc: '字重',
      },
      {
        name: 'borderColor',
        className: messageClass('msg'),
        attr: 'borderColor',
        type: 'color',
        desc: '边框颜色',
      },
    ],
    set boxShadow(v) {
      setBodyProperty(
        {
          '--message-box-shadow': v,
        },
        v
      )
    },
    set color(v) {
      setBodyProperty(
        {
          '--message-text-color': v,
        },
        v
      )
    },
    set closeColor(v) {
      setBodyProperty(
        {
          '--message-close-color': v,
        },
        v
      )
    },
    set fontWeight(v) {
      setBodyProperty(
        {
          '--message-font-weight': v,
        },
        v
      )
    },
    set borderColor(v) {
      setBodyProperty({ '--message-border-color': v }, v)
    },
  },
  card: {
    info: {
      title: 'Card 卡片',
      name: 'card',
      path: 'Card',
    },
    conf: [
      {
        name: 'fontSize',
        className: cardClass('_'),
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        desc: '文字大小',
      },
      {
        name: 'paddingHeaderHorizontal',
        className: cardClass('header'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        desc: '头部水平内边距',
      },
      {
        name: 'paddingHeaderVertical',
        className: cardClass('header'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        desc: '头部垂直内边距',
      },
      {
        name: 'paddingBodyHorizontal',
        className: cardClass('body'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        desc: '内容部分水平内边距',
      },
      {
        name: 'paddingBodyVertical',
        className: cardClass('body'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        desc: '内容部分垂直内边距',
      },
      {
        name: 'paddingFooterHorizontal',
        className: cardClass('footer'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        desc: '底部水平内边距',
      },
      {
        name: 'paddingFooterVertical',
        className: cardClass('footer'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        desc: '底部垂直内边距',
      },
      {
        name: 'borderRadius',
        className: cardClass('_'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        desc: '圆角',
      },
      {
        name: 'borderWidth',
        className: cardClass('_'),
        attr: 'borderWidth',
        type: 'number',
        parser: parseInt,
        desc: '边框宽度',
      },
      {
        name: 'dividerHeight',
        className: exposeClass('card-divider'),
        attr: 'height',
        type: 'number',
        parser: parseInt,
        desc: '分割线高度',
      },
      {
        name: 'dividerWidth',
        value: '100%',
        attr: 'width',
        type: 'string',
        desc: '分割线宽度',
      },
      {
        name: 'borderColor',
        className: cardClass('_'),
        attr: 'borderColor',
        type: 'color',
        desc: '边框颜色',
      },
      {
        name: 'dividerColor',
        className: exposeClass('card-divider'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '分割线颜色',
      },
      {
        name: 'color',
        className: cardClass('_'),
        attr: 'color',
        type: 'color',
        desc: '内容部分文字颜色',
      },
      {
        name: 'boxShadow',
        className: cardClass('shadow'),
        attr: 'boxShadow',
        type: 'string',
        desc: '阴影',
      },
      {
        name: 'headerBg',
        className: cardClass('header'),
        attr: 'background-color',
        type: 'color',
        desc: '头部背景色',
      },
      {
        name: 'footerBg',
        className: cardClass('footer'),
        attr: 'background-color',
        type: 'color',
        desc: '底部背景色',
      },
      {
        name: 'headerColor',
        className: cardClass('header'),
        attr: 'color',
        type: 'color',
        desc: '头部文字颜色',
      },
      {
        name: 'footerColor',
        className: cardClass('footer'),
        attr: 'color',
        type: 'color',
        desc: '底部文字颜色',
      },
    ],
    set fontSize(v) {
      setBodyProperty(
        {
          '--card-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingHeaderHorizontal(v) {
      setBodyProperty(
        {
          '--panel-header-padding-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingHeaderVertical(v) {
      setBodyProperty(
        {
          '--panel-header-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingBodyHorizontal(v) {
      setBodyProperty(
        {
          '--panel-body-padding-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingBodyVertical(v) {
      setBodyProperty(
        {
          '--panel-body-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingFooterHorizontal(v) {
      setBodyProperty(
        {
          '--panel-footer-padding-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingFooterVertical(v) {
      setBodyProperty(
        {
          '--panel-footer-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderRadius(v) {
      setBodyProperty(
        {
          '--panel-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderWidth(v) {
      setBodyProperty(
        {
          '--card-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set dividerHeight(v) {
      setBodyProperty(
        {
          '--card-divider-height': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set dividerWidth(v) {
      setBodyProperty(
        {
          '--card-divider-width': v,
        },
        v
      )
    },
    set borderColor(v) {
      setBodyProperty(
        {
          '--card-border-color': v,
        },
        v
      )
    },
    set dividerColor(v) {
      setBodyProperty(
        {
          '--card-divider-color': v,
        },
        v
      )
    },
    set color(v) {
      setBodyProperty(
        {
          '--card-color': v,
        },
        v
      )
    },
    set boxShadow(v) {
      setBodyProperty(
        {
          '--card-box-shadow': v,
        },
        v
      )
    },
    set headerBg(v) {
      setBodyProperty(
        {
          '--card-header-bg': v,
        },
        v
      )
    },
    set footerBg(v) {
      setBodyProperty(
        {
          '--card-footer-bg': v,
        },
        v
      )
    },
    set headerColor(v) {
      setBodyProperty(
        {
          '--card-header-color': v,
        },
        v
      )
    },
    set footerColor(v) {
      setBodyProperty(
        {
          '--card-footer-color': v,
        },
        v
      )
    },
  },
  modal: {
    info: {
      title: 'Modal 对话框',
      name: 'modal',
      path: 'Modal',
    },
    conf: [
      {
        name: 'titleFontFamily',
        className: modalClass('title'),
        attr: 'fontFamily',
        type: 'string',
        desc: '标题字体',
      },
      {
        name: 'fontSize',
        className: exposeClass('modal-card'),
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        desc: '文字大小',
      },
      {
        name: 'iconSize',
        className: exposeClass('modal-icon'),
        attr: 'width',
        type: 'number',
        parser: parseInt,
        desc: '类型图标尺寸',
      },
      {
        name: 'iconTop',
        className: exposeClass('modal-icon'),
        attr: 'marginTop',
        type: 'number',
        parser: parseInt,
        desc: '类型图标距离顶部距离',
      },
      {
        name: 'iconLeft',
        className: exposeClass('modal-icon'),
        attr: 'marginLeft',
        type: 'number',
        parser: parseInt,
        desc: '类型图标距离左侧距离',
      },
      {
        name: 'closeIconColor',
        className: exposeClass('modal-close'),
        attr: 'color',
        type: 'color',
        desc: '关闭按钮颜色',
      },
      {
        name: 'closeIconHoverColor',
        className: exposeClass('modal-close-hover'),
        attr: 'color',
        type: 'color',
        desc: '关闭按钮鼠标悬浮颜色',
      },
      {
        name: 'closeIconTopMargin',
        className: exposeClass('modal-close'),
        attr: 'marginTop',
        type: 'number',
        parser: parseInt,
        desc: '关闭按钮顶部间距',
      },
      {
        name: 'closeIconRightMargin',
        className: exposeClass('modal-close'),
        attr: 'marginRight',
        type: 'number',
        parser: parseInt,
        desc: '关闭按钮右侧间距',
      },
      {
        name: 'titleFontSize',
        className: modalClass('title'),
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        desc: '标题字体大小',
      },
      {
        name: 'padding',
        className: modalClass('panel'),
        attr: 'padding',
        type: 'string',
        desc: '整体内边距',
      },
      {
        name: 'headerPaddingTop',
        className: exposeClass('modal-card-header'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        desc: '头部内边距-Top',
      },
      {
        name: 'headerPaddingRight',
        className: exposeClass('modal-card-header'),
        attr: 'paddingRight',
        type: 'number',
        parser: parseInt,
        desc: '头部内边距-Right',
      },
      {
        name: 'headerPaddingBottom',
        className: exposeClass('modal-card-header'),
        attr: 'paddingBottom',
        type: 'number',
        parser: parseInt,
        desc: '头部内边距-Bottom',
      },
      {
        name: 'headerPaddingLeft',
        className: exposeClass('modal-card-header'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        desc: '头部内边距-Left',
      },
      {
        name: 'bodyPaddingTop',
        className: exposeClass('modal-card-body'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        desc: '内容内边距-Top',
      },
      {
        name: 'bodyPaddingRight',
        className: exposeClass('modal-card-body'),
        attr: 'paddingRight',
        type: 'number',
        parser: parseInt,
        desc: '内容内边距-Right',
      },
      {
        name: 'bodyPaddingBottom',
        className: exposeClass('modal-card-body'),
        attr: 'paddingBottom',
        type: 'number',
        parser: parseInt,
        desc: '内容内边距-Bottom',
      },
      {
        name: 'bodyPaddingLeft',
        className: exposeClass('modal-card-body'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        desc: '内容内边距-Left',
      },
      {
        name: 'iconBodyPaddingTop',
        className: exposeClass('modal-icon-body'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        desc: '带有 Icon 的对话框内容 Top 内边距',
      },
      {
        name: 'iconBodyPaddingRight',
        className: exposeClass('modal-icon-body'),
        attr: 'paddingRight',
        type: 'number',
        parser: parseInt,
        desc: '带有 Icon 的对话框内容 Right 内边距',
      },
      {
        name: 'iconBodyPaddingBottom',
        className: exposeClass('modal-icon-body'),
        attr: 'paddingBottom',
        type: 'number',
        parser: parseInt,
        desc: '带有 Icon 的对话框内容 Bottom 内边距',
      },
      {
        name: 'iconBodyPaddingLeft',
        className: exposeClass('modal-icon-body'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        desc: '带有 Icon 的对话框内容 Left 内边距',
      },
      {
        name: 'footerPadding',
        className: exposeClass('modal-card-footer'),
        attr: 'padding',
        type: 'string',
        desc: '底部内边距',
      },
      {
        name: 'borderRadius',
        className: exposeClass('modal-card'),
        attr: 'borderTopLeftRadius',
        type: 'number',
        parser: parseInt,
        desc: '圆角',
      },
      {
        name: 'borderWidth',
        className: exposeClass('modal-card'),
        attr: 'borderWidth',
        type: 'number',
        parser: parseInt,
        desc: '边框宽度',
      },
      {
        name: 'dividerHeight',
        className: exposeClass('modal-divider'),
        attr: 'height',
        type: 'number',
        parser: parseInt,
        desc: '分割线高度',
      },
      {
        name: 'dividerWidth',
        value: '100%',
        attr: 'width',
        type: 'string',
        desc: '分割线宽度',
      },
      {
        name: 'borderColor',
        className: exposeClass('modal-card'),
        attr: 'borderColor',
        type: 'color',
        desc: '边框颜色',
      },
      {
        name: 'dividerColor',
        className: exposeClass('modal-divider'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '分割线颜色',
      },
      {
        name: 'color',
        className: exposeClass('modal-card'),
        attr: 'color',
        type: 'color',
        desc: '内容部分文字颜色',
      },
      {
        name: 'titleColor',
        className: modalClass('title'),
        attr: 'color',
        type: 'color',
        desc: '标题文字颜色',
      },
      {
        name: 'footerColor',
        className: modalClass('modal-card-footer'),
        attr: 'color',
        type: 'color',
        desc: '底部文字颜色',
      },
      {
        name: 'headerBg',
        className: exposeClass('modal-card-header'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '头部背景色',
      },
      {
        name: 'footerBg',
        className: exposeClass('modal-card-footer'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '底部背景色',
      },
      {
        name: 'boxShadow',
        className: exposeClass('modal-card'),
        attr: 'boxShadow',
        type: 'string',
        desc: '阴影',
      },
    ],
    set titleFontFamily(v) {
      setBodyProperty({ '--modal-title-font': v }, v)
    },
    set fontSize(v) {
      setBodyProperty(
        {
          '--modal-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconSize(v) {
      setBodyProperty(
        {
          '--modal-icon-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconLeft(v) {
      setBodyProperty(
        {
          '--modal-icon-left': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconTop(v) {
      setBodyProperty(
        {
          '--modal-icon-top': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set closeIconColor(v) {
      setBodyProperty(
        {
          '--modal-close-icon-color': v,
        },
        v
      )
    },
    set closeIconHoverColor(v) {
      setBodyProperty(
        {
          '--modal-close-icon-hover-color': v,
        },
        v
      )
    },
    set closeIconTopMargin(v) {
      setBodyProperty(
        {
          '--modal-close-top-margin': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set closeIconRightMargin(v) {
      setBodyProperty(
        {
          '--modal-close-right-margin': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set titleFontSize(v) {
      setBodyProperty(
        {
          '--modal-title-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set titleColor(v) {
      setBodyProperty(
        {
          '--modal-title-color': v,
        },
        v
      )
    },
    set padding(v) {
      setBodyProperty(
        {
          '--modal-panel-padding': v,
        },
        v
      )
    },
    set headerPaddingTop(v) {
      setBodyProperty(
        {
          '--modal-header-padding-top': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set headerPaddingRight(v) {
      setBodyProperty(
        {
          '--modal-header-padding-right': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set headerPaddingBottom(v) {
      setBodyProperty(
        {
          '--modal-header-padding-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set headerPaddingLeft(v) {
      setBodyProperty(
        {
          '--modal-header-padding-left': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set bodyPaddingTop(v) {
      setBodyProperty(
        {
          '--modal-body-padding-top': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set bodyPaddingRight(v) {
      setBodyProperty(
        {
          '--modal-body-padding-right': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set bodyPaddingBottom(v) {
      setBodyProperty(
        {
          '--modal-body-padding-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set bodyPaddingLeft(v) {
      setBodyProperty(
        {
          '--modal-body-padding-left': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconBodyPaddingTop(v) {
      setBodyProperty(
        {
          '--modal-icon-body-padding-top': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconBodyPaddingRight(v) {
      setBodyProperty(
        {
          '--modal-icon-body-padding-right': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconBodyPaddingBottom(v) {
      setBodyProperty(
        {
          '--modal-icon-body-padding-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconBodyPaddingLeft(v) {
      setBodyProperty(
        {
          '--modal-icon-body-padding-left': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set footerPadding(v) {
      setBodyProperty(
        {
          '--modal-footer-padding': v,
        },
        v
      )
    },
    set borderRadius(v) {
      setBodyProperty(
        {
          '--modal-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderWidth(v) {
      setBodyProperty(
        {
          '--modal-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set dividerHeight(v) {
      setBodyProperty(
        {
          '--modal-divider-height': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set dividerWidth(v) {
      setBodyProperty(
        {
          '--modal-divider-width': v,
        },
        v
      )
    },
    set borderColor(v) {
      setBodyProperty(
        {
          '--modal-border-color': v,
        },
        v
      )
    },
    set dividerColor(v) {
      setBodyProperty(
        {
          '--modal-divider-color': v,
        },
        v
      )
    },
    set color(v) {
      setBodyProperty(
        {
          '--modal-color': v,
        },
        v
      )
    },
    set headerBg(v) {
      setBodyProperty(
        {
          '--modal-header-bg': v,
        },
        v
      )
    },
    set footerBg(v) {
      setBodyProperty(
        {
          '--modal-footer-bg': v,
        },
        v
      )
    },
    set boxShadow(v) {
      setBodyProperty(
        {
          '--modal-box-shadow': v,
        },
        v
      )
    },
  },
  popover: {
    info: {
      title: 'Popover 气泡',
      name: 'popover',
      path: 'Popover',
    },
    conf: [
      {
        name: 'borderColor',
        className: popoverClass('_'),
        attr: 'borderColor',
        type: 'color',
        desc: '边框颜色',
      },
      {
        name: 'borderWidth',
        className: popoverClass('_'),
        attr: 'borderWidth',
        type: 'number',
        parser: parseInt,
        desc: '边框宽度',
      },
      {
        name: 'boxShadow',
        className: popoverClass('_'),
        attr: 'boxShadow',
        type: 'string',
        desc: '阴影',
      },
      {
        name: 'borderRadius',
        className: popoverClass('_'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        desc: '圆角',
      },
      {
        name: 'textMaxWidth',
        className: popoverClass('text'),
        attr: 'maxWidth',
        type: 'string',
        desc: '纯文字时的最大宽度',
      },
      {
        name: 'fontSize',
        className: popoverClass('_'),
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        desc: '字体大小',
      },
    ],
    set borderColor(v) {
      setBodyProperty(
        {
          '--popover-border-color': v,
        },
        v
      )
    },
    set borderWidth(v) {
      setBodyProperty(
        {
          '--popover-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set boxShadow(v) {
      setBodyProperty(
        {
          '--popover-box-shadow': v,
        },
        v
      )
    },
    set borderRadius(v) {
      setBodyProperty(
        {
          '--popover-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set textMaxWidth(v) {
      setBodyProperty(
        {
          '--popover-text-max-width': v,
        },
        v
      )
    },
    set fontSize(v) {
      setBodyProperty(
        {
          '--popover-text-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
  },
  tree: {
    info: {
      title: 'Tree 树型选择',
      name: 'tree',
      path: 'Tree',
    },
    conf: [
      {
        name: 'treeIndicatorColor',
        className: exposeClass('tree-default-icon'),
        attr: 'borderLeftColor',
        type: 'color',
        desc: '三角/+-颜色',
      },
      {
        name: 'levelIndent',
        className: exposeClass('tree-indent'),
        attr: 'width',
        type: 'number',
        parser: parseInt,
        min: -100,
        desc: '项目缩进',
      },
      {
        name: 'nodeMarginBottom',
        className: exposeClass('tree-node'),
        attr: 'marginBottom',
        type: 'number',
        parser: parseInt,
        desc: '项目垂直间隔',
      },
    ],
    set levelIndent(v) {
      setBodyProperty(
        {
          '--tree-level-indent': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set nodeMarginBottom(v) {
      setBodyProperty(
        {
          '--tree-node-margin-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set treeIndicatorColor(v) {
      setBodyProperty(
        {
          '--tree-indicator-color': v,
        },
        v
      )
    },
  },
  switch: {
    info: {
      title: 'Switch 开关选择器',
      name: 'switch',
      path: 'Switch',
    },
    conf: [
      {
        name: 'uncheckBg',
        className: checkinputClass('switch'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '关闭状态背景色',
      },
      {
        name: 'type',
        className: exposeClass('switch-type'),
        attr: 'animationName',
        type: ['outter', 'inner'],
        desc: '类型',
      },
    ],
    set type(v) {
      const o = {}
      if (v === 'outter') {
        o['--switch-indicator-padding-horizontal'] = `0px`
        o['--switch-indicator-padding-horizontal-negative'] = `0px`
        o['--switch-indicator-size'] = `24px`
        o['--switch-bg-height'] = `16px`
        o['--switch-indicator-top'] = `-4px`
        o['--switch-small-indicator-size'] = `16px`
        o['--switch-small-bg-height'] = `10px`
        o['--switch-large-bg-height'] = `22px`
        o['--switch-large-indicator-top'] = `-5px`
        o['--switch-small-indicator-top'] = `-3px`
        o['--switch-large-indicator-size'] = `32px`
      } else if (v === 'inner') {
        o['--switch-indicator-checked-bg'] = `#fff`
        o['--switch-indicator-padding-horizontal'] = `2px`
        o['--switch-indicator-padding-horizontal-negative'] = `-2px`
        o['--switch-indicator-size'] = `18px`
        o['--switch-bg-height'] = `22px`
        o['--switch-indicator-top'] = `2px`
        o['--switch-small-indicator-size'] = `12px`
        o['--switch-small-bg-height'] = `16px`
        o['--switch-large-bg-height'] = `28px`
        o['--switch-large-indicator-top'] = `2px`
        o['--switch-small-indicator-top'] = `2px`
        o['--switch-large-indicator-size'] = `24px`
      }
      setBodyProperty(o, v)
    },
    set uncheckBg(v) {
      setBodyProperty(
        {
          '--switch-unchecked-bg': v,
        },
        v
      )
    },
  },
  tabs: {
    info: {
      title: 'Tabs 标签',
      name: 'tabs',
      path: 'Tabs',
    },
    conf: [
      {
        name: 'tabSpacing',
        className: exposeClass('tabs'),
        attr: 'marginLeft',
        type: 'number',
        min: -10,
        parser: parseInt,
        desc: 'tab间隔',
      },
    ],
    set tabSpacing(v) {
      setBodyProperty(
        {
          '--tabs-tab-spacing': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
  },
  cascader: {
    info: {
      title: 'Cascader 级联选择器',
      name: 'cascader',
      path: 'Cascader',
    },
    conf: [
      {
        name: 'activeBgc',
        className: exposeClass('cascader-active'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '选中背景颜色',
      },
      {
        name: 'activeColor',
        className: exposeClass('cascader-active'),
        attr: 'color',
        type: 'color',
        desc: '选中字体颜色',
      },
    ],
    set activeBgc(v) {
      setBodyProperty(
        {
          '--cascader-active-background-color': v,
        },
        v
      )
    },
    set activeColor(v) {
      setBodyProperty(
        {
          '--cascader-active-color': v,
        },
        v
      )
    },
  },
  list: {
    info: {
      title: 'List 列表',
      name: 'list',
      path: 'List',
    },
    conf: [
      {
        name: 'itemBottomBorderWidth',
        className: exposeClass('list-item'),
        attr: 'width',
        type: 'number',
        parser: parseInt,
        desc: '分割线粗细',
      },
      {
        name: 'itemHoverBgc',
        className: exposeClass('list-item'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '行hover时背景颜色',
      },
    ],
    set itemBottomBorderWidth(v) {
      setBodyProperty(
        {
          '--list-item-bottom-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set itemHoverBgc(v) {
      setBodyProperty(
        {
          '--list-item-hover-bgc': v,
        },
        v
      )
    },
  },
  progress: {
    info: {
      title: 'Progress',
      name: 'progress',
      path: 'Progress',
    },
    conf: [
      {
        name: 'progressBgc',
        className: exposeClass('progress'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'Progress默认背景颜色',
      },
    ],
    set progressBgc(v) {
      setBodyProperty(
        {
          '--progress-bgc': v,
        },
        v
      )
    },
  },
  common: {
    info: {
      title: 'Common 公共',
      name: 'common',
      path: 'Button',
    },
    conf: [
      {
        name: 'fontSize',
        className: exposeClass('common-base'),
        attr: 'fontSize',
        parser: parseInt,
        type: 'number',
        desc: '字体大小',
      },
      {
        name: 'fontFamily',
        className: buttonClass('_'),
        attr: 'fontFamily',
        type: 'string',
        desc: '字体',
      },
      {
        name: 'lineHeight',
        value: 1.428571429,
        type: 'string',
        desc: '行高',
      },
      {
        name: 'contentBlockPadding',
        className: '',
        attr: 'padding',
        type: 'string',
        desc: '区块内边距',
      },
      {
        name: 'contentTextPadding',
        className: popoverClass('text'),
        attr: 'padding',
        type: 'string',
        desc: '文字内边距',
      },
      {
        name: 'spinDefaultName',
        className: exposeClass('common-spin-default'),
        attr: 'animationName',
        type: [
          'default',
          'chasing-dots',
          'cube-grid',
          'double-bounce',
          'fading-circle',
          'four-dots',
          'plane',
          'pulse',
          'ring',
          'scale-circle',
          'three-bounce',
          'wave',
        ],
        desc: '默认加载中样式',
      },
      {
        name: 'caret',
        className: exposeClass('common-caret'),
        attr: 'animationName',
        type: ['line', 'fill'],
        desc: '下拉箭头风格',
      },
      {
        name: 'inputDelay',
        className: exposeClass('common-input-delay'),
        attr: 'width',
        type: 'number',
        parser: parseInt,
        min: 0,
        max: 2000,
        desc: '输入延迟，Input, Textarea, EditableArea',
      },
      {
        name: 'inputTrim',
        className: exposeClass('common-input-trim'),
        attr: 'opacity',
        type: 'number',
        parser: parseInt,
        min: 0,
        max: 1,
        desc: '输入过滤两侧空格，Input, Textarea, EditableArea work. 0 or 1',
      },
    ],
    set fontSize(v) {
      const base = parseInt(v, 10)
      setBodyProperty(
        {
          '--font-size-base': `${base}px`,
          '--font-size-base-26': `${Math.floor(base * 2.6)}px`,
          '--font-size-base-215': `${Math.floor(base * 2.15)}px`,
          '--font-size-base-17': `${Math.floor(base * 1.7)}px`,
          '--font-size-base-125': `${Math.floor(base * 1.25)}px`,
          '--font-size-base-085': `${Math.floor(base * 0.85)}px`,
          '--font-size-base-15': `${Math.floor(base * 1.5)}px`,
          '--font-size-base-45': `${Math.floor(base * 4.5)}px`,
          '--font-size-large': `${Math.ceil(base * 1.25)}px`,
          '--font-size-small': `${Math.ceil(base * 0.85)}px`,
          '--font-size-large-medium': `${base + 2}px`,
        },
        v
      )
    },
    set fontFamily(v) {
      setBodyProperty(
        {
          '--common-body-font-family': v,
        },
        v
      )
    },
    set lineHeight(v) {
      setBodyProperty(
        {
          '--common-line-height': v,
        },
        v
      )
    },
    set contentBlockPadding(v) {
      setBodyProperty(
        {
          '--common-content-block-padding': v,
        },
        v
      )
    },
    set contentTextPadding(v) {
      setBodyProperty(
        {
          '--common-content-text-padding': v,
        },
        v
      )
    },
    set caret(v) {
      configSet('caret', v)
      setBodyProperty(
        {
          '--common-caret-style': v,
        },
        v
      )
    },
    set inputDelay(v) {
      configSet('delay', v)
      setBodyProperty(
        {
          '--common-input-delay': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set inputTrim(v) {
      configSet('trim', !!v)
      setBodyProperty(
        {
          '--common-input-trim': parseInt(v, 10),
        },
        v
      )
    },
    set spinDefaultName(v) {
      configSet('spin', v)
      setBodyProperty(
        {
          '--common-spin-default-name': v,
        },
        v
      )
    },
  },
}

export default injects
