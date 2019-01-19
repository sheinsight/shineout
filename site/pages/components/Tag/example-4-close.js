/**
 * cn - 关闭
 *    -- 设置 onClose 属性时，显示关闭按钮
 *    -- onClose 为 true 时，只关闭提示，不处理
 *    -- onClose 为函数时，关闭后调用此函数
 * en - onClose
 *    -- When the onClose property is set, the close button is displayed.
 *    -- When the onClose property is true, only hide the component.
 *    -- When the onClose is a function, call this function after hiding it.
 */
import React from 'react'
import { Tag } from 'shineout'

export default () => (
  <div>
    <Tag onClose>onClose=true</Tag>

    <Tag onClose={() => console.log('close')}>onClose=function</Tag>

    <Tag
      onClose={() =>
        new Promise(resolve => {
          setTimeout(() => {
            console.log('promise close')
            resolve(true)
          }, 3000)
        })
      }
    >
      onClose=promise
    </Tag>
  </div>
)
