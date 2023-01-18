import React from 'react'
import DatumTree from '../Datum/Tree'
import shallowEqual from '../utils/shallowEqual'
import { TreeSelectPropsWithAdvancedFilter, TreeSelectPropsWithDatum, TreeSelectValueType } from './Props'
import { KeygenResult } from '../@types/common'

function toArray<Value>(value: Value) {
  if (!value) return []
  if (!Array.isArray(value)) return [value]
  return value
}

export default function datum<Item, Value extends TreeSelectValueType>(
  Origin: React.ComponentType<TreeSelectPropsWithAdvancedFilter<Item, Value>>
) {
  return class TreeDatum extends React.Component<TreeSelectPropsWithDatum<Item, Value>> {
    static defaultProps = {
      mode: 1,
      childrenKey: 'children',
      unmatch: true,
    }

    datum: DatumTree<Item>

    constructor(props: TreeSelectPropsWithDatum<Item, Value>) {
      super(props)

      this.datum = new DatumTree({
        data: props.data,
        loader: props.loader,
        keygen: props.keygen,
        mode: props.mode,
        value: toArray(props.value) as KeygenResult[],
        onChange: props.onChange,
        disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
        childrenKey: props.childrenKey || 'children',
        unmatch: props.unmatch,
      })
    }

    componentDidUpdate(prevProps: TreeSelectPropsWithDatum<Item, Value>) {
      if (!shallowEqual(prevProps.data, this.props.data)) {
        const { disabled } = this.props
        this.datum.updateDisabled(typeof disabled === 'function' ? disabled : undefined)
        this.datum.setData(this.props.data, true)
        this.forceUpdate()
      }
    }

    render() {
      const { value } = this.props
      const props = {
        ...this.props,
        datum: this.datum,
      }

      if (!shallowEqual(toArray(value), this.datum.getValue())) {
        this.datum.setValue(toArray(value) as KeygenResult[])
      }
      return <Origin {...props} />
    }
  }
}
