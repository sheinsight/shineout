import React from 'react'
import Loadable from 'react-loadable'

function create(loader) {
  return Loadable({
    loader: () => loader,
    loading: () => <div />,
  })
}

export default {
  Components: {
    Sticky: create(import('./components/Sticky')),
  },
  Home: create(import('./Home')),
}
