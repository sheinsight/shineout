# 在 Create React App 中使用

create-react-app 是由 Facebook 官方提供的 React 应用构建工具。

#### 安装及构建

使用 create-react-app，需先在全局 npm 中安装（可能还需 yarn）：

```
$ npm i -g create-react-app yarn
```

构建一个 React 环境的工程：

```
$ create-react-app first-shineout-demo
```

期间 create-react-app 会自动将相关依赖帮你安装好，无需执行 npm 或 yarn。

进入目录，并运行：
```
$ cd first-shineout-demo
$ yarn start
```

此时浏览器会自动访问 http://localhost:3000/。


#### 引入 shineout

现在使用 yarn 或 npm 安装并引入 shineout：

```
$ yarn add shineout
或
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

修改 `src/App.css`，在文件顶部引入 `shineout/dist/theme.default.css`。

```
+ @import '~shineout/dist/theme.default.css';

.App {
  text-align: center;
}

...
```

同时该项目兼容 `antd` 的样式，引入方式如下：

```
- @import '~shineout/dist/theme.default.css';
+ @import '~shineout/dist/theme.antd.css';

.App {
  text-align: center;
}

...
```

其他开发流程你可以参考 [create-react-app](https://facebook.github.io/create-react-app/) 的官方文档。

#### 高级配置

此时，项目中已经包含了 shineout 组件库的相关组件，但距离实际开发还存在一定的隐患，因为刚刚在 `src/App.css` 中引入了所有组件的所需的样式。但在实际开发中我们可能只使用一少部分组件，因此，针对 `create-react-app` 的配置进行一些调整。

引入 rescripts 并修改 package.json（ rescripts 社区提供的 create-react-app 配置解决方案之一）。

```
$ yarn add @rescripts/cli
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

#### 使用 babel-plugin-import

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是由 antd 团队提供实现按需加载的 Babel 插件。

```
$ yarn add babel-plugin-import @rescripts/rescript-use-babel-config
```

修改 .rescriptsrc.js 文件，添加 Babel 相关配置：

```
module.exports = [
  + ['use-babel-config', '.babelrc']
];
```

创建 .babelrc 文件：

```
{
  "presets": ["react-app"],
  "plugins": [
    [
      "import", 
      { 
        "libraryName": "shineout", 
        "libraryDirectory": "css", // 引入 css 
        "style": false,
        "camel2DashComponentName": false,
        "camel2UnderlineComponentName": false
      }
    ]
  ]
}
```

`libraryDirectory` 设置为 css，css 目录结构下为 less 和 jsx 编译后的文件夹。

#### 修改主题

因为修改主题需要编译 less ，因此需引入重写 less 相关的内容。

1. 修改 .babelrc 文件

```
{
  "presets": ["react-app"],
  "plugins": [
    [
      "import", 
      { 
        "libraryName": "shineout", 
      - "libraryDirectory": "css", // 引入 css 
      + "libraryDirectory": "lib", // 引入 lib 
        "style": false,
        "camel2DashComponentName": false,
        "camel2UnderlineComponentName": false
      }
    ]
  ]
}
```
2. 引入 `rescript-use-rewire`，并修改 `.rescript.js` 文件
   
```
$ yarn add @rescripts/rescript-use-rewire react-app-rewire-less
```

```
+ const rewireLess = require('react-app-rewire-less');

module.exports = [
  ['use-babel-config', '.babelrc'],
  + [ 
    + 'use-rewire',
    + rewireLess.withLoaderOptions({ 
      + modifyVars: { 'so-theme': 'antd' }, // 主题修改为 antd
      + javascriptEnabled: true
    + })
  + ]
];
```

3. 重新执行 `yarn start` 即可