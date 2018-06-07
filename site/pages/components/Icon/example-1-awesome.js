/**
 * cn - 使用 FontAwesome
 * en - Use FontAwesome
 */
import React, { Fragment } from 'react'
import { Icon } from 'shineout'

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const FontAwesome = Icon(url, 'FontAwesome', 'fa')
const margin = { marginRight: 20 }

export default function () {
  return (
    <Fragment>
      <FontAwesome style={margin} name="home" />
      <FontAwesome style={margin} name="info" type="info" />
      <FontAwesome style={margin} name="check" type="success" />
      <FontAwesome style={margin} name="close" type="danger" />
    </Fragment>
  )
}
