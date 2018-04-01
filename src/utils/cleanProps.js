import immer from 'immer'

const names = ['delay', 'onDatumBind', 'rules']

export default function (props) {
  return immer(props, (draft) => {
    names.forEach(p => delete draft[p])
  })
}
