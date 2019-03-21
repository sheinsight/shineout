## Install

install from npm
```
$ npm install shineout
```

use tag from a CDN
```
<script crossorigin src="https://unpkg.com/shineout/dist/shineout.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/shineout/dist/theme.default.css" />
```


## Usage
``` js
import { Table } from 'shineout'

<Table />
```

## Configuration

### theme

Currently,there are two sets of theme built in, default and the theme 'antd' that is compatible with ant-design(Convenient for the mixing of two component libraries and just the color matching is close, the interaction and interface parameters are different.)

You can switch topics by modifying the webpack's less-loader configuration.
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

### The prefix of css

By default, the css code is isolated by prefix. The default prefix is 'so' and does not need to modified normally. If you wang to modify this value, modify the less-loader configuration of the webpack.
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

Set config in the project.

```
import config from 'shineout/config'
config.setConfig({
  prefix: 'your-prefix'
})
```
```
// or modify the process.env of webpack
plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      SO_PREFIX: JSON.stringify('your-prefix'),
    },
  }),
],
```

### CSS Module

If you need to use the CSS Module, modify the css-loader configuration of the webpack firstly.
```
{
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[local]--[hash:base64:5]'
  }
}
```

Set the config.cssmodule to true at the application entrance
```
import config from 'shineout/config'
config.setConfig({
  cssModule: true
})

```
```
// or modify the process.env of webpack
plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      CSS_MODULE: true
    },
  }),
],
```


## Use Shineout In Create React App

<br />

[create-react-app](https://facebook.github.io/create-react-app/)  is the official React app build tool from Facebook.

### Installation and Building

You need to install create-react-app with npm:

```
$ npm i -g create-react-app
```

Create a new React project：

```
$ create-react-app first-shineout-demo
```

During the create-react-app will automatically help you to install dependencies without npm.

Then we go inside first-shineout-demo and start it:

```
$ cd first-shineout-demo
$ npm start
```

At this point, the browser will automatically open http://localhost:3000/.


### Import shineout

Via npm install:

```
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

### Advanced configuration

The relevant components of the shineout component library are already included in the project, but there are some hidden dangers from the actual development, because the required styles of all components have just been introduced in `src/App.css`. However, in actual development we may only use one components, so some adjustments are made to the configuration of `create-react-app`.

Import [rescripts](https://github.com/harrysolovay/rescripts) and Modify package.json.

```
$ npm i @rescripts/cli
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

### Use babel-plugin-import

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) create by antd and is a babel plugin.

```
$ npm i babel-plugin-import @rescripts/rescript-use-babel-config
```

Modify .rescriptsrc.js file, add Babel configuration:

```
module.exports = [
+   ['use-babel-config', '.babelrc']
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

### Modify Theme

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
-       "libraryDirectory": "css", // import css 
+       "libraryDirectory": "lib", // import lib 
        "style": false,
        "camel2DashComponentName": false,
        "camel2UnderlineComponentName": false
      }
    ]
  ]
}
```
1. Install `rescript-use-rewire` and `react-app-rewire-less`.
   
```
$ npm i @rescripts/rescript-use-rewire react-app-rewire-less
```
3. Modify `.rescript.js` file

```
+ const rewireLess = require('react-app-rewire-less');

module.exports = [
  ['use-babel-config', '.babelrc'],
+ [ 
+   'use-rewire',
+   rewireLess.withLoaderOptions({ 
+     modifyVars: { 'so-theme': 'antd' }, // change theme to antd
+     javascriptEnabled: true
+   })
+ ]
];
```

4. Re-run `npm start`.

## I18N

Some components (Datepicker, Select, Model, etc..) has build in text, default pack is 'es-US', set the webpack process.env to 'zh-CN' changes the language pack to Chinese.
```
plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      LOCALE: JSON.stringify('zh-CN'),
    },
  }),
],
```

If you use Shineout form a CDN, you can call the setLocale method of locale.

```
import { setLocale } from 'shineout'
setLocale('zh-CN')
```

Other language or part of the set can be passed in a Json data.

```
setLocale({ ok: 'yes' })
```

The current locale content is as follows:

<example name="locale" />