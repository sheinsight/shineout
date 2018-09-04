## 安装

通过 npm 安装
```
$ npm install shineout
```

通过 CDN 引用
```
<script crossorigin src="https://unpkg.com/shineout/dist/shineout.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/shineout/dist/theme.default.css" />
```

## 使用
``` js
import { Table } from 'shineout'

<Table />
```

## 配置

### webpack

npm 安装的组件有三个目录，'es/'，'lib/'，'css/'，默认的目录是 'lib/'。

- *es* - 目录下是 es6 版本代码，需要调试的开发者可以使用这个版本，需要自行配置 webpack 的 babel-loader 和 less-loader。

- *lib* - 目录下js文件为 es5 版本代码，样式文件保留为 less，需要切换主题的用户可以选择这个版本，需要自行配置 webpack 的 less-loader。

- *css* - 目录下 js 文件为 es5 版本代码，样式文件为 css 格式，不需要配置 webpack。

可以使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import#readme) 按需加载。


### theme 主题

目前内置支持了两套主题，default，和兼容 ant-design 的主题 'antd'（方便两个组件库混用的场景，只是配色接近，交互和接口参数不同）。

npm 安装的方式可以通过修改 webpack 的 less-loader 配置来切换主题。
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

CDN 引用的方式，可以修改引用路径
```
<link rel="stylesheet" href="https://unpkg.com/shineout/dist/theme.default.css" />
// or
<link rel="stylesheet" href="https://unpkg.com/shineout/dist/theme.antd.css" />
```


### CSS 前缀

默认通过前缀来隔离 css 代码，默认的前缀是 'so'。通常情况下，不需要修改。如果想修改这个值，修改 webpack 的 less-loader 配置
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


## I18N

组件库中部分组件（Datepicker，Select，Modal等）内置了部分文字，暂时为简体中文（zh-CN）和英文（en-US）两组。默认为英文（en-US），可以通过 webpack 的 process.env 切换
```
plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      LOCALE: JSON.stringify('zh-CN'),
    },
  }),
],
```

CDN 引用的版本可以调用 locale 的 setLocale 方法

```
import { setLocale } from 'shineout'
setLocale('zh-CN')
```

其他语言或者部分设置，可以传入一个 Json 数据

```
setLocale({ ok: 'yes' })
```

当前 locale 内容如下:

<example name="locale" />