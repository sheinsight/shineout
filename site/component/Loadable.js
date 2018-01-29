import Loadable from 'react-loadable'
import Loading from './Loading'

export default function (loader) {
  return Loadable({
    loader,
    loading: Loading,
  })
}
