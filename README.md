English | [简体中文](./README-zh_CN.md)

<p align="center">
  <img alt="react-router" src="https://user-images.githubusercontent.com/101764/44770646-44f53000-ab9b-11e8-834e-2b1394cea318.png" width="300">
</p>

<p align="center">
  A components library for <a href="https://facebook.github.io/react">React</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/shineout"><img src="https://img.shields.io/npm/v/shineout.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/shineout"><img src="https://img.shields.io/npm/dm/shineout.svg?style=flat-square"></a>
  <a href="https://david-dm.org/sheinsight/shineout"><img src="https://img.shields.io/david/sheinsight/shineout.svg?style=flat-square"></a>
  <img src="https://img.shields.io/badge/React-%3E%3D16.0.0-green.svg?style=flat-square">
</p>

## ✨ Features

 - A concise and friendly API
 - A set of high-performance React components out of the box.
 - Always backward compatible
 - Flexible theme customization

<!-- [View docs here](https://sheinsight.github.io/shineout/) -->

## 🛠️ Requirements

```
react >= 16.0.0
react-dom >= 16.0.0
```

## 🖥 Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions |

## 🔍 Examples

  - [Concise And Intelligent Form](https://shine.wiki/1.4.x/en/components/Form#heading-01-base)
  
   [<img src="./site/images/form.gif" />](https://shine.wiki/1.4.x/en/components/Form#heading-01-base)

  - [Performance Table With 10000 Records](https://shine.wiki/1.4.x/en/components/Table#heading-08-bigdata)
  
   [<img src="./site/images/table.gif" />](https://shine.wiki/1.4.x/en/components/Table#heading-08-bigdata)

## 📦 Installation

```bash
npm install shineout
```

```bash
yarn add shineout
```

```bash
pnpm add shineout
```

## ⚡ CDN

```html
<link rel="stylesheet" href="https://unpkg.com/shineout/dist/theme.default.css" />
<script crossorigin src="https://unpkg.com/shineout/dist/shineout.min.js"></script>
```

## 🔧 Usage

```tsx
import { Button } from 'shineout'

<Button>Click me</Button>
```

And import style manually:

```javascript
import 'shineout/dist/theme.default.css' // or 'shineout/dist/theme.antd.css'
```

## 🌐 Internationalization

See [i18n](https://shine.wiki/1.4.x/en/components/GetStart#heading-2-I18N)

## 🔗 Links

- [Home page](http://shine.wiki/)
- [Components](https://shine.wiki/1.4.x/en/components/GetStart)
- [Smart Form](https://shine.wiki/1.4.x/en/components/Form#heading-01-base)
- [Performance Table](https://shine.wiki/1.4.x/en/components/Table#heading-08-bigdata)
- [Shineout template](https://codesandbox.io/s/delicate-http-y3duk)

## 🚀 Development

clone locally:

```bash
$ git clone git@github.com:sheinsight/shineout.git
$ cd shineout
$ yarn
$ yarn start
```

Open your browser and visit http://localhost:3000

## 📄 LICENSE
[MIT](./LICENSE)