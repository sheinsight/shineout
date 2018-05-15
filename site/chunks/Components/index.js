/**
 * 此文件根据 scripts/component-index.ejs 生成，不要手动修改
 */
import loadable from 'docs/Loadable'
import Page from 'doc/pages/Page'

const pages = [
  {
    name: 'GetStart',
    cn: '',
    level: 1,
    component: loadable(() => import('./GetStart')),
  },
  'General',
  {
    name: 'Button',
    cn: '按钮',
    level: 2,
    component: loadable(() => import('./Button')),
  },
  {
    name: 'Dropdown',
    cn: '下拉菜单',
    level: 2,
    component: loadable(() => import('./Dropdown')),
  },
  {
    name: 'Image',
    cn: '图片',
    level: 2,
    component: loadable(() => import('./Image')),
  },
  'Form',
  {
    name: 'Checkbox',
    cn: '复选框',
    level: 2,
    component: loadable(() => import('./Checkbox')),
  },
  {
    name: 'DatePicker',
    cn: '日期选择',
    level: 2,
    component: loadable(() => import('./DatePicker')),
  },
  {
    name: 'Form',
    cn: '表单',
    level: 2,
    component: loadable(() => import('./Form')),
  },
  {
    name: 'Input',
    cn: '输入框',
    level: 2,
    component: loadable(() => import('./Input')),
  },
  {
    name: 'Radio',
    cn: '单选框',
    level: 2,
    component: loadable(() => import('./Radio')),
  },
  {
    name: 'Rate',
    cn: '评分',
    level: 2,
    component: loadable(() => import('./Rate')),
  },
  {
    name: 'Select',
    cn: '选择框',
    level: 2,
    component: loadable(() => import('./Select')),
  },
  {
    name: 'Textarea',
    cn: '多行文本框',
    level: 2,
    component: loadable(() => import('./Textarea')),
  },
  'Data',
  {
    name: 'Datum.Form',
    cn: '表单处理',
    level: 2,
    component: loadable(() => import('./Datum.Form')),
  },
  {
    name: 'Datum.List',
    cn: '数据处理',
    level: 2,
    component: loadable(() => import('./Datum.List')),
  },
  {
    name: 'Pagination',
    cn: '分页',
    level: 2,
    component: loadable(() => import('./Pagination')),
  },
  {
    name: 'Table',
    cn: '表格',
    level: 2,
    component: loadable(() => import('./Table')),
  },
  'Feedback',
  {
    name: 'Alert',
    cn: '提示框',
    level: 2,
    component: loadable(() => import('./Alert')),
  },
  {
    name: 'Icon',
    cn: '图标',
    level: 2,
    component: loadable(() => import('./Icon')),
  },
  {
    name: 'Message',
    cn: '消息提示',
    level: 2,
    component: loadable(() => import('./Message')),
  },
  {
    name: 'Modal',
    cn: '弹出框',
    level: 2,
    component: loadable(() => import('./Modal')),
  },
  {
    name: 'Spin',
    cn: '加载中',
    level: 2,
    component: loadable(() => import('./Spin')),
  },
  'Layout',
  {
    name: 'Card',
    cn: '卡片',
    level: 2,
    component: loadable(() => import('./Card')),
  },
  {
    name: 'Sticky',
    cn: '附着',
    level: 2,
    component: loadable(() => import('./Sticky')),
  },
  'Navigation',
  {
    name: 'Breadcrumb',
    cn: '面包屑',
    level: 2,
    component: loadable(() => import('./Breadcrumb')),
  },
  {
    name: 'Menu',
    cn: '菜单',
    level: 2,
    component: loadable(() => import('./Menu')),
  },
]

export default Page(pages)
