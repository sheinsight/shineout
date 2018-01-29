## 安装
```
$ npm install shineout
```

## 使用
``` js
import { Table } from 'shineout'

<Table />
```

## 配置

### theme 主题

目前内置支持了两套主题，bootstrap（v3版本, 默认），和兼容 ant-design 的主题 'antd'（方便两个组件库混用的场景，只是配色接近，交互和接口参数不同）。

可以通过修改 webpack 的 less-loader 配置来切换主题。
```
{
  loader: 'less-loader',
  options: {
    modifyVars: {
      'so-theme': 'antd'
    }
  }
}
```

### CSS 前缀

默认通过前缀来隔离 css 代码，默认的前缀是 'shineout'。通常情况下，不需要修改。如果想修改这个值，修改 webpack 的 less-loader 配置
```
{
  loader: 'less-loader',
  options: {
    modifyVars: {
      'so-prefix': 'your-prefix'
    }
  }
}
``` 

在项目内设置 config

```
import config from 'shineout/config'
config.setConfig({
  prefix: 'your-prefix'
})
```
```
// 或者修改webpack 的 process.env
plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      SO_PREFIX: JSON.stringify('your-prefix'),
    },
  }),
],
```

### CSS Module

如果需要使用 CSS Module，首先修改 webpack 的 css-loader 配置
```
{
  loader: 'css-loader',
  options: {
    module: true,
    localIdentName: '[local]--[hash:base64:5]'
  }
}
```

在应用入口设置 config.cssModule 为 true
```
import config from 'shineout/config'
config.setConfig({
  cssModule: true
})

```
```
// 或者修改 webpack 的 process.env
plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      CSS_MODULE: true
    },
  }),
],
```
