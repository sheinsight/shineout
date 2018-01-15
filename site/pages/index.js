import Loadable from 'react-loadable'

function create(loader) {
  return Loadable({
    loader,
    loading: () => <div />
  })
}

export const Home = create(() => import('./Home'))