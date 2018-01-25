# Classname

默认设置下，使用 **'prefix-moduleName-className'** 的规则来隔离css代码。为了同时支持 CSS Module，组件内部所有的 className 都是通过 utils/classname 来处理。

```
export default (style, module, prefix = config.prefix) => (...args) => {
  // 使用 classnames 预处理一下
  const className = classnames(...args)
  if (!className) return ''

  const ns = `${prefix}${module ? `-${module}` : '-'}`

  // '_' 会被忽略，返回 'prefix-module'
  let list = className.split(' ').map(c => (c === '_' ? ns : `${ns}-${c}`))

  // 当 cssModule 为 true 时，从 style 内获取 css-loader 处理过的 className
  if (config.cssModule) {
    list = list.map(c => style[c])
  }
  return list.join(' ')
}
```

这个模块只有一个函数，返回一个新的函数来给 className 添加 prefix 和 moduleName。

```
import genaration from 'src/utils/classname'
const alertClass = genaration(require('src/styles/alert.less'), 'alert', 'shineout')

isShow = true
alertClass('_', 'success', isShow ? 'show' : 'hide') 
// 未使用 CSS Module
>>> 'shineout-alert shineout-alert-success shine-alert-show'
// 使用 CSS Module, localIdentName = '[local]-[hash:base64:5]'
>>> 'shineout-alert-xxxxx shineout-alert-success-xxxxx shine-alert-show-xxxxx'
```

为了方便管理，所有的 class 放在了 src/styles/index.js 文件内，需要的时候引用即可
```
import { alertClass, dropdownClass } from 'src/styles'
```