/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Gap/cn.md'
import en from 'doc/pages/components/Gap/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 为子元素设置水平和垂直间距',
      'Base \n Set horizontal and vertical spacing for child elements'
    ),
    component: require('doc/pages/components/Gap/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Gap/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Gap/example-1-base.tsx'),

  },
  {
    name: '2-custom',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义间距 \n 通过 row 和 column 分别来调整垂直和水平间距',
      'Custom \n custom the vertical and horizontal spacing by row and column'
    ),
    component: require('doc/pages/components/Gap/example-2-custom.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Gap/example-2-custom.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Gap/example-2-custom.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Gap","properties":[{"name":"column","tag":{"cn":"水平方向的列间距","en":"column spacing in the horizontal direction","default":"8","version":""},"required":false,"type":"string | number "},{"name":"row","tag":{"cn":"垂直方向的行间距","en":"vertical line spacing","default":"8","version":""},"required":false,"type":"string | number "},{"name":"itemStyle","tag":{"cn":"子元素自定义样式","en":"the styles of child elements","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"children","tag":{"cn":"子元素","en":"children","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
