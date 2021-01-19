/**
 * 此文件根据 scripts/component-index.ejs 生成，不要手动修改
 */
import { lazy } from 'react'
import Page from 'doc/pages/Page'

const pages = [
  {
    name: 'GetStart',
    cn: '',
    level: 1,
    component: lazy(() => import(/* webpackChunkName: "GetStart" */ './GetStart')),
  },
  'General',
  {
    name: 'Button',
    cn: '按钮',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Button" */ './Button')),
  },
  {
    name: 'Divider',
    cn: '分割线',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Divider" */ './Divider')),
  },
  {
    name: 'Dropdown',
    cn: '下拉菜单',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Dropdown" */ './Dropdown')),
  },
  {
    name: 'Icon',
    cn: '图标',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Icon" */ './Icon')),
  },
  {
    name: 'Image',
    cn: '图片',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Image" */ './Image')),
  },
  'Form',
  {
    name: 'Cascader',
    cn: '级联选择',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Cascader" */ './Cascader')),
  },
  {
    name: 'Checkbox',
    cn: '复选框',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Checkbox" */ './Checkbox')),
  },
  {
    name: 'DatePicker',
    cn: '日期选择',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "DatePicker" */ './DatePicker')),
  },
  {
    name: 'EditableArea',
    cn: '可编辑域',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "EditableArea" */ './EditableArea')),
  },
  {
    name: 'Form',
    cn: '表单',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Form" */ './Form')),
  },
  {
    name: 'Input',
    cn: '输入框',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Input" */ './Input')),
  },
  {
    name: 'Radio',
    cn: '单选框',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Radio" */ './Radio')),
  },
  {
    name: 'Rate',
    cn: '评分',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Rate" */ './Rate')),
  },
  {
    name: 'Rule',
    cn: '校验规则',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Rule" */ './Rule')),
  },
  {
    name: 'Select',
    cn: '选择框',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Select" */ './Select')),
  },
  {
    name: 'Slider',
    cn: '滑块',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Slider" */ './Slider')),
  },
  {
    name: 'Switch',
    cn: '开关',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Switch" */ './Switch')),
  },
  {
    name: 'Textarea',
    cn: '多行文本框',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Textarea" */ './Textarea')),
  },
  {
    name: 'Transfer',
    cn: '穿梭框',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Transfer" */ './Transfer')),
  },
  {
    name: 'TreeSelect',
    cn: '树选择',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "TreeSelect" */ './TreeSelect')),
  },
  {
    name: 'Upload',
    cn: '上传',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Upload" */ './Upload')),
  },
  'Data',
  {
    name: 'Carousel',
    cn: '轮播',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Carousel" */ './Carousel')),
  },
  {
    name: 'Datum.Form',
    cn: '表单处理',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Datum.Form" */ './Datum.Form')),
  },
  {
    name: 'Datum.List',
    cn: '数据处理',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Datum.List" */ './Datum.List')),
  },
  {
    name: 'List',
    cn: '列表',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "List" */ './List')),
  },
  {
    name: 'Pagination',
    cn: '分页',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Pagination" */ './Pagination')),
  },
  {
    name: 'Table',
    cn: '表格',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Table" */ './Table')),
  },
  {
    name: 'Tree',
    cn: '树',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Tree" */ './Tree')),
  },
  'Feedback',
  {
    name: 'Alert',
    cn: '提示框',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Alert" */ './Alert')),
  },
  {
    name: 'Message',
    cn: '消息提示',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Message" */ './Message')),
  },
  {
    name: 'Modal',
    cn: '对话框',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Modal" */ './Modal')),
  },
  {
    name: 'Popover',
    cn: '气泡',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Popover" */ './Popover')),
  },
  {
    name: 'Progress',
    cn: '进度条',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Progress" */ './Progress')),
  },
  {
    name: 'Spin',
    cn: '加载中',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Spin" */ './Spin')),
  },
  {
    name: 'Tag',
    cn: '标签',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Tag" */ './Tag')),
  },
  {
    name: 'Tooltip',
    cn: '提示',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Tooltip" */ './Tooltip')),
  },
  'Layout',
  {
    name: 'Card',
    cn: '卡片',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Card" */ './Card')),
  },
  {
    name: 'CardGroup',
    cn: '卡片组',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "CardGroup" */ './CardGroup')),
  },
  {
    name: 'Grid',
    cn: '栅格',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Grid" */ './Grid')),
  },
  {
    name: 'Sticky',
    cn: '附着',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Sticky" */ './Sticky')),
  },
  {
    name: 'Tabs',
    cn: '标签页',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Tabs" */ './Tabs')),
  },
  'Navigation',
  {
    name: 'Breadcrumb',
    cn: '面包屑',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Breadcrumb" */ './Breadcrumb')),
  },
  {
    name: 'Menu',
    cn: '菜单',
    level: 2,
    component: lazy(() => import(/* webpackChunkName: "Menu" */ './Menu')),
  },
]

export default Page(pages)
