## 安装

通过 npm 安装
```
$ npm install shineout
```

通过 CDN 引用
```
<script crossorigin src="https://unpkg.com/shineout/dist/shineout.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/shineout/dist/theme.shineout.css" />
```

## 使用
``` lang-jsx
import { Table } from 'shineout'

<Table />
```

## 配置

### webpack

npm 安装的组件有三个目录，'es/'，'lib/'，'css/'，默认的目录是 'lib/'。

- *es* - 目录下是 es5 版本的 esm 代码，支持 tree Shaking，需要自行配置 webpack 的 less-loader。

- *lib* - 目录下 js 文件为 es5 版本代码，样式文件保留为 less，需要切换主题的用户可以选择这个版本，需要自行配置 webpack 的 less-loader。

- *css* - 目录下 js 文件为 es5 版本代码，样式文件为 default 主题的 css 文件，不需要配置 webpack。


### theme 主题

除了自带的 shineout 主题，还内置支持了 default，和兼容 ant-design 的主题 'antd'（方便两个组件库混用的场景，只是配色接近，交互和接口参数不同）。

npm 安装的方式可以通过修改 webpack 的 less-loader 配置来切换主题。
```
{
  loader: 'less-loader',
  options: {
    modifyVars: {
      'so-theme': 'shineout'
    }
  }
}
```

CDN 引用的方式，可以修改引用路径
```
<link rel="stylesheet" href="https://unpkg.com/shineout/dist/theme.shineout.css" />
// or
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
import { config } fron 'shineout'
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
    modules: true,
    localIdentName: '[local]--[hash:base64:5]'
  }
}
```

在应用入口设置 config.cssModule 为 true
```
import { config } fron 'shineout'
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

### 输入延迟

输入延迟指的是用户输入触发 onChange 和校验间隔时间，Input、TextArea、EditableArea 组件具有该功能，默认为 400毫秒。

可以通过设置 config.delay 改变全局的延迟时间。

```
import { config } fron 'shineout'
config.setConfig({
  delay: 0
})

```

## 在 Create-React-App 中使用

<br />

[create-react-app](https://facebook.github.io/create-react-app/) 是由 Facebook 官方提供的 React 应用构建工具。

### 安装及构建

使用 create-react-app，需先在全局 npm 中安装：

```
$ npm i -g create-react-app
```

构建一个 React 环境的工程：

```
$ create-react-app first-shineout-demo
```

期间 create-react-app 会自动将相关依赖帮你安装好，无需执行 npm。

进入目录，并运行：
```
$ cd first-shineout-demo
$ npm start
```

此时浏览器会自动访问 http://localhost:3000/。


### 引入 shineout

现在安装并引入 shineout：

```
$ npm i shineout
```

修改 `src/App.js`，引入 shineout 中的 `<Button />` 组件。

```
import React, { Component } from 'react';
import './App.css';
+ import { Button } from 'shineout'

class App extends Component {
  render() {
    return (
      <div className="App">
        + <Button type="success">成功按钮</Button>
      </div>
    );
  }
}

export default App;
```

修改 `src/App.css`，在文件顶部引入 `shineout/dist/theme.shineout.css`。

```
+ @import '~shineout/dist/theme.shineout.css';

.App {
  text-align: center;
}

...
```

同时该项目兼容 `antd` 的样式，引入方式如下：

```
- @import '~shineout/dist/theme.shineout.css';
- @import '~shineout/dist/theme.default.css';
+ @import '~shineout/dist/theme.antd.css';

.App {
  text-align: center;
}

...
```

### 高级配置

此时，项目中已经包含了 shineout 组件库的相关组件，但距离实际开发还存在一定的隐患，因为刚刚在 `src/App.css` 中引入了所有组件的所需的样式。但在实际开发中我们可能只使用一少部分组件，因此，针对 `create-react-app` 的配置进行一些调整。

引入 [rescripts](https://github.com/harrysolovay/rescripts) 并修改 package.json（ rescripts 社区提供的 create-react-app 配置解决方案之一）。

```
$ npm i @rescripts/cli
```

修改 `package.json` 文件：

```
...
"scripts": {
-   "start": "react-scripts start",
+   "start": "rescripts start",
-   "build": "react-scripts build",
+   "build": "rescripts build",
-   "test": "react-scripts test",
+   "test": "rescripts test",
-   "eject": "react-scripts eject"
}
...
```

然后在项目根目录创建一个 `.rescriptsrc.js` 用于修改默认配置。

```
module.exports = [];
```

### 按需加载

shineout 的 JS 代码默认支持基于 ES modules 的 tree shaking。

### 修改Shineout主题

因为修改主题需要编译 less ，因此需引入重写 less 相关的内容。

1. 引入 `rescript-use-rewire` 和 `react-app-rewire-less`

```
$ npm i @rescripts/rescript-use-rewire react-app-rewire-less
```

2.修改 `.rescriptsrc.js` 文件

```
+ const rewireLess = require('react-app-rewire-less');

module.exports = [
+ [
+   'use-rewire',
+   rewireLess.withLoaderOptions({
+     modifyVars: { 'so-theme': 'shineout' }, // 主题修改为 shineout
+     javascriptEnabled: true
+   })
+ ]
];
```

3. app.css 中不需要再引入 shineout 样式
```
- @import '~shineout/dist/theme.shineout.css';
- @import '~shineout/dist/theme.default.css';
- @import '~shineout/dist/theme.antd.css';

.App {
  text-align: center;
}

...
```

4. 重新执行 `npm start` 即可


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
