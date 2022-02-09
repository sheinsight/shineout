import immer from 'immer'

const names = [
  'delay',
  'onDatumBind',
  'rules',
  'formDatum',
  'forceChange',
  'trim',
  'beforeChange',
  'validateHook',
  'innerFormNamePath',
  'fieldSetValidate',
  'combineRules',
  'popoverProps',
  'inputFocus',
]

/**
 * delete some props if needed, will not modify the pass argument
 * @param props
 * @returns {Produced<*, *>}
 */
export default function cleanProps(props) {
  return immer(props, draft => {
    names.forEach(p => delete draft[p])
  })
}
