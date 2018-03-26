import immer from 'immer'

const names = ['onDatumBind']

export default function (props) {
  return immer(props, (draft) => {
    names.forEach(p => delete draft[p])
  })
}
