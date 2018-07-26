import { Component } from 'react'
import PropTypes from 'prop-types'

class Flow extends Component {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.listeners = []

    const { names, formDatum } = props
    if (names) {
      names.forEach((n) => {
        const nc = `${n}-change`
        formDatum.listen(nc, this.update)
        this.listeners.push(nc)
      })
    } else {
      formDatum.listen('change', this.update)
      this.listeners.push('change')
    }
  }


  componentWillUnmount() {
    const { formDatum } = this.props
    this.listeners.forEach(n => formDatum.unlisten(n))
  }


  update() {
    this.forceUpdate()
  }

  render() {
    const { children, formDatum } = this.props
    return children(formDatum) || null
  }
}

Flow.propTypes = {
  children: PropTypes.func,
  formDatum: PropTypes.object.isRequired,
  names: PropTypes.array,
}

export default Flow
