/**
 * cn - 大小
 *    -- 一共有三种尺寸，['small', 'default', 'large']，默认为 'default'
 * en - Size
 *    -- There are three sizes, ['small', 'default', 'large'], default value is 'default'.
 */
import React from 'react'
import { Button } from 'shineout'

export default function() {
  return (
    <div>
      <div>
        <Button size="small">Default</Button>
        <Button size="small" type="primary">
          Primary
        </Button>
        <Button size="small" type="secondary">
          Secondary
        </Button>
        <Button size="small" type="success">
          Success
        </Button>
        <Button size="small" type="warning">
          Warning
        </Button>
        <Button size="small" type="danger">
          Danger
        </Button>
        <Button size="small" type="link">
          Link
        </Button>
      </div>
      <br />
      <div>
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="secondary">Secondary</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
      </div>
      <br />
      <div>
        <Button size="large">Default</Button>
        <Button size="large" type="primary">
          Primary
        </Button>
        <Button size="large" type="secondary">
          Secondary
        </Button>
        <Button size="large" type="success">
          Success
        </Button>
        <Button size="large" type="warning">
          Warning
        </Button>
        <Button size="large" type="danger">
          Danger
        </Button>
        <Button size="large" type="link">
          Link
        </Button>
      </div>
    </div>
  )
}
