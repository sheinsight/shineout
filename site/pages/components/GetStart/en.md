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
    module: true,
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