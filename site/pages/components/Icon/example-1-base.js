/**
 * cn - 使用font-icon
 * en - use font-icon
 */

import React, { Fragment } from 'react'
import { Icon } from 'shineout'


const MyIcon = Icon('//at.alicdn.com/t/font_550076_aqfu50lfa47bke29.css')

export default function () {
  return (
    <Fragment>
      <MyIcon style={{ marginRight: '20px' }} iconType="error" size="small" type="primary" />
      <MyIcon style={{ marginRight: '20px' }} iconType="info" size="small" type="warning" />
      <MyIcon style={{ marginRight: '20px' }} iconType="right" size="large" type="danger" />
      <MyIcon style={{ marginRight: '20px' }} iconType="close1" size="large" type="success" />
    </Fragment>
  )
}
