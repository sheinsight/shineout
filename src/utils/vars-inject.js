import { darken, fade } from './color'
import {
  paginationClass,
  checkinputClass,
  tagClass,
  buttonClass,
  tooltipClass,
  inputClass,
  selectClass,
  formClass,
  menuClass,
} from '../styles'
import { exposeClass } from '../styles/expose'

function getProperty(name = '--btn-hover-darken') {
  return getComputedStyle(document.body)
    .getPropertyValue(name)
    .trim()
}

function setBodyProperty(colors) {
  for (const [cssVar, cssValue] of Object.entries(colors)) {
    document.body.style.setProperty(cssVar, cssValue)
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
        desc: 'Table border',
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
      setBodyProperty({
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
      })
    },
    set warning(v) {
      setBodyProperty({
        '--warning-color': v,
        '--warning-color-dark-5': darken(v, 5),
        '--warning-color-fade-60': fade(v, 0.6),
        '--warning-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
        '--warning-color-fade-0': fade(v, 0),
        '--warning-color-dark-5_fade-0': fade(darken(v, 5), 0),
        '--warning-color-dark-btn-hover': darken(v, getProperty()),
      })
    },
    set danger(v) {
      setBodyProperty({
        '--danger-color': v,
        '--danger-color-fade-25': fade(v, 0.25),
        '--danger-color-dark-5': darken(v, 5),
        '--danger-color-fade-60': fade(v, 0.6),
        '--danger-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
        '--danger-color-fade-0': fade(v, 0),
        '--danger-color-dark-5_fade-0': fade(darken(v, 5), 0),
        '--danger-color-dark-btn-hover': darken(v, getProperty()),
      })
    },
    set success(v) {
      setBodyProperty({
        '--success-color': v,
        '--success-color-dark-5': darken(v, 5),
        '--success-color-fade-60': fade(v, 0.6),
        '--success-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
        '--success-color-fade-0': fade(v, 0),
        '--success-color-dark-5_fade-0': fade(darken(v, 5), 0),
        '--success-color-dark-btn-hover': darken(v, getProperty()),
      })
    },
    set secondary(v) {
      setBodyProperty({
        '--secondary-color': v,
        '--secondary-color-dark-5': darken(v, 5),
        '--secondary-color-dark-btn-hover': darken(v, getProperty()),
        '--secondary-color-dark-5_fade-60': fade(darken(v, 5), 0.6),
        '--secondary-color-dark-5_fade-0': fade(darken(v, 5), 0),
      })
    },
    set gray100(v) {
      setBodyProperty({
        '--gray-100': v,
      })
    },
    set gray200(v) {
      setBodyProperty({
        '--gray-200': v,
        '--gray-200-darken-5': darken(v, 5),
      })
    },
    set gray300(v) {
      setBodyProperty({
        '--gray-300': v,
        '--gray-300-darken-hover': darken(v, getProperty()),
        '--gray-300-fade-60': fade(v, 0.6),
        '--gray-300-fade-0': fade(v, 0),
      })
    },
    set gray400(v) {
      setBodyProperty({
        '--gray-400': v,
        '--gray-400-darken-20': darken(v, 20),
      })
    },
    set gray500(v) {
      setBodyProperty({
        '--gray-500': v,
      })
    },
    set gray600(v) {
      setBodyProperty({
        '--gray-600': v,
        '--gray-600-lighten-15': darken(v, -15),
      })
    },
    set gray700(v) {
      setBodyProperty({
        '--gray-700': v,
      })
    },
    set gray800(v) {
      setBodyProperty({
        '--gray-800': v,
        '--gray-800-darken-5': darken(v, 5),
      })
    },
    set gray900(v) {
      setBodyProperty({
        '--gray-900': v,
        '--gray-900-lighten-40': darken(v, -40),
      })
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
      },
      {
        name: 'fontSizeLarge',
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        className: buttonClass('large'),
      },
      {
        name: 'fontSizeSmall',
        attr: 'fontSize',
        type: 'number',
        parser: parseInt,
        className: buttonClass('small'),
      },
      {
        name: 'marginLeft',
        attr: 'marginLeft',
        type: 'number',
        parser: parseInt,
        className: exposeClass('button'),
      },
      {
        name: 'spinMargin',
        attr: 'marginRight',
        type: 'number',
        parser: parseInt,
        className: buttonClass('spin'),
      },
      {
        name: 'paddingBaseHorizontal',
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        className: buttonClass('_'),
      },
      {
        name: 'paddingBaseVertical',
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        className: buttonClass('_'),
      },
      {
        name: 'paddingLargeHorizontal',
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        className: buttonClass('large'),
      },
      {
        name: 'paddingLargeVertical',
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        className: buttonClass('large'),
      },
      {
        name: 'paddingSmallHorizontal',
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
        className: buttonClass('small'),
      },
      {
        name: 'paddingSmallVertical',
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
        className: buttonClass('small'),
      },
      {
        name: 'borderRadius',
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
        className: buttonClass('_'),
      },
    ],
    set fontSizeBase(v) {
      setBodyProperty({
        '--button-font-size-base': `${parseInt(v, 10)}px`,
      })
    },
    set fontSizeLarge(v) {
      setBodyProperty({
        '--button-font-size-large': `${parseInt(v, 10)}px`,
      })
    },
    set fontSizeSmall(v) {
      setBodyProperty({
        '--button-font-size-small': `${parseInt(v, 10)}px`,
      })
    },
    set spinMargin(v) {
      setBodyProperty({
        '--button-spin-margin': `${parseInt(v, 10)}px`,
      })
    },
    set marginLeft(v) {
      setBodyProperty({
        '--button-margin-left': `${parseInt(v, 10)}px`,
      })
    },
    set borderRadius(v) {
      setBodyProperty({
        '--button-border-radius': `${parseInt(v, 10)}px`,
      })
    },
    set paddingBaseHorizontal(v) {
      setBodyProperty({
        '--button-padding-base-horizontal': `${parseInt(v, 10)}px`,
        '--button-padding-base-horizontal-7': `${parseInt(v, 10) * 0.7}px`,
      })
    },
    set paddingLargeHorizontal(v) {
      setBodyProperty({
        '--button-padding-large-horizontal': `${parseInt(v, 10)}px`,
      })
    },
    set paddingSmallHorizontal(v) {
      setBodyProperty({
        '--button-padding-small-horizontal': `${parseInt(v, 10)}px`,
      })
    },
    set paddingBaseVertical(v) {
      setBodyProperty({
        '--button-padding-base-vertical': `${parseInt(v, 10)}px`,
      })
    },
    set paddingLargeVertical(v) {
      setBodyProperty({
        '--button-padding-large-vertical': `${parseInt(v, 10)}px`,
      })
    },
    set paddingSmallVertical(v) {
      setBodyProperty({
        '--button-padding-small-vertical': `${parseInt(v, 10)}px`,
      })
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
      },
      {
        name: 'itemMarginRight',
        className: exposeClass('form-inline'),
        attr: 'marginRight',
        type: 'number',
        parser: parseInt,
      },
    ],
    set itemMarginBottom(v) {
      setBodyProperty({
        '--form-item-margin-bottom': `${parseInt(v, 10)}px`,
      })
    },
    set itemMarginRight(v) {
      setBodyProperty({
        '--form-item-margin-right': `${parseInt(v, 10)}px`,
      })
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
      },
    ],
    set marginRight(v) {
      setBodyProperty({
        '--checkbox-margin-right': `${parseInt(v, 10)}px`,
      })
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
        name: 'borderRadius',
        className: inputClass('_'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
      },
      {
        name: 'focusWidth',
        className: inputClass('focus'),
        attr: 'boxShadow',
        type: 'number',
        max: 20,
        parser: v => parseInt(v.split(' ').pop(), 10),
      },
      {
        name: 'disabledBg',
        className: inputClass('disabled'),
        attr: 'backgroundColor',
        type: 'color',
      },
      {
        name: 'borderColor',
        className: inputClass('_'),
        attr: 'borderColor',
        type: 'color',
      },
    ],
    set borderRadius(v) {
      setBodyProperty({
        '--input-border-radius': `${parseInt(v, 10)}px`,
      })
    },
    set disabledBg(v) {
      setBodyProperty({
        '--input-bg-disabled': v,
      })
    },
    set borderColor(v) {
      setBodyProperty({
        '--input-border-color': v,
      })
    },
    set focusWidth(v) {
      setBodyProperty({
        '--input-focus-width': `${parseInt(v, 10)}px`,
      })
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
      },
      {
        name: 'resultPaddingVertical',
        className: exposeClass('select-result-item'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
      },
      {
        name: 'itemActiveBg',
        className: selectClass('active', 'option'),
        attr: 'backgroundColor',
        type: 'color',
      },
      {
        name: 'itemActiveColor',
        className: selectClass('active', 'option'),
        attr: 'color',
        type: 'color',
      },
      {
        name: 'itemHoverBg',
        className: selectClass('option', 'hover'),
        attr: 'backgroundColor',
        type: 'color',
      },
    ],
    set resultPaddingVertical(v) {
      setBodyProperty({
        '--select-result-padding-vertical': `${parseInt(v, 10)}px`,
      })
    },
    set resultPaddingHorizontal(v) {
      setBodyProperty({
        '--select-result-padding-horizontal': `${parseInt(v, 10)}px`,
        '--select-result-padding-horizontal-16': `${parseInt(v, 10) + 16}px`,
      })
    },
    set itemActiveBg(v) {
      setBodyProperty({
        '--select-item-active-bg': v,
      })
    },
    set itemActiveColor(v) {
      setBodyProperty({
        '--select-item-active-color': v,
      })
    },
    set itemHoverBg(v) {
      setBodyProperty({
        '--select-item-hover-bg': v,
      })
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
      },
    ],
    set rectBorderRadius(v) {
      setBodyProperty({
        '--datepicker-rect-active-border-radius': `${parseInt(v, 10)}px`,
      })
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
      },
      {
        name: 'indicatorSize',
        className: exposeClass('slider-indicator'),
        attr: 'width',
        type: 'number',
        min: 8,
        max: 20,
        parser: parseInt,
      },
    ],
    set indicatorBg(v) {
      setBodyProperty({
        '--slider-indicator-bg': v,
      })
    },
    set indicatorSize(v) {
      setBodyProperty({
        '--slider-indicator-size': `${parseInt(v, 10)}px`,
        '--slider-indicator-size-half': `${parseInt(v, 10) / 2}px`,
      })
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
        name: 'headBg',
        className: exposeClass('table-head'),
        attr: 'backgroundColor',
        type: 'color',
      },
      {
        name: 'headColor',
        className: exposeClass('table-head'),
        attr: 'color',
        type: 'color',
      },
      {
        name: 'borderColor',
        className: exposeClass('table-head'),
        attr: 'borderColor',
        type: 'color',
      },
      {
        name: 'hoverBg',
        className: exposeClass('table-head-hover'),
        attr: 'backgroundColor',
        type: 'color',
      },
      {
        name: 'borderRadiusTop',
        className: exposeClass('table-head'),
        attr: 'borderTopLeftRadius',
        type: 'number',
        parser: parseInt,
      },
    ],
    set headBg(v) {
      setBodyProperty({
        '--table-head-bg': v,
      })
    },
    set hoverBg(v) {
      setBodyProperty({
        '--table-hover-bg': v,
      })
    },
    set headColor(v) {
      setBodyProperty({
        '--table-head-color': v,
      })
    },
    set borderColor(v) {
      setBodyProperty({
        '--table-border-color': v,
      })
    },
    set borderRadiusTop(v) {
      setBodyProperty({
        '--table-border-radius-top': `${parseInt(v, 10)}px`,
      })
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
      },
      {
        name: 'borderWidth',
        className: paginationClass('item'),
        attr: 'borderWidth',
        type: 'number',
        parser: parseInt,
      },
    ],
    set borderRadius(v) {
      setBodyProperty({
        '--pagination-border-radius': `${parseInt(v, 10)}px`,
      })
    },
    set borderWidth(v) {
      setBodyProperty({
        '--pagination-border-width': `${parseInt(v, 10)}px`,
      })
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
      },
      {
        name: 'color',
        className: tagClass('_'),
        attr: 'color',
        type: 'color',
      },
      {
        name: 'borderColor',
        className: tagClass('default'),
        attr: 'borderColor',
        type: 'color',
      },
      {
        name: 'borderRadius',
        className: tagClass('_'),
        attr: 'borderRadius',
        type: 'number',
        parser: parseInt,
      },
      {
        name: 'paddingHorizontal',
        className: tagClass('_'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
      },
      {
        name: 'paddingVertical',
        className: tagClass('_'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
      },
    ],
    set bg(v) {
      setBodyProperty({
        '--tag-bg': v,
      })
    },
    set color(v) {
      setBodyProperty({
        '--tag-color': v,
      })
    },
    set borderColor(v) {
      setBodyProperty({
        '--tag-border-color': v,
      })
    },
    set borderRadius(v) {
      setBodyProperty({
        '--tag-border-radius': `${parseInt(v, 10)}px`,
      })
    },
    set paddingHorizontal(v) {
      setBodyProperty({
        '--tag-padding-horizontal': `${parseInt(v, 10)}px`,
      })
    },
    set paddingVertical(v) {
      setBodyProperty({
        '--tag-padding-vertical': `${parseInt(v, 10)}px`,
      })
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
      },
      {
        name: 'paddingHorizontal',
        className: tooltipClass('inner'),
        attr: 'paddingLeft',
        type: 'number',
        parser: parseInt,
      },
      {
        name: 'paddingVertical',
        className: tooltipClass('inner'),
        attr: 'paddingTop',
        type: 'number',
        parser: parseInt,
      },
    ],
    set bg(v) {
      setBodyProperty({
        '--tooltip-bg': v,
      })
    },
    set paddingHorizontal(v) {
      setBodyProperty({
        '--tooltip-padding-horizontal': `${parseInt(v, 10)}px`,
      })
    },
    set paddingVertical(v) {
      setBodyProperty({
        '--tooltip-padding-vertical': `${parseInt(v, 10)}px`,
      })
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
      },
      {
        name: 'darkBg',
        className: exposeClass('menu-dark'),
        attr: 'backgroundColor',
        type: 'color',
      },
      {
        name: 'activeBg',
        className: exposeClass('menu-active'),
        attr: 'backgroundColor',
        type: 'color',
      },
      {
        name: 'activeColor',
        className: exposeClass('menu-active'),
        attr: 'color',
        type: 'color',
      },
      {
        name: 'darkColor',
        className: exposeClass('menu-dark'),
        attr: 'color',
        type: 'color',
      },
    ],
    set height(v) {
      const height = parseInt(v, 10)
      setBodyProperty({
        '--menu-item-height': `${height}px`,
        '--menu-item-height-half': `${height / 2}px`,
      })
    },
    set darkBg(v) {
      setBodyProperty({
        '--menu-dark-bg': v,
      })
    },
    set activeBg(v) {
      setBodyProperty({
        '--menu-item-active-bg': v,
      })
    },
    set activeColor(v) {
      setBodyProperty({
        '--menu-item-active-color': v,
      })
    },
    set darkColor(v) {
      setBodyProperty({
        '--menu-dark-color': v,
      })
    },
  },
}

export default injects
