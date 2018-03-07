/**
 * cn - 图标
 * en - Icon
 */
import React, { Fragment } from 'react'
import { Button, Icon } from 'shineout'

const FontAwesome = Icon('https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css', 'FontAwesome', 'fa')

export default function () {
  return (
    <Fragment>
      <Button size="small" type="primary"><FontAwesome name="home" /> Small</Button>
      <Button type="primary"><FontAwesome name="home" /> Default</Button>
      <Button size="large" type="primary"><FontAwesome name="home" /> Large</Button>
    </Fragment>
  )
}
