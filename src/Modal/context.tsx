import React from 'react'
import createReactContext from '../context'

// 默认值为 null，表示"不在 Modal 内部"。
// 修复：原来默认值为 {}（truthy），导致所有开启 absolute 的弹出类组件（Dropdown/Select 等）
// 无论是否在 Modal 内，都会被自动注入 zIndex: 1051（inline style），
// 使用户通过 CSS 覆盖 z-index 的方式完全失效（Breaking Change since 2.0.23）。
// 现改为 null，只有在 Modal Provider 内部时（value != null）才注入 zIndex，
// 与 v1 行为保持一致。
const context = createReactContext<object | null>(null)

// eslint-disable-next-line
export const Provider = context.Provider

const consumer = <Props extends {}>(Origin: React.ComponentType<Props>) => (
  props: Props & { absolute: string; zIndex: number }
) => (
  <context.Consumer>
    {value => {
      const mp = Object.assign({}, props, value != null && props.absolute && props.zIndex === undefined && { zIndex: 1051 })
      return <Origin {...mp} />
    }}
  </context.Consumer>
)

export default consumer
