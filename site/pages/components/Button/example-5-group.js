/**
 * cn - 组合
 *    -- 一组 Button 可以用 Button.Group 包裹起来
 * en - Group
 */
import React from 'react'
import { Button } from 'shineout'

export default function () {
  return (
    <div>
      <Button.Group>
        <Button>Left</Button>
        <Button>Center</Button>
        <Button disabled>disabled</Button>
        <Button>Right</Button>
      </Button.Group>

      <br />

      <Button.Group type="secondary">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </Button.Group>

      <br />

      <Button.Group outline>
        <Button type="primary">Left</Button>
        <Button type="secondary">Center</Button>
        <Button type="danger">Right</Button>
      </Button.Group>

      <br />

      <Button.Group type="primary" outline size="large">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </Button.Group>
    </div>
  )
}

