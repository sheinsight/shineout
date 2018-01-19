import React from 'react'
import loadable from 'docs/Loadable'
import MarkDown from 'docs/MarkDown'
import navable from 'docs/Navable'
import Page from '../Page'

const create = md => loadable(new Promise((resolve, reject) => {
  md.then((res) => {
    const comp = props => <MarkDown {...props} source={res} />
    resolve(navable(comp))
  }, reject)
}))

const pages = [
  {
    name: 'Api',
    component: create(import('./api.md')),
  },
]

export default Page(pages)

