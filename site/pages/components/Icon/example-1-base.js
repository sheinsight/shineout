/**
 * cn - 使用font-icon
 * en - use font-icon
 */

import React, { Fragment } from 'react'
import { Icon } from 'shineout'


const MyIcon = Icon('she', '//at.alicdn.com/t/font_550076_aqfu50lfa47bke29.css')

export default function () {
  return (
    <Fragment>
      <MyIcon style={{ marginRight: '20px' }} iconType="iconfont icon-error" iconSize={16} iconColor="#1890ff" />
      <MyIcon style={{ marginRight: '20px' }} iconType="iconfont icon-info" iconSize={20} iconColor="#52c41a" />
      <MyIcon style={{ marginRight: '20px' }} iconType="iconfont icon-right" iconSize={24} iconColor="#1890ff" />
      <MyIcon style={{ marginRight: '20px' }} iconType="iconfont icon-close1" iconSize={28} iconColor="#f5222d" />
    </Fragment>
  )
}
