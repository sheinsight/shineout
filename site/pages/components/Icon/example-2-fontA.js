/**
 * cn - 使用 font awesome
 * en - use font awesome
 */

import React, { Fragment } from 'react'
import { Icon } from 'shineout'


const MyIcon = Icon('https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css', 'FontAwesome', 'fa')

export default function () {
  return (
    <Fragment>
      <MyIcon style={{ marginRight: '20px' }} iconType="lock" size="small" />
      <MyIcon style={{ marginRight: '20px' }} iconType="flag" size="small" type="primary" />
      <MyIcon style={{ marginRight: '20px' }} iconType="pencil" type="success" />
      <MyIcon style={{ marginRight: '20px' }} iconType="play" size="large" type="danger" />
    </Fragment>
  )
}