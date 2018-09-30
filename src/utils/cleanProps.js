import immer from 'immer'

const names = [
  'delay', 'onDatumBind', 'rules', 'formDatum',
  'forceChange', 'trim', 'beforeChange', 'validateHook',
]

export default function (props) {
  return immer(props, (draft) => {
    names.forEach(p => delete draft[p])
  })
}
