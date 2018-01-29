/**
 * cn - 大小 size
 * en - Size
 */
import React, { Fragment } from 'react'
import Button from 'shineout/Button'

export default function () {
  return (
    <Fragment>
      <div>
        <Button size="small">Default</Button>
        <Button size="small" type="primary">Primary</Button>
        <Button size="small" type="secondary">Secondary</Button>
        <Button size="small" type="success">Success</Button>
        <Button size="small" type="info">Info</Button>
        <Button size="small" type="warning">Warning</Button>
        <Button size="small" type="danger">Danger</Button>
        <Button size="small" type="link">Link</Button>
      </div>
      <br />
      <div>
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="secondary">Secondary</Button>
        <Button type="success">Success</Button>
        <Button type="info">Info</Button>
        <Button type="warning">Warning</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
      </div>
      <br />
      <div>
        <Button size="large">Default</Button>
        <Button size="large" type="primary">Primary</Button>
        <Button size="large" type="secondary">Secondary</Button>
        <Button size="large" type="success">Success</Button>
        <Button size="large" type="info">Info</Button>
        <Button size="large" type="warning">Warning</Button>
        <Button size="large" type="danger">Danger</Button>
        <Button size="large" type="link">Link</Button>
      </div>
    </Fragment>
  )
}
