const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')

const srcPath = path.resolve(__dirname, '../src')

function createSrc(name) {
  const componentName = name
  const className = `${name.replace(/^\S/, s => s.toLowerCase())}Class`
  const dashName = name.replace(/^\S/, s => s.toLowerCase()).replace(/([A-Z])/g, '-$1').toLowerCase()

  const indexText = `import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { ${className} } from '../styles'

class ${componentName} extends PureComponent {
  render() {
    const { style } = this.props
    const className = classnames(
      ${className}('_'),
      this.props.className,
    )

    return (
      <div className={className} style={style}>${name}</div>
    )
  }
}

${componentName}.propTypes = {
  ...getProps(PropTypes, 'size', 'type'),
}

${componentName}.defaultProps = {
  ...defaultProps,
}

export default ${componentName}`

  const lessText = `@import './variables.less';
@import './themes/@{so-theme}.less';

@${dashName}-prefix: ~"@{so-prefix}-${dashName}";

.@{${dashName}-prefix} {
}`

  fs.mkdirSync(path.resolve(srcPath, name))
  console.log(`create file src/${name}/index.js`)
  fs.writeFileSync(path.resolve(srcPath, `${name}/index.js`), indexText)
  console.log(`create file src/styles/${dashName}.less`)
  fs.writeFileSync(path.resolve(srcPath, 'styles', `${dashName}.less`), lessText)
  console.log(`append ${className} to file src/styles/index.js`)
  fs.appendFileSync(
    path.resolve(srcPath, 'styles/index.js'),
    `export const ${className} = genaration(require('./${dashName}.less'), '${dashName}')\n`,
  )
}

function createDoc(name) {
  const docPath = path.resolve(__dirname, '../site/pages/components', name)

  const exampleText = `/**
 * cn - 基本用法
 * en - Base
 */
import React, { Fragment } from 'react'
import { ${name} } from 'shineout'

export default function () {
  return (
    <Fragment>
      <${name} />
    </Fragment>
  )
}
`
  const md = `# ${name}\n\n<example />\n\n## API`

  fs.mkdirSync(docPath)
  console.log(`create example file site/pages/components/${name}/example-1-base.js`)
  fs.writeFileSync(path.resolve(docPath, 'example-1-base.js'), exampleText)

  fs.writeFileSync(path.resolve(docPath, 'cn.md'), md)
  fs.writeFileSync(path.resolve(docPath, 'en.md'), md)
}

function remove(name) {
  const className = `${name.replace(/^\S/, s => s.toLowerCase())}Class`
  const dashName = name.replace(/^\S/, s => s.toLowerCase()).replace(/([A-Z])/g, '-$1').toLowerCase()

  rimraf.sync(path.resolve(srcPath, name))
  rimraf.sync(path.resolve(srcPath, 'styles', `${dashName}.less`))
  rimraf.sync(path.resolve(__dirname, '../site/pages/components', name))
  rimraf.sync(path.resolve(__dirname, '../site/chunks/Components', `${name}.js`))

  const styleText = fs.readFileSync(path.resolve(srcPath, 'styles/index.js'))
    .toString().split('\n')
    .filter(l => l.indexOf(` ${className} `) < 0)
    .join('\n')

  fs.writeFileSync(path.resolve(srcPath, 'styles/index.js'), styleText)
}

function create() {
  let name = process.argv[2]
  const isRemove = name === '-d'

  // eslint-disable-next-line
  if (isRemove) name = process.argv[3]

  if (!name) {
    console.log('must give a name')
    return
  }

  name = name.replace(/^\S/, s => s.toUpperCase()).replace(/-(\w)/g, x => x.slice(1).toUpperCase())

  if (isRemove) {
    remove(name)
    return
  }

  const isExist = fs.existsSync(path.resolve(srcPath, name))
  if (isExist) {
    console.log(`${name} is existed.`)
    return
  }

  createSrc(name)
  createDoc(name)
}

create()
