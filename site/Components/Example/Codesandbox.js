import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import LZString from 'lz-string'
import { Tooltip } from 'shineout'
import _ from 'doc/locate'
import { exampleClass } from 'doc/styles'
import Icon from 'doc/icons/Icon'
import { exampleTree, exampleIds } from 'doc/data/tree'
import { fCitys } from 'doc/data/city'
import { fetchSync } from 'doc/data/user'
import lorem from 'doc/utils/faker/lorem'
import { iconStr, cssStr, fetch } from './template'
import { getMatched } from '../../utils/regexp'

const files = {
  tree: {
    value: exampleTree,
    func: false,
    constExport: exampleIds,
  },
  city: {
    value: fCitys,
    func: true,
  },
  user: {
    value: fetch(fetchSync(10)),
    func: false,
  },
  lorem: {
    value: lorem(3),
    func: true,
  },
}

const importReg = /import.*[from]?[ ]+'(.*)'/

const Codesandbox = ({ id, text }) => {
  const formId = `${id}_form`
  const [info, setInfo] = useState('')

  const insertFile = (file, r) => {
    const importText = text.match(new RegExp(`import.+${file}'`, 'g'))[0]
    // only for user
    if (file === 'user') {
      r[`${file}.js`] = { content: files.user.value }
      r['App.js'].content = r['App.js'].content.replace('doc/data/user', `./${file}.js`)
      r['package.json'].content.dependencies.immer = 'latest'
      return
    }

    r[`${file}.js`] = {
      content: `const ${file} = ${JSON.stringify(files[file].value, null, 2)}
${files[file].constExport ? `export const allIds = ${JSON.stringify(files[file].constExport)}` : ''}
export default ${file}`,
    }

    const dataName = /import +(.+) from/g
      .exec(importText)[1]
      .replace(/[{}]/g, '')
      .trim()
      .split(' ')
      .pop()

    if (dataName === 'allIds') {
      // special, this is for expand tree
      r['App.js'].content = r['App.js'].content.replace('doc/data/tree', `./${file}.js`)
    } else r['App.js'].content = r['App.js'].content.replace(importText, `import ${dataName} from './${file}.js'`)

    if (files[file].func) {
      r['App.js'].content = r['App.js'].content.replace(new RegExp(`${dataName}\\(\\d*\\)`, 'g'), dataName)
    }
  }

  useEffect(
    () => {
      const r = {
        'package.json': {
          content: {
            dependencies: {
              'react-dom': 'latest',
              'prop-types': 'latest',
            },
          },
        },
        'App.js': {
          content: text,
        },
        'index.js': {
          content: `
import React from 'react'
import ReactDOM from 'react-dom'
import 'shineout/dist/theme.shineout.css'
import App from './App.js'
  
ReactDOM.render(<App />, document.querySelector('#root'))
`,
        },
        'index.html': {
          content: `<div id="root" style="padding: 24px"></div>`,
        },
      }

      const imports = getMatched(text, importReg)

      imports.forEach(i => {
        if (i.indexOf('.') === -1) {
          if (i === 'shineout') {
            if (!r['package.json'].content.dependencies.shineout)
              r['package.json'].content.dependencies.shineout = process.env.LOG_ENV === 'rc' ? 'next' : 'latest'
          } else if (i.startsWith('doc')) {
            const file = i.split('/').pop()
            insertFile(file, r)
          } else r['package.json'].content.dependencies[i] = 'latest'
        } else if (i.indexOf('./s') === 0) {
          r['App.js'].content = r['App.js'].content.replace('less', 'css')
          r[i.substring(2).replace('less', 'css')] = {
            content: cssStr,
          }
        } else {
          r['icon.js'] = { content: iconStr }
          r['App.js'].content = r['App.js'].content.replace(i, './icon.js')
        }
      })

      setInfo(
        LZString.compressToBase64(JSON.stringify({ files: r }))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '')
      )
    },
    [text]
  )

  return (
    // use form to submit into codesandbox
    <form name={formId} action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
      <input type="hidden" name="parameters" value={info} />
      <Tooltip tip={_('在codesandbox里打开', 'open in codesandbox')}>
        <a
          className={exampleClass('toggle')}
          onClick={() => {
            document.forms[formId].submit()
          }}
          style={{ right: 30 }}
        >
          <Icon name="code-sandbox" />
        </a>
      </Tooltip>
    </form>
  )
}

Codesandbox.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
}

export default Codesandbox
