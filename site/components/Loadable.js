import React from 'react'
import Loadable from 'react-loadable'

export default function (loader) {
  return Loadable({
    loader: () => loader,
    loading: () => <div />,
  })
}
