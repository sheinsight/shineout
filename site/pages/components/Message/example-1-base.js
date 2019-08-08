/**
 * cn - 基本用法
 *    -- Message 封装了一组全局函数，方便在任意地方调用，包括常规（不带/带icon）、Success、Warn、Error和关闭所有消息提醒。
 * en - Base
 *    -- Message has 6 static functions that are convenient to call anywhere, includes normal(with/without icon)、success、warn、error and close all messages
 */
import React from 'react'
import { Button, Message } from 'shineout'

export default function() {
  return (
    <div>
      <Button
        onClick={() => {
          Message.show('Some message.')
        }}
      >
        Show
      </Button>
      <Button
        onClick={() => {
          Message.info('This is a message of info.')
        }}
      >
        Info
      </Button>
      <Button
        onClick={() => {
          Message.success('This is a message of success.')
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          Message.warn('This is a message of warning.')
        }}
      >
        Warn
      </Button>
      <Button
        onClick={() => {
          Message.error('This is a message of error.')
        }}
      >
        Error
      </Button>

      <Button
        onClick={() => {
          Message.close()
        }}
      >
        Close All
      </Button>
    </div>
  )
}
