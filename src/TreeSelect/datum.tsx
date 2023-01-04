import React from 'react'
import DatumTree from '../Datum/Tree'
import shallowEqual from '../utils/shallowEqual'
import { TreeDatumProps, GetTreeDatumProps } from './Props'

function toArray<Value>(value: Value) {
  if (!value) return []
  if (!Array.isArray(value)) return [value]
  return value
}

export default function datum<Item, Value>(
  Origin: React.ComponentType<GetTreeDatumProps<TreeDatumProps<Item, Value>, Item, Value>>
) {
  return class TreeDatum extends React.Component<TreeDatumProps<Item, Value>> {
    static defaultProps = {
      mode: 1,
      childrenKey: 'children',
    }

    datum: DatumTree<Item, any[]>

    constructor(props: TreeDatumProps<Item, Value>) {
      super(props)

      this.datum = new DatumTree({
        data: props.data,
        loader: props.loader,
        keygen: props.keygen,
        mode: props.mode,
        value: toArray(props.value),
        onChange: props.onChange as any,
        disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
        childrenKey: props.childrenKey || 'children',
        unmatch: props.unmatch,
      })
    }

    componentDidUpdate(prevProps: TreeDatumProps<Item, Value>) {
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
        this.datum.setValue(toArray(value))
      }
      return <Origin {...props} />
    }
  }
}
