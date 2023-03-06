import React from 'react'
import MarkDown from './MarkDown'
import lazy from './Lazy'
import navable from '../Navable'

const LazyMarkDown = lazy(MarkDown)
export default LazyMarkDown

export function createMarkDown(loader, noNav) {
  return navable(props => <LazyMarkDown {...props} loader={loader} />, { noNav })
}
