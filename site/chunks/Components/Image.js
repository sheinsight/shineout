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
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 图片设置宽高后即使图片未加载，仍然会先占位',
      'Base \n The most basic image.'
    ),
    component: require('doc/pages/components/Image/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Image/example-01-base.tsx'),

  },
  {
    name: '02-shape',
    isTs: true,
    isTest: false,
    title: locate(
      '形状 \n 内置了三种图片样式，rounded, cricle, thumbnail',
      'Shape \n There are three built-in styles, rounded, cricle, thumbnail.'
    ),
    component: require('doc/pages/components/Image/example-02-shape.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-02-shape.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Image/example-02-shape.tsx'),

  },
  {
    name: '03-fit',
    isTs: true,
    isTest: false,
    title: locate(
      '适应 \n 内置了 4 种适应容器的方式，填充、居中、原图、拉伸',
      'Fit \n There are four built ways that fit the container, fill, center, original, stretch.'
    ),
    component: require('doc/pages/components/Image/example-03-fit.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-03-fit.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Image/example-03-fit.tsx'),

  },
  {
    name: '04-alt',
    isTs: true,
    isTest: false,
    title: locate(
      '备用地址 \n 在 src 获取失败的情况下，自动使用 alt 属性设置的地址',
      'Alt \n If the src address fails to load, use the alt property instead.'
    ),
    component: require('doc/pages/components/Image/example-04-alt.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-04-alt.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Image/example-04-alt.tsx'),

  },
  {
    name: '05-error',
    isTs: true,
    isTest: false,
    title: locate(
      '错误处理 \n alt 属性失效或没有 alt 属性时，会显示 title 属性',
      'Title \n The title property is displayed when the alt property is invalid or there is no alt property.'
    ),
    component: require('doc/pages/components/Image/example-05-error.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-05-error.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Image/example-05-error.tsx'),

  },
  {
    name: '06-target',
    isTs: true,
    isTest: false,
    title: locate(
      '原始图片 \n 提供了 4 种方式展示原始图片，弹出层、新窗口打开、当前窗口打开、下载',
      'Target \n There are 4 ways to display the original image, pop-up layer, new window open, current window open, download.'
    ),
    component: require('doc/pages/components/Image/example-06-target.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-06-target.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Image/example-06-target.tsx'),

  },
  {
    name: '07-group',
    isTs: true,
    isTest: false,
    title: locate(
      '图片组 \n 一组图片可以放在 Image.Group 中',
      'Group \n A group of images can be placed in the Image.Group .'
    ),
    component: require('doc/pages/components/Image/example-07-group.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-07-group.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Image/example-07-group.tsx'),

  },
  {
    name: '08-group',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 设置 pile 属性可以把缩略图堆叠展示',
      ' \n Set the pile property to show the image stack.'
    ),
    component: require('doc/pages/components/Image/example-08-group.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-08-group.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Image/example-08-group.tsx'),

  },
  {
    name: '09-lazy',
    isTs: true,
    isTest: false,
    title: locate(
      '延迟加载 \n lazy 属性为 true 时，图片会在进入屏幕可视区域后加载, 默认以 document 的滚动条为判断',
      'Lazy load \n When the lazy property is true, the image will load when it enter the visual area of the screen.'
    ),
    component: require('doc/pages/components/Image/example-09-lazy.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-09-lazy.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Image/example-09-lazy.tsx'),

  },
  {
    name: '10-lazy',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 如果需要在特定的元素内部进行懒加载, 则需要提供一个选择器, 请确保 Image 组件渲染的时候能够通过选择器获取到指定元素.',
      ' \n If you need to lazy loading inside a specific element, you need to provide a selector, please ensure that the Image component can get the specified element through the selector when rendering.'
    ),
    component: require('doc/pages/components/Image/example-10-lazy.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-10-lazy.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Image/example-10-lazy.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Image","properties":[{"name":"height","tag":{"cn":"图片高度(值为百分比时，对比值为图片宽度)","en":"the height of the image(When the value is percentage, the ratio is the width of the image)","default":"\\\"100%\\\"","version":""},"type":"string | number "},{"name":"href","tag":{"cn":"原始图片地址","en":"original picture address","default":"","version":""},"type":"string "},{"name":"lazy","tag":{"cn":"是否延迟加载，如果为数字则表示懒加载偏移量","en":"whether to delay loading, number to set lazy offset","default":"false","version":""},"type":"number | boolean "},{"name":"src","tag":{"cn":"图片地址","en":"the picture address","default":"","version":""},"type":"string "},{"name":"alt","tag":{"cn":"备用地址，src无效时会应用","en":"Alternate address, applied when src is invalid","default":"","version":""},"type":"string "},{"name":"onError","tag":{"cn":"src或alt 地址请求出错回调","en":"callback of image src or alt request fail","default":"","version":""},"type":"((error: Event, type?: number ) => void) "},{"name":"target","tag":{"cn":"图片打开方式","en":"target of image","default":"\\\"_modal\\\"","version":""},"type":"\\\"_self\\\" | \\\"_blank\\\" | \\\"_modal\\\" | \\\"_download\\\" "},{"name":"width","tag":{"cn":"图片宽度","en":"the width of the image","default":"\\\"100%\\\"","version":""},"type":"string | number "},{"name":"placeholder","tag":{"cn":"图片加载中占位内容","en":"loading image placeholder content","default":"\\\"loading\\\"","version":""},"type":"ReactNode"},{"name":"container","tag":{"cn":"对特定元素进行懒加载判断的选择器, 如: \\\"#id\\\", \\\".class\\\"","en":"the special element selector witch container the lazy image, such as: \\\"#id\\\", \\\".class\\\"","default":"","version":""},"type":"string | Element "},{"name":"error","tag":{"cn":"图片载入错误的文案","en":"image error placeholder","default":"","version":""},"type":"ReactNode"},{"name":"autoSSL","tag":{"cn":"是否根据页面自动转换协议","en":"auto transform protocol","default":"false","version":""},"type":"boolean "},{"name":"fit","tag":{"cn":"适应容器的方式","en":"fit the container","default":"","version":""},"type":"\\\"center\\\" | \\\"fill\\\" | \\\"fit\\\" | \\\"stretch\\\" "},{"name":"shape","tag":{"cn":"图片样式","en":"shape of image","default":"\\\"rounded\\\"","version":""},"type":"\\\"circle\\\" | \\\"rounded\\\" | \\\"thumbnail\\\" "},{"name":"onClick","tag":{"cn":"点击图片的回调","en":"The callback of click","default":"","version":""},"type":"((e: MouseEvent<Element, MouseEvent>) => void) "},{"name":"title","tag":{"cn":"原生 title 属性","en":"The original property of html","default":"","version":""},"type":"string "},{"name":"noImgDrag","tag":{"cn":"是否禁止 img 元素原生 draggable 属性","en":"The original property of html","default":"false","version":""},"type":"boolean "},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":"","version":""},"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"type":"CSSProperties "}],"cn":"","en":""},{"title":"Image.Group","properties":[{"name":"height","tag":{"cn":"单个图片高度(值为百分比时，对比值为图片宽度)","en":"the height of single image(When the value is percentage, the ratio is the width of the image)","default":"\\\"100%\\\"","version":""},"type":"string | number "},{"name":"lazy","tag":{"cn":"是否延迟加载","en":"whether to delay loading","default":"false","version":""},"type":"boolean "},{"name":"pile","tag":{"cn":"是否堆叠","en":"whether to stack","default":"false","version":""},"type":"boolean "},{"name":"target","tag":{"cn":"图片打开方式","en":"target of image","default":"\\\"_modal\\\"","version":""},"type":"\\\"_self\\\" | \\\"_blank\\\" | \\\"_modal\\\" | \\\"_download\\\" "},{"name":"width","tag":{"cn":"单个图片宽度","en":"the width of single picture","default":"\\\"100%\\\"","version":""},"type":"string | number "},{"name":"children","tag":{"cn":"子元素","en":"children","default":"","version":""},"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":"","version":""},"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"type":"CSSProperties "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
