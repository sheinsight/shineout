/**
 * cn - 使用 font awesome
 * en - use font awesome
 */

import React, { Fragment } from 'react'
import { Icon } from 'shineout'


const MyIcon = Icon('she', 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css')

export default function () {
  return (
    <Fragment>
      <MyIcon style={{ marginRight: '20px' }} iconType="fa fa-home" iconSize={16} iconColor="#1890ff" />
      <MyIcon style={{ marginRight: '20px' }} iconType="fa fa-tag" iconSize={20} iconColor="#52c41a" />
      <MyIcon style={{ marginRight: '20px' }} iconType="fa fa-refresh" iconSize={24} iconColor="#1890ff" />
      <MyIcon style={{ marginRight: '20px' }} iconType="fa fa-lock" iconSize={28} iconColor="#f5222d" />
    </Fragment>
  )
}