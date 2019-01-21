# Use Shineout In Create React App

Create-react-app is the official React app build tool from Facebook.

#### Installation and Building

You need to install create-react-app with npm, may be also need yarn：

```
$ npm i -g create-react-app yarn
```

Create a new React project：

```
$ create-react-app first-shineout-demo
```

During the create-react-app will automatically help you to install dependencies without npm or yarn.

Then we go inside first-shineout-demo and start it:

```
$ cd first-shineout-demo
$ yarn start
```

At this point, the browser will automatically open http://localhost:3000/.


#### Import shineout

Via yarn or npm install:

```
$ yarn add shineout
or
$ npm i shineout
```

Modify `src/App.js`, import `<Button />` from shineout.

```
import React, { Component } from 'react';
import './App.css';
+ import { Button } from 'shineout'

class App extends Component {
  render() {
    return (
      <div className="App">
        + <Button type="success">Success Button</Button>
      </div>
    );
  }
}

export default App;
```

Modify `src/App.css`, add `shineout/dist/theme.default.css` at the top of the file.

```
+ @import '~shineout/dist/theme.default.css';

.App {
  text-align: center;
}

...
```

You can also import the style of antd:

```
- @import '~shineout/dist/theme.default.css';
+ @import '~shineout/dist/theme.antd.css';

.App {
  text-align: center;
}

...
```

Visit other workflows of [create-react-app](https://facebook.github.io/create-react-app/) at its User Guide.

#### 高级配置

The relevant components of the shineout component library are already included in the project, but there are some hidden dangers from the actual development, because the required styles of all components have just been introduced in `src/App.css`. However, in actual development we may only use one components, so some adjustments are made to the configuration of `create-react-app`.

Import @rescripts/cli and Modify package.json.

```
$ yarn add @rescripts/cli
```

Modify `package.json`:

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

Create a `.rescriptsrc.js` in root directory.

```
module.exports = [];
```

#### Use babel-plugin-import

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) create by antd and is a babel plugin.

```
$ yarn add babel-plugin-import @rescripts/rescript-use-babel-config
```

Modify .rescriptsrc.js file, add Babel configuration:

```
module.exports = [
  + ['use-babel-config', '.babelrc']
];
```

create .babelrc file:

```
{
  "presets": ["react-app"],
  "plugins": [
    [
      "import", 
      { 
        "libraryName": "shineout", 
        "libraryDirectory": "css", // import css 
        "style": false,
        "camel2DashComponentName": false,
        "camel2UnderlineComponentName": false
      }
    ]
  ]
}
```

`libraryDirectory` set css, because the compiled folder for less and jsx under the css directory structure.

#### Modify Theme

Modifying the theme requires compiling less , it is necessary to introduce rewrite less related content.

1. Modify .babelrc file

```
{
  "presets": ["react-app"],
  "plugins": [
    [
      "import", 
      { 
        "libraryName": "shineout", 
      - "libraryDirectory": "css", // import css 
      + "libraryDirectory": "lib", // import lib 
        "style": false,
        "camel2DashComponentName": false,
        "camel2UnderlineComponentName": false
      }
    ]
  ]
}
```
1. Install `rescript-use-rewire`, and Modify `.rescript.js` 文件
   
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

3. Re-run `yarn start`.