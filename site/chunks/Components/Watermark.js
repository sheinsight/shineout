/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Watermark/cn.md'
import en from 'doc/pages/components/Watermark/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 为一段内容添加重复文字水印。',
      'Base \n Add a repeated text watermark to content.'
    ),
    component: require('doc/pages/components/Watermark/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Watermark/example-1-base.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Watermark/example-1-base.tsx'),

  },
  {
    name: '2-multiline',
    isTs: true,
    isTest: false,
    title: locate(
      '多行水印 \n content 数组会按行绘制，并支持为单独一行设置字体。',
      'Multiple lines \n Use a content array for multiple lines and customize the font of each line.'
    ),
    component: require('doc/pages/components/Watermark/example-2-multiline.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Watermark/example-2-multiline.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Watermark/example-2-multiline.tsx'),

  },
  {
    name: '3-image',
    isTs: true,
    isTest: false,
    title: locate(
      '图片水印 \n image 优先绘制，图片加载失败时会回退到 content。',
      'Image \n The image is preferred and falls back to content if loading fails.'
    ),
    component: require('doc/pages/components/Watermark/example-3-image.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Watermark/example-3-image.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Watermark/example-3-image.tsx'),

  },
  {
    name: '4-custom',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义配置 \n 调整旋转角度、间距、偏移和字体样式。',
      'Custom configuration \n Customize rotation, gaps, offset, and font styles.'
    ),
    component: require('doc/pages/components/Watermark/example-4-custom.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Watermark/example-4-custom.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Watermark/example-4-custom.tsx'),

  },
  {
    name: '5-popup',
    isTs: true,
    isTest: false,
    title: locate(
      '弹层继承 \n 默认情况下，Watermark 内的 Modal 和 Drawer 会继承相同的水印。',
      'Popup inheritance \n Modal and Drawer inside Watermark inherit the same watermark by default.'
    ),
    component: require('doc/pages/components/Watermark/example-5-popup.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Watermark/example-5-popup.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Watermark/example-5-popup.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Watermark","properties":[{"name":"children","tag":{"cn":"需要添加水印的内容","en":"Protected content","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"content","tag":{"cn":"水印文本。数组会渲染为多行，每行可以单独覆盖字体样式","en":"Watermark text. An array renders multiple lines, and each line can override the font.","default":"","version":""},"required":false,"type":"string | WatermarkText | (string | WatermarkText)[] "},{"name":"image","tag":{"cn":"水印图片地址，优先级高于 content，加载失败时回退显示 content","en":"Image source. It has higher priority than content, and falls back to content when loading fails.","default":"","version":""},"required":false,"type":"string "},{"name":"width","tag":{"cn":"单个水印的宽度。文本默认使用测量宽度，图片默认为 120","en":"Watermark width. Text uses its measured width by default, while images default to 120.","default":"","version":""},"required":false,"type":"number "},{"name":"height","tag":{"cn":"单个水印的高度。文本默认使用测量高度，图片默认为 64","en":"Watermark height. Text uses its measured height by default, while images default to 64.","default":"","version":""},"required":false,"type":"number "},{"name":"rotate","tag":{"cn":"水印旋转角度，单位为度","en":"Rotation angle in degrees","default":"-22","version":""},"required":false,"type":"number "},{"name":"zIndex","tag":{"cn":"水印层的 z-index","en":"Watermark layer z-index","default":"999","version":""},"required":false,"type":"number "},{"name":"gap","tag":{"cn":"水印之间的水平和垂直间距","en":"Horizontal and vertical gaps between watermarks","default":"[100, 100]","version":""},"required":false,"type":"[number, number] "},{"name":"offset","tag":{"cn":"水印相对容器左上角的偏移量，默认值为 gap 的一半","en":"Offset from the container\\\"s top-left corner. Defaults to half of gap.","default":"[gap[0] / 2, gap[1] / 2]","version":""},"required":false,"type":"[number, number] "},{"name":"font","tag":{"cn":"文本字体配置","en":"Text font configuration","default":"{ color: \\\"rgba(0, 0, 0, 0.15)\\\", fontSize: 16, fontWeight: \\\"normal\\\", fontStyle: \\\"normal\\\", fontFamily: \\\"sans-serif\\\", textAlign: \\\"center\\\" }","version":""},"required":false,"type":"{  color?: string | CanvasGradient | CanvasPattern , fontSize?: number , fontWeight?: number | \\\"normal\\\" | \\\"lighter\\\" | \\\"bold\\\" | \\\"bolder\\\" , fontStyle?: \\\"normal\\\" | \\\"none\\\" | \\\"italic\\\" | \\\"oblique\\\" , fontFamily?: string , textAlign?: CanvasTextAlign  } "},{"name":"inherit","tag":{"cn":"Portal 模式的 Modal 和 Drawer 是否继承水印","en":"Whether portal Modal and Drawer components inherit the watermark","default":"true","version":""},"required":false,"type":"boolean "},{"name":"onRemove","tag":{"cn":"水印层被外部删除并恢复时触发的回调","en":"Callback fired when an externally removed watermark layer is restored","default":"","version":""},"required":false,"type":"(() => void) "},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
