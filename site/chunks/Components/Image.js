/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Image/cn.md'
import en from 'doc/pages/components/Image/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    title: locate('基本用法 \n 图片设置宽高后即使图片未加载，仍然会先占位', 'Base \n The most basic image.'),
    component: require('doc/pages/components/Image/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-01-base.js'),
  },
  {
    name: '02-shape',
    title: locate('形状 \n 内置了三种图片样式，rounded, cricle, thumbnail', 'Shape \n There are three built-in styles, rounded, cricle, thumbnail.'),
    component: require('doc/pages/components/Image/example-02-shape.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-02-shape.js'),
  },
  {
    name: '03-fit',
    title: locate('适应 \n 内置了 4 种适应容器的方式，填充、居中、原图、拉伸', 'Fit \n There are four built ways that fit the container, fill, center, original, stretch.'),
    component: require('doc/pages/components/Image/example-03-fit.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-03-fit.js'),
  },
  {
    name: '04-alt',
    title: locate('备用地址 \n 在 src 获取失败的情况下，自动使用 alt 属性设置的地址', 'Alt \n If the src address fails to load, use the alt property instead.'),
    component: require('doc/pages/components/Image/example-04-alt.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-04-alt.js'),
  },
  {
    name: '05-error',
    title: locate('错误处理 \n alt 属性失效或没有 alt 属性时，会显示 title 属性', 'Title \n The title property is displayed when the alt property is invalid or there is no alt property.'),
    component: require('doc/pages/components/Image/example-05-error.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-05-error.js'),
  },
  {
    name: '06-target',
    title: locate('原始图片 \n 提供了 4 种方式展示原始图片，弹出层、新窗口打开、当前窗口打开、下载', 'Target \n There are 4 ways to display the original image, pop-up layer, new window open, current window open, download.'),
    component: require('doc/pages/components/Image/example-06-target.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-06-target.js'),
  },
  {
    name: '07-group',
    title: locate('图片组 \n 一组图片可以放在 Image.Group 中', 'Group \n A group of images can be placed in the Image.Group .'),
    component: require('doc/pages/components/Image/example-07-group.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-07-group.js'),
  },
  {
    name: '08-group',
    title: locate(' \n 设置 pile 属性可以把缩略图堆叠展示', ' \n Set the pile property to show the image stack.'),
    component: require('doc/pages/components/Image/example-08-group.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-08-group.js'),
  },
  {
    name: '09-lazy',
    title: locate('延迟加载 \n lazy 属性为 true 时，图片会在进入屏幕可视区域后加载', 'Lazy load \n When the lazy property is true, the image will load when it enter the visual area of the screen.'),
    component: require('doc/pages/components/Image/example-09-lazy.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-09-lazy.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
