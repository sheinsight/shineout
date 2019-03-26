import React from 'react'
import PropTypes from 'prop-types'
import DatumTree from '../Datum/Tree'
import shallowEqual from '../utils/shallowEqual'

function toArray(value) {
  if (!value) return []
  if (typeof value === 'string') return [value]
  return value
}

export default function datum(Origin) {
  return class TreeDatum extends React.Component {
    static propTypes = {
      loader: PropTypes.func,
      data: PropTypes.array,
      disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      mode: PropTypes.oneOf([0, 1, 2, 3]),
      onChange: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      multiple: PropTypes.bool,
    }

    constructor(props) {
      super(props)

      this.mode = props.mode
      if (this.mode === undefined) {
        this.mode = props.multiple ? 1 : 3
      }
      this.datum = new DatumTree({
        data: props.data,
        loader: props.loader,
        keygen: props.keygen,
        mode: this.mode,
        value: toArray(props.value),
        onChange: props.onChange,
        disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
      })
      this.setTreeValue(toArray(props.value))
    }

    setTreeValue(values) {
      values.forEach(v => this.datum.set(v, 1))
    }

    render() {
      const { value } = this.props
      const props = {
        ...this.props,
        datum: this.datum,
        mode: this.mode,
      }

      if (!shallowEqual(toArray(value), this.datum.getValue())) {
        console.log(value)
        this.datum.setValue([])
        this.setTreeValue(toArray(value))
        console.log(this.datum.getValue())
      }
      return <Origin {...props} />
    }
  }
}
