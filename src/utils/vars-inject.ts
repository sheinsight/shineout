import { darken, fade } from './color'
import { set as configSet } from '../config'
import { entries } from './objects'

import { paginationClass } from '../Pagination/styles'
import { checkinputClass } from '../Checkbox/styles'
import { buttonClass } from '../Button/styles'
import { selectClass } from '../Select/styles'
import { formClass } from '../Form/styles'
import { menuClass } from '../Menu/styles'
import { alertClass } from '../Alert/styles'
import { messageClass } from '../Message/styles'
import { modalClass } from '../Modal/styles'
import { popoverClass } from '../Popover/styles'
import { datepickerClass } from '../DatePicker/styles'
import { dropdownClass } from '../Dropdown/styles'
import { inputClass } from '../Input/styles'
import { cardClass } from '../Card/styles'
import { tooltipClass } from '../Tooltip/styles'
import { sliderClass } from '../Slider/styles'
import { tagClass } from '../Tag/styles'
import { exposeClass } from '../styles/expose'
import { CartType } from '../icons/Props'

const computedCache: { [x: string]: any } = {}
let injectType = 'body'
let styleObj: { [x: string]: any } = {}

export function getInjectType() {
  return injectType
}

export function setInjectType(type: string) {
  injectType = type
}

export function cleanStyleObj() {
  styleObj = {}
}

export function injectTag(custom = {}) {
  const id = '__shineoutThemeStyleContainer__'
  const styleText = `body{${Object.keys({ ...styleObj, ...custom })
    .map(key => `${key}: ${styleObj[key]}`)
    .join(';')}}`
  const el = document.getElementById(id)
  if (el) {
    el.innerText = styleText
  } else {
    const stylee = document.createElement('style')
    stylee.setAttribute('type', 'text/css')
    stylee.setAttribute('id', id)
    stylee.innerText = styleText
    document.head.appendChild(stylee)
  }
}

function getProperty(name = '--btn-hover-darken', cache = true) {
  if (cache && computedCache[name]) return computedCache[name]
  computedCache[name] = getComputedStyle(document.body)
    .getPropertyValue(name)
    .trim()
  return computedCache[name]
}

function setBodyProperty(colors: { [x: string]: any }, value?: string | number) {
  for (const [cssVar, cssValue] of entries(colors)) {
    if (injectType === 'body') {
      if (value === undefined) {
        document.body.style.removeProperty(cssVar)
      } else {
        document.body.style.setProperty(cssVar, cssValue)
      }
    }
    if (injectType === 'tag') {
      if (value === undefined) {
        delete styleObj[cssVar]
      } else {
        styleObj[cssVar] = cssValue
      }
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
    set primary(v: string) {
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
          '--primary-color-fade-5': fade(v, 0.05),
          '--primary-color-fade-0': fade(v, 0),
          '--primary-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
          '--primary-color-dark-5_fade-0': fade(darken(v, 5), 0),
        },
        v
      )
    },
    set infoColor(v: string) {
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
    set warning(v: string) {
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
    set danger(v: string) {
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
    set success(v: string) {
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
    set secondary(v: string) {
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
    set gray100(v: string) {
      setBodyProperty(
        {
          '--gray-100': v,
        },
        v
      )
    },
    set gray200(v: string) {
      setBodyProperty(
        {
          '--gray-200': v,
          '--gray-200-darken-5': darken(v, 5),
        },
        v
      )
    },
    set gray300(v: string) {
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
    set gray400(v: string) {
      setBodyProperty(
        {
          '--gray-400': v,
          '--gray-400-darken-20': darken(v, 20),
        },
        v
      )
    },
    set gray500(v: string) {
      setBodyProperty(
        {
          '--gray-500': v,
        },
        v
      )
    },
    set gray600(v: string) {
      setBodyProperty(
        {
          '--gray-600': v,
          '--gray-600-lighten-15': darken(v, -15),
        },
        v
      )
    },
    set gray700(v: string) {
      setBodyProperty(
        {
          '--gray-700': v,
        },
        v
      )
    },
    set gray800(v: string) {
      setBodyProperty(
        {
          '--gray-800': v,
          '--gray-800-darken-5': darken(v, 5),
        },
        v
      )
    },
    set gray900(v: string) {
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
        name: 'fontSizeLarge',
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        className: buttonClass('large'),
        desc: '大按钮字体大小',
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
        className: buttonClass('spin-ltr'),
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
      {
        name: 'buttonDefaultBorderColor',
        attr: 'borderColor',
        type: 'color',
        className: buttonClass('default'),
        desc: '默认样式下边框颜色',
      },
    ],
    set fontSizeBase(v: string) {
      setBodyProperty(
        {
          '--button-font-size-base': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set fontSizeLarge(v: string) {
      setBodyProperty(
        {
          '--button-font-size-large': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set fontSizeSmall(v: string) {
      setBodyProperty(
        {
          '--button-font-size-small': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set spinMargin(v: string) {
      setBodyProperty(
        {
          '--button-spin-margin': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set marginLeft(v: string) {
      setBodyProperty(
        {
          '--button-margin-left': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderRadius(v: string) {
      setBodyProperty(
        {
          '--button-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set smallBorderRadius(v: string) {
      setBodyProperty(
        {
          '--button-small-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set largeBorderRadius(v: string) {
      setBodyProperty(
        {
          '--button-large-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingBaseHorizontal(v: string) {
      setBodyProperty(
        {
          '--button-padding-base-horizontal': `${parseInt(v, 10)}px`,
          '--button-padding-base-horizontal-7': `${parseInt(v, 10) * 0.7}px`,
        },
        v
      )
    },
    set paddingLargeHorizontal(v: string) {
      setBodyProperty(
        {
          '--button-padding-large-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingSmallHorizontal(v: string) {
      setBodyProperty(
        {
          '--button-padding-small-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingBaseVertical(v: string) {
      setBodyProperty(
        {
          '--button-padding-base-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingLargeVertical(v: string) {
      setBodyProperty(
        {
          '--button-padding-large-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingSmallVertical(v: string) {
      setBodyProperty(
        {
          '--button-padding-small-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set disabledBg(v: string) {
      setBodyProperty(
        {
          '--button-disabled-bg': v,
        },
        v
      )
    },
    set disabledColor(v: string) {
      setBodyProperty(
        {
          '--button-disabled-color': v,
        },
        v
      )
    },
    set disabledBorderColor(v: string) {
      setBodyProperty(
        {
          '--button-disabled-border-color': v,
        },
        v
      )
    },
    set disabledDelimiter(v: string) {
      setBodyProperty(
        {
          '--button-disabled-delimiter': v,
        },
        v
      )
    },
    set buttonDefaultTextColor(v: string) {
      setBodyProperty(
        {
          '--button-default-text-color': v,
        },
        v
      )
    },
    set buttonDefaultBorderColor(v: string) {
      setBodyProperty(
        {
          '--button-default-border': v,
          '--button-default-border-fade-0': fade(v, 0),
          '--button-default-border-fade-60': fade(v, 0.6),
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
    set borderWidth(v: string) {
      setBodyProperty(
        {
          '--dropdown-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set columnsPadding(v: string) {
      setBodyProperty(
        {
          '--dropdown-columns-padding': v,
        },
        v
      )
    },
    set optionsHoverBgc(v: string) {
      setBodyProperty(
        {
          '--dropdown-options-hover-bgc': v,
        },
        v
      )
    },
    set optionsHoverColor(v: string) {
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
      {
        name: 'formErrorLineHeight',
        className: exposeClass('form-error'),
        attr: 'lineHeight',
        type: 'number',
        parser: parseFloat,
        desc: '校验错误文字行高',
      },
      {
        name: 'formErrorMarginTop',
        className: exposeClass('form-error'),
        attr: 'marginTop',
        type: 'number',
        parser: parseInt,
        desc: '校验错误文字顶部间距',
      },
      {
        name: 'formErrorMarginBottom',
        className: exposeClass('form-error'),
        attr: 'marginBottom',
        type: 'number',
        parser: parseInt,
        desc: '校验错误文字底部间距',
      },
      {
        name: 'formKeepErrorHeight',
        className: exposeClass('form-keep-error'),
        attr: 'min-height',
        type: 'number',
        parser: parseInt,
        desc: '错误提示不撑开表单高度时的最小间距',
      },
    ],
    set itemMarginBottom(v: string) {
      setBodyProperty(
        {
          '--form-item-margin-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set itemMarginRight(v: string) {
      setBodyProperty(
        {
          '--form-item-margin-right': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set tipColor(v: string) {
      setBodyProperty(
        {
          '--form-tip-color': v,
        },
        v
      )
    },
    set labelHorizontalAlign(v: string) {
      setBodyProperty(
        {
          '--form-item-label-align': v,
        },
        v
      )
    },
    set formTipFontSize(v: string) {
      setBodyProperty(
        {
          '--form-tip-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set formErrorLineHeight(v: string) {
      setBodyProperty(
        {
          '--form-item-error-line-height': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set formErrorMarginTop(v: string) {
      setBodyProperty(
        {
          '--form-item-error-margin-top': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set formErrorMarginBottom(v: string) {
      setBodyProperty(
        {
          '--form-item-error-margin-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set formKeepErrorHeight(v: string) {
      setBodyProperty(
        {
          '--form-Item-min-keep-height': `${parseInt(v, 10)}px`,
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
      {
        name: 'checkboxDisabledBgc',
        className: exposeClass('checkbox-disabled'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'Checkbox 和 Radio 未选中状态禁用后的背景色',
      },
      {
        name: 'checkboxCheckedDisabledBgc',
        className: exposeClass('checkbox-checked-disabled'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'Checkbox 和 Radio 选中状态下禁用后的背景色',
      },
    ],
    set marginRight(v: string) {
      setBodyProperty(
        {
          '--checkbox-margin-right': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set color(v: string) {
      setBodyProperty(
        {
          '--checkinput-color': v,
        },
        v
      )
    },
    set borderColor(v: string) {
      setBodyProperty(
        {
          '--checkbox-border-color': v,
        },
        v
      )
    },
    set borderWidth(v: string) {
      setBodyProperty(
        {
          '--checkbox-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set textPaddingX(v: string) {
      setBodyProperty(
        {
          '--checkbox-text-padding-x': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set indicatorBorderRadius(v: string) {
      setBodyProperty(
        {
          '--checkbox-indicator-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set checkboxDisabledBgc(v: string) {
      setBodyProperty(
        {
          '--checkbox-disabled-bgc': v,
        },
        v
      )
    },
    set checkboxCheckedDisabledBgc(v: string) {
      setBodyProperty(
        {
          '--checkbox-checked-disabled-bgc': v,
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
    set size(v: string) {
      setBodyProperty(
        {
          '--radio-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderWidth(v: string) {
      setBodyProperty(
        {
          '--radio-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set innerWidth(v: string) {
      setBodyProperty(
        {
          '--radio-inner-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set uncheckBorderWidth(v: string) {
      setBodyProperty(
        {
          '--radio-border-uncheck-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set color(v: string) {
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
        name: 'underlineHeight',
        className: inputClass('_', 'underline'),
        attr: 'borderBottomWidth',
        type: 'number',
        parser: parseInt,
        desc: '下边框宽度(仅在下边框模式生效)',
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
        parser: (v: string) => parseInt(v.split(' ').pop()!, 10),
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
    set color(v: string) {
      setBodyProperty(
        {
          '--input-text-color': v,
        },
        v
      )
    },
    set borderRadius(v: string) {
      setBodyProperty(
        {
          '--input-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set underlineHeight(v: string) {
      setBodyProperty(
        {
          '--input-underline-height': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set dropdownBorderRadius(v: string) {
      setBodyProperty(
        {
          '--input-dropdown-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set disabledBg(v: string) {
      setBodyProperty(
        {
          '--input-bg-disabled': v,
        },
        v
      )
    },
    set disabledColor(v: string) {
      setBodyProperty(
        {
          '--input-disabled-color': v,
        },
        v
      )
    },
    set borderColor(v: string) {
      setBodyProperty(
        {
          '--input-border-color': v,
        },
        v
      )
    },
    set borderHoverColor(v: string) {
      setBodyProperty(
        {
          '--input-border-focus-color': v,
          '--input-border-focus-color-fade-25': fade(v, 0.25),
        },
        v
      )
    },
    set focusWidth(v: string) {
      setBodyProperty(
        {
          '--input-focus-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set placeholderColor(v: string) {
      setBodyProperty(
        {
          '--input-placeholder-color': v,
        },
        v
      )
    },
    set placeholderSize(v: string) {
      setBodyProperty(
        {
          '--input-placeholder-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set clearBg(v: string) {
      setBodyProperty(
        {
          '--input-clear-bg-color': v,
        },
        v
      )
    },
    set clearHoverBg(v: string) {
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
      {
        name: 'treeDisabledBg',
        className: exposeClass('select-tree-disabled'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '树形选择禁用选项背景色',
      },
      {
        name: 'treeContentColor',
        className: exposeClass('select-tree'),
        attr: 'color',
        type: 'color',
        desc: '树形选择可点击选项文字颜色',
      },
      {
        name: 'treeDisableContentColor',
        className: exposeClass('select-tree-disabled'),
        attr: 'color',
        type: 'color',
        desc: '树形选择禁用选项文字颜色',
      },
      {
        name: 'treeIconHoverBg',
        className: exposeClass('select-tree-icon-hover'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '树形选择展开箭头背景色',
      },
      {
        name: 'treeNodeHoverBg',
        className: exposeClass('select-tree-node-hover'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '树形选择节点hover状态背景色',
      },
      {
        name: 'treeNodeHoverColor',
        className: exposeClass('select-tree-node-hover'),
        attr: 'color',
        type: 'color',
        desc: '树形选择节点hover状态文字颜色',
      },
      {
        name: 'treeNodeSelectedBg',
        className: exposeClass('select-tree-node-selected'),
        attr: 'backgroundColor',
        type: 'color',
        desc: '树形选择节点选中状态背景色',
      },
      {
        name: 'treeNodeSelectedColor',
        className: exposeClass('select-tree-node-selected'),
        attr: 'color',
        type: 'color',
        desc: '树形选择节点选中状态文字颜色',
      },
    ],
    set resultPaddingVertical(v: string) {
      setBodyProperty(
        {
          '--select-result-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set resultPaddingHorizontal(v: string) {
      setBodyProperty(
        {
          '--select-result-padding-horizontal': `${parseInt(v, 10)}px`,
          '--select-result-padding-horizontal-16': `${parseInt(v, 10) + 16}px`,
        },
        v
      )
    },
    set itemColor(v: string) {
      setBodyProperty(
        {
          '--select-option-color': v,
        },
        v
      )
    },
    set itemBgColor(v: string) {
      setBodyProperty(
        {
          '--select-option-bg-color': v,
        },
        v
      )
    },
    set disabledBg(v: string) {
      setBodyProperty(
        {
          '--select-disabled-bg-color': v,
        },
        v
      )
    },
    set disabledColor(v: string) {
      setBodyProperty(
        {
          '--select-disabled-color': v,
        },
        v
      )
    },
    set itemActiveBg(v: string) {
      setBodyProperty(
        {
          '--select-item-active-bg': v,
        },
        v
      )
    },
    set itemActiveColor(v: string) {
      setBodyProperty(
        {
          '--select-item-active-color': v,
        },
        v
      )
    },
    set itemHoverBg(v: string) {
      setBodyProperty(
        {
          '--select-option-hover-bg': v,
        },
        v
      )
    },
    set itemHoverColor(v: string) {
      setBodyProperty(
        {
          '--select-option-hover-color': v,
        },
        v
      )
    },
    set compressedMoreHoverBg(v: string) {
      setBodyProperty(
        {
          '--select-compressed-hover-bg': v,
        },
        v
      )
    },
    set clearIconBg(v: string) {
      setBodyProperty(
        {
          '--select-clear-bg-color': v,
        },
        v
      )
    },
    set treeDisabledBg(v: string) {
      setBodyProperty(
        {
          '--select-tree-disabled-bg-color': v,
        },
        v
      )
    },

    set treeContentColor(v: string) {
      setBodyProperty(
        {
          '--select-tree-content-color': v,
        },
        v
      )
    },

    set treeDisableContentColor(v: string) {
      setBodyProperty(
        {
          '--select-tree-disabled-content-color': v,
        },
        v
      )
    },

    set treeIconHoverBg(v: string) {
      setBodyProperty(
        {
          '--select-tree-icon-hover-bg-color': v,
        },
        v
      )
    },
    set treeNodeHoverBg(v: string) {
      setBodyProperty(
        {
          '--select-tree-node-hover-bg': v,
        },
        v
      )
    },
    set treeNodeHoverColor(v: string) {
      setBodyProperty(
        {
          '--select-tree-node-hover-color': v,
        },
        v
      )
    },
    set treeNodeSelectedBg(v: string) {
      setBodyProperty(
        {
          '--select-tree-node-selected-bg': v,
        },
        v
      )
    },
    set treeNodeSelectedColor(v: string) {
      setBodyProperty(
        {
          '--select-tree-node-selected-color': v,
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
    set rectBorderRadius(v: string) {
      setBodyProperty(
        {
          '--datepicker-rect-active-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set dayHoverBgc(v: string) {
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
    set indicatorBg(v: string) {
      setBodyProperty(
        {
          '--slider-indicator-bg': v,
        },
        v
      )
    },
    set indicatorSize(v: string) {
      setBodyProperty(
        {
          '--slider-indicator-size': `${parseInt(v, 10)}px`,
          '--slider-indicator-size-half': `${parseInt(v, 10) / 2}px`,
        },
        v
      )
    },
    set indicatorBoxShadow(v: string) {
      setBodyProperty(
        {
          '--slider-indicator-box-shadow': v,
        },
        v
      )
    },
    set barBg(v: string) {
      setBodyProperty(
        {
          '--slider-bar-color': v,
        },
        v
      )
    },
    set disabledBarBg(v: string) {
      setBodyProperty(
        {
          '--slider-disabled-bar-bg': v,
        },
        v
      )
    },
    set disabledIndicatorBorder(v: string) {
      setBodyProperty(
        {
          '--slider-disbaled-indicator-border-color': v,
        },
        v
      )
    },
    set disabledIndicatorBg(v: string) {
      setBodyProperty(
        {
          '--slider-disbaled-indicator-bg': v,
        },
        v
      )
    },
    set height(v: string) {
      setBodyProperty(
        {
          '--slider-bar-height': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderRadius(v: string) {
      setBodyProperty(
        {
          '--slider-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set valueBottom(v: string) {
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
        className: exposeClass('table-head-top'),
        attr: 'borderWidth',
        type: 'number',
        parser: parseInt,
        desc: '无边框表格头部边框线',
      },
    ],
    set scrollRatio(v: number | string) {
      const rate = typeof v === 'number' ? v : parseInt(v, 10)
      configSet('scrollRatio', rate)
      setBodyProperty(
        {
          '--table-scroll-ratio': `${rate}px`,
        },
        v
      )
    },
    set headBg(v: string) {
      setBodyProperty(
        {
          '--table-head-bg': v,
        },
        v
      )
    },
    set hoverBg(v: string) {
      setBodyProperty(
        {
          '--table-hover-bg': v,
        },
        v
      )
    },
    set selectedBg(v: string) {
      setBodyProperty(
        {
          '--table-selected-row-bg': v,
        },
        v
      )
    },
    set headColor(v: string) {
      setBodyProperty(
        {
          '--table-head-color': v,
        },
        v
      )
    },
    set bodyBg(v: string) {
      setBodyProperty(
        {
          '--table-body-bg': v,
        },
        v
      )
    },
    set rowSpacing(v: string) {
      setBodyProperty(
        {
          '--table-row-spacing': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set rowBorderRadius(v: string) {
      setBodyProperty(
        {
          '--table-row-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set headFontWeight(v: string) {
      setBodyProperty(
        {
          '--table-head-font-weight': `${parseInt(v, 10)}`,
        },
        v
      )
    },
    set borderColor(v: string) {
      setBodyProperty(
        {
          '--table-border-color': v,
        },
        v
      )
    },
    set textColor(v: string) {
      setBodyProperty(
        {
          '--table-color': v,
        },
        v
      )
    },
    set borderRadiusTop(v: string) {
      setBodyProperty(
        {
          '--table-border-radius-top': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set headerCellPadding(v: string) {
      setBodyProperty(
        {
          '--table-header-cell-padding': v,
        },
        v
      )
    },
    set smallCellPadding(v: string) {
      setBodyProperty(
        {
          '--table-small-cell-padding': v,
        },
        v
      )
    },
    set cellPaddingHorizontal(v: string) {
      setBodyProperty(
        {
          '--table-cell-padding-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set cellPaddingVertical(v: string) {
      setBodyProperty(
        {
          '--table-cell-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set treeExpandIconMarginRight(v: string) {
      setBodyProperty(
        {
          '--table-tree-expand-icon-margin-right': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set fixedStart(v: string) {
      setBodyProperty(
        {
          '--table-fixed-start-color': v,
        },
        v
      )
    },
    set fixedEnd(v: string) {
      setBodyProperty(
        {
          '--table-fixed-end-color': v,
        },
        v
      )
    },
    set tableEvenBgc(v: string) {
      setBodyProperty(
        {
          '--table-even-td-bgc': v,
        },
        v
      )
    },
    set tableOddBgc(v: string) {
      setBodyProperty(
        {
          '--table-odd-td-bgc': v,
        },
        v
      )
    },
    set marginBottom(v: string) {
      setBodyProperty(
        {
          '--table-margin-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set headerTopDivider(v: string) {
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
    set borderRadius(v: string) {
      setBodyProperty(
        {
          '--pagination-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderWidth(v: string) {
      setBodyProperty(
        {
          '--pagination-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set hoverBorderColor(v: string) {
      setBodyProperty(
        {
          '--pagination-hover-border': v,
        },
        v
      )
    },
    set hoverColor(v: string) {
      setBodyProperty(
        {
          '--pagination-hover-color': v,
        },
        v
      )
    },
    set hoverBg(v: string) {
      setBodyProperty(
        {
          '--pagination-hover-bg': v,
        },
        v
      )
    },
    set fontSize(v: string) {
      setBodyProperty(
        {
          '--pagination-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set defaultSize(v: string) {
      setBodyProperty(
        {
          '--pagination-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set smallSize(v: string) {
      setBodyProperty(
        {
          '--pagination-size-small': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set largeSize(v: string) {
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
    set bg(v: string) {
      setBodyProperty(
        {
          '--tag-bg': v,
        },
        v
      )
    },
    set successBg(v: string) {
      setBodyProperty({ '--tag-success-bg': v }, v)
    },
    set infoBg(v: string) {
      setBodyProperty({ '--tag-info-bg': v }, v)
    },
    set warningBg(v: string) {
      setBodyProperty({ '--tag-warning-bg': v }, v)
    },
    set dangerBg(v: string) {
      setBodyProperty({ '--tag-danger-bg': v }, v)
    },
    set color(v: string) {
      setBodyProperty(
        {
          '--tag-color': v,
        },
        v
      )
    },
    set successColor(v: string) {
      setBodyProperty({ '--tag-success-color': v }, v)
    },
    set infoColor(v: string) {
      setBodyProperty({ '--tag-info-color': v }, v)
    },
    set warningColor(v: string) {
      setBodyProperty({ '--tag-warning-color': v }, v)
    },
    set dangerColor(v: string) {
      setBodyProperty({ '--tag-danger-color': v }, v)
    },
    set closeColor(v: string) {
      setBodyProperty(
        {
          '--tag-close-color': v,
        },
        v
      )
    },
    set closeHoverColor(v: string) {
      setBodyProperty(
        {
          '--tag-close-hover-color': v,
        },
        v
      )
    },
    set borderColor(v: string) {
      setBodyProperty(
        {
          '--tag-border-color': v,
        },
        v
      )
    },
    set borderRadius(v: string) {
      setBodyProperty(
        {
          '--tag-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingHorizontal(v: string) {
      setBodyProperty(
        {
          '--tag-padding-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingVertical(v: string) {
      setBodyProperty(
        {
          '--tag-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set fontWeight(v: string) {
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
    set bg(v: string) {
      setBodyProperty(
        {
          '--tooltip-bg': v,
        },
        v
      )
    },
    set paddingHorizontal(v: string) {
      setBodyProperty(
        {
          '--tooltip-padding-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingVertical(v: string) {
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
        className: exposeClass('menu-active'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        desc: '选中项水平内边距',
      },
      {
        name: 'activePaddingVertical',
        className: exposeClass('menu-active'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        desc: '选中项垂直内边距',
      },
      {
        name: 'activeBorderRadius',
        className: exposeClass('menu-active'),
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
    set verticalDarkRootActiveBgc(v: string) {
      setBodyProperty(
        {
          '--menu-vertical-dark-parent-active-bgc': v,
        },
        v
      )
    },
    set hasChildrenActiveBgc(v: string) {
      setBodyProperty(
        {
          '--menu-item-has-children-active-bgc': v,
        },
        v
      )
    },
    set hasChildrenActiveColor(v: string) {
      setBodyProperty(
        {
          '--menu-item-has-children-active-color': v,
        },
        v
      )
    },
    set verticalInpathBarWidth(v: string) {
      setBodyProperty(
        {
          '--menu-vertical-in-path-bar-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set height(v: string) {
      const height = parseInt(v, 10)
      setBodyProperty(
        {
          '--menu-item-height': `${height}px`,
        },
        v
      )
    },
    set fontSize(v: string) {
      setBodyProperty(
        {
          '--menu-item-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set darkBg(v: string) {
      setBodyProperty(
        {
          '--menu-dark-bg': v,
        },
        v
      )
    },
    set darkActiveBg(v: string) {
      setBodyProperty(
        {
          '--menu-dark-acitve-bg': v,
        },
        v
      )
    },
    set activeBg(v: string) {
      setBodyProperty(
        {
          '--menu-item-active-bg': v,
        },
        v
      )
    },
    set activeColor(v: string) {
      setBodyProperty(
        {
          '--menu-item-active-color': v,
        },
        v
      )
    },
    set color(v: string) {
      setBodyProperty(
        {
          '--menu-item-color': v,
        },
        v
      )
    },
    set darkColor(v: string) {
      setBodyProperty(
        {
          '--menu-dark-color': v,
        },
        v
      )
    },
    set darkRootNodeBg(v: string) {
      setBodyProperty(
        {
          '--menu-root-node-bgc': v,
        },
        v
      )
    },
    set darkChildrenSegmentation(v: string) {
      setBodyProperty(
        {
          '--menu-children-segmentation': v,
        },
        v
      )
    },
    set activePaddingHorizontal(v: string) {
      setBodyProperty(
        {
          '--menu-active-padding-horizontal': `${parseInt(v, 10)}px`,
          '--menu-active-padding-horizontal-negative': `-${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set activePaddingVertical(v: string) {
      setBodyProperty(
        {
          '--menu-active-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set activeBorderRadius(v: string) {
      setBodyProperty(
        {
          '--menu-active-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set itemHoverColor(v: string) {
      setBodyProperty(
        {
          '--menu-item-light-hover-color': v,
        },
        v
      )
    },
    set itemHoverDarkColor(v: string) {
      setBodyProperty(
        {
          '--menu-item-dark-hover-color': v,
        },
        v
      )
    },
    set itemHoverBgc(v: string) {
      setBodyProperty(
        {
          '--menu-item-light-hover-bgc': v,
        },
        v
      )
    },
    set itemHoverDarkBgc(v: string) {
      setBodyProperty(
        {
          '--menu-item-dark-hover-bgc': v,
        },
        v
      )
    },
    set activeBar(v: string) {
      setBodyProperty(
        {
          '--menu-active-bar': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set activeBarColor(v: string) {
      setBodyProperty(
        {
          '--menu-item-active-indicator': v,
        },
        v
      )
    },
    set darkActiveBarColor(v: string) {
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
        name: 'iconMarginTop',
        className: alertClass('icon'),
        attr: 'marginTop',
        type: 'number',
        parser: parseInt,
        desc: 'Icon上外边距',
      },
      {
        name: 'paddingX',
        className: alertClass('_'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        desc: '水平方向内边距',
      },
      {
        name: 'paddingY',
        className: alertClass('_'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        desc: '垂直方向内边距',
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
    set fontSize(v: string) {
      setBodyProperty(
        {
          '--alert-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },

    set paddingX(v: string) {
      setBodyProperty(
        {
          '--alert-padding-x': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingY(v: string) {
      setBodyProperty(
        {
          '--alert-padding-y': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconMarginTop(v: string) {
      setBodyProperty(
        {
          '--alert-icon-margin-top': `${parseInt(v, 10)}px`,
        },
        v
      )
    },

    set closeIconColor(v: string) {
      setBodyProperty(
        {
          '--alert-close-color': v,
        },
        v
      )
    },
    set closeIconHoverColor(v: string) {
      setBodyProperty(
        {
          '--alert-close-hover-color': v,
        },
        v
      )
    },
    set borderRadius(v: string) {
      setBodyProperty(
        {
          '--alert-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set boxShadow(v: string) {
      setBodyProperty(
        {
          '--alert-box-shadow': v,
        },
        v
      )
    },
    set successBoxShadow(v: string) {
      setBodyProperty(
        {
          '--alert-success-box-shadow': v,
        },
        v
      )
    },
    set infoBoxShadow(v: string) {
      setBodyProperty(
        {
          '--alert-info-box-shadow': v,
        },
        v
      )
    },
    set dangerBoxShadow(v: string) {
      setBodyProperty(
        {
          '--alert-danger-box-shadow': v,
        },
        v
      )
    },
    set warningBoxShadow(v: string) {
      setBodyProperty(
        {
          '--alert-warning-box-shadow': v,
        },
        v
      )
    },
    set borderWidth(v: string) {
      setBodyProperty(
        {
          '--alert-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set successTextColor(v: string) {
      setBodyProperty(
        {
          '--alert-success-text-color': v,
          '--alert-success-text-darken-10-color': darken(v, 10),
        },
        v
      )
    },
    set successBg(v: string) {
      setBodyProperty(
        {
          '--alert-success-bg': v,
        },
        v
      )
    },
    set successBorderColor(v: string) {
      setBodyProperty(
        {
          '--alert-success-border-color': v,
          '--alert-success-border-darken-5-color': darken(v, 5),
        },
        v
      )
    },
    set infoTextColor(v: string) {
      setBodyProperty(
        {
          '--alert-info-text-color': v,
          '--alert-info-text-darken-10-color': darken(v, 10),
        },
        v
      )
    },
    set infoBg(v: string) {
      setBodyProperty(
        {
          '--alert-info-bg': v,
        },
        v
      )
    },
    set infoBorderColor(v: string) {
      setBodyProperty(
        {
          '--alert-info-border-color': v,
          '--alert-info-border-darken-5-color': darken(v, 5),
        },
        v
      )
    },
    set warningTextColor(v: string) {
      setBodyProperty(
        {
          '--alert-warning-text-color': v,
          '--alert-warning-text-darken-10-color': darken(v, 10),
        },
        v
      )
    },
    set warningBg(v: string) {
      setBodyProperty(
        {
          '--alert-warning-bg': v,
        },
        v
      )
    },
    set warningBorderColor(v: string) {
      setBodyProperty(
        {
          '--alert-warning-border-color': v,
          '--alert-warning-border-darken-5-color': darken(v, 5),
        },
        v
      )
    },
    set dangerTextColor(v: string) {
      setBodyProperty(
        {
          '--alert-danger-text-color': v,
          '--alert-danger-text-darken-10-color': darken(v, 10),
        },
        v
      )
    },
    set dangerBg(v: string) {
      setBodyProperty(
        {
          '--alert-danger-bg': v,
        },
        v
      )
    },
    set dangerBorderColor(v: string) {
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
      {
        name: 'iconMarginTop',
        className: exposeClass('msg-icon'),
        attr: 'marginTop',
        type: 'number',
        parser: parseInt,
        desc: '类型图标距离顶部距离',
      },
    ],
    set boxShadow(v: string) {
      setBodyProperty(
        {
          '--message-box-shadow': v,
        },
        v
      )
    },
    set color(v: string) {
      setBodyProperty(
        {
          '--message-text-color': v,
        },
        v
      )
    },
    set closeColor(v: string) {
      setBodyProperty(
        {
          '--message-close-color': v,
        },
        v
      )
    },
    set fontWeight(v: string) {
      setBodyProperty(
        {
          '--message-font-weight': v,
        },
        v
      )
    },
    set borderColor(v: string) {
      setBodyProperty({ '--message-border-color': v }, v)
    },
    set iconMarginTop(v: string) {
      setBodyProperty(
        {
          '--message-icon-margin-top': `${parseInt(v, 10)}px`,
        },
        v
      )
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
    set fontSize(v: string) {
      setBodyProperty(
        {
          '--card-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingHeaderHorizontal(v: string) {
      setBodyProperty(
        {
          '--panel-header-padding-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingHeaderVertical(v: string) {
      setBodyProperty(
        {
          '--panel-header-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingBodyHorizontal(v: string) {
      setBodyProperty(
        {
          '--panel-body-padding-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingBodyVertical(v: string) {
      setBodyProperty(
        {
          '--panel-body-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingFooterHorizontal(v: string) {
      setBodyProperty(
        {
          '--panel-footer-padding-horizontal': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set paddingFooterVertical(v: string) {
      setBodyProperty(
        {
          '--panel-footer-padding-vertical': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderRadius(v: string) {
      setBodyProperty(
        {
          '--panel-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderWidth(v: string) {
      setBodyProperty(
        {
          '--card-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set dividerHeight(v: string) {
      setBodyProperty(
        {
          '--card-divider-height': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set dividerWidth(v: string) {
      setBodyProperty(
        {
          '--card-divider-width': v,
        },
        v
      )
    },
    set borderColor(v: string) {
      setBodyProperty(
        {
          '--card-border-color': v,
        },
        v
      )
    },
    set dividerColor(v: string) {
      setBodyProperty(
        {
          '--card-divider-color': v,
        },
        v
      )
    },
    set color(v: string) {
      setBodyProperty(
        {
          '--card-color': v,
        },
        v
      )
    },
    set boxShadow(v: string) {
      setBodyProperty(
        {
          '--card-box-shadow': v,
        },
        v
      )
    },
    set headerBg(v: string) {
      setBodyProperty(
        {
          '--card-header-bg': v,
        },
        v
      )
    },
    set footerBg(v: string) {
      setBodyProperty(
        {
          '--card-footer-bg': v,
        },
        v
      )
    },
    set headerColor(v: string) {
      setBodyProperty(
        {
          '--card-header-color': v,
        },
        v
      )
    },
    set footerColor(v: string) {
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
        name: 'iconHeaderPaddingRight',
        className: modalClass('title', 'method-title'),
        attr: 'paddingRight',
        type: 'number',
        parser: parseInt,
        desc: '带有 Icon 的对话框 头部 Right 内边距',
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
      // {
      //   name: 'footerColor',
      //   className: exposeClass('modal-card-footer'),
      //   attr: 'color',
      //   type: 'color',
      //   desc: '底部文字颜色',
      // },
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
    set titleFontFamily(v: string) {
      setBodyProperty({ '--modal-title-font': v }, v)
    },
    set fontSize(v: string) {
      setBodyProperty(
        {
          '--modal-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconSize(v: string) {
      setBodyProperty(
        {
          '--modal-icon-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconLeft(v: string) {
      setBodyProperty(
        {
          '--modal-icon-left': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconTop(v: string) {
      setBodyProperty(
        {
          '--modal-icon-top': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set closeIconColor(v: string) {
      setBodyProperty(
        {
          '--modal-close-icon-color': v,
        },
        v
      )
    },
    set closeIconHoverColor(v: string) {
      setBodyProperty(
        {
          '--modal-close-icon-hover-color': v,
        },
        v
      )
    },
    set closeIconTopMargin(v: string) {
      setBodyProperty(
        {
          '--modal-close-top-margin': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set closeIconRightMargin(v: string) {
      setBodyProperty(
        {
          '--modal-close-right-margin': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set titleFontSize(v: string) {
      setBodyProperty(
        {
          '--modal-title-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set titleColor(v: string) {
      setBodyProperty(
        {
          '--modal-title-color': v,
        },
        v
      )
    },
    set padding(v: string) {
      setBodyProperty(
        {
          '--modal-panel-padding': v,
        },
        v
      )
    },
    set headerPaddingTop(v: string) {
      setBodyProperty(
        {
          '--modal-header-padding-top': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set headerPaddingRight(v: string) {
      setBodyProperty(
        {
          '--modal-header-padding-right': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconHeaderPaddingRight(v: string) {
      setBodyProperty(
        {
          '--modal-method-header-padding-right': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set headerPaddingBottom(v: string) {
      setBodyProperty(
        {
          '--modal-header-padding-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set headerPaddingLeft(v: string) {
      setBodyProperty(
        {
          '--modal-header-padding-left': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set bodyPaddingTop(v: string) {
      setBodyProperty(
        {
          '--modal-body-padding-top': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set bodyPaddingRight(v: string) {
      setBodyProperty(
        {
          '--modal-body-padding-right': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set bodyPaddingBottom(v: string) {
      setBodyProperty(
        {
          '--modal-body-padding-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set bodyPaddingLeft(v: string) {
      setBodyProperty(
        {
          '--modal-body-padding-left': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconBodyPaddingTop(v: string) {
      setBodyProperty(
        {
          '--modal-icon-body-padding-top': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconBodyPaddingRight(v: string) {
      setBodyProperty(
        {
          '--modal-icon-body-padding-right': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconBodyPaddingBottom(v: string) {
      setBodyProperty(
        {
          '--modal-icon-body-padding-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set iconBodyPaddingLeft(v: string) {
      setBodyProperty(
        {
          '--modal-icon-body-padding-left': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set footerPadding(v: string) {
      setBodyProperty(
        {
          '--modal-footer-padding': v,
        },
        v
      )
    },
    set borderRadius(v: string) {
      setBodyProperty(
        {
          '--modal-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set borderWidth(v: string) {
      setBodyProperty(
        {
          '--modal-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set dividerHeight(v: string) {
      setBodyProperty(
        {
          '--modal-divider-height': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set dividerWidth(v: string) {
      setBodyProperty(
        {
          '--modal-divider-width': v,
        },
        v
      )
    },
    set borderColor(v: string) {
      setBodyProperty(
        {
          '--modal-border-color': v,
        },
        v
      )
    },
    set dividerColor(v: string) {
      setBodyProperty(
        {
          '--modal-divider-color': v,
        },
        v
      )
    },
    set color(v: string) {
      setBodyProperty(
        {
          '--modal-color': v,
        },
        v
      )
    },
    set headerBg(v: string) {
      setBodyProperty(
        {
          '--modal-header-bg': v,
        },
        v
      )
    },
    set footerBg(v: string) {
      setBodyProperty(
        {
          '--modal-footer-bg': v,
        },
        v
      )
    },
    set boxShadow(v: string) {
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
    set borderColor(v: string) {
      setBodyProperty(
        {
          '--popover-border-color': v,
        },
        v
      )
    },
    set borderWidth(v: string) {
      setBodyProperty(
        {
          '--popover-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set boxShadow(v: string) {
      setBodyProperty(
        {
          '--popover-box-shadow': v,
        },
        v
      )
    },
    set borderRadius(v: string) {
      setBodyProperty(
        {
          '--popover-border-radius': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set textMaxWidth(v: string) {
      setBodyProperty(
        {
          '--popover-text-max-width': v,
        },
        v
      )
    },
    set fontSize(v: string) {
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
      {
        name: 'lineColor',
        className: exposeClass('tree-line'),
        attr: 'color',
        type: 'color',
        desc: '连线颜色',
      },
    ],
    set levelIndent(v: string) {
      setBodyProperty(
        {
          '--tree-level-indent': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set nodeMarginBottom(v: string) {
      setBodyProperty(
        {
          '--tree-node-margin-bottom': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set treeIndicatorColor(v: string) {
      setBodyProperty(
        {
          '--tree-indicator-color': v,
        },
        v
      )
    },
    set lineColor(v: string) {
      setBodyProperty(
        {
          '--tree-line-color': v,
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
    set type(v: string) {
      const o: { [x: string]: string } = {}
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
    set uncheckBg(v: string) {
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
      {
        name: 'tabPaddingX',
        className: exposeClass('tabs-tab'),
        attr: 'paddingLeft',
        type: 'number',
        min: 0,
        parser: parseInt,
        desc: 'tab水平内边距',
      },
      {
        name: 'tabPaddingY',
        className: exposeClass('tabs-tab'),
        attr: 'paddingTop',
        type: 'number',
        min: 0,
        parser: parseInt,
        desc: 'tab垂直内边距',
      },
      {
        name: 'tabFontSize',
        className: exposeClass('tabs-tab'),
        attr: 'fontSize',
        type: 'number',
        min: 0,
        parser: parseInt,
        desc: 'tab字体大小',
      },
      {
        name: 'tabBackground',
        className: exposeClass('tabs-tab'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'tab背景色',
      },
      {
        name: 'tabActiveBackground',
        className: exposeClass('tabs-tab-active'),
        attr: 'backgroundColor',
        type: 'color',
        desc: 'tab选中背景色',
      },
      {
        name: 'tabBorderColor',
        className: exposeClass('tabs-tab'),
        attr: 'borderColor',
        type: 'color',
        desc: 'tab边框颜色',
      },
      {
        name: 'tabActiveBorderColor',
        className: exposeClass('tabs-tab-active'),
        attr: 'borderColor',
        type: 'color',
        desc: 'tab选中边框颜色',
      },
      {
        name: 'tabColor',
        className: exposeClass('tabs-tab'),
        attr: 'color',
        type: 'color',
        desc: 'tab文字颜色',
      },
      {
        name: 'tabActiveColor',
        className: exposeClass('tabs-tab-active'),
        attr: 'color',
        type: 'color',
        desc: 'tab选中文字颜色(不含线条样式)',
      },
      {
        name: 'tabLineActiveColor',
        className: exposeClass('tabs-line-active'),
        attr: 'color',
        type: 'color',
        desc: 'tab线条样式选中文字颜色',
      },
    ],
    set tabSpacing(v: string) {
      setBodyProperty(
        {
          '--tabs-tab-spacing': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set tabPaddingX(v: string) {
      setBodyProperty(
        {
          '--tabs-tab-padding-x': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set tabPaddingY(v: string) {
      setBodyProperty(
        {
          '--tabs-tab-padding-y': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set tabFontSize(v: string) {
      setBodyProperty(
        {
          '--tabs-tab-font-size': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set tabBackground(v: string) {
      setBodyProperty(
        {
          '--tabs-tab-background': v,
        },
        v
      )
    },
    set tabActiveBackground(v: string) {
      setBodyProperty(
        {
          '--tabs-tab-active-background': v,
        },
        v
      )
    },
    set tabBorderColor(v: string) {
      setBodyProperty(
        {
          '--tabs-tab-border-color': v,
        },
        v
      )
    },
    set tabActiveBorderColor(v: string) {
      setBodyProperty(
        {
          '--tabs-tab-active-border-color': v,
        },
        v
      )
    },
    set tabColor(v: string) {
      setBodyProperty(
        {
          '--tabs-tab-color': v,
        },
        v
      )
    },
    set tabActiveColor(v: string) {
      setBodyProperty(
        {
          '--tabs-tab-active-color': v,
        },
        v
      )
    },
    set tabLineActiveColor(v: string) {
      setBodyProperty(
        {
          '--tabs-line-active-color': v,
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
    set activeBgc(v: string) {
      setBodyProperty(
        {
          '--cascader-active-background-color': v,
        },
        v
      )
    },
    set activeColor(v: string) {
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
    set itemBottomBorderWidth(v: string) {
      setBodyProperty(
        {
          '--list-item-bottom-border-width': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set itemHoverBgc(v: string) {
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
    set progressBgc(v: string) {
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
    set fontSize(v: string) {
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
    set fontFamily(v: string) {
      setBodyProperty(
        {
          '--common-body-font-family': v,
        },
        v
      )
    },
    set lineHeight(v: string) {
      setBodyProperty(
        {
          '--common-line-height': v,
        },
        v
      )
    },
    set contentBlockPadding(v: string) {
      setBodyProperty(
        {
          '--common-content-block-padding': v,
        },
        v
      )
    },
    set contentTextPadding(v: string) {
      setBodyProperty(
        {
          '--common-content-text-padding': v,
        },
        v
      )
    },
    set caret(v: string) {
      configSet('caret', v as CartType)
      setBodyProperty(
        {
          '--common-caret-style': v,
        },
        v
      )
    },
    set inputDelay(v: string) {
      configSet('delay', parseInt(v, 10))
      setBodyProperty(
        {
          '--common-input-delay': `${parseInt(v, 10)}px`,
        },
        v
      )
    },
    set inputTrim(v: string) {
      configSet('trim', !!v)
      setBodyProperty(
        {
          '--common-input-trim': parseInt(v, 10),
        },
        v
      )
    },
    set spinDefaultName(v: string) {
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

export type Injects = typeof injects

export default injects
