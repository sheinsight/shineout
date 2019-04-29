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

    static defaultProps = {
      mode: 1,
    }

    constructor(props) {
      super(props)

      this.datum = new DatumTree({
        data: props.data,
        loader: props.loader,
        keygen: props.keygen,
        mode: props.mode,
        value: toArray(props.value),
        onChange: props.onChange,
        disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
      })
    }

    componentDidUpdate(prevProps) {
      if (prevProps.data !== this.props.data) this.datum.setData(this.props.data)
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
