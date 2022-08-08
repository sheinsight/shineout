import glob from 'glob'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Render from 'react-test-renderer'

function clearProps(tree) {
  tree.props = {}
  if (tree.children && tree.children.length > 0) {
    tree.children.forEach(t => {
      if (t.props) clearProps(t)
    })
  }
}

function createNodeMock(element) {
  // You can return any object from this method for any type of DOM component.
  // React will use it as a ref instead of a DOM node when snapshot testing.
  const el = document.createElement(element.type, element.props)
  document.body.appendChild(el)
  return el
}

export default function exampleTest(module, options = {}) {
  const filesTs = glob.sync(`site/pages/components/${module}/example-*.tsx`)
  const filesJS = glob.sync(`site/pages/components/${module}/example-*.js`)
  const files = [...filesTs, ...filesJS]
  files.forEach(file => {
    const names = file.split('/')
    const name = names[names.length - 1].split('.')[0]
    if (options.ignore) {
      if (typeof options.ignore === 'string' && name.endsWith(options.ignore)) return
      if (Array.isArray(options.ignore)) {
        for (let i = 0; i < options.ignore.length; i++) {
          if (name.endsWith(options.ignore[i])) return
        }
      }
    }
    const Example = require(`../${file}`).default
    let Case = <Example />
    if (options.withRouter && options.withRouter.includes(name)) {
      Case = (
        <div>
          <BrowserRouter>
            <Example />
          </BrowserRouter>
        </div>
      )
    }
    test(`Snapshot test: ${module}[${file}]`, () => {
      const wrapper = Render.create(Case, { createNodeMock }).toJSON()
      clearProps(wrapper)
      expect(wrapper).toMatchSnapshot()
    })
  })
}
