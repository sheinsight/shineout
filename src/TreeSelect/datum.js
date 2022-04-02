import React from 'react'
import PropTypes from 'prop-types'
import DatumTree from '../Datum/Tree'
import shallowEqual from '../utils/shallowEqual'

function toArray(value) {
  if (!value) return []
  if (!Array.isArray(value)) return [value]
  return value
}

export default function datum(Origin) {
  return class TreeDatum extends React.Component {
    static propTypes = {
      loader: PropTypes.func,
      data: PropTypes.array,
      disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      mode: PropTypes.oneOf([0, 1, 2, 3, 4]),
      onChange: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
      keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      multiple: PropTypes.bool,
      childrenKey: PropTypes.string,
      unmatch: PropTypes.bool,
    }

    static defaultProps = {
      mode: 1,
      childrenKey: 'children',
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
        childrenKey: props.childrenKey,
        unmatch: props.unmatch,
      })
    }

    componentDidUpdate(prevProps) {
      if (!shallowEqual(prevProps.data, this.props.data)) {
        this.datum.setData(this.props.data)
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
