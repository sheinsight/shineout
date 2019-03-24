import React from 'react'
import PropTypes from 'prop-types'
import DatumTree from '../Datum/Tree'

function toArray(value) {
  if (!value) return []
  if (typeof value === 'string') return [value]
  return value
}

export default function datum(Origin) {
  return class TreeDatum extends React.Component {
    static propTypes = {
      data: PropTypes.array,
      defaultValue: PropTypes.arrayOf(PropTypes.string),
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
        keygen: props.keygen,
        mode: this.mode,
        onChange: props.onChange,
        disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
      })
      this.setTreeValue()
    }

    setTreeValue() {
      const { value, defaultValue } = this.props
      const values = toArray(value || defaultValue)
      values.forEach(v => this.datum.set(v, 1))
    }

    render() {
      const props = {
        ...this.props,
        datum: this.datum,
        mode: this.mode,
      }
      return <Origin {...props} />
    }
  }
}
