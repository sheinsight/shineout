import immer from 'immer'

const names: string[] = [
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
  'placeTitle',
  'cancelChange',
  'integerLimit',
  'autoSelect',
  'autoFix',
  'numType',
  'forceValidate',
]

/**
 * delete some props if needed, will not modify the pass argument
 * @param props
 * @returns {Produced<*, *>}
 */
export default function cleanProps(props: { [x: string]: any }) {
  return immer(props, draft => {
    names.forEach(p => delete draft[p])
  })
}
