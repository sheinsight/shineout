import glob from 'glob'
import React from 'react'
import Render from 'react-test-renderer'

function clearProps(tree) {
  tree.props = {}
  if (tree.children && tree.children.length > 0) {
    tree.children.forEach(t => {
      if (t.props) clearProps(t)
    })
  }
}

export default function exampleTest(module, options = {}) {
  const files = glob.sync(`site/pages/components/${module}/example-*.tsx`)
  files.forEach(file => {
    if (options.ignore && file.endsWith(options.ignore)) return
    const Example = require(`../${file}`).default
    test(`Snapshot test: ${module}[${file}]`, () => {
      const wrapper = Render.create(<Example />).toJSON()
      clearProps(wrapper)
      expect(wrapper).toMatchSnapshot()
    })
  })
}
